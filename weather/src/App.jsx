import "./App.css";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material";

// REACT
import { useEffect, useState } from "react";

// EXTERNAL LIBRARIES
import axios from "axios";
import dayjs from "dayjs";

import "dayjs/locale/ar";
import { useTranslation } from "react-i18next";
import Header from "./Header";
import StarsMoonPlanets from "./StarsMoonPlanets";
import WeatherCard from "./WeatherCard";
dayjs.locale("ar");

const cities = [
  { name: "Riyadh", lat: 24.774265, lon: 46.738586 },
  { name: "Makkah", lat: 21.3891, lon: 39.8579 },
  { name: "Dammam", lat: 26.4207, lon: 50.0888 },
  { name: "Qassim", lat: 26.2154, lon: 43.5006 },
];

function App() {
  const { t, i18n } = useTranslation();

  // ======= STATES ========

  const [dateAndTime, setDateAndTime] = useState("");

  const [selectedCity, setSelectedCity] = useState(() => {
    const savedCity = localStorage.getItem("selectedCity");
    return savedCity ? JSON.parse(savedCity) : cities[0];
  });
  useEffect(() => {
    localStorage.setItem("selectedCity", JSON.stringify(selectedCity));
  }, [selectedCity]);

  const [darkMode, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark" ? true : false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  function toggleDarkMode() {
    setDark((prevDark) => !prevDark);
  }

  const [temp, setTemp] = useState({
    number: null,
    description: null,
    humidity: null,
    wind: null,
    icon: null,
  });

  const [local, setLocal] = useState(() => {
    return localStorage.getItem("lang") || "ar";
  });

  useEffect(() => {
    localStorage.setItem("lang", local);
    i18n.changeLanguage(local);
  }, [local]);

  const direction = local == "ar" ? "rtl" : "ltr";

  // ======= EVENT HANDLERS ========

  function handleLanguageClick() {
    if (local == "en") {
      setLocal("ar");
      dayjs.locale("ar");
    } else {
      setLocal("en");
      dayjs.locale("en");
    }

    setDateAndTime(dayjs().format(" h:mm:ss a | D MMMM YYYY"));
  }

  useEffect(() => {
    const Interval = setInterval(() => {
      setDateAndTime(dayjs().format(" MMMM D YYYY | h:mm:ss a"));
    }, 1000);

    if (!selectedCity) return;

    let cancelAxios = null;

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${selectedCity.lat}&lon=${selectedCity.lon}&appid=5ab7bd94f9fa686ba5fbe1e922bf8212`,
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        }
      )
      .then(function (response) {
        // handle success
        const responseTemp = Math.round(response.data.main.temp - 273.15);
        const responseDescription = response.data.weather[0].description;
        const responseHumidity = response.data.main.humidity;
        const responseWind = response.data.wind.speed;
        const iconsTemp = response.data.weather[0].icon;

        setTemp({
          number: responseTemp,
          humidity: responseHumidity,
          wind: responseWind,
          description: responseDescription,
          icon: `https://openweathermap.org/img/wn/${iconsTemp}@2x.png`,
        });
      });

    return () => {
      clearInterval(Interval);

      if (cancelAxios) {
        cancelAxios();
      }
    };
  }, [selectedCity]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const theme = createTheme({
    components: {
      MuiAutocomplete: {
        styleOverrides: {
          paper: {
            borderRadius: "12px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          },
          listbox: {
            padding: "10px",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              "&.Mui-focused fieldset": {
                borderColor: "#4A90E2",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#4A90E2",
            },
          },
        },
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className={darkMode ? "div-dark" : "div-light "}>
          <div
            className="div-header  w-full max-w-[70%] bg-[#074799] rounded-[50px] text-center mx-auto overflow-hidden mt-5"
            dir={direction}
          >
            <Header
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
              handleLanguageClick={handleLanguageClick}
              local={local}
              direction={direction}
            />
          </div>

          <main className="element" style={{ fontFamily: "NotoSans" }}>
            <Container maxWidth="sm">
              <StarsMoonPlanets darkMode={darkMode} />
              <div className="div-content">
                {/* CARD */}
                <WeatherCard
                  dateAndTime={dateAndTime}
                  selectedCity={selectedCity}
                  setSelectedCity={setSelectedCity}
                  cities={cities}
                  temp={temp}
                  t={t}
                  i18n={i18n}
                />
                {/* === CARD === */}
                {/* TRANSLATION BUTTON */}
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "start",
                  }}
                ></div>
                {/* === TRANSLATION BUTTON ===*/}
              </div>
            </Container>
          </main>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
