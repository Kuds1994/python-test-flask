import {useState, useEffect} from "react"
import {Link ,useParams} from "react-router-dom";
import { DateTime } from "luxon";

import TodoDataServices from "../servicos/todo.service";

import './index.css';

export default function PegarTodo(){

    //Busca na URL o parametro do ID
    const { id } = useParams();

    //Inicia a variável do todo para atualizar
    const [todo, setTodo] = useState([])

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
        }).catch(error  => {
            console.log(error.response)
            setMensagem({status: true, texto: error.response.data.mensagem, sucesso: false})
        });    
    }, [id])  

    //Parte do código HTML que é retornado para exibir na tela de cadastro
    return (
       <div className="section-cadastro">
           {!mensagem.status ?
           <>
                <h2>Tarefa</h2>
                <form className="buscar-todo">
                        <div className="form-group">  
                            <label htmlFor="todo-titulo">Título</label> 
                            <p id="todo-titulo" name="todo-titulos" className="form-control" type="text">{todo.titulo}</p>
                        </div>
                        <div className="form-group"> 
                            <label htmlFor="todo-descricao">Descrição</label> 
                            <p id="todo-descricao" name="todo-descricao" className="form-control">{todo.descricao}</p>
                        </div>
                        <div className="form-group"> 
                            <label htmlFor="todo-feito">Andamento</label> 
                            <p id="todo-feito" name="todo-feito" className="form-control">{todo.feito ? 'Concluído' : 'A concluir' }</p>
                        </div>
                        <div className="form-group"> 
                            <label htmlFor="todo-datainicio">Data de Inicio</label> 
                            <p id="todo-datainicio" name="todo-datainicio" className="form-control">{DateTime.fromISO(todo.data_inicio).toFormat('dd/MM/yyyy HH:mm:ss')}</p>
                        </div> 
                        <div className="form-group"> 
                            <label htmlFor="todo-datatermino">Data de Termino</label> 
                            <p id="todo-datatermino" name="todo-datatermino" className="form-control">{DateTime.fromISO(todo.data_termino).toFormat('dd/MM/yyyy HH:mm:ss')}</p>
                        </div>   
                        <Link to="/" id="voltar-link" className="btn btn-light" href="/listar">Voltar</Link>  
                </form> 
           </> 
           : mensagens()}
        </div>
    )
}