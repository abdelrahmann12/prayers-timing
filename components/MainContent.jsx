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
import moment from "moment";
import "moment/dist/locale/ar";
moment.locale("ar");

export default  function MainContent() {


    const [timeramaining , setTimeRamining] = useState("") 
    const [nextPrayer , setNextparayer] = useState(0)
    const[today , setToday] = useState("");

    const [selectedCity , setSelectedCity] = useState({
      displayName : "مكه المكرمه",
      apiKey: "Makkah al Mukarramah"
    }
    );

    const prayers = [
      {key : "Fajr" ,   displayName : "الفجر"},
      {key : "Dhuhr" ,  displayName : "الظهر"},
      {key : "Asr" ,   displayName : "العصر"},
      {key : "Sunset", displayName : "المغرب"},
      {key : "Isha" ,   displayName : "العشاء"}
    ]

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
    setTimings(response.data.data.timings);
  }

  useEffect(()=>{

    getTimings()
  } , [selectedCity]);


    function counterDowntimer(){

      let momentNow = moment();
      let nextPrayer;

      if(momentNow.isAfter(moment(timings.Fajr , "hh:mm")) && 
         momentNow.isBefore(moment(timings.Dhuhr , "hh:mm" )))
      {
          nextPrayer = 1;
      }

      else if( momentNow.isAfter(moment(timings.Dhuhr , "hh:mm")) && 
               momentNow.isBefore(moment(timings.Asr , "hh:mm" )))
            {
                nextPrayer = 2;
             }
      else if( momentNow.isAfter(moment(timings.Asr , "hh:mm")) && 
               momentNow.isBefore(moment(timings.Sunset , "hh:mm" )))
            {
                nextPrayer = 3;
             }
      else if( momentNow.isAfter(moment(timings.Sunset , "hh:mm")) && 
               momentNow.isBefore(moment(timings.Isha, "hh:mm" )))
            {
                nextPrayer = 4;
             }
      else {
              nextPrayer = 0;
           }

           setNextparayer(nextPrayer);
          //  key and display name for each prayer
           const nextPrayerObject = prayers[nextPrayer];
           const nextPrayertime =timings[nextPrayerObject.key];
          //  string to time
           const nextPrayerTimeMoment = moment(nextPrayertime, "hh:mm");
           let remainingTime = moment(nextPrayertime , "hh:mm").diff(momentNow);

           if(remainingTime < 0){
            const midnightDiff  = moment("23:59:59" , "hh:mm:ss").diff(momentNow); 
            const fajrToMidnightDiff = nextPrayerTimeMoment.diff(moment("00:00:00" , "hh:mm:ss"));
            
            const totalDifference = midnightDiff + fajrToMidnightDiff ;

            remainingTime = totalDifference ;

            const durationRemainingTime = moment.duration(remainingTime);

            setTimeRamining(`${durationRemainingTime.seconds()} : ${durationRemainingTime.minutes()} : ${durationRemainingTime.hours()} `);
            
    }

    
  }

  useEffect(()=>{

    const time = moment();
    setToday(time.format('MMM Do YYYY | h:mm'))

    let interval = setInterval(()=>{
        counterDowntimer()
        
    } ,1000);
     return () =>{
    clearInterval(interval) ;
  }
  },[timings]);


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
          <h2>{today}</h2>
          <h1>{selectedCity.displayName}</h1>
        </Grid>
        <Grid xs={6}>
          <h2>متبقي علي صلاه {prayers[nextPrayer].displayName}</h2>
          <h1>{timeramaining}</h1>
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
                <MenuItem value={city.apiKey}
                key={city.apiKey}>
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




