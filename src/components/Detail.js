import React, {Component} from 'react'
import axios from 'axios';
import { Route, Switch, Link } from 'react-router-dom';
import Main from '../components/Main';

const apiKey = "8aa27dc6b9e28772922e2b6bb363e3d2";


class Detail extends Component{
    constructor(props) {
        this.favoriteCity = this.favoriteCity.bind(this);
        super(props);
    }

    favoriteCity(){
    }


    

    componentDidMount (){
            console.log(this.props.location)

            var city = this.props.location.state.id;
            const url = "http://api.openweathermap.org/data/2.5/forecast?id="+city+"&APPID="+apiKey+"&units=metric";
            axios.get(url)
            .then(function(res){
                //For some reason using state were unable keep getting can not read undefined property error
                //For the focusing on the returning it as possible as i can now deplying like this 
                //but personally do not like and i think it is not so good way
                // this.setState({ info : res.data });
                console.log(res.data["list"][0]["main"]["temp"]);

                document.getElementById("pressure").innerHTML += res.data.list[0].main.pressure
                document.getElementById("temp").innerHTML += res.data.list[0].main.temp
                document.getElementById("max_temp").innerHTML += res.data.list[0].main.temp_max
                document.getElementById("min_temp").innerHTML += res.data.list[0].main.temp_min
                document.getElementById("humidity").innerHTML += res.data.list[0].main.humidity
                document.getElementById("city").innerHTML += res.data.city.name

                // this.setState({name: res.data["city"]["name"]})
                // document.getElementById("detail").innerHTML = JSON.stringify(res.data)
            })
            .catch(err=>{
                console.log(err)
            })
    }

    render(){
        return(
            <div>
                <Switch>
                    <Route path="/" exact component={Main}/>
                </Switch>
                <Link to={{pathname:'/', state:{id: ""}}}>Back to main</Link>
                <div id="detail">Here are the details</div>
                <div id="city">City: </div>
                        <div className="row justify-content-center">
                            <div id="pressure" className="col-3">
                            Pressure:
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div id="temp" className="col">
                            Temprature:
                            </div>
                        </div>

                        <div className="row justify-content-center">
                            <div id="max_temp" className="col">
                            Max Temprature
                            </div>
                        </div>

                        <div className="row justify-content-center">
                            <div className="col" id="min_temp">
                            Min Temprature:
                            </div>
                        </div>

                        <div className="row justify-content-center">
                            <div className="col" id="humidity">
                            Humidity:
                            </div>
                        </div>
                    <input type="checkbox" onChange={this.favoriteCity}>Click Here to check as favorite</input>
            </div>
        )
    }
}

export default Detail