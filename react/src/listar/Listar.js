import {useState, useEffect} from "react"
import {Link} from "react-router-dom";
import Moment from 'moment';
import { DateTime } from "luxon";
import 'moment/locale/pt-br';

import UsuariosDataServices from "../servicos/usuario.service";

import './index.css'

export default function Listar(){

    const [usuarios, setUsuarios] = useState([]);  
    const [lista, setLista] = useState([]); 
    const TODOS = [
        {id: 1, titulo: 'Todo 1', descricao: 'asdasdasdasdasd1', data_inicio: DateTime.now().toFormat('dd/MM/yyyy HH:mm:ss'), feito: false, data_termino: DateTime.now().toFormat('dd/MM/yyyy HH:mm:ss')},
        {id: 2, titulo: 'Todo 2', descricao: 'asdasdasdasdasd2', data_inicio: DateTime.now().toFormat('dd/MM/yyyy HH:mm:ss'), feito: false, data_termino: DateTime.now().toFormat('dd/MM/yyyy HH:mm:ss')},
        {id: 3, titulo: 'Todo 3', descricao: 'asdasdasdasdasd3', data_inicio: DateTime.now().toFormat('dd/MM/yyyy HH:mm:ss'), feito: false, data_termino: DateTime.now().toFormat('dd/MM/yyyy HH:mm:ss')}
    ];
    const [todos, setTodos] = useState(TODOS); 
    
    useEffect(() => { 
        UsuariosDataServices.pegarTodos().then(response => {
            setUsuarios(response.data.sort((a, b) => a.id - b.id))
            setLista(response.data);
        })        
    }, [])

    const filtrar = (e) => {
        if(e.length > 0){
            setTodos(TODOS.filter(u => u.titulo.includes(e) || u.descricao.includes(e)))  
        }else{
            setTodos(TODOS)
        }        
    }

    const deletar = (id) => {
        UsuariosDataServices.deletar(id).then(() => {
            setTodos(usuarios.filter(u => u.id !== id))
        })
    }

    return (
       <div className="listar-usuarios">
           <h2>Lista de Terefas</h2>
           <div className="form-group">                 
                <input id="nome-tarefa" placeholder="Buscar tarefa"  name="nome-tarefa" onChange={e => filtrar(e.target.value)} className="form-control" type="text"/>
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
                        todos.map((usu) =>   
                            <tr key={usu.id}>                      
                                <th scope="row"> {usu.id} </th>
                                <td> {usu.titulo} </td>
                                <td> {usu.descricao.length < 20 ? usu.descricao : usu.descricao.slice(0, 20) + '...'} </td>
                                <td> {usu.data_inicio} </td> 
                                <td> {usu.data_termino} </td> 
                                {usu.feito ? <td className="sucesso">Feito</td> : <td className="falha">A concluir</td>}                                                                     
                                <td><Link to={`/editar/${usu.id}`}id="editar-link" className="btn btn-primary">Editar</Link> <button type="button" onClick={(e) => {e.preventDefault(); deletar(usu.id)}} id="excluir-link" className="btn btn-danger">Excluir</button></td>                                                                      
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