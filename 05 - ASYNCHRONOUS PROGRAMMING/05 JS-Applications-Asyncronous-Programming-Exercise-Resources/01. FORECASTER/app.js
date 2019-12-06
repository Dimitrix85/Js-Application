function attachEvents() {
    const htmlElements = {
        inputLocation: () => document.getElementById("location"),
        today: () => document.getElementById("current"),
        upcoming: () => document.getElementById("upcoming"),
        forecast: () => document.getElementById("forecast")
    }

    const weatherIcons = {
        sunny: "☀",
        partlysunny: "⛅",
        overcast: "☁",
        rain: "☂",
        degrees: "°"
    }

    const submitBtn = document.getElementById("submit");
    submitBtn.addEventListener("click", getWather);
    document.addEventListener("keypress",function (e) {
        if (e.key === 'Enter') {
            getWather();
        }
    });


    function getWather() {
        htmlElements.forecast().style.display = "block";

        weatherService().location()
            .then(data => {
                if (!htmlElements.inputLocation().value) {
                    throw new Error("Input is empty");
                }
                let { code, name } = data.find(c => c.name === htmlElements.inputLocation().value)

                    todayWeather(code),
                    upcoming(code)
                
            })
            .catch(() => {
                document.querySelector("#current > div.label").textContent = "Error";
                document.querySelector("#upcoming > div").style.display = "none";
                if (document.querySelector("#current > div.forecasts")) {
                    document.querySelector("#current > div.forecasts").remove();
                }
                document.querySelectorAll("#upcoming > span").forEach(s => {
                    s.remove();
                });
            })
    }

    function todayWeather(code) {

        weatherService().today(code)
            .then(x => {
                if (document.querySelector("#current > div.forecasts")) {
                    document.querySelector("#current > div.forecasts").remove();
                }
                document.querySelector("#current > div.label").textContent = "Current conditions";
                let { forecast, name } = x;
                let { condition, high, low } = forecast;
                let divForecasts = createHtmlElement("div", ["forecasts"]);
                let normalizeCondition = normalizeString(condition);
                let spanSymbol = createHtmlElement("span", ["condition", "symbol"], weatherIcons[normalizeCondition]);
                divForecasts.appendChild(spanSymbol);
                let spanCondition = createHtmlElement("span", ["condition"]);
                let spanName = createHtmlElement("span", ["forecast-data"], name);
                let degree = `${low}${weatherIcons.degrees}/${high}${weatherIcons.degrees}`
                let spanDegree = createHtmlElement("span", ["forecast-data"], degree);
                let spanType = createHtmlElement("span", ["forecast-data"], condition);
                spanCondition.append(spanName, spanDegree, spanType);
                divForecasts.appendChild(spanCondition);
                htmlElements.today().appendChild(divForecasts);
            })
            .catch(() => {
                throw new Error("Bad request");
            });
    }

    function upcoming(code) {
        weatherService().upcoming(code)
            .then(x => {
                document.querySelectorAll("#upcoming > span").forEach(s => {
                    s.remove();
                });
                document.querySelector("#upcoming > div").style.display = "block";
                let { forecast, name } = x;
                forecast.forEach(y => {
                    let { condition, high, low } = y;
                    let spanUpcoming = createHtmlElement("span", ["upcoming"]);
                    let normalizeCondition = normalizeString(condition);
                    let spanSymbol = createHtmlElement("span", ["symbol"], weatherIcons[normalizeCondition]);
                    let degree = `${low}${weatherIcons.degrees}/${high}${weatherIcons.degrees}`
                    let spanDegree = createHtmlElement("span", ["forecast-data"], degree);
                    let spanType = createHtmlElement("span", ["forecast-data"], condition);
                    spanUpcoming.append(spanSymbol, spanDegree, spanType);
                    htmlElements.upcoming().appendChild(spanUpcoming);
                })
            })
            .catch(() => {
                throw new Error("Bad request");
            });
    }


    function createHtmlElement(tagName, classList, content) {
        if (!tagName) {
            throw new Error("Missing tag name");
        }

        let element = document.createElement(tagName);

        if (classList) {
            element.classList.add(...classList);
        }
        if (content) {
            element.textContent = content;
        }
        return element;
    }

    function normalizeString(name) {
        return name.trim().toLowerCase().split(" ").join("");
    }

    function weatherService() {
        let url = "https://judgetests.firebaseio.com/";

        return {
            location: () => fetch(url + "locations.json").then((data) => data.json()),
            today: (code) => fetch(url + `forecast/today/${code}.json`).then((data) => data.json()),
            upcoming: (code) => fetch(url + `forecast/upcoming/${code}.json`).then((data) => data.json()),
        }
    }
}

attachEvents();