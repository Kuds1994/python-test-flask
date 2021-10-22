import http from '../http';

class UsuariosDataServices{
    pegarTodos(){
        return http.get("/usuario")
    }

    cadastrarUsuario(data){
        return http.post("/usuario", data)
    }

    atualizar(id, data){
        return http.put(`/usuario/${id}`, data)
    }

    pegarUsuario(id){
        return http.get(`/usuario/${id}`)
    }
    
    deletar(id){
        return http.delete(`/usuario/${id}`)
    }

}

export default new UsuariosDataServices();