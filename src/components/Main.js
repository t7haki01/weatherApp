import React, {Component} from 'react';
import axios from 'axios';
import cityList from '../../www/city.list.json';
import Detail from './Detail';
import { Route, Switch, Link } from 'react-router-dom';
const apiKey = "e7c2d7e0bc57d08250f0b63cde630511";



import Autocomplete from 'react-autocomplete';

var cityData = [];
for(var i = 0; i<cityList.length; i++){
    cityData.push(cityList[i]["name"]);
}

var autoItem = []
// for(var i = 0; i<15; i++){
//     autoItem[i] = { 
//                     id: cityList[i]["name"],
//                     label: cityList[i]["name"]
//                   }
// }


class Main extends Component{

    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);
        this.onChange = this.onChange.bind(this);
        // this.test = this.test.bind(this);
        this.state = {
            city: '',
            id: '',
            fav: [],
            value: ''
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
                        this.setState({ fav });
                        console.log(res.data);
                    })
                    .catch(err=>{
                        console.log(err)
                    })
              }
          }
      }

    getData (){
            var isThere = false;
            var filtered = "none";
    
            for(var i = 0; i<cityList.length; i++){
                if(cityList[i]["name"].toUpperCase()===this.state.value.toUpperCase()){
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
                    document.getElementById("result").innerHTML = " ";                    
                    var btn = document.createElement('button');
                    btn.id = "btn";

                    var div1 = document.createElement('div');
                    div1.innerText = res.data["city"]["name"] + ", " + res.data["city"]["country"];

                    var div2 = document.createElement('div');
                    div2.innerText = "Temperature: " + res.data["list"][0]["main"]["temp"];

                    btn.appendChild(div1);
                    btn.appendChild(div2);

                    document.getElementById("result").appendChild(btn);

                    // document.getElementById("result").innerHTML = res.data["city"]["name"] + ", " + res.data["list"][0]["main"]["temp"];
                    document.getElementById("resultLink").style.display = "block";
                })
                .catch(err=>{
                    console.log(err)
                })
            }
            else{
                document.getElementById("result").innerHTML = "There is no city with that name " + this.state.value;
            }
    }

    componentDidMount(){
            this.bookmarkCheck();
    }

    onChange (e) {
        this.setState({ value: e.target.value })        
        console.log(this.state.value)
        autoItem.length = 0;
        console.log(autoItem);
        if(e.target.value.length > 1){
            var maxNum = 0;
            for(var i = 0; i < cityData.length; i++){
                if(cityData[i].slice(0, e.target.value.length).toUpperCase() === e.target.value.toUpperCase() && maxNum < 15){
                    autoItem[i] = {
                        id: cityData[i],
                        label: cityData[i]
                    }
                    maxNum ++;
                }
            }
        }

        //This is for the when used datalist tag but android web view is not supported so not available currently
        // var dataList = document.getElementById("listOfCity");
        // while(dataList.firstChild){
        //     dataList.removeChild(dataList.firstChild);
        // }
        // const state = this.state;
        // state[e.target.name] = e.target.value;

        // if(e.target.value.length > 0){
        //     var maxNum = 0;
        //     for(var i = 0; i < cityData.length; i++){
        //         if(cityData[i].slice(0, e.target.value.length).toUpperCase() === e.target.value.toUpperCase() && maxNum < 15){
        //             var option = document.createElement('option');
        //             option.value = cityData[i];
        //             option.text = cityData[i];
        //             dataList.appendChild(option);
        //             maxNum ++;
        //         }
        //     }
        // }
        // this.setState(state);
        // console.log(e.target.value);
    };


    render(){
        return(
            <div className="mainDiv">
                <div className="row justify-content-center">
                        <Autocomplete
                            items={autoItem}
                            shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                            getItemValue={item => item.label}
                            renderItem={(item, highlighted) =>
                                    <div
                                        name="options"
                                        key={item.id}
                                        style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
                                    >
                                    {item.label}
                                    </div>
                            }
                            value={this.state.value}
                            onChange={this.onChange}
                            onSelect={value => this.setState({ value })}
                        />
                        <button onClick={this.getData} className="btn btn-primary">Search</button>
                </div>
            
                {/* <input list="listOfCity" name="city" id="city" onChange={this.onChange} autoComplete="off"></input>
                <datalist id="listOfCity" className="test"></datalist>
                <button onClick={this.getData}>Search</button>                 */}
                
                <Switch>
                    <Route path="/detail" exact component={Detail}/>
                </Switch>
                
                <Link to={{pathname:'/detail', state:{id: this.state.id}}}>
                <div className="row justify-content-center">
                    <div title="Click Here to check detail" id="resultLink">
                        <div id="result"></div>
                    </div>
                </div></Link>


                <br/>
                <hr/>
                <h2>BookMarked City</h2>
                <div>
                    {this.state.fav.length > 0 ? this.state.fav.map(list => (
                        <div className="favMarks">
                            <div className="row justify-content-center" title="Click Here to check detail">
                                <div className="col-3">
                                    <Link to={{pathname:'/detail', state:{id: list.id}}}><div  id={list.id}>
                                    <button id="btn">
                                            <div><b>{list.name},  {list.sys.country}</b></div>
                                            <div>Temperature: {list.main.temp}</div>
                                    </button>
                                    </div></Link>
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
