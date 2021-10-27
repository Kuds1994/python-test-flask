import {useState, useEffect} from "react"
import {Link, useParams} from "react-router-dom";

import TodoDataServices from "../servicos/todo.service";

import './index.css';

export default function Editar(){

    //Busca na URL o parametro do ID
    const { id } = useParams();

    //Inicia a variável do todo para atualizar
    const [todo, setTodo] = useState({
        titulo: '',
        descricao: '',
        data_termino:'',           
    })

    //Variável usada para guardar as mensagens que vem do banco caso retorn algum erro
    const [mensagem, setMensagem] = useState({
        texto: '',
        sucesso: false,
        status: false,
    });

    //Método usado para destinguir que tipo de mensagem exibir, dependendo do tipo de resposta retornada do banco após um solicitção
    const mensagens = () => {
        if(mensagem.sucesso){
            return <div className="alert alert-success" role="alert">{mensagem.texto}</div>
        }else{
            return <div className="alert alert-danger" role="alert">{mensagem.texto}</div>
        }
    }

    //Métdo do próprio React que é disparado toda vez que a página e renderizada ou determinada variável muda de estado
    useEffect(() => { 
        TodoDataServices.getTodo(id).then(response => {
            setTodo(response.data)         
        })    
    }, [id])  
    

    //Método usado para atualizar um todo no banco
    const salvar = (e) => {
        e.preventDefault(); 

        TodoDataServices.atualizarTodo(id, todo).then(response => {
            
            setMensagem({status: true, texto: "Atualizado com sucesso", sucesso: true})
        }).catch(error  => {
            console.log(error.response)
            setMensagem({status: true, texto: error.response.data.mensagem, sucesso: false})
        });    
    }

    //Parte do código HTML que é retornado para exibir na tela de cadastro
    return (
       <div className="section-cadastro">
           <h2>Editar Tarefa</h2>
           <form className="editar-todos" onSubmit={salvar}>
                <div className="form-group">  
                    <label htmlFor="todo-titulo">Título</label> 
                    <input id="todo-titulo" name="todo-titulos" onChange={e => setTodo({...todo, titulo: e.target.value})} value={todo.titulo} className="form-control" type="text"/>
                </div>
                <div className="form-group"> 
                    <label htmlFor="todo-descricao">Descrição</label> 
                    <textarea id="todo-descricao" name="todo-descricao" onChange={e => setTodo({...todo, descricao: e.target.value})} value={todo.descricao}  className="form-control" type="textarea" rows="5" cols="30"/>
                </div>
                <div className="form-group"> 
                    <label htmlFor="todo-datatermino">Data de Termino</label> 
                    <input id="todo-datatermino" name="todo-datatermino" onChange={e => setTodo({...todo, data_termino: e.target.value})} value={todo.data_termino.substring(0, 16)} className="form-control" type="datetime-local"/>
                </div> 
                <button id="atualizar-submit" className="btn btn-primary" type="submit">Atualizar</button>
                <Link to="/" id="voltar-link" className="btn btn-light" href="/listar">Voltar</Link>
                { mensagem.status && mensagens() }
           </form>  
        </div>
    )
}