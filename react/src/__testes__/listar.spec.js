import { BrowserRouter as BrowserRouter} from "react-router-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Listar from '../listar/Listar';
import Cadastrar from '../cadastrar/Cadastrar';


describe("Testando a lista de todos", () => {
    it("Caso não tenha nada na tela, aparecer uma mensagem", () => {
        
        render(<BrowserRouter><Listar/></BrowserRouter>)
        const h3Element = screen.getByText('Nenhuma tarefa cadastrada.')
        
        expect(h3Element).toBeInTheDocument()
    })
})


describe("Salvar um todo", () => {
    it("Salva um todo", async () => {
        
        render(<BrowserRouter><Cadastrar/></BrowserRouter>)
        
        const titulo = screen.getByTestId("cadastro-titulo");
        const descricao = screen.getByTestId("cadastro-descricao");
        const datatermino = screen.getByTestId("cadastro-datatermino");
        const formcadastro = screen.getByTestId("form-cadastro");

        userEvent.type(titulo, "todo 2")
        userEvent.type(descricao, "aasdasd")
        userEvent.type(datatermino, "2021-10-27T00:50:24Z")

        fireEvent.submit(formcadastro)

        const mensagem = screen.getByTestId("mensagem")

        await waitFor(() => expect(mensagem).toBeInTheDocument())
    })
})
