import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";

function App() {
  return (
    <>
      <div>
        <header></header>
      </div>

      <main className="w-screen">
        <Container maxWidth="sm" style={{ background: "orange" }}>
          {/* CONTEANT CONTAINER */}

          <div className="h-screen flex justify-center items-center bg-green-500">
            {/* CARD */}
            <div className="bg-[rgba(250,235,215,0.418)] rounded-[10px] p-[10px] shadow-[0px_11px_1px_rgba(0,0,0,0.05)]">
              {/* CONTENT */}
              <div>
                {/* CITY & TIME */}
                <div className="flex items-end justify-start p-3" dir="rtl">
                  <Typography className="mr-[20px]" variant="h2">
                    الرياض
                  </Typography>
                  <Typography className="mr-[20px]" variant="h5">
                    الاحد 13-2-2025
                  </Typography>
                </div>
                <hr />

                {/* CONTAINER OF DEGREE + CLOUD ICON */}

                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  {/* DEGREE & DESCRIPTION */}
                  <div>
                    {/* TEMP */}
                    <div>
                      <Typography className="mr-[20px]" variant="h1" dir="rtl">
                        11
                      </Typography>

                      {/* TODO: TEMP IMAGE */}
                    </div>
                    {/* === TEMP === */}
                    <Typography className="mr-[20px]" variant="h2" dir="rtl">
                      سحابة
                    </Typography>
                    {/* MIN & MAX */}
                    <div>
                      <Typography className="mr-[20px]" variant="h6" dir="rtl">
                        الصغرى: 25
                      </Typography>

                      <Typography className="mr-[20px]" variant="h6" dir="rtl">
                        الكبرى: 30
                      </Typography>
                    </div>
                  </div>
                  {/* === DEGREE & DESCRIPTION === */}

                  <CloudIcon
                    className="text-[200px] text-white"
                    style={{ fontSize: "200px" }}
                  />
                </div>
                {/* === CONTAINER OF DEGREE + CLOUD ICON === */}
              </div>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}

export default App;
