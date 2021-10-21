import {useState} from "react"
import {Link} from "react-router-dom";

import UsuariosDataServices from "../servicos/usuario.service";

import './index.css';

export default function Cadastrar(){

    const [usuario, setUsuario] = useState({
        nomeusuario: '',
        loginusuario: '',
        senhausuario:'',
        ativo: false,             
    })

    const [repita, setRepita] = useState('');

    const [mensagem, setMensagem] = useState({
        status: false,
    });

    const mensagens = () => {
        if(mensagem.sucesso){
            return <div className="alert alert-success" role="alert">{mensagem.texto}</div>
        }else{
            return <div className="alert alert-danger" role="alert">{mensagem.texto}</div>
        }
    }


    const salvar = (e) => {
        e.preventDefault();

        if(usuario.senhausuario !== repita){
            setMensagem({status: true, texto: 'Senhas não conferem', sucesso: false}); 
            return;
        }

        UsuariosDataServices.cadastrarUsuario(usuario).then(response => {
            setMensagem({status: true, texto: "Salvo com sucesso", sucesso: true})
        })
        .catch(error  => {
            console.log(error.response)
            setMensagem({status: true, texto: error.response.data.message, sucesso: false})
        });   
    }

    return (
       <div className="section-cadastro">
           <h2>Cadastro de Tarefa</h2>
           <form className="cadastro-usuarios" onSubmit={salvar}>
                mote          

                <button id="cadastro-submit" className="btn btn-primary" type="submit">Cadastrar</button>
                <Link to="/" id="voltar-link" className="btn btn-light" href="/cadastrar">Voltar</Link>
                { mensagem.status && mensagens() }
           </form>  
        </div>
    )
}