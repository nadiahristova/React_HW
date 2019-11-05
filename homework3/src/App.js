import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Link,
} from 'react-router-dom';

import * as pages from './pages';

function Home() {
  return (
    <h1>
      <span role="img" aria-label="hi">
        👋
      </span>
    </h1>
  );
}
export default function App() {
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
