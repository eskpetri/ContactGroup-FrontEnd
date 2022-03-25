import './App.css';
import MyFunction from './MyFunction';
import MyClass from './MyClass';
import MyHook from './MyHook';
import Login from './Login';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li> <Link to="/myfunction">MyFunction</Link> </li>
          <li> <Link to="/myclass">MyClass</Link> </li>
          <li> <Link to="/myhook">MyHook</Link>  </li>
          <li> <Link to="/login">Login</Link>  </li>
        </ul>
        <hr />
      </div>
      <Routes>
        <Route exact path="/myfunction" element={<MyFunction fname="Teppo"/>} />
        <Route exact path="/myclass" element={<MyClass fname="Teppo"/>} />
        <Route exact path="/myhook" element={<MyHook fname="Teppo"/>} />
        <Route exact path="/login" element={<Login/>} />
      </Routes>
    </Router>

  );
}

export default App;
