 <p align="center">
    <img src="https://i.imgur.com/rSyq3MW.png" alt="Documentção"></a>
</p>

<h3 align="center">Gerenciador de Todos</h3>

<h4 align="center">O projeto tem como o objetivo fazer o gerenciamento de todos, cadastrar um todo, o descrver um todo e ect.</h4>

## Tecnologias usadas no projeto

- [Python 3.8]
    - [Flask 2.0.2]
    - [SQLAlchememy 2.5.1]
- [Node.js 14.18.1]
- [React.js 17.0.2]
- [Mysql 8.0.27]
- [Docker]

## Métodos para intalação

O projeto e divido em duas camadas: Frontend e Backend. Ambas passam por processos distintos de instalação.
Para evitar a possível incompatibilidade entre os diversos tipos de tecnologias usadas no projeto, foi criado 2 formas para a instalação do projeto.
Nesta branch será descrito o método para a instalação sem usar o docker. Para seguir o 1º método, é preciso clonar a branch "masterr". 

## Atenção

Para executar o projeto corretamente, e preciso instalar o node.js, mysql, docker e python.
Criar uma virtual env para executar os comandos do python no método 2.
Para a melhor reproduzação do projeto, abrir o frontend no google chrome.

## Instalação

** O segundo método precisa que todas as tecnologias mencionadas acima estejam instaladas no computador

- Após clonar o repositório, abrir a pasta raiz do projeto, executar o seguinte comando no Prompt, para entrar na pasta do frontend:

```bash
cd react
``` 

- Com o node instalado, executar o seguinte comando na pasta "react": 

```bash
npm install --silent
``` 

- Depois que as dependências forem instaladas, executar o seguinte comando, para executar o frontend.:

```bash
npm start
``` 

Após isso o frontend já estará sendo executado, agora é preciso instalar o backend.

- Abrir um prompt na raiz do projeto e executar o comando "cd backend" para entrar na pasta do backend.

- Com o python instalado, executar o seguinte comando, para instalar as dependências do python: 

```bash
pip install -r requirements.txt
``` 

- Abrir o arquivo app.py localizado em "backend", ir na linha 9 e substituir os campos:

```python
##<usuario_do_banco> = Usuario para acessar o banco
##<senha_do_usuario> = Senha do usuario para acessar o banco
"mysql+mysqlconnector://<usuario_do_banco>:<senha_do_usuario>@localhost/teste"
```

- Abrir o arquivo localizado na pasta "backend/scripts" chamado "init.sql" e executar o script no SGBD (Sistema Gerenciadador do Banco de Dados)

- Após isso executar o seguinte comando, na pasta "backend", para executar o backend:

```bash
python app.py
``` 

- Após esse processo, abrir o google chrome no endereço "localhost:3000" ou no endereço indicado no prompt de comando do frontend.

## O Sistema

O sistema consta com 3 telas: listagem de todos, cadastro de todos e descrição de um todo.
A tela de cadastro possui os campos: título, descrição e a data de conclusão do todo.
Para ver a descrição de um todo, basta clica no link que fica na descrição do todo.
Todos os campos são obrigatórios.
Na tela de listagem de todo, é possível buscar todos pelo nome ou descrição, editar um todo, concluir um todo e excluir um todo.
Para buscar um todo pelo nome ou descrição, é só digitar o nome na busca.
Para concluir um todo, é só clicar no botão concluir no todo específico.
Para excluir um todo, é só clicar no botão excluir no todo específico. Uma tela de confirmação irá aparacer para confirmar se deseja excluir o todo.
Na tela de projetos é possível listar, buscar por nome ou por id, excluir projetos, editar projetos, e simular o investimento no projeto.

## Testes

O sistema possui testes, tanto na parte do backend quanto na parte do front end.
- Para realizar testes no backend, é preciso entrar na pasta "backend" localizada na raiz do projeto.
- Após isso, executar o comando:
```bash
pytest --html=report.html --json-report
``` 
- Após isso os testes serão executados, e quando finalizados, irão gerar um relatório html que ficará na pasta "backend", junto com um relatório json.
Para realizar os testes no frontend, é preciso entrar na pasta "react" e executar o comando:
```bash
npm test
``` 
Após isso, os testes no frontend serão executados.

## Documentação

O sistema também possui uma documentação do backend feita com o Swagger.
É possivel acessar essa documentação entrando no endereço "http://localhost:5000/swagger/"

Nesse endereço é possível:
- Ver as APIs e seus endpoints.
- Fazer chamadas de verbos HTTP para testar as endpoints disponíveis.
- Ver uma breve descrição de como as endpoints funcionam e suas possíveis respostas.
- Ver o modelo do objeto json que é usado tanto como resposta quanto como requisição.


## Agredecimentos
Gostaria de agradecer a Eldorado pela oportunidade e qualquer dúvida sobre a execução do projeto ou instalação, estou a disposição para tentar resolver os problemas, sendo pelo email, telefone ou qualquer outro método de comunicação já fornecido anteriormente.
