import React, { Component } from 'react';

import ToDo from './components/pages/ToDo/ToDo';

import './App.css';
import 'antd/dist/antd.css';

// function App() {
//   return <div className="App"></div>;
// }

class App extends Component {
  render() {
    return (
      <div className="App">
        <ToDo />
      </div>
    );
  }
}

export default App;
