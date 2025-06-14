import React from "react";
import { styled } from "@mui/material/styles";

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
  width: "100px",
  height: "100px",
  backgroundColor: "#ffeb3b",
  borderRadius: "50%",
  boxShadow: `
    0 0 20px 5px rgba(255, 235, 59, 0.7),   // هالة خارجية ناعمة
    0 0 40px 15px rgba(255, 235, 59, 0.4),  // هالة أوسع وأخف
    0 0 60px 25px rgba(255, 235, 59, 0.2)   // هالة كبيرة متدرجة وشفافة
  `,
  transition: "all 0.3s ease",

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
    0 0 25px rgba(255, 255, 255, 0.7),
    inset 5px 5px 15px rgba(255, 255, 255, 0.8),
    inset -5px -5px 20px rgba(255, 255, 255, 0.4)
  `,
  background: `
    radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0.5)),
    radial-gradient(circle at 60% 60%, rgba(255, 255, 255, 0.3), rgba(0, 0, 0, 0.6))
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

export default function StarsMoonPlanets({ darkMode }) {
  return (
    <div>
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
    </div>
  );
}
