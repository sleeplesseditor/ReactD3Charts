import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './styles.css';
import Header from './components/Header/Header';
import PieChartPage from './pages/PieChartPage';
import BarChartPage from './pages/BarChartPage';
import ChordPage from './pages/ChordPage';

function App() {

  return (
    <Router>
      <Header />
        <br />
        <Switch>
          <Route exact path="/" component={PieChartPage} />
          <Route path="/barchart" component={BarChartPage} />
          <Route path="/chordchart" component={ChordPage} />
        </Switch>
    </Router>
  );
}

export default App;
