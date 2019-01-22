import React, {Component} from 'react';
import Detail from './components/Detail';
import axios from 'axios';
import cityList from '../www/city.list.json';
const apiKey = "8aa27dc6b9e28772922e2b6bb363e3d2";


class App extends Component{

    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            city: '',
            id: ''
        };
      }


    onChange (e) {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    };

    getData (){
            var isThere = false;
    
            for(var i = 0; i<cityList.length; i++){
                if(cityList[i]["name"].toUpperCase()===this.state.city.toUpperCase()){
                    isThere = true;
                    this.setState({id: cityList[i]["id"]});
                    break;
                }
            }

            if(isThere){
                var url = "http://api.openweathermap.org/data/2.5/forecast?id="+this.state.id+"&APPID="+apiKey+"&units=metric";
                axios.get(url)
                .then(function(res){
                    console.log(res.data);
                    document.getElementById("result").innerHTML = res.data["city"]["name"] + ", " + res.data["list"][0]["main"]["temp"];
                })
                .catch(err=>{
                    console.log(err)
                })
            }
            else{
                document.getElementById("result").innerHTML = "There is no city with that name" + this.state.city;
            }
    }
    render(){
        return(
            <div>
                <h1>Weather App</h1>
                <input name="city" id="city" onChange={this.onChange}></input>
                <button onClick={this.getData}>Search</button>                
                <div id="result">Here comes the result</div>
                <Detail id={this.state.id}/>
            </div>
        )
    }
}

export default App
