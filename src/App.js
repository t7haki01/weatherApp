import React, {Component} from 'react';
import Detail from './components/Detail';
import Main from './components/Main';
import axios from 'axios';
import cityList from '../www/city.list.json';
import { Route, Switch, NavLink, Redirect } from 'react-router-dom';
const apiKey = "8aa27dc6b9e28772922e2b6bb363e3d2";


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
