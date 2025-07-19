async function getWeather() {

  try {
    const message = document.getElementById("message");
    const country = document.getElementById("countryInput").value;
    const res = await fetch(`http://localhost:3000/weather?country=${country}`);
    const data = await res.json();

    if (data.error) {   // هنا السيرفر رد بس فيه مشكله زي ان اسم البلد مش موجود
      message.innerHTML = `<p>${data.error}</p>`;
    } else {
      message.innerHTML = `
        <p><b>Country</b>: ${data.country}</p>
        <p><b>Latitude</b>: ${data.lat}</p>
        <p><b>Longitude</b>: ${data.lon}</p>
        <p><b>Temperature</b>: ${data.temperature}°C</p>
        <p><b>Climate</b>: ${data.condition}</p>
      `;
    }
  } 
  catch (error) { // هنا السيرفر مردش اصلا
    message.innerHTML = `<p>Error occurred while fetching data.</p>`;
  }
}

