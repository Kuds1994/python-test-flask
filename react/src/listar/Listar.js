import {useState, useEffect} from "react"
import {Link} from "react-router-dom";
import { DateTime } from "luxon";
import {Modal, Button} from 'react-bootstrap';

import TodoDataServices from "../servicos/todo.service";

import './index.css'

export default function Listar(){

    //Lista usada para guardar os dados que vem do banco de dados
    const [todos, setTodos] = useState([]); 

    //Variavel para mudar o estado do modal do excluir todo
    const [show, setShow] = useState(false);

    //Variavel usada para fazer a busca dos Todos
    const [busca, setBusca] = useState('');

    //Guarda os dados do todo que se deseja excluir
    const [modal, setModal] = useState({
        id: '',
        titulo: ''
    });
    
    useEffect(async () => { 
        await TodoDataServices.pegarTodos().then(response => {
            //Ordena os Todos por ordem do id
            setTodos(response.data.sort((a, b) => a.id - b.id)) 
        })      
    }, [])

    //Metodo para excluir um todo da lista
    const deletar = () => {
        TodoDataServices.deletarTodo(modal.id).then(() => {
            setTodos(todos.filter(u => u.id !== modal.id))
        })
        handleCloseExcluir()
    }
    //Concluir um todo
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

    //Método para abrir a tela de exclusão
    const handleShowExcluir = () => setShow(true);
    //Método para fechar a tela de exclusão
    const handleCloseExcluir = () => setShow(false)

    return (
       <div className="listar-todos">

                {
                    //Retorno do componente com a lista de tarefas
                }

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
                        //Map para percorrer a lista de todos
                        todos.filter(u => u.titulo.toUpperCase().includes(busca.toUpperCase()) || u.descricao.includes(busca)).map((t) =>   
                            <tr key={t.id} data-testid="lista-teste">                      
                                <th scope="row"> {t.id} </th>
                                <td> <Link to={`/buscarTodo/${t.id}`} id="editar-link" className="f">{t.titulo}</Link></td>
                                <td> {t.descricao.length < 20 ? t.descricao : t.descricao.slice(0, 20) + '...'} </td>
                                <td> {DateTime.fromISO(t.data_inicio).toFormat('dd/MM/yyyy HH:mm:ss')} </td> 
                                <td> {DateTime.fromISO(t.data_termino).toFormat('dd/MM/yyyy HH:mm:ss')} </td> 
                                {t.feito ? <td className="sucesso">Feito</td> : <td className="falha">A concluir</td>}                                                                     
                                <td>
                                    {t.feito ? <span style={{padding: '0 47px'}}></span> : <button type="button" onClick={(e) => {e.preventDefault(); concluir(t.id)}} id="excluir-link" className="btn btn-success f">Concluir</button>}  
                                    <Link to={`/editar/${t.id}`} id="editar-link" className="btn btn-primary f">Editar</Link> 
                                    <button type="button" onClick={(e) => {e.preventDefault(); setModal({...modal, id: t.id, titulo:t.titulo}); handleShowExcluir()}} id="excluir-link" className="btn btn-danger">Excluir</button>
                                </td>                                                                      
                            </tr>
                        )
                    }                   
                </tbody>
                </table>
                //Caso não ache nada, exibe a mensagem de nenhum todo cadastrado
                : <h3>Nenhuma tarefa cadastrada.</h3>
                
            }
                <Link to="/cadastrar" id="cadastrar-link" className="btn btn-primary">Cadastrar</Link>

                {
                    //Modal que é exibido quando o usuário tenta excluir um todo
                }
                <Modal show={show} onHide={handleCloseExcluir}>
                <Modal.Header closeButton>
                    
                    <Modal.Title>Excluir Todo</Modal.Title>
                </Modal.Header>
                <Modal.Body>Deseja excluir o todo {modal.titulo}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={deletar}>
                        Deletar
                    </Button>
                    <Button variant="secondary" onClick={handleCloseExcluir}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
       </div>
    )
}