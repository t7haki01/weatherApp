import _ from 'lodash';
import React from "react";
import ReactDOM from "react-dom";
import App from './App';
import { BrowserRouter, Route } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.css';

function component(){
    let element = document.createElement('div');

    //Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join([' ', ' '], ' ');

    return element;
}

document.body.appendChild(component());

//This is from word doc explanation about how to use react
//Technically same as way below just added one more component
// const Index = () => {
//     return <div>Hello React!</div>;
// };

// ReactDOM.render(<Index />, document.getElementById("react-target"));


const reactTarget = document.getElementById('react-target');

ReactDOM.render((
    <BrowserRouter>
         <Route path="/" component={App}/>
    </BrowserRouter>
    ), reactTarget);

console.log("webpack bundle works");