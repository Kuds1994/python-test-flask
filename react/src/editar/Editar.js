import {useState, useEffect} from "react"
import {Link, useParams} from "react-router-dom";

import UsuariosDataServices from "../servicos/usuario.service";

import './index.css';

export default function Editar(){

    const { id } = useParams();

    const [usuario, setUsuario] = useState({
        id: '',
        nomeusuario: '',
        loginusuario: '',
        ativo: ''
    });

    const [mensagem, setMensagem] = useState({
        status: false,
    });

    const [repita, setRepita] = useState('');

    const mensagens = () => {
        if(mensagem.sucesso){
            return <div className="alert alert-success" role="alert">{mensagem.texto}</div>
        }else{
            return <div className="alert alert-danger" role="alert">{mensagem.texto}</div>
        }
    }

    useEffect(() => { 
        UsuariosDataServices.pegarUsuario(id).then(response => {
            setUsuario(response.data)         
        })        
    }, [id])  
    
    const salvar = (e) => {
        e.preventDefault(); 

        if(usuario.senhausuario !== repita){
            setMensagem({status: true, texto: 'Senhas não conferem', sucesso: false}); 
            return;
        }
        
        UsuariosDataServices.atualizar(id, usuario).then(response => {
            setMensagem({status: true, texto: "Atualizado com sucesso", sucesso: true})
        }).catch(error  => {
            console.log(error.response)
            setMensagem({status: true, texto: error.response.data.message, sucesso: false})
        });   ;  
    }

    return (
       <div className="section-cadastro">
           <h2>Editar Tarefa</h2>
           <form className="cadastro-usuarios" onSubmit={salvar}>
                <div className="form-group">  
                    <label htmlFor="nome-usuario">Título</label> 
                    <input id="nome-usuario" name="nome-usuario" onChange={e => setUsuario({...usuario, nomeusuario: e.target.value})} className="form-control" type="text"/>
                </div>
                <div className="form-group"> 
                    <label htmlFor="login-usuario">Descrição</label> 
                    <textarea id="login-usuario" name="login-usuario" onChange={e => setUsuario({...usuario, loginusuario: e.target.value})} className="form-control" type="textarea" rows="5" cols="30"/>
                </div>
                <div className="form-group"> 
                    <label htmlFor="senha-usuario">Data de Termino</label> 
                    <input id="senha-usuario" name="senha-usuario" onChange={e => setUsuario({...usuario, senhausuario: e.target.value})} className="form-control" type="datetime-local"/>
                </div> 
                <button id="atualizar-submit" className="btn btn-primary" type="submit">Atualizar</button>
                <Link to="/" id="voltar-link" className="btn btn-light" href="/cadastrar">Voltar</Link>
                { mensagem.status && mensagens() }
           </form>  
        </div>
    )
}