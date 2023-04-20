import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserHome from "./routes/userHome/UserHome";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<UserHome />} />
      </Routes>
    </Router>
  );
}

export default App;
