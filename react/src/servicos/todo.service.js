import http from '../http';

class TodoDataServices{
    pegarTodos(){
        return http.get("/")
    }

    cadastrarTodo(data){
        return http.post("/", data)
    }

    atualizarTodo(id, data){
        return http.put(`/?id=${id}`, data)
    }

    getTodo(id){
        return http.get(`/?id=${id}`)
    }
    
    deletarTodo(id){
        return http.delete(`/?id=${id}`)
    }

    concluirTodo(id){
        return http.get(`/concluir?id=${id}`)
    }

}

export default new TodoDataServices();