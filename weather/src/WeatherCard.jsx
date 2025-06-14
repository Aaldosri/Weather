import React from "react";
import Typography from "@mui/material/Typography";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

// ICONS
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";

import { useState } from "react";

export default function WeatherCard({
  dateAndTime,
  selectedCity,
  setSelectedCity,
  cities,
  temp,
  t,
  i18n,
}) {
  const [iconLoaded, setIconLoaded] = useState(false);

  return (
    <div
      dir="rtl"
      className="rounded-[10px] p-[10px] shadow-[0px_11px_1px_rgba(0,0,0,0.05)]"
      style={{
        width: "95%",
        background: "#133E87",
        color: "white",
        transform: window.innerWidth <= 375 ? "scale(0.8)" : "scale(1)",
        transformOrigin: "top center",
        marginTop: window.innerWidth <= 375 ? "15vh" : "initial",
      }}
    >
      <Typography
        style={{ fontWeight: 600, marginLeft: "20px", textAlign: "center" }}
        variant="h5"
      >
        {dateAndTime}
      </Typography>

      <div
        className="flex items-end"
        dir="rtl"
        style={{ justifyContent: "center" }}
      >
        <Autocomplete
          getOptionLabel={(option) =>
            i18n.language === "en" ? option.name : t(option.name)
          }
          value={selectedCity}
          onChange={(event, newValue) => setSelectedCity(newValue)}
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

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              style={{ fontWeight: 600, marginTop: "20px" }}
              variant="h2"
            >
              {t(selectedCity.name)}
            </Typography>

            <Typography variant="h1" dir="rtl">
              {temp.number}°
            </Typography>

            <div
              style={{ width: "150px", height: "150px", position: "relative" }}
            >
              {!iconLoaded && (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200 rounded-full animate-pulse">
                  <span className="text-sm text-gray-500">{t("Loading")}</span>
                </div>
              )}

              <img
                src={temp?.icon}
                alt={t(temp?.description || "weather")}
                onLoad={() => setIconLoaded(true)}
                style={{
                  width: "150px",
                  height: "150px",
                  display: iconLoaded ? "block" : "none",
                }}
              />
            </div>

            <Typography
              className="mr-[20px]"
              variant="h4"
              dir="rtl"
              style={{ margin: "20px" }}
            >
              {t(temp.description)}
            </Typography>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "90%",
            }}
          >
            <Typography className="mr-[20px]" variant="h5" dir="rtl">
              {t("humidity")} <WaterDropIcon />
              <span style={{ display: "block" }}>{temp.humidity}%</span>
            </Typography>
            <Typography className="mr-[20px]" variant="h5" dir="rtl">
              {t("wind speed")} <AirIcon />
              <span style={{ display: "block" }}>{temp.wind} km / h</span>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
