import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Link,
} from 'react-router-dom';
import './App.css';

import * as pages from './pages';

function Home() {
  return (
    <h1 style={{textAlign: "center"}}>
      <span>
        Homework Lesson 2
      </span>
    </h1>
  );
}

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
          {Object.keys(pages).map((name, i) => (
            <NavLink to={`/${name.toLowerCase()}`} key={i}>
              {name}
            </NavLink>
          ))}
        </nav>
        <Switch>
          {Object.keys(pages).map((name, i) => (
            <Route path={`/${name.toLowerCase()}`} key={i}>
              {React.createElement(pages[name])}
            </Route>
          ))}
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;