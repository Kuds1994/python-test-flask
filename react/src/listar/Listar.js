import {useState, useEffect} from "react"
import {Link} from "react-router-dom";
import { DateTime } from "luxon";

import TodoDataServices from "../servicos/todo.service";

import './index.css'

export default function Listar(){

    //Lista usada para guardar os dados que vem do banco de dados
    const [todos, setTodos] = useState([]); 

    //Variavel usada para fazer a busca dos Todos
    const [busca, setBusca] = useState('');
    
    useEffect(() => { 
        TodoDataServices.pegarTodos().then(response => {
            //Ordena os Todos por ordem do id
            setTodos(response.data.sort((a, b) => a.id - b.id)) 
        })      
    }, [])

    //Metodo para excluir um todo da lista
    const deletar = (id) => {
        TodoDataServices.deletarTodo(id).then(() => {
            setTodos(todos.filter(u => u.id !== id))
        })
    }

    const concluir = (id) => {
        TodoDataServices.concluirTodo(id).then(() => {
            const a = todos.map(todo => {
                if(todo.id == id){
                    todo.feito = true
                }

                return todo
            })
            setTodos(a)
        })
    }

    return (
       <div className="listar-todos">
           <h2>Lista de Terefas</h2>
           <div className="form-group">                 
                <input id="nome-tarefa" placeholder="Buscar tarefa"  name="nome-tarefa" onChange={e => setBusca(e.target.value)} className="form-control" type="text"/>
            </div>
           {
               todos.length > 0 ? 
           <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Título</th>
                        <th scope="col">Descrição</th>
                        <th scope="col">Data de Início</th>
                        <th scope="col">Data de Termino</th>
                        <th scope="col">Andamento</th>
                        <th scope="col">Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        todos.filter(u => u.titulo.includes(busca) || u.descricao.includes(busca)).map((t) =>   
                            <tr key={t.id}>                      
                                <th scope="row"> {t.id} </th>
                                <td> {t.titulo} </td>
                                <td> {t.descricao.length < 20 ? t.descricao : t.descricao.slice(0, 20) + '...'} </td>
                                <td> {DateTime.fromISO(t.data_inicio).toFormat('dd/MM/yyyy HH:mm:ss')} </td> 
                                <td> {DateTime.fromISO(t.data_termino).toFormat('dd/MM/yyyy HH:mm:ss')} </td> 
                                {t.feito ? <td className="sucesso">Feito</td> : <td className="falha">A concluir</td>}                                                                     
                                <td>
                                    {t.feito ? <span style={{padding: '0 47px'}}></span> : <button type="button" onClick={(e) => {e.preventDefault(); concluir(t.id)}} id="excluir-link" className="btn btn-success f">Concluir</button>}  
                                    <Link to={`/editar/${t.id}`} id="editar-link" className="btn btn-primary f">Editar</Link> 
                                    <button type="button" onClick={(e) => {e.preventDefault(); deletar(t.id)}} id="excluir-link" className="btn btn-danger">Excluir</button>
                                </td>                                                                      
                            </tr>
                        )
                    }                   
                </tbody>
                </table>
                : <h3>Nenhuma tarefa cadastrada.</h3>
            }
                <Link to="/cadastrar" id="cadastrar-link" className="btn btn-primary">Cadastrar</Link>
       </div>
    )
}