const express = require("express");
const path = require("path");
const request = require("request");
const app = express();
const port = 3000;

const x =  path.join(__dirname , '../public')
app.use (express.static (x))

app.set('view engine', 'hbs');

const y = path.join (__dirname , '../temp1/views')
app.set('views', y);


app.get("/", (req, res) => {
  res.render("index");
});

app.get("/weather", (req, res) => {
  const country = req.query.country;
  if (!country) {
    return res.send({ error: "please enter a country name" });
  }

  const url = `http://api.weatherapi.com/v1/current.json?key=0d36dce688da4a21928101016251707&q=${encodeURIComponent(
    country
  )}&aqi=no`;

  request({ url, json: true }, (error, response) => {  // هنا بهندل انواع ايرورز فقط بدون م اقول هحطها فين ف الصفحه
    if (error) {                                       // علشان اعرف هحطها فين فالصفحه .. براجع الجافاسكريب
      return res.send({ error: " server problem  " });
    } else if (response.body.error) {
      return res.send({ error: "country not found" });
    }

    const data = response.body;
    res.send({
      country: data.location.country,
      lat: data.location.lat,
      lon: data.location.lon,
      temperature: data.current.temp_c,
      condition: data.current.condition.text,
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

