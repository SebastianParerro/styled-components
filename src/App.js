import NavBar from "./components/navbar/NavBar";
import { BrowserRouter } from "react-router-dom";
import Router from "./components/router";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Router />
      </div>
    </BrowserRouter>
  );
}

export default App;
