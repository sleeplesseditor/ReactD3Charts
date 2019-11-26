import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './styles.css';
import Header from './components/Header/Header';
import PieChartPage from './pages/PieChartPage';
import BarChartPage from './pages/BarChartPage';
import ChordPage from './pages/ChordPage';
import AreaChartPage from './pages/AreaChartPage';

// import TransitionPage from './pages/TransitionPage';

function App() {

  return (
    <Router>
      <Header />
        <br />
        <Switch>
          <Route exact path="/" component={PieChartPage} />
          <Route path="/barchart" component={BarChartPage} />
          <Route path="/chordchart" component={ChordPage} />
          <Route path="/areachart" component={AreaChartPage} />
          {/* <Route path="/transition" component={TransitionPage} /> */}
        </Switch>
    </Router>
  );
}

export default App;
