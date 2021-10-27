import {useState} from "react"
import {Link} from "react-router-dom";

import TodoDataServices from "../servicos/todo.service";

import './index.css';

export default function Cadastrar(){

    const [todo, setTodo] = useState({
        titulo: '',
        descricao: '',
        data_termino:'',           
    })

    const [mensagem, setMensagem] = useState({
        texto: '',
        sucesso: false,
        status: false,
    });

    const mensagens = () => {
        if(mensagem.sucesso){
            return <div className="alert alert-success" data-testid="mensagem" role="alert">{mensagem.texto}</div>
        }else{
            return <div className="alert alert-danger" data-testid="mensagem" role="alert">{mensagem.texto}</div>
        }
    }


    const salvar = (e) => {
        e.preventDefault();

        TodoDataServices.cadastrarTodo(todo).then(response => {
            setMensagem({status: true, texto: "Salvo com sucesso", sucesso: true})
        })
        .catch(error  => {
            console.log(error.response.data.message)
            setMensagem({status: true, texto: error.response.data.mensagem, sucesso: false})
        });   

    }

    return (
       <div className="section-cadastro">
           <h2>Cadastro de Tarefa</h2>
           <form className="cadastro-todos" data-testid="form-cadastro" onSubmit={salvar}>   
           <div className="form-group">  
                    <label htmlFor="todo-titulo">Título</label> 
                    <input id="todo-titulo" data-testid="cadastro-titulo" name="todo-titulo" onChange={e => setTodo({...todo, titulo: e.target.value})} className="form-control" type="text"/>
                </div>
                <div className="form-group"> 
                    <label htmlFor="todo-descricao">Descrição</label> 
                    <textarea id="todo-descricao" data-testid="cadastro-descricao" name="todo-descricao" onChange={e => setTodo({...todo, descricao: e.target.value})} className="form-control" type="textarea" rows="5" cols="30"/>
                </div>
                <div className="form-group"> 
                    <label htmlFor="todo-datatermino">Data de Termino</label> 
                    <input id="todo-datatermino" data-testid="cadastro-datatermino" name="todo-datatermino" onChange={e => setTodo({...todo, data_termino: e.target.value})} className="form-control" type="datetime-local"/>
                </div> 
                <button id="cadastro-submit" className="btn btn-primary" type="submit">Cadastrar</button>
                <Link to="/" id="voltar-link" className="btn btn-light" href="/cadastrar">Voltar</Link>
                { mensagem.status && mensagens() }
           </form>  
        </div>
    )
}