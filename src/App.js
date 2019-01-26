import React, {Component} from 'react';
import Detail from './components/Detail';
import Main from './components/Main';
import { Route, Switch, Redirect } from 'react-router-dom';


class App extends Component{


    render(){
        return(
            <div>
                <h1>Weather App</h1>
                <Switch>
                    <Route path="/detail" exact component={Detail}/>
                    <Route path="/" exact component={Main}/>
                    <Redirect to="/"/>
                </Switch>

            </div>
        )
    }
}

export default App
