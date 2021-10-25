from flask import Flask, abort, jsonify, request
from flask_cors import CORS
from datetime import datetime, tzinfo

from flask_sqlalchemy import SQLAlchemy

application = Flask(__name__)
CORS(application)
application.config['SQLALCHEMY_DATABASE_URI'] = "mysql+mysqlconnector://root:senha1994@localhost/teste"
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
            

        if data.get('feito') is None:
            resposta = {'mensagem': 'Campo feito precisa ser preenchido'}
            return jsonify(resposta), 400
        
        if data.get('data_termino') is None:
            resposta = {'mensagem': 'Campo data_termino precisa ser preenchido'}
            return jsonify(resposta), 400

        if agora < datetime.fromisoformat(data['data_termino']):
            novo_todo = Todo(titulo=data["titulo"], descricao=data["descricao"], data_termino=data["data_termino"], data_inicio=agora.isoformat(), feito=False)
            try:
                db.session.add(novo_todo)
                db.session.commit()
                return jsonify({'mensagem': 'Salvo com sucesso'}), 200
            except:
                abort(403)

        resposta = {'mensagem': 'Tempo de termino precisa ser maior que hoje'}
        return jsonify(resposta), 400

    elif request.method == 'PUT':

        data = request.json

        agora = datetime.today()

        if data.get('titulo') is None:
            resposta = {'mensagem': 'Campo titulo precisa ser preenchido'}
            return jsonify(resposta), 400    


        if data.get('descricao') is None:
            resposta = {'mensagem': 'Campo descricao precisa ser preenchido'}
            return jsonify(resposta), 400
            

        if data.get('feito') is None:
            resposta = {'mensagem': 'Campo feito precisa ser preenchido'}
            return jsonify(resposta), 400

        
        if data.get('data_termino') is None:
            resposta = {'mensagem': 'Campo data_termino precisa ser preenchido'}
            return jsonify(resposta), 400
            
        
        if agora < datetime.fromisoformat(data["data_termino"].replace('Z','')):
       
            id = request.args['id']      
            todo = Todo.query.filter_by(id=id).first_or_404()       
        
            todo.titulo = data["titulo"]
            todo.descricao = data["descricao"]
            todo.feito = data["feito"]
            
            db.session.commit()
            return jsonify({'mensagem': 'Atualizado com sucesso'}), 200

        resposta = {'mensagem': 'Tempo de termino precisa ser maior que hoje'}
        return jsonify(resposta), 400    

    elif request.method == 'DELETE':
        id = request.args['id']
        
        todo = Todo.query.filter_by(id=id).first_or_404()
        
        db.session.delete(todo)
        db.session.commit()

        return 'Excluído com sucesso!'
   
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

if __name__ == '__main__':
    db.create_all()
    application.run(debug=True, host='0.0.0.0')