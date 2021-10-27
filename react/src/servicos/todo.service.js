import http from '../http';

class TodoDataServices{
    //Método usado para fazer uma requisição atraves do axios para pegar todos os todos
    pegarTodos(){
        return http.get("/")
    }

    //Método usado para salvar um todo no banco
    cadastrarTodo(data){
        return http.post("/", data)
    }

    //Método usado para atualizar um todo no banco
    atualizarTodo(id, data){
        return http.put(`/?id=${id}`, data)
    }

    //Método utilizado para pegar um todo atraves do id
    getTodo(id){
        return http.get(`/?id=${id}`)
    }
    
    //Método utilizado para deletar um todo do banco
    deletarTodo(id){
        return http.delete(`/?id=${id}`)
    }

    //Método utilizado para mudar o status para concluído de um todo
    concluirTodo(id){
        return http.get(`/concluir?id=${id}`)
    }

}

export default new TodoDataServices();