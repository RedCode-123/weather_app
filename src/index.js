import "./style.css";

function getLocation() {
    // <<getLocation>>
    if ("geolocation" in navigator) {
        console.info("Geolocation is available");
        return new Promise((resolve, reject) => {

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    resolve({latitude, longitude});
                }
                ,
                (error) => {
                    reject(error);
                });
        });

    } else {
        console.error("Geolocation NOT available")
    }
}

export function getTodayDate() {
    // <<getTodayDate>>
    const todayDate = new Date();
    let year = todayDate.getFullYear();
    let month = (todayDate.getMonth()+1)<10
                ? `0${todayDate.getMonth()+1}`
                : todayDate.getMonth()+1;
    let day = todayDate.getDate();
    return `${year}-${month}-${day}`;
}

async function getGiphyImage(climate) {

    const giphyAPI = "6Mu6lZq2Vnp6I5V1o7UCVxgKtudubpHV";
    const url = `https://api.giphy.com/v1/gifs/translate?api_key=${giphyAPI}&s=${climate}&rating=g&remove_low_contrast=true`;
    // const url = `https://api.giphy.com/v1/gifs/random?api_key=${giphyAPI}&tag=${climate}s&rating=g&remove_low_contrast=true`;
    // const url = `https://api.giphy.com/v1/gifs/search?api_key=${giphyAPI}&q=${climate}&rating=g&limit=1`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Problem getting data");
    }
    const data = await response.json();
    // const imgUrl = data.data[0]?.images.original.url;
    const imgUrl = data.data?.images.original.url;

    return imgUrl;

}

async function getDataAPI({location, position, date, unitGroup = "metric"}) {

    // <<getDataAPI>>
    const API = "FT97ERZJPFZVY6KTHVSR2KG77";
    const params = new URLSearchParams({
        unitGroup: [unitGroup], // metric, us
        key: [API]
    });
    let url = "";
    if(location) {

        location = encodeURIComponent(location);

        url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
            location +"/" +date+"/" +"?" + params;
        console.log(url);
    } else if (position){

        let coor = position.latitude.toString() +"," + position.longitude.toString()

        url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
            coor +"/" +date+"/" +"?" + params;
    }

    let response = await fetch(url);
    if (!response.ok) {
        throw new Error("Problem getting data");
    }
    let data = await response.json();

    console.log(data);

    // console.log(data.days[0]?.datetime);
    // console.log(data.timezone);
    // // Alertas
    // console.log(data?.alerts[0]?.event);
    // console.log(data?.alerts[0]?.headline);

    // console.log(data?.alerts[0]?.description);
    // console.log(data?.alerts[0]?.link);

    //  console.log(data.days[0]?.conditions);
    //  console.log(data.days[0]?.description);

    //  console.log(data.days[0]?.icon);

    // console.log(data.days[0]?.tempmax);
    // console.log(data.days[0]?.tempmin);


    // console.log(data.days[0]?.feelslike);
    // console.log(data.days[0]?.humidity);


    // console.log("-".repeat(30))

    return data;

}

function setUnitGroup() {
    if(temperatureOptions[0].checked) return "metric";
    if(temperatureOptions[1].checked) return "us";
}

async function main(weatherData) {
    let gif = encodeURIComponent("weather " + weatherData.days[0]?.icon);
    let backgroundUrl = await getGiphyImage(gif);
    mainElement.setAttribute("src", backgroundUrl);

    let date = weatherData?.days[0]?.datetime;
    let temperature =  weatherData?.days[0]?.temp;
    // cityNameHtml.textContent = cityName;
    dateHtml.textContent = "Date : " + date.split("-").join("/");
    temperatureHtml.textContent = `Temperature : ${temperature} ${unitGroup === "metric" ? "°C" : "°F"}`;
    description.textContent =  "Description : " + weatherData?.days[0]?.description

    // Make Weather details grid
    html="";
    gridInfo.textContent="";
    let infoText = [
        {title:"Feels like", info: `${weatherData?.days[0]?.feelslike} ${unitGroup === "metric" ? "°C" : "°F"}` },
        {title:"Wind", info: `${weatherData?.days[0]?.windspeed} ${unitGroup === "metric" ? "km/h" : "mi/h"}`},
        {title:"Humidity", info: `${weatherData?.days[0]?.humidity} %`},
        {title:"UV", info: weatherData?.days[0]?.uvindex} ,
        {title:"Visibility", info: `${weatherData?.days[0]?.visibility} ${unitGroup === "metric" ? "km" : "mi"}`} ,
        {title:"Pressure", info: `${weatherData?.days[0]?.pressure} hPa`},
    ]
    for (let x =0 ; x <6; x++) {
        html = `
                <span class="item-${x}">
                    <span>${infoText[x].title}</span>
                    <span>${infoText[x].info}</span>
                </span>
        `;
        gridInfo.insertAdjacentHTML("beforeend", html)
    }

}

const mainElement = document.querySelector("main > .img-container > img");
let searchInput = document.querySelector("#city");
const searchBtn = document.querySelector(".search-btn")
// const cityNameHtml = document.querySelector(".city-name");
const dateHtml = document.querySelector(".today-date");
const temperatureHtml = document.querySelector(".temperature");
const description = document.querySelector(".description");
const temperatureOptions = document.querySelectorAll("input[type='radio']")
let today = getTodayDate();
let unitGroup = setUnitGroup();
let position = await getLocation();
let weatherData = await getDataAPI({position, date:today, unitGroup});
const gridInfo = document.querySelector(".sec-2 > .grid-info");
let html = "";

searchBtn.onclick = async () => {
    unitGroup = setUnitGroup();
    weatherData = await getDataAPI({location: searchInput.value, date:today, unitGroup});
    main(weatherData);
};

searchInput.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        unitGroup = setUnitGroup();
        weatherData = await getDataAPI({location: searchInput.value, date:today, unitGroup});
        main(weatherData);
    }
})

temperatureOptions.forEach((option) => {
    option.addEventListener("click", async () => {
        unitGroup = setUnitGroup();
        if(searchInput.value) {
            weatherData = await getDataAPI({location: searchInput.value, date:today, unitGroup});
        } else {
            weatherData = await getDataAPI({position, date:today, unitGroup});
        }
        main(weatherData);
    })
})


try {
    searchInput.value = ""; //clean search
    main(weatherData);
}catch(error) {
    console.error(`ERROR(${error.code}): ${error.message}`)
}
