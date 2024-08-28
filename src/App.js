import { NavComponent } from "./Components/NavComponent";
import { Header } from "./Components/Header";
import { Search } from "./Components/Search";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <NavComponent />
      <Header />
      <Search />
    </>
  );
}

export default App;
