import React, {Component} from 'react';
import axios from 'axios';
import cityList from '../../www/city.list.json';
import Detail from '../components/Detail';
import { Route, Switch, Link } from 'react-router-dom';
const apiKey = "8aa27dc6b9e28772922e2b6bb363e3d2";


class Main extends Component{

    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            city: '',
            id: '',
            fav: {city:'', temp:''}
        };
      }

      componentDidMount() {
          if(localStorage.getItem("city")!==null){
            var citiesInString = localStorage.getItem("city");
            var citiesInArray = citiesInString.split(" ");
            for(var i = 0; i<citiesInArray.length;i++){
                if(citiesInArray[i]===" " || citiesInArray[i]===""){
                    citiesInArray.splice(i,1);
                }
            }

            if(citiesInArray.length>0){
                for(var i = 0; i<this.state.fav.length; i++){
                    var url = "http://api.openweathermap.org/data/2.5/forecast?id="+this.state.fav[i]+"&APPID="+apiKey+"&units=metric";
                    axios.get(url)
                    .then(function(res){
                        document.getElementById(this.state.fav[i]).innerHTML = res.data["city"]["name"] + ", " + res.data["list"][0]["main"]["temp"];
                    })
                    .catch(err=>{
                        console.log(err)
                    })                
                }
              }
              this.setState({fav: citiesInArray});
          }
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
                <input name="city" id="city" onChange={this.onChange}></input>
                <button onClick={this.getData}>Search</button>                
                
                <Switch>
                    <Route path="/detail" exact component={Detail}/>
                </Switch>
                <Link to={{pathname:'/detail', state:{id: this.state.id}}}><div title="Click Here to check detail" id="result">Here comes the result</div></Link>

                <br/>
                <div>
                    {this.state.fav.length > 0 ? this.state.fav.map(city => (
                        <div>
                            <div className="row justify-content-center">
                                <div className="col-3">
                                <Link to={{pathname:'/detail', state:{id: city}}}><div title="Click Here to check detail" id={city}>{city}</div></Link>
                                </div>
                            </div>
                        </div>
                    )):<div></div>}
                </div>
            </div>
            
        )
    }
}

export default Main
