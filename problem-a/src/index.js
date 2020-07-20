import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css'; //using FA 4.7 atm

import App from './App'; //so our app styling is applied second

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

//import and configure firebase here
const firebaseConfig = {
    apiKey: "AIzaSyAsbqPdXtzLtIizXcaHTok9ZGM8KNR4o5Y",
    authDomain: "chirper-lng22.firebaseapp.com",
    databaseURL: "https://chirper-lng22.firebaseio.com",
    projectId: "chirper-lng22",
    storageBucket: "chirper-lng22.appspot.com",
    messagingSenderId: "726223618494",
    appId: "1:726223618494:web:d98a1d70c6e14eec2d79ef",
    measurementId: "G-TV0JB5Y1Q7"
  };

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));