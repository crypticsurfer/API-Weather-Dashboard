let apiKey = "428568c242a23aec5b8d74156afd47b7"
let queryUrl = "https://api.openweathermap.org/data/2.5/weather?"


let searchButton = document.querySelector("#search")
let searchEl = document.querySelector("#searchfield")

function search(city) {
    let weatherQuery = `${queryUrl}q=${city}&appid=${apiKey}&units=imperial`
    fetch(weatherQuery)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            let weatherData = {
                name: data.name,
                temp: data.main.temp,
                dayUtx: data.dt,
                icon: data.weather[0].icon,
                humidity: data.main.humidity,
                wind: data.wind.speed,
            }
            let day = dayjs(data.dayUtx).format('MMMM D, YYYY')
            let resultContent = document.querySelector('#ressection')
            let resultEl = ""
            let iconCode = weatherData.icon
            let iconImage = `<img src="http://openweathermap.org/img/wn/${iconCode}.png">`
            resultEl += `
            <div class='result'>
                <p>Name: ${weatherData.name}</p>
                <p>Date: ${day}</p>
                <p>${iconImage}</p>
                <p>Temp: ${weatherData.temp} °F</p>
                <p>Humidity: ${weatherData.humidity} %</p>
                <p>Wind Speed: ${weatherData.wind} MPH</p>
            </div>`;
            resultContent.innerHTML = resultEl


            let lat = data.coord.lat
            let lon = data.coord.lon
