import { useState } from "react"
import './Main.css';

export default function Main(){

    const [getC, setC] = useState();
    const [getD, setD] = useState();

    function dont(e){
        setC(e.target.value);
    }

    function getLatLon(){
        fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${getC}&count=10&language=en&format=json`)
        .then(data => data.json())
        .then(dat => fetch_data(dat.results[0].latitude, dat.results[0].longitude))
        .catch(err => console.log(err))
    }

    function fetch_data(lat, lon){
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=sunrise,sunset,uv_index_max,temperature_2m_min,temperature_2m_max&hourly=temperature_2m,weather_code,wind_speed_10m,visibility&current=weather_code&timezone=auto`)
        .then(data => data.json())
        .then(dat => setD(dat))
        .catch(err => console.log(err))
        console.log(getD);
    }

    return (
        <div>
            <div className="se-bar">
                <input type="text" placeholder="Enter city name...." onChange={dont} className="se-bar-input"/>
                <i className="bi bi-search se-bar-icon" onClick={getLatLon}></i>
            </div>

            <div className="row m-3 gy-3 justify-content-evenly">
                <div className="col-12 col-md-5 p-4 border border-lg rounded">
                    <p>kejn eroig peormg eoifvno dsiveiron oicmerotig oe9vrkgtj  difjore eogirnigoh idoifjg oif8j a3942 lfenrgoi vuthg iof8r iohg ihsdr po9evsoive oihvre kvuru</p>
                </div>
                <div className="col-12 col-md-5 p-4 border border-lg rounded">
                    <p>kejn eroig peormg eoifvno dsiveiron oicmerotig oe9vrkgtj  difjore eogirnigoh idoifjg oif8j a3942 lfenrgoi vuthg iof8r iohg ihsdr po9evsoive oihvre kvuru</p>
                </div>
            </div>

            <div className="row m-3 gy-3 justify-content-evenly">
                <div className="col-5 col-md-2 p-4 border border-lg rounded">
                    <p>kejn eroig peormg eoifvno dsiveiron oicmerotig oe9vrkgtj  difjore eogirnigoh idoifjg oif8j a3942 lfenrgoi vuthg iof8r iohg ihsdr po9evsoive oihvre kvuru</p>
                </div>
                <div className="col-5 col-md-2 p-4 border border-lg rounded">
                    <p>kejn eroig peormg eoifvno dsiveiron oicmerotig oe9vrkgtj  difjore eogirnigoh idoifjg oif8j a3942 lfenrgoi vuthg iof8r iohg ihsdr po9evsoive oihvre kvuru</p>
                </div>
                <div className="col-5 col-md-2 p-4 border border-lg rounded">
                    <p>kejn eroig peormg eoifvno dsiveiron oicmerotig oe9vrkgtj  difjore eogirnigoh idoifjg oif8j a3942 lfenrgoi vuthg iof8r iohg ihsdr po9evsoive oihvre kvuru</p>
                </div>
                <div className="col-5 col-md-2 p-4 border border-lg rounded">
                    <p>kejn eroig peormg eoifvno dsiveiron oicmerotig oe9vrkgtj  difjore eogirnigoh idoifjg oif8j a3942 lfenrgoi vuthg iof8r iohg ihsdr po9evsoive oihvre kvuru</p>
                </div>
            </div>
            
        </div>
    )
}