const api_key = '1e5682d5abf655e8077c4f85db54d4fe';
let city_name = 'Kolkata';
document.querySelector('#searchBtn').addEventListener('click', (e) => {
    e.preventDefault();
    let cityVal = document.querySelector('#cityVal').value;
    console.log(cityVal);
    if (cityVal.trim() != 0) {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=${api_key}&units=metric`;
        document.querySelector('.information-box').style.display = "flex";
        document.querySelector('.other-information').style.display = "flex";
        getWeather(url);
        document.querySelector('#cityVal').value = "";
    }
    else {
        alert('Put City Name');
    }
   
})
async function getWeather(rec) {
    let response = await fetch(rec);
    let response_data = await response.json();
    console.log(response_data);
        if (response_data.message != "city not found") {
            document.querySelector('#cityName').innerHTML = response_data.name;
            document.querySelector('#cityName').style.color = '#8a8484'; 
            document.querySelector('#temp').innerHTML =  Math.floor(response_data.main.temp);
            document.querySelector('#minity').innerHTML =  response_data.main.humidity;
            document.querySelector('#speed').innerHTML =  Math.floor(response_data.wind.speed);
            document.querySelector('.weather').innerHTML = response_data.weather[0].main;
             let weatherCode = response_data.weather[0].icon;
            let weatherIconUrl = `https://openweathermap.org/img/wn/${weatherCode}.png`;
            document.querySelector('#img').src = weatherIconUrl;
            function getTime() {
                let date = new Date();
            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            let day = days[date.getDay()];
            let today = date.getDate();
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let month = months[date.getMonth()];
            let today_Date = `${day},${today} ${month}`;
            let hour = date.getHours();
            let minTe = date.getMinutes();
            let session = "AM";
            if (hour > 12) {
                hour = hour - 12;
                session = "PM";
            }
            if (minTe < 10) {
                minTe = '0' + minTe;
            }
            let time = `${hour}.${minTe} ${session}`;
            document.querySelector('#todayDate').textContent = today_Date;
            document.querySelector('#time').textContent = time;
           
            }
            setInterval(getTime,1000);
            let riseData = response_data.sys.sunrise;
            let setData = response_data.sys.sunset;
            let sunrise = new Date(riseData*1000);
            let sunset = new Date(setData*1000);
            document.querySelector('.sunrise').textContent = sunrise.toLocaleTimeString();
            document.querySelector('.sunset').textContent = sunset.toLocaleTimeString();
        
        }
        else {
              
              document.querySelector('#cityName').innerHTML = response_data.message;
              document.querySelector('#cityName').style.color = "Red";
              document.querySelector('#img').src = 'cat-gray.gif';
              document.querySelector('#minity').innerHTML =  "00";
              document.querySelector('#speed').innerHTML =   "00";
              document.querySelector('.weather').innerHTML = "None";
              document.querySelector('.sunrise').textContent =  "0.00";
            document.querySelector('.sunset').textContent = "0.00";
              alert("City Not Found");
        }
       
    
        
  
    
}



let modeBtn = document.querySelector('#modeBtn');
const switch_Btn = document.querySelector('.switch');
let count = 0;

switch_Btn.onclick = () => {
    count++;
    if (count % 2 == 0) {
        modeBtn.style.color = "#7d6608";
        document.querySelector('body').classList.remove('html-body');
        document.querySelector('#cityVal').classList.remove('inponew');
        document.querySelector('#searchBtn').classList.remove('btnnew');
        document.querySelector('.information-box').classList.remove('infomode');
        document.querySelector('.other-information').classList.remove('othermode');
    }
    else {
        modeBtn.style.color = "#fff";
        document.querySelector('body').classList.add('html-body');
        document.querySelector('#cityVal').classList.add('inponew');
        document.querySelector('#searchBtn').classList.add('btnnew');
        document.querySelector('.information-box').classList.add('infomode');
        document.querySelector('.other-information').classList.add('othermode');
    }



};

