import React, {Component} from 'react';
import axios from 'axios';
import cityList from '../../www/city.list.json';
import Detail from './Detail';
import Favorite from './Favorite';
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
            fav: []
        };
      }

      componentDidMount() {
          if(localStorage.getItem("city")!==null){
            var citiesInString = localStorage.getItem("city");
            var citiesInArray = citiesInString.split(" ");
            var filteredArray = [];
            for(var i = 0; i<citiesInArray.length;i++){
                if(citiesInArray[i] !== " " && citiesInArray[i] !== ""){
                    filteredArray.push(citiesInArray[i]);
                }
            }
            citiesInArray = filteredArray ;


            var obj = [];
            if(citiesInArray.length>0){
                for(var i = 0; i<citiesInArray.length; i++){
                    var url = "http://api.openweathermap.org/data/2.5/forecast?id="+citiesInArray[i]+"&APPID="+apiKey+"&units=metric";
                    axios.get(url)
                    .then(function(res){
                        // document.getElementById(citiesInArray[i]).innerHTML = res.data["city"]["name"] + ", " + res.data["list"][0]["main"]["temp"];
                        obj.push(res.data["city"]["name"], res.data["list"][0]["main"]["temp"])                                  
                    })
                    .catch(err=>{
                        console.log(err)
                    })                
                }
                this.setState({fav: obj});
                console.log("obj ", obj)
                console.log("fav state ", JSON.stringify(this.state.fav))
              }
          }
      }

    onChange (e) {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    };

    getData (){
            var isThere = false;
            var filtered = "none";
    
            for(var i = 0; i<cityList.length; i++){
                if(cityList[i]["name"].toUpperCase()===this.state.city.toUpperCase()){
                    this.setState({id: cityList[i]["id"]});
                    filtered = cityList[i]["id"];
                    isThere = true;
                    break;
                }
            }
            
            if(isThere && filtered !== "none"){
                var url = "http://api.openweathermap.org/data/2.5/forecast?id="+filtered+"&APPID="+apiKey+"&units=metric";
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
                    {this.state.fav.length > 0 ? this.state.fav.map(list => (
                        <div>
                            <div className="row justify-content-center">
                                <div className="col-3">
                                <Link to={{pathname:'/detail', state:{id: list}}}><div title="Click Here to check detail" id={list}>{list}</div></Link>
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
