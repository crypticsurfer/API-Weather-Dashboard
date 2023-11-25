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

            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
                .then(function (response) {
                    return response.json()
                })
                .then(function (weekData) {
                    let weekArray = weekData.list
                    console.log(weekArray)
                    let weekSection = document.querySelector('#weeksection')
                    let weekEl = ""
                    for (let i = 0; i < 5; i ++) {
                        const forecastDay = weekArray[i*8]
                        let dayOfTheWeek = new Date(forecastDay.dt_txt).toLocaleString().split(",")[0]
                        let iconCode = forecastDay.weather[0].icon
                        let iconImage = `<img src="http://openweathermap.org/img/wn/${iconCode}.png">`
                        weekEl += `
                        <div class='weekcard'>
                            <p>Date: ${dayOfTheWeek}</p>
                            <p>${iconImage}</p>
                            <p>Temp: ${forecastDay.main.temp} °F</p>
                            <p>Humidity: ${forecastDay.main.humidity} %</p>
                            <p>Wind Speed: ${forecastDay.wind.speed} MPH</p>
                        </div>`;
                        weekSection.innerHTML = weekEl
                    }
                })
        })
    history()
    clearText()
}

function history() {
    let historyValue = searchEl.value.trim()
    if (historyValue !== "") {
        let storage = JSON.parse(localStorage.getItem("storage")) || []
        if (storage.includes(historyValue)) {
            storage.splice(storage.indexOf(historyValue), 1)
        }
        storage.unshift(historyValue)
        if (storage.length > 10) {
            storage.pop()
        }
        localStorage.setItem("storage", JSON.stringify(storage))
        createbuttons(storage)
    }
}
