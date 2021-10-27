from flask.json import jsonify
import requests

#Verificar se o todo foi salvo no banco
def test_salvar_todo():
    headers = {
        'Accept': '*/*',
        'User-Agent': 'request',
        'Content-Type': 'application/json'
    }

    url = "http://localhost:5000/"

    todo = {
        "titulo": "todo 1",
        "descricao": "asdasd",
        "data_termino": "2021-10-27T07:29:56",
        "feito": True
    }

    resposta = requests.post(url, headers=headers, json=todo)
    resposta_dict = resposta.json()

    if resposta.status_code == 200:
        assert  resposta_dict['mensagem'] == 'Salvo com sucesso'
    else:
        assert False


##Teste para saber se a requisição retorna o status 200 e se possui algum dado no banco
def test_pegar_todos():
    headers = {
        'Accept': '*/*',
        'User-Agent': 'request',
    }

    url = "http://localhost:5000/"

    resposta = requests.get(url, headers=headers)

    resposta_dict = resposta.json()

    tamanho_lista = len(resposta_dict)

    assert resposta.status_code == 200 and tamanho_lista != None

##Teste para saber se a requisição retorna o status 200 e se possui algum dado no banco
def test_buscar_algum_todo():
    headers = {
        'Accept': '*/*',
        'User-Agent': 'request',
    }

    url = f"http://localhost:5000?id={1}"

    resposta = requests.get(url, headers=headers)

    resposta_dict = resposta.json()

    tamanho_lista = len(resposta_dict)

    assert resposta.status_code == 200 and tamanho_lista != None


#Verificar se o todo foi atualizado no banco
def test_atualizar_todo():
    headers = {
        'Accept': '*/*',
        'User-Agent': 'request',
        'Content-Type': 'application/json'
    }

    url = f"http://localhost:5000/?id={1}"

    todo = {
        "id": 1,
        "titulo": "todo 2",
        "descricao": "asdasdasdasd",
        "data_termino": "2021-10-30T08:29:56",
        "feito": False
    }

    resposta = requests.put(url, headers=headers, json=todo)
    resposta_dict = resposta.json()

    if resposta.status_code == 200:
        assert  resposta_dict["mensagem"] == 'Atualizado com sucesso'
    else:
        assert False

def test_concluir_todo():
    headers = {
        'Accept': '*/*',
        'User-Agent': 'request',
    }

    url = f"http://localhost:5000/concluir?id={1}"

    resposta = requests.get(url, headers=headers)

    assert resposta.status_code == 200

#Verificar se o todo foi deletado
def test_deletar_todo():
    headers = {
        'Accept': '*/*',
        'User-Agent': 'request',
    }

    url = f"http://localhost:5000/?id={1}"

    resposta = requests.delete(url, headers=headers)

    assert resposta.status_code == 200



