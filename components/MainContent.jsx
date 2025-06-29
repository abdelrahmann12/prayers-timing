import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Prayer from "./Prayer";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import{ useEffect, useState } from "react";




export default  function MainContent() {

 

    const [selectedCity , setSelectedCity] = useState({
      displayName : "مكه المكرمه",
      apiKey: "Makkah al Mukarramah"

    }
 
    );
     const availbleCities = [
  {
      displayName : "مكه المكرمه",
      apiKey: "Makkah al Mukarramah"
  },
  {
      displayName : "الرياض",
      apiKey: "Riyadh"
  },
  {
      displayName : "مصر",
      apiKey: "Egypt"
  },
  ];
    const [timings , setTimings] = useState({
            "Fajr": "04:10",
            "Sunrise": "05:56",
            "Dhuhr": "12:58",
            "Asr": "16:34",
            "Sunset": "20:00",
            "Maghrib": "20:00",
            "Isha": "21:33",
  })

  
  const  getTimings = async ()=>{
    const response =  await axios.get(`https://api.aladhan.com/v1/timingsByCity?city=Cairo&country=${selectedCity.apiKey}&method=5`);
    console.log("the data is" ,response.data.data.timings);
    setTimings(response.data.data.timings);
  }
  useEffect(()=>{
    getTimings()
    console.log("hi from mr robot")
  } , [selectedCity])
   


  const handleCityChange = (event) => {
    const cityObject = availbleCities.find((city)=>{
        return city.apiKey == event.target.value ;
    })
    console.log(cityObject);
    setSelectedCity(cityObject);
  };

  return (
    <>
      {/* top row */}
      <Grid container>
        <Grid xs={6}>
          <h2>4:20 | 2024 9 سمبتمبر</h2>
          <h1>{selectedCity.displayName}</h1>
        </Grid>
        <Grid xs={6}>
          <h2>متبقي علي صلاه المغرب</h2>
          <h1>1:20:3</h1>
        </Grid>
      </Grid>
      {/* end row */}

      <Divider style={{ backgroundColor: "white", opacity: "0.2" }}></Divider>
      {/* start prayers cards */}
      <Stack
        direction="row"
        spacing={2}
        justifyContent={"space-around"}
        style={{
          marginTop: "30px",
          
        }}
      >
        <Prayer name="الفجر" time={timings.Fajr} img= "./fajr-prayer.png" />
        <Prayer name="الظهر" time={timings.Dhuhr} img= "./fajr-prayer.png" />
        <Prayer name="العصر" time={timings.Asr} img= "./fajr-prayer.png"/>
        <Prayer name="المغرب" time={timings.Maghrib} img= "./fajr-prayer.png" />
        <Prayer name="العشاء" time={timings.Isha} img= "./fajr-prayer.png"/>
      </Stack>
      {/* end prayers cards */}
      {/* start select city */}
      <Stack direction="row" justifyContent={"center"}>
        <FormControl
          style={{
            width: "20%",
            margin: "50px auto",
          }}
        >
          <InputLabel id="demo-simple-select-label">
          <span style={{color : "white"}}>
            المدينه
          </span>
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            onChange={handleCityChange}
          >

            {availbleCities.map((city)=>{
              return(
                <MenuItem value={city.apiKey}>
                  {city.displayName}
                  </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>
      {/* end select city */}
    </>
  );
}
