console.log("Loading from Public/Js/app.js");

const form = document.querySelector("#form");

const getForeCast = (e) => {
  e.preventDefault();

  const address = document.getElementById("address").value;
  const msg1 = document.querySelector("#msg1");
  const msg2 = document.querySelector("#msg2");

  msg1.textContent = "Loading...";
  msg2.textContent = "";

  fetch(`http://localhost:3000/weather?address=${address}`)
    .then((res) => res.json())
    .then((data) => {
      const { error, forecast, location, address } = data;
      if (error) {
        return (msg1.textContent = error);
      }

      msg1.textContent = location;
      msg2.textContent = forecast;
    })
    .catch((err) => alert(err));
};

form.addEventListener("submit", getForeCast);
