import React, {Component} from 'react';
import axios from 'axios';
import cityList from '../../www/city.list.json';
import Detail from './Detail';
import Favorite from './Favorite';
import { Route, Switch, Link } from 'react-router-dom';
const apiKey = "e7c2d7e0bc57d08250f0b63cde630511";

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

      bookmarkCheck() {
          document.getElementById("resultLink").style.display = "none";
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
            var multiCity = "";
            for(var j = 0; j<citiesInArray.length; j++){
                multiCity += citiesInArray[j] + ","
            }
            multiCity = multiCity.substring(0, multiCity.length-1);

            if(citiesInArray.length>0){
                    var url = "http://api.openweathermap.org/data/2.5/group?id="+multiCity+"&APPID="+apiKey+"&units=metric";
                    axios.get(url)
                    .then( res => {
                        const fav = res.data.list;
                        // {
                        //     "city": res.data["city"]["name"], 
                        //     "temp": res.data["list"][0]["main"]["temp"], 
                        //     "id": res.data["city"]["id"]
                        // }
                        this.setState({ fav });
                        console.log(res.data);
                    })
                    .catch(err=>{
                        console.log(err)
                    })
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
                    document.getElementById("resultLink").style.display = "block";
                })
                .catch(err=>{
                    console.log(err)
                })
            }
            else{
                document.getElementById("result").innerHTML = "There is no city with that name" + this.state.city;
            }
    }

    componentDidMount(){
        // setTimeout(() => {
            this.bookmarkCheck();
        // }, 1000)
    }

    render(){

        return(
            <div>
                <input name="city" id="city" onChange={this.onChange}></input>
                <button onClick={this.getData}>Search</button>                
                
                <Switch>
                    <Route path="/detail" exact component={Detail}/>
                </Switch>
                <div id="result"></div>
                <div title="Click Here to check detail" id="resultLink">
                    <Link to={{pathname:'/detail', state:{id: this.state.id}}}>More</Link>
                </div>


                <br/>
                <div>
                    {this.state.fav.length > 0 ? this.state.fav.map(list => (
                        <div>
                            <div className="row justify-content-center">
                                <div className="col-3">
                                <Link to={{pathname:'/detail', state:{id: list.id}}}><div title="Click Here to check detail" id={list.id}>more</div></Link>
                                <div>City: {list.name}</div>
                                <div>Temperatue: {list.main.temp}</div>
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
