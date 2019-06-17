import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './styles.css';
import PieChartPage from './pages/PieChartPage';
import BarChartPage from './pages/BarChartPage';

function App() {

  return (
    <Router>
      <div className="navbar">
          <Link 
            to={"/"}
            style={{ textDecoration: 'none' }}
          >
            <p className="nav_header">React D3 Charts</p>
          </Link>
          <ul className="navbar-links">
              <li>
                  <Link to={"/"}>
                      <p className="nav_header">Pie Chart</p>
                  </Link>
              </li>
              <li>
                  <Link to={"/barchart"}>
                      <p className="nav_header">Bar Chart</p>
                  </Link>
              </li>
          </ul>
      </div>
        <Switch>
          <Route exact path="/" component={PieChartPage} />
          <Route path="/barchart" component={BarChartPage} />
        </Switch>
    </Router>
  );
}

export default App;
