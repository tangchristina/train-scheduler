// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new trains - then update the html + update the database
// 3. Create a way to retrieve trains from the train database.
// 4. Create a way to calculate the next arrival time.
// 5. Use moment.js formatting to calcuate the minutes away using the difference from the current time to arrival time.
//

// 1. Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyAS0G0inVWsuf_6HbbPPI9dHQntUBCu9AI",
    authDomain: "click-counter-a518a.firebaseapp.com",
    databaseURL: "https://click-counter-a518a.firebaseio.com",
    projectId: "click-counter-a518a",
    storageBucket: "",
    messagingSenderId: "222327751854",
    appId: "1:222327751854:web:e432d5923e3267552c193f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// 2. Button for adding trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

    // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var trainTime = moment($("#time-input").val().trim(), "HH:mm").format                  ("HH:mm");
  var frequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    trainName: trainName,
    destination: destination,
    trainTime: trainTime,
    frequency: frequency
  };

    // Uploads train data to the database
    database.ref().push(newTrain);

    console.log(newTrain.trainName);
    console.log(newTrain.destination);
    console.log(newTrain.trainTime);
    console.log(newTrain.frequency);

    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
  });
