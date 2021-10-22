from flask import Flask, abort, jsonify, request
import datetime

from flask.sessions import NullSession
from flask_sqlalchemy import SQLAlchemy


application = Flask(__name__)
application.config['SQLALCHEMY_DATABASE_URI'] = "mysql+mysqlconnector://root:root@db/teste"
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
        todo = {'id': self.id, 'titulo': self.titulo, 'descricao': self.descricao, 'data_inicio': self.data_inicio, 'feito': bool(self.feito), 'data_termino': self.data_termino}
        return todo



@application.route('/', methods=['GET', 'POST', 'PUT', 'DELETE'])
def todos():
    if request.method == 'POST':
        data = request.json
        ts = datetime.datetime.now()
        novo_todo = Todo(titulo=data["titulo"], descricao=data["descricao"], data_inicio=ts, feito=False, data_termino=ts)
        try:
            db.session.add(novo_todo)
            db.session.commit()
            return 'Salvo com sucesso!'
        except:
            abort(403)

    elif request.method == 'PUT':

        id = request.args['id']
        
        todo = Todo.query.filter_by(id=id).first_or_404()

        data = request.json
     
        if data.get('titulo') is not None:
            todo.titulo = data["titulo"]

        if data.get('descricao') is not None:
            todo.descricao = data["descricao"]

        if data.get('feito') is not None:
            todo.feito = data["feito"]
        
        db.session.commit()
        return 'Atualizado com sucesso'

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

    return 'Tarefa concluída com sucesso!'

if __name__ == '__main__':
    db.create_all()
    application.run(debug=True, host='0.0.0.0')