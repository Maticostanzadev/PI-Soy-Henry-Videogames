import React from "react"
import './App.css';
import { Route } from "react-router-dom";
import Home from './components/Home/Home'
import InitialPage from './components/InitialPage/InitialPage'
import Details from "./components/Details/Details";


function App() {
  return (
    <div>
      <Route path="/" exact component={InitialPage} />
      <Route path="/videogames" exact component={Home} />
      <Route path="/videogame/:id" component={Details} />
    </div>
  );
}



// function App() {
//   return (
//     <div className="App">
//       <h1>Henry Videogames</h1>
//     </div>
//   );
// }

export default App;
