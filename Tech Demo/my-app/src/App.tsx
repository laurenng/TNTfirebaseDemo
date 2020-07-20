import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomeScreen from './homeScreen';
import firebase from 'firebase/app';
import 'firebase/database';
import InputForm from './inputForm';
import GraphComponent from './GraphComponent';


function App() {
  return (
    <div className="App">
      <HomeScreen count={0}></HomeScreen>
      <InputForm></InputForm>
      <p>NEXT PART: D3 library experiment</p>
    </div>
  );
}

export default App;
