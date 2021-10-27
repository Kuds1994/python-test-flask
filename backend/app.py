from os import read
from flask import Flask, abort, app, jsonify, request, Blueprint
from flask_cors import CORS
from flask_restx import Resource, Api, fields
from datetime import datetime


from flask_sqlalchemy import SQLAlchemy

application = Flask(__name__)
CORS(application)
application.config['SQLALCHEMY_DATABASE_URI'] = "mysql+mysqlconnector://user:pass@db/teste"
db = SQLAlchemy(application)

class Todo(db.Model):
    __tablename__ = 'todo'
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(30), nullable=False)
    descricao = db.Column(db.String(100), nullable=False)
    data_inicio = db.Column(db.DateTime(), nullable=False)
    feito = db.Column(db.Boolean(), nullable=False)
    data_termino = db.Column(db.DateTime(), nullable=False)

    def __rep__(self):
        return 'Codigo ' % self.id

    def to_json(self):
        todo = {'id': self.id, 'titulo': self.titulo, 'descricao': self.descricao, 'data_inicio': self.data_inicio.isoformat() + 'Z', 'feito': bool(self.feito), 'data_termino': self.data_termino.isoformat() + 'Z'}
        return todo



@application.route('/', methods=['GET', 'POST', 'PUT', 'DELETE'])
def todos():
    if request.method == 'POST':
        data = request.json

        agora = datetime.today()

        if data.get('titulo') is None:
            resposta = {'mensagem': 'Campo titulo precisa ser preenchido'}
            return jsonify(resposta), 400    

        if data.get('descricao') is None:
            resposta = {'mensagem': 'Campo descricao precisa ser preenchido'}
            return jsonify(resposta), 400
        
        if data.get('data_termino') is None:
            resposta = {'mensagem': 'Campo data_termino precisa ser preenchido'}
            return jsonify(resposta), 400
        

        if agora < datetime.fromisoformat(data["data_termino"].replace('Z','')):
            novo_todo = Todo(titulo=data["titulo"], descricao=data["descricao"], data_termino=data["data_termino"].replace('Z',''), data_inicio=agora.isoformat(), feito=False)
            try:

                db.session.add(novo_todo)
                db.session.commit()

                return jsonify({'mensagem': 'Salvo com sucesso'}), 200
            except:
                return jsonify({'mensagem': 'Erro ao salvar todo'}), 403
        else:
            return jsonify({'mensagem': 'O tempo de termino precisa ser maior que hoje'}), 403

    elif request.method == 'PUT':

        data = request.json

        agora = datetime.today()

        if data.get('titulo') is None:
            resposta = {'mensagem': 'Campo titulo precisa ser preenchido'}
            return jsonify(resposta), 400    


        if data.get('descricao') is None:
            resposta = {'mensagem': 'Campo descricao precisa ser preenchido'}
            return jsonify(resposta), 400
            

        if data.get('data_termino') is None:
            resposta = {'mensagem': 'Campo data_termino precisa ser preenchido'}
            return jsonify(resposta), 400
            
        print(data["data_termino"].replace('Z', ''))
        
        if agora < datetime.fromisoformat(data["data_termino"].replace('Z', '')):
                id = request.args['id']      
                todo = Todo.query.filter_by(id=id).first_or_404()       
            
                todo.titulo = data["titulo"]
                todo.descricao = data["descricao"]
                todo.data_termino = data["data_termino"].replace('Z','')
                
                db.session.commit()
                return jsonify({'mensagem': 'Atualizado com sucesso'}), 200

        resposta = {'mensagem': 'Tempo de termino precisa ser maior que hoje'}
        return jsonify(resposta), 400    

    elif request.method == 'DELETE':
        id = request.args['id']
        
        todo = Todo.query.filter_by(id=id).first_or_404()
        
        db.session.delete(todo)
        db.session.commit()

        resposta = {'mensagem': 'Excluido com sucesso'}
        return jsonify(resposta), 200
   
    else:
        if request.args.get('id') is not None:

            id = request.args['id']

            todo = Todo.query.filter_by(id=id).first_or_404()

            return todo.to_json()

        todos = Todo.query.all()
        return jsonify([todo.to_json() for todo in todos])   


@application.route('/concluir', methods=['GET'])
def concluir():
    id = request.args['id']
        
    todo = Todo.query.filter_by(id=id).first_or_404()
    
    todo.feito = True

    db.session.commit()

    resposta = {'mensagem': 'Todo concluido'}
    return jsonify(resposta), 200


api = Api(app=application, doc='/swagger/' , version='1.0', title='API para gerenciamento de todos')

ns = api.namespace('', description='Gerenciamento de todos')

todo = api.model('Todo', {
    'data_inicio': fields.DateTime(readonly=True, description='Inicio do periodo do todo'),
    'data_termino': fields.DateTime(readonly=False, description='Termino do periodo do todo'),
    'descricao': fields.String(readonly=False, description='Descrição do todo'),
    'feito': fields.Boolean(readonly=True, description='Verifica se o todo foi concluido'),
    'titulo': fields.String(readonly=False, description='Titulo do todo'),
    'id': fields.Integer(readonly=True, description='Id do todo')
})

@ns.route("/")
class TodoDAO(Resource):
    '''Endpoint para listar todos os todos ou cadastrar um novo todo'''

    @ns.marshal_list_with(todo)
    def get(self):
        '''Mostra todos os todos cadastrados'''
    
    @ns.marshal_with(todo)
    @ns.response(400, '''A data de termino e menor que o dia atual ou os campos "data_inicio" ou "feito" não foram preenchidos''')
    @ns.expect(todo)
    def post(self):
        '''Cadastra um novo todo'''

@ns.param('id', 'Id do todo')
@ns.response(404, 'Todo não encontrado')
@ns.route("/?id=<int:id>")
class TodoDAOWithParams(Resource):
    '''Endpoint para buscar um todo, atualizar um todo ou deletar todo'''

    @ns.marshal_with(todo)
    @ns.expect(todo)
    def put(self):
        '''Atualiza um todo'''
      
    @ns.marshal_with(todo)
    def get(self):
        '''Busca um todo'''

    @ns.response(200, 'Todo deletado')
    def delete(self):
        '''Deleta um todo'''


if __name__ == '__main__':
    application.run(debug=True, host='0.0.0.0')