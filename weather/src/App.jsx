import "./App.css";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { createTheme, ThemeProvider } from "@mui/material";

// REACT
import { useEffect, useState } from "react";

// ICONS
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";

// EXTERNAL LIBRARIES
import axios from "axios";
import dayjs from "dayjs";

import "dayjs/locale/ar";
import { useTranslation } from "react-i18next";
dayjs.locale("ar");

const cities = [
  { name: "Riyadh", lat: 24.774265, lon: 46.738586 },
  { name: "Dammam", lat: 26.4207, lon: 50.0888 },
  { name: "Makkah", lat: 21.3891, lon: 39.8579 },
  { name: "Qassim", lat: 26.2154, lon: 43.5006 },
];

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#aab4be",
        ...theme.applyStyles("dark", {
          backgroundColor: "#8796A5",
        }),
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#001e3c",
    width: 32,
    height: 32,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
    ...theme.applyStyles("dark", {
      backgroundColor: "#003892",
    }),
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#aab4be",
    borderRadius: 20 / 2,
    ...theme.applyStyles("dark", {
      backgroundColor: "#8796A5",
    }),
  },
}));

const Star = styled("div")({
  position: "absolute",
  width: "4px",
  height: "4px",
  backgroundColor: "#fff",
  borderRadius: "50%",
  boxShadow: "0 0 5px #fff",
});

const Sun = styled("div")({
  position: "absolute",
  width: "70px",
  height: "70px",
  backgroundColor: "#ffeb3b",
  borderRadius: "50%",
  boxShadow: "0 0 20px #ffeb3b",

  "@media (max-width: 640px)": {
    display: "none",
  },
  "@media (min-width: 641px) and (max-width: 1024px)": {
    display: "none",
  },
});

const Moon = styled("div")({
  position: "absolute",
  borderRadius: "50%",
  boxShadow: `
    0 0 30px rgba(255, 255, 255, 0.6),  // تأثير الإضاءة المحيطية
    inset 5px 5px 20px rgba(255, 255, 255, 0.8),  // إضافة ضوء داخل القمر
    inset -5px -5px 25px rgba(255, 255, 255, 0.3)  // تأثير الضوء الداخل
  `,
  background: `
    radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.4), rgba(0, 0, 0, 0.6)),
    radial-gradient(circle at 60% 60%, rgba(255, 255, 255, 0.3), rgba(0, 0, 0, 0.7))
  `,
  width: "100px",
  height: "100px",
  top: "5%",
  left: "5%",
  transition: "all 0.3s ease",

  "@media (max-width: 640px)": {
    display: "none",
  },
  "@media (min-width: 641px) and (max-width: 1024px)": {
    display: "none",
  },
  "@media (min-width: 1025px)": {
    width: "100px",
    height: "100px",
  },
});

const Planet = styled("div")({
  position: "absolute",
  borderRadius: "50%",
  boxShadow: `
    0 0 10px rgba(255, 255, 255, 0.5),
    inset 5px 5px 10px rgba(0, 0, 0, 0.5),
    inset -5px -5px 10px rgba(255, 255, 255, 0.2)
  `,
  background: `
    radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), rgba(0, 0, 0, 0.7)),
    radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.8))
  `,

  "@media (max-width: 640px)": {
    display: "none",
  },
  "@media (min-width: 641px) and (max-width: 1024px)": {
    display: "none",
  },
});

const Cloud = styled("div")({
  position: "absolute",
  width: "100px",
  height: "50px",
  backgroundColor: "#fff",
  borderRadius: "50px",
  boxShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
  "&::before, &::after": {
    content: '""',
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: "50%",
  },
  "&::before": {
    width: "50px",
    height: "50px",
    top: "-20px",
    left: "10px",
  },
  "&::after": {
    width: "60px",
    height: "60px",
    top: "-30px",
    right: "10px",
  },

  "@media (max-width: 640px)": {
    display: "none",
  },
  "@media (min-width: 641px) and (max-width: 1024px)": {
    display: "none",
  },
});

