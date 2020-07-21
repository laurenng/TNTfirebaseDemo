import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomeScreen from './homeScreen';
import firebase from 'firebase/app';
import 'firebase/database';
import InputForm from './inputForm';
import BarChart from './GraphComponent';


function App() {
  return (
    <div className="App">
      <HomeScreen count={0}></HomeScreen>
      <InputForm></InputForm>
      <p>NEXT PART: D3 library experiment</p>
      <BarChart data={[4,2,6,2]} size={[500,500]} />
    </div>
  );
}

export default App;
