import { BrowserRouter as BrowserRouter, Switch, Route} from "react-router-dom";

import Cadastro from './cadastrar/Cadastrar';
import Listar from './listar/Listar';
import Editar from './editar/Editar'

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>TODO</h1>        
          <Switch>
            <Route path="/cadastrar">
              <Cadastro/> 
            </Route>
            <Route exact path="/">
              <Listar/>
            </Route>
            <Route path="/editar/:id">
              <Editar/>
            </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