function App() {
  const { t, i18n } = useTranslation();

  // ======= STATES ========

  const [dateAndTime, setDateAndTime] = useState("");

  const [selectedCity, setSelectedCity] = useState(cities[0]);

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

  function DarkMode() {
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
  }, [local]);

  const direction = local == "ar" ? "rtl" : "ltr";

  // ======= EVENT HANDLERS ========

  function handleLanguageClick() {
    if (local == "en") {
      setLocal("ar");
      i18n.changeLanguage("ar");
      dayjs.locale("ar");
    } else {
      setLocal("en");
      i18n.changeLanguage("en");
      dayjs.locale("en");
    }

    setDateAndTime(dayjs().format(" h:mm:ss a | D MMMM YYYY"));
  }

  useEffect(() => {
    i18n.changeLanguage(local);
  }, []);

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
        <div className={darkMode ? "div-dark" : "div-light"}>
          <div
            className="div-header w-full max-w-[70%] bg-[#074799] rounded-[50px] text-center mx-auto overflow-hidden mt-5"
            dir={direction}
          >
            <header className="header flex justify-between items-center px-4 py-[15px] flex-wrap">
              {/* العنوان */}
              <Typography
                sx={{
                  fontSize: {
                    xs: "1.5rem",
                    sm: "1.5rem",
                    md: "2rem",
                    lg: "3rem",
                  },
                  color: "white",
                }}
                variant="h3"
                className="text-white  text-lg sm:text-2xl md:text-4xl lg:text-5xl"
              >
                {t("Weather")}
              </Typography>

              {/* عناصر التحكم */}
              <div className="flex items-center space-x-4 sm:space-x-6">
                <FormControlLabel
                  className="bg-orange-500 rounded-md cursor-pointer"
                  onClick={DarkMode}
                  control={<MaterialUISwitch checked={darkMode} />}
                />

                {/* زر تغيير اللغة */}
                <Button
                  style={{ color: "white", fontSize: "25px" }}
                  onClick={handleLanguageClick}
                  className="!text-white text-lg"
                  variant="text"
                >
                  {local == "en" ? "AR" : "EN"}
                </Button>
              </div>
            </header>
          </div>

          <main className="element" style={{ fontFamily: "NotoSans" }}>
            <Container maxWidth="sm">
              {/* CONTEANT CONTAINER */}
              {/* STAR */}
              {darkMode && (
                <>
                  <Star sx={{ top: "20%", left: "20%" }} />
                  <Star sx={{ top: "30%", left: "50%" }} />
                  <Star sx={{ top: "30%", left: "50%" }} />
                  <Star sx={{ top: "60%", left: "30%" }} />
                  <Star sx={{ top: "35%", left: "60%" }} />
                  <Star sx={{ top: "20%", left: "80%" }} />
                  <Star sx={{ top: "80%", left: "10%" }} />
                  <Star sx={{ top: "88%", left: "80%" }} />
                  <Star sx={{ top: "50%", left: "90%" }} />
                </>
              )}

              {/* Moon */}
              {darkMode && (
                <Moon
                  sx={{
                    top: "5%",
                    left: "5%",
                    width: "100px",
                    height: "100px",
                    backgroundColor: "#f0f0f0",
                  }}
                />
              )}

              {/* Planet */}
              {darkMode && (
                <>
                  <Planet
                    sx={{
                      top: "20%",
                      left: "30%",
                      width: "15px",
                      height: "15px",
                      backgroundColor: "#ff5722",
                    }}
                  />
                  <Planet
                    sx={{
                      top: "40%",
                      left: "70%",
                      width: "30px",
                      height: "30px",
                      backgroundColor: "#4caf50",
                    }}
                  />
                  <Planet
                    sx={{
                      top: "60%",
                      left: "80%",
                      width: "25px",
                      height: "25px",
                      backgroundColor: "#2196f3",
                    }}
                  />
                  <Planet
                    sx={{
                      top: "50%",
                      left: "10%",
                      width: "45px",
                      height: "45px",
                      backgroundColor: "#ff9800",
                    }}
                  />
                  <Planet
                    sx={{
                      top: "80%",
                      left: "20%",
                      width: "60px",
                      height: "60px",
                      backgroundColor: "#ff5722",
                    }}
                  />
                  <Planet
                    sx={{
                      top: "20%",
                      left: "90%",
                      width: "50px",
                      height: "50px",
                      backgroundColor: "#e91e63",
                    }}
                  />
                </>
              )}

              {!darkMode && <Sun sx={{ top: "5%", left: "90%" }} />}
              {!darkMode && <Cloud style={{ top: "20%", left: "25%" }} />}
              {/* {!darkMode && <Cloud style={{ top: "15%", left: "50%" }} />} */}
              {!darkMode && <Cloud style={{ top: "30%", left: "90%" }} />}
              {!darkMode && <Cloud style={{ top: "50%", left: "10%" }} />}
              {!darkMode && <Cloud style={{ top: "40%", left: "70%" }} />}

              <div className="div-content">
                {/* CARD */}
                <div
                  dir="rtl"
                  className=" rounded-[10px] p-[10px] shadow-[0px_11px_1px_rgba(0,0,0,0.05)]"
                  style={{
                    width: "95%",
                    background: "#133E87",
                    color: "white",
                  }}
                >
                  {/* CONTENT */}
                  <div>
                    {/* CITY & TIME */}
                    <Typography
                      style={{
                        fontWeight: 600,
                        marginLeft: "20px",
                        textAlign: "center",
                      }}
                      variant="h5"
                    >
                      {dateAndTime}
                    </Typography>
                    <div
                      className="flex items-end "
                      dir="rtl"
                      style={{ justifyContent: " center" }}
                    >
                      <Autocomplete
                        getOptionLabel={(option) =>
                          i18n.language === "en" ? option.name : t(option.name)
                        }
                        value={selectedCity}
                        onChange={(event, newValue) =>
                          setSelectedCity(newValue)
                        }
                        disablePortal
                        disableClearable
                        options={cities}
                        sx={{
                          width: 300,
                          margin: "20px",
                          "& .MuiAutocomplete-inputRoot": {
                            backgroundColor: "#f5f5f5",
                            borderRadius: "12px",
                          },
                          "& .MuiAutocomplete-popupIndicator": {
                            color: "#4A90E2",
                          },
                          "& .MuiAutocomplete-clearIndicator": {
                            color: "#4A90E2",
                          },
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            className="input-custom"
                          />
                        )}
                      />
                    </div>

                    <hr />

                    {/* CONTAINER OF DEGREE + CLOUD ICON */}

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "center",
                        alignItems: "center",
                      }}
                    >
                      {/* DEGREE & DESCRIPTION */}
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        {/* TEMP */}

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          {/* NAME */}
                          <Typography
                            style={{ fontWeight: 600, marginTop: "20px" }}
                            variant="h2"
                          >
                            {t(selectedCity.name)}
                          </Typography>

                          <Typography variant="h1" dir="rtl">
                            {temp.number}°
                          </Typography>

                          <img
                            style={{
                              width: "150px",
                              height: "150px",
                            }}
                            src={temp?.icon}
                            alt="weather icon"
                          />

                          <Typography
                            className="mr-[20px]"
                            variant="h4"
                            dir="rtl"
                            style={{ margin: "20px" }}
                          >
                            {t(temp.description)}
                          </Typography>

                          {/* TODO: TEMP IMAGE */}
                        </div>
                        {/* === TEMP === */}
                        {/* MIN & MAX */}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "90%",
                          }}
                        >
                          <Typography
                            className="mr-[20px]"
                            variant="h5"
                            dir="rtl"
                          >
                            {t("humidity")} <WaterDropIcon />
                            <span style={{ display: "block" }}>
                              {temp.humidity}%
                            </span>
                          </Typography>
                          <Typography
                            className="mr-[20px]"
                            variant="h5"
                            dir="rtl"
                          >
                            {t("wind speed")} <AirIcon />
                            <span style={{ display: "block" }}>
                              {temp.wind} km / h
                            </span>
                          </Typography>
                        </div>
                      </div>
                      {/* === DEGREE & DESCRIPTION === */}
                    </div>
                    {/* === CONTAINER OF DEGREE + CLOUD ICON === */}
                  </div>
                </div>
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
