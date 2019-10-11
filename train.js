// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new trains - then update the html + update the database
// 3. Create a way to retrieve trains from the train database.
// 4. Create a way to calculate the next arrival time.
// 5. Use moment.js formatting to calcuate the minutes away using the difference from the current time to arrival time.
//
$(document).ready(function () {
    // 1. Initialize variables and Firebase

    var trainName = "";
    var destination = "";
    var trainTime;
    var frequency = 0;
    

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
    $("#add-train-btn").on("click", function (event) {
        event.preventDefault();

        // Grabs user input
        trainName = $("#train-name-input").val().trim();
        destination = $("#destination-input").val().trim();
        trainTime = moment($("#time-input").val().trim(), "HH:mm").format("X");;
        frequency = $("#frequency-input").val().trim(), "HH:mm";


        // Creates local "temporary" object for holding train data
        var newTrain = {
            trainName: trainName,
            destination: destination,
            trainTime: trainTime,
            frequency: frequency
        };

        // Calculating the arrival time based on frequency and the current time
       
        //Can't get my minutesTillTrain to work
    

        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var remainder = diffTime % frequency;
        console.log(remainder);

        // Minute Until Train
        var minutesTillTrain = frequency - remainder;
        console.log("MINUTE(S) TILL TRAIN: " + minutesTillTrain);


        // Next Train
        var nextTrain = moment().add(minutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

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

        // Create the new row
        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(destination),
            $("<td>").text(frequency),
            $("<td>").text(moment(nextTrain).format("hh:mm")),
            $("<td>").text(minutesTillTrain)
            // 
        );

        // Append the new row to the table
        $("#train-table > tbody").append(newRow);
    });




});