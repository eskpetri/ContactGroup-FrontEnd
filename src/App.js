import './App.css';
import MyFunction from './MyFunction';
import MyHook from './MyHook';
import MyClass from './MyClass';

function App() {
  return (
    <div className="App">
      <h1>Frontend esimerkki</h1>
      <MyFunction fname="Teppo" lname="Testi"/>
      <MyHook etunimi="Hessu"/>
      <MyClass fname="ClasTester"/>
    </div>
  );
}

export default App;
