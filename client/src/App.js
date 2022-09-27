import React from "react"
import './App.css';
import { Route } from "react-router-dom";
import Home from './components/Home/Home'
import InitialPage from './components/InitialPage/InitialPage'
import Details from "./components/Details/Details";
import Create from "./components/Create/Create";
import Nav from "./components/Nav/Nav.jsx"
import Warning from "./components/Warning/Warning";


function App() {
  return (
    <div>
      <Route path="/videogames" component={Nav} />
      <Route path="/" exact component={InitialPage} />
      <Route path="/videogames" exact component={Home} />
      <Route path="/videogames/create" exact component={Create} />
      <Route path="/videogames/detail/:id" exact component={Details} />
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
