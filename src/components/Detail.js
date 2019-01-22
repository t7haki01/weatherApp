import React, {Component} from 'react'
import axios from 'axios';
import cityList from '../../www/city.list.json';


class Detail extends Component{
    constructor(props) {
        super(props);
        this.state = {};
      }
    componentDidMount (){
            const apiKey = "8aa27dc6b9e28772922e2b6bb363e3d2";
            var city = this.props.id;
            const url = "http://api.openweathermap.org/data/2.5/forecast?id="+city+"&APPID="+apiKey+"&units=metric";
            axios.get(url)
            .then(function(res){
                console.log(res.data["list"][0]["main"]["temp"]);
                console.log(cityList[0]["name"])
                document.getElementById("detail").innerHTML = JSON.stringify(res.data)
            })
            .catch(err=>{
                console.log(err)
            })
    }    

    render(){
        return(
            <div>
                <div id="detail">Here is the details</div>
            </div>
        )
    }
}

export default Detail