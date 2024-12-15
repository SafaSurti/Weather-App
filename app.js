const API_KEY = "090eda804e323414021c87cf74e28434";
const inputField = document.getElementById("input");
const weather1 = document.getElementById("weather");

const searchData = async () => {
    weather1.innerHTML =`<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>;
`
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputField.value}&appid=${API_KEY}&units=metric`;

    try {
        const fetchData = await fetch(API_URL);
        const response = await fetchData.json();

        if (response.cod == "404") {
            weather1.innerHTML = `<h1>${response.message}</h1>`;
        } else {
            showData(response);
        }
    } catch (error) {
        weather1.innerHTML = `<h1>Something went wrong. Please try again later.</h1>`;
    } finally {
        inputField.value = "";
    }
}

const showData = (data) => {
    const temperature = data.main.temp;
    const weatherDescription = data.weather[0].main;
    const icon = data.weather[0].icon;

    weather1.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" width="80" alt="${weatherDescription}">
        <h1>${temperature} °C</h1>
        <h2>${weatherDescription}</h2>
    `;
}