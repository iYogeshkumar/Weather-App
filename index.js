const display = document.getElementById("displaydata");


async function getweather(){
    try{
        let city= document.getElementById("city").value ;
        let res= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=648bc416defcab949a1a73c4b219e4cc&units=metric`)
        let data= await res.json();
        appenddata(data);
        console.log("data:",data)

        let forecast =await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lat}&exclude=&appid=648bc416defcab949a1a73c4b219e4cc&units=metric`)
        let forecastdata= await forecast.json();
        console.log("forecast:",forecastdata)
        appendforecastdata(forecastdata.daily)
    }
    catch (error){
        console.log("error:",error)

    }
}
function appenddata(data){
    display.innerHTML="";
    
    let maincontainer = document.createElement("div");
    maincontainer.setAttribute("id","maincontainer")
        
    let div1 = document.createElement("div");
    div1.setAttribute("id","div1")

    let name = document.createElement("h3");
    name.innerText= `city:${data.name}`;

    let temp = document.createElement("h3"); 
    temp.innerText=`Temperature:${data.main.temp}°C`;

    let mintemp = document.createElement("h3"); 
    mintemp.innerText=`MIN Temperature:${data.main.temp_min}°C`;

    let maxtemp = document.createElement("h3"); 
    maxtemp.innerText=`Max Temperature:${data.main.temp_max}°C`;

    let pressure = document.createElement("h3"); 
    pressure.innerText=`pressure:${data.main.pressure}`;

    let humidity = document.createElement("h3"); 
    humidity.innerText=`humidity:${data.main.humidity}`;

    let wind = document.createElement("h3"); 
    wind.innerText=`wind:${data.wind.speed}`;

    let clouds = document.createElement("h3");
    clouds.innerText=`clouds:${data.clouds.all}%`;

    let Sunrise = document.createElement("h3");
    Sunrise.innerText =`Sunrise:${data.sys.sunrise}`;

    let Sunset = document.createElement("h3");
    Sunset.innerText =`Sunset:${data.sys.sunset}`;

    let div2 = document.createElement("div");
    div2.setAttribute("id","map")
    let iframe = document.createElement("iframe");
    iframe.src=`https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`
    iframe.height=`250px`;
    iframe.width=`500px`;




    div1.append(name,temp,mintemp,maxtemp,
        pressure,humidity,wind,clouds,Sunrise,Sunset)
        div2.append(iframe)
    maincontainer.append(div1,div2)
    display.append(maincontainer)
}

var week=["Wed","Thu","Fri","Sat","Sun","Mon","Tue"]
function appendforecastdata(forecastdata){
    document.getElementById("forecast").innerHTML="";

    forecastdata.map(function (elem,index){
        if(index==7){
            return;
        }
        let forediv =document.createElement("div");
        let wk = document.createElement("p");
        wk.innerText=week[index];
        let logo=document.createElement("i");
        logo.innerText="⛅";

        let min = document.createElement("p");
        min.innerText=elem.temp.min+" °C";
        let max = document.createElement("p");
        max.innerText=elem.temp.max+" °C";
        forediv.append(wk,logo,max,min);
        document.getElementById("forecast").append(forediv);
        
    })

}