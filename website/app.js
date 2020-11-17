/*=======================Global variables=========================*/
// Date data
const d = new Date();
const newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Selectors const
const date = document.querySelector("#date");
const temp = document.querySelector("#temp");
const content = document.querySelector("#content");
const button = document.querySelector("#generate");

/*================================General Functions===================================*/
const performAction = (event) => {
  //Don't refresh with the button
  event.preventDefault();
  // Form Data
  const zipData = document.querySelector("#zip").value;
  const feelingsData = document.querySelector("#feelings").value;
  // API const
  const apiKey = "ade128885a1a364597ec751126251d9c";
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipData},us&appid=${apiKey}`;

  getData(apiURL)
    .then((data) => {
      postData("/sendData", {
        temp: data.main.temp,
        date: newDate,
        feelings: feelingsData,
      });
    })
    .then(() => updateUI());
};
/*==================================Asyncronous Functions==========================*/
// Getting from the API
const getData = async (url) => {
  const response = await fetch(url);

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
// Posting to my server
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log(error);
  }
};
// Getting from my server and updating the UI
const updateUI = async () => {
  const response = await fetch("/getData");
  try {
    const data = await response.json();
    date.innerHTML = data.date;
    temp.innerHTML = data.temp;
    content.innerHTML = data.message;
  } catch (error) {
    console.log(error);
  }
};

/*===================================Event Listeners=================================*/

button.addEventListener("click", performAction);
