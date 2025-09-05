import { use, useState } from "react"
import './Main.css';

export default function Main(){
    const [getC, setC] = useState('City');
    const [getAll, setAll] = useState({
                temp: 'Temperature',
                sunrise: 'Sunrise',
                sunset: 'Sunset',
                min_temp: ['Min_temp', 'temp', 'temp', 'temp', 'temp'],
                max_temp: ['Max_temp', 'temp','temp', 'temp', 'temp'],
                time: ['today', 'Day', 'Day', 'Day', 'Day'],
                elevation: 'Elevation',
                wind_speed: 'wind speed',
                humidty: 'Humidity',
                uv_index: 'UV index',
                weather_codes: ['day.svg','day.svg','day.svg','day.svg','day.svg']
    });

    function dont(e){
        setC(e.target.value);
    }

    function getLatLon(){
        fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${getC}&count=10&language=en&format=json`)
        .then(data => data.json())
        .then(dat => fetch_data(dat.results[0].latitude, dat.results[0].longitude))
        .catch(err => alert('Enter Valid City Name....'))
    }

    function fetch_data(lat, lon){
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,sunrise,sunset,temperature_2m_max,temperature_2m_min,uv_index_max&hourly=temperature_2m&current=wind_speed_10m,temperature_2m,weather_code,relative_humidity_2m&timezone=Asia/Kolkata`)
        .then(data => data.json())
        .then((data) => {
            let x = {
                temp: data.current.temperature_2m,
                sunrise: data.daily.sunrise,
                sunset: data.daily.sunset,
                min_temp: data.daily.temperature_2m_min,
                max_temp: data.daily.temperature_2m_max,
                time: data.daily.time,
                elevation: data.elevation,
                wind_speed: data.current.wind_speed_10m,
                humidty: data.current.relative_humidity_2m,
                uv_index: data.daily.uv_index_max[0],
                weather_codes: data.daily.weather_code
            };

            let arr = [];
            for(let i = 0; i < 5; i++){
                arr.push(imggen(x.weather_codes[i]));
            }

            x.weather_codes = arr;
            setAll(x);
            return;
        })
        .catch(err => console.log(err))
    }

    function time(e){
        if(e == 'Invalid Date')
            return 'Sunrise';
        else
            return e;
    }
    function timeeh(e){
        if(e == 'Invalid Date')
            return 'Sunset';
        else
            return e;
    }

    function imggen(e){
        let c = new Date();
        let h = new Date(getAll.time[0]).getHours();
        if(e == 0 || e == 1){
            if(h < 6 || h > 18)
                return 'night.svg';
            else
                return 'day.svg';
        }
        else if(e == 2){
            if(c.getDate == h.getDate()){
                if(h < 6 || h > 18)
                    return 'partly_cloudy_night.svg';
                else
                    return 'partly_cloudy.svg';
            }
            else{ 
                if(c != 0)
                    return 'partly_cloudy_night.svg';
                else
                    return 'partly_cloudy.svg';
            }
        }
        else if(e == 3)
            return 'cloudy.svg';
        else if(e == 45 || e == 48 || e == 6 || e == 7)
            return 'fog_haze.svg';
        else if(e == 51 || e == 53 || e == 55 || e == 61 || e == 65 || e == 80 || e == 81 || e == 82)
            return 'rain.svg';
        else if(e == 56 || e == 57 || e == 66 || e == 67)
            return 'freezing_rain.svg';
        else if(e == 71 || e == 73 || e == 75 || e == 77 || e == 85 || e == 86)
            return 'snow.svg';
        else if(e == 95 || e == 96 || e == 99)
            return 'thunder.svg';
    }
    
    return (
        <div>
            <div className="se-bar">
                <input type="text" placeholder="Enter city name...." onChange={dont} className="se-bar-input"/>
                <i className="bi bi-search se-bar-icon" onClick={getLatLon}></i>
            </div>

            <div className="row m-3 gy-3 justify-content-evenly">
                <div className="col-12 col-md-5 p-4 border border-lg rounded-4 shadow-lg">
                    <div className="row align-items-center">
                        <div className="col-2"><img src={getAll.weather_codes[0]}></img></div>
                        <div className="col-10"><h2 className="fw-bold">{getAll.temp} &deg;C</h2></div>
                    </div>
                    <div className="row align-items-center mb-3">
                        <div className="col-2"><img src="location.svg" style={{width: "35px"}}></img></div>
                        <div className="col-10"><h4 className="fw-normal">{getC}</h4></div>
                    </div>
                    <div className="row align-items-center my-2">
                        <div className="col-2"><img src="sunrise_icon.svg" style={{width: "30px"}}></img></div>
                        <div className="col-4"><h5 className="fw-light">{time(new Date(getAll.sunrise[0]).toLocaleTimeString())}</h5></div>
                        <div className="col-2"><img src="sunset_icon.svg" style={{width: "30px"}}></img></div>
                        <div className="col-4"><h5 className="fw-light">{timeeh(new Date(getAll.sunset[0]).toLocaleTimeString())}</h5></div>
                    </div>
                    <div className="row align-items-center mt-3">
                        <div className="col-2"><img src="min_temp.svg" style={{width: "30px"}}></img></div>
                        <div className="col-4"><h5 className="fw-light">{getAll.min_temp[0]} &deg;C</h5></div>
                        <div className="col-2"><img src="max_temp.svg" style={{width: "30px"}}></img></div>
                        <div className="col-4"><h5 className="fw-light">{getAll.max_temp[0]} &deg;C</h5></div>
                    </div>
                </div>
                <div className="col-12 col-md-5 p-4 border border-lg rounded-4 shadow-lg">
                    <div className="row align-items-center mb-2">
                        <div className="col-2"><img src="altitude.svg" style={{width: "30px"}}></img></div>
                        <div className="col-10"><h5 className="text-start mt-2 fw-normal">{getAll.elevation + ' (meters)'}</h5></div>
                    </div>
                    <div className="row align-items-center my-2">
                        <div className="col-2"><img src="wind_speed.svg" style={{width: "30px"}}></img></div>
                        <div className="col-10"><h5 className="text-start mt-2 fw-normal">{getAll.wind_speed + ' (Km/h)'}</h5></div>
                    </div>
                    <div className="row align-items-center my-2">
                        <div className="col-2"><img src="humidity.svg" style={{width: "30px"}}></img></div>
                        <div className="col-10"><h5 className="text-start mt-2 fw-normal">{getAll.humidty + ' (%)'}</h5></div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-2"><img src="uv_index.svg" style={{width: "30px"}}></img></div>
                        <div className="col-10"><h5 className="mt-2 fw-normal">{getAll.uv_index}</h5></div>
                    </div>
                </div>
            </div>

            <div className="row m-3 gy-3 justify-content-evenly">
                <div className="col-5 col-md-2 p-4 border border-lg rounded-4 shadow-lg text-center">
                    <h4>{getAll.time[1]}</h4>
                    <div><img src={getAll.weather_codes[1]}></img></div>
                    <p>Min : {getAll.min_temp[1]}&deg; C</p>
                    <p>Max : {getAll.max_temp[1]}&deg; C</p>
                </div>
                <div className="col-5 col-md-2 p-4 border border-lg rounded-4 shadow-lg text-center">
                    <h4>{getAll.time[2]}</h4>
                    <div><img src={getAll.weather_codes[2]}></img></div>
                    <p>Min : {getAll.min_temp[2]}&deg; C</p>
                    <p>Max : {getAll.max_temp[2]}&deg; C</p>
                </div>
                <div className="col-5 col-md-2 p-4 border border-lg rounded-4 shadow-lg text-center">
                    <h4>{getAll.time[3]}</h4>
                    <div><img src={getAll.weather_codes[3]}></img></div>
                    <p>Min : {getAll.min_temp[3]}&deg; C</p>
                    <p>Max : {getAll.max_temp[3]}&deg; C</p>
                </div>
                <div className="col-5 col-md-2 p-4 border border-lg rounded-4 shadow-lg text-center">
                    <h4>{getAll.time[4]}</h4>
                    <div><img src={getAll.weather_codes[4]}></img></div>
                    <p>Min : {getAll.min_temp[4]}&deg; C</p>
                    <p>Max : {getAll.max_temp[4]}&deg; C</p>
                </div>
            </div>
        </div>
    )
}