import React, {Component} from 'react'
import axios from 'axios';
import { Route, Switch, Link } from 'react-router-dom';
import Main from '../components/Main';

const apiKey = "e7c2d7e0bc57d08250f0b63cde630511";



class Detail extends Component{
    constructor(props) {
        super(props);
        this.checkBox = this.checkBox.bind(this)
        this.state = {
            isBookmarked: false
        }
    }

    componentWillMount(){
        console.log("Here component will mount! from detail lets check state ", this.state)
    }

    bookmarkBtn(){

            if(localStorage.getItem("city")!==null){
                var cities = localStorage.getItem("city").split(" ");
                var filter = cities.filter(city => city.length !== 0);
                cities = filter;
                var isThere = false;

                for(var i = 0; i<cities.length; i++){
                    if(parseInt(cities[i]) === this.props.location.state.id){
                        this.setState({isBookmarked:true});
                        document.getElementById("btnDiv").innerHTML = "Remove Bookmark"
                        isThere = true;
                        break;
                    }
                }
                if(!isThere)
                {
                    this.setState({isBookmarked:false});
                    document.getElementById("btnDiv").innerHTML = "Add Bookmark"
                }
            }
            else{
                this.setState({isBookmarked:false});
                document.getElementById("btnDiv").innerHTML = "Add Bookmark"        
            }
    }

   checkBox(){
       if(!this.state.isBookmarked){
            if(localStorage.getItem("city")!==null){
                var cities = localStorage.getItem("city").split(" ");
                var filter = cities.filter(city => city.length !== 0);
                cities = filter;

                var cityInString = "";
                for(var i = 0; i<cities.length; i++){
                    var fav = cities[i] + " ";
                    cityInString += fav;
                }
                cityInString = cityInString + " " + this.props.location.state.id;
                localStorage.setItem("city", cityInString);
            }
            else{
                var fav = this.props.location.state.id + " ";
                localStorage.setItem("city", fav);
            }
            this.setState({isBookmarked:true});
            document.getElementById("btnDiv").innerHTML = "Remove Bookmark"
        }
        else{
            var cities = localStorage.getItem("city").split(" ");
            var filter = cities.filter(city => city.length !== 0);
                cities = filter;

            var cityInString = "";
            for(var i = 0; i<cities.length; i++){
                if(parseInt(cities[i])!==this.props.location.state.id){
                    var fav = cities[i] + " ";
                    cityInString += fav;                     
                }
            }
            localStorage.setItem("city", cityInString);
            this.setState({isBookmarked:false});
            document.getElementById("btnDiv").innerHTML = "Add Bookmark"
        }        
    }

    getWeatherDetail (){

            var city = this.props.location.state.id;
            const url = "http://api.openweathermap.org/data/2.5/forecast?id="+city+"&APPID="+apiKey+"&units=metric";
            axios.get(url)
            .then(function(res){
                //For some reason using state were unable keep getting can not read undefined property error
                //For the focusing on the returning it as possible as i can now deplying like this 
                //but personally do not like and i think it is not so good way
                // this.setState({ info : res.data });
                console.log(res.data);

                document.getElementById("pressure").innerHTML += res.data.list[0].main.pressure
                document.getElementById("temp").innerHTML += res.data.list[0].main.temp
                document.getElementById("max_temp").innerHTML += res.data.list[0].main.temp_max
                document.getElementById("min_temp").innerHTML += res.data.list[0].main.temp_min
                document.getElementById("humidity").innerHTML += res.data.list[0].main.humidity
                document.getElementById("city").innerHTML += res.data.city.name + ", " + res.data.city.country

                document.getElementById("time1").innerHTML = res.data.list[0]['dt_txt'] + " / " + res.data.list[0].main.temp
                document.getElementById("time2").innerHTML = res.data.list[4]['dt_txt'] + " / " + res.data.list[4].main.temp
                document.getElementById("time3").innerHTML = res.data.list[8]['dt_txt'] + " / " + res.data.list[8].main.temp
                document.getElementById("time4").innerHTML = res.data.list[12]['dt_txt'] + " / " + res.data.list[12].main.temp
                document.getElementById("time5").innerHTML = res.data.list[16]['dt_txt'] + " / " + res.data.list[16].main.temp


                // this.setState({name: res.data["city"]["name"]})
                // document.getElementById("detail").innerHTML = JSON.stringify(res.data)
            })
            .catch(err=>{
                console.log(err)
            })
    }

    componentDidMount(){
        console.log("Here component did mount! from detail lets check state ", this.state)
        this.getWeatherDetail()
        this.bookmarkBtn()
    }

    render(){
        return(
            <div>
                <Switch>
                    <Route path="/" exact component={Main}/>
                </Switch>
                <Link to={{pathname:'/', state:{id: ""}}}>Back to main</Link>

            <div className="bookMark">
                <button onClick={this.checkBox}><div id="btnDiv">Option</div></button>
            </div>
                
                <div id="detail"><h3>Here are the details</h3></div>
                <hr/>
                <div id="city"><b>Place</b>: </div>
                        <div className="row justify-content-center">
                            <div id="pressure" className="col-3">
                            <b>Pressure</b>:
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div id="temp" className="col">
                            <b>Temprature</b>:
                            </div>
                        </div>

                        <div className="row justify-content-center">
                            <div id="max_temp" className="col">
                            <b>Max Temprature</b>
                            </div>
                        </div>

                        <div className="row justify-content-center">
                            <div className="col" id="min_temp">
                            <b>Min Temprature</b>:
                            </div>
                        </div>

                        <div className="row justify-content-center">
                            <div className="col" id="humidity">
                            <b>Humidity</b>:
                            </div>
                        </div>
                        <div id="time1"></div>
                        <div id="time2"></div>
                        <div id="time3"></div>
                        <div id="time4"></div>
                        <div id="time5"></div>
            </div>
        )
    }
}

export default Detail