function Weather({ data }: any) {
  console.log("weather data: ", data);

  const dateBuilder = (d:any) => {
    let months = [
      "Januari",
      "Febuari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    let days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  };

  return (
    <>
      <div className="top">
        <div className="location">
          <p>
            {data.name}, {data.sys.country}
          </p>
          <p>{dateBuilder(new Date())}</p>
        </div>
        <div className="temp font-semibold">
          <h1>{data.main.temp.toFixed(1)}°C</h1>
        </div>
        <div className="description">
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            width={100}
            height={100}
            alt="/"
          />
          <p className="mt-3">{data.weather[0].main}</p>
          <p className="text-[1rem]">{data.weather[0].description}</p>
        </div>
      </div>

      <div className="bottom flex gap-20 rounded-lg text-center justify-center items-center">
        <div className="feels">
          <p>{data.main.feels_like.toFixed(1)}°C</p>
          <p className="text-[15px] sm:text-[1rem]">Feels Like</p>
        </div>
        <div className="humidity">
          <p>{data.main.humidity}%</p>
          <p className="text-[15px] sm:text-[1rem]">Humidity</p>
        </div>
        <div className="wind">
          <p>{data.wind.speed} <span className='text-[15px] sm:text-[1rem]'>KMPH</span></p>
          <p className="text-[15px] sm:text-[1rem]">Wind Speed</p>
        </div>
      </div>
    </>
  );
}

export default Weather;
