import "./App.css";
import MainContent from "../components/MainContent";
import { Container } from "@mui/material";

function App() {
  return (
    <>
      <div
        style={{
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="xl">
          <MainContent />
        </Container>
      </div>
    </>
  );
}

export default App;
