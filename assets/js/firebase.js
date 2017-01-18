// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCrSSIa75Z_tRPdFlJf41l_MqELRlLcNj0",
    authDomain: "train-rcb.firebaseapp.com",
    databaseURL: "https://train-rcb.firebaseio.com",
    storageBucket: "train-rcb.appspot.com",
    messagingSenderId: "85717420165"
  };
  firebase.initializeApp(config);


  // database reference

  var database = firebase.database();


 // variables for schedule 


 var bigOne = document.getElementById('bigOne'); //header test
 var trainName = document.getElementById('trainName'); // trainName
 var dest = document.getElementById('dest'); // destination
 var firstTrainTime = document.getElementById('firstTrainTime'); // firstTrainTime
 var freq = document.getElementById('freq'); // frequency



var dbRef = firebase.database().ref().child('trainName');
 dbRef.on('value', snap => trainName.innerText = snap.val());

var dbRef = firebase.database().ref().child('dest');
 dbRef.on('value', snap => dest.innerText = snap.val());
 
var dbRef = firebase.database().ref().child('firstTrainTime');
 dbRef.on('value', snap => firstTrainTime.innerText = snap.val());

var dbRef = firebase.database().ref().child('freq');
 dbRef.on('value', snap => freq.innerText = snap.val());

var dbRef = firebase.database().ref().child('text');
 dbRef.on('value', snap => bigOne.innerText = snap.val());



 










