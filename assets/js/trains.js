// ****************************

//global debug console

var debug = false;


$( document ).ready(function() {

var train = '';
var destination = '';
var departTrain = '';
var frequency = '';

//Firebase URL Listed Below
var dataRef = new Firebase("https://train-rcb-3.firebaseio.com/");


//On Button Click Add Train Data
	$('#addTrainBtn').on('click', function() {
	  	train = $('#trainNameInput').val();
		destination = $('#destinationInput').val();
		departTrain = $('#departTrainInput').val();
		frequency = $('#frequencyInput').val();

	// Empties Fields After Submit
		$('#trainNameInput').val('');
		$('#destinationInput').val('');
		$('#departTrainInput').val('');
		$('#frequencyInput').val('');

		dataRef.push({

			train: train,
			destination: destination,
			departTrain: departTrain,
			frequency: frequency

		});

		return false;

// End Click

	});

// Child Added Function for Data

		dataRef.on("child_added", function(snapshot) {

		// Logs all of the user-input data to the console //debug console

		if (debug) {

		console.log(snapshot.val().train + " = train");
		console.log(snapshot.val().destination + " = destination");
		console.log(snapshot.val().departTrain + " = nextTrain");
		console.log(snapshot.val().frequency +" = frequency");
		}

		// Variables assigned to equal value of child_added inputs
		var train = snapshot.val().train;
		var destination = snapshot.val().destination;
		var departTrain = snapshot.val().departTrain;
		var frequency = snapshot.val().frequency;

		// Moment JS in Military
		// var timeHour = moment().format('H');
		// var timeMin = moment().format('m');
		// var ftHour = moment(departTrain, "HH:mm").format('H');
		// var ftMin = moment(departTrain, "HH:mm").format('m');

		// Moment JS in Civilian
		var timeHour = moment().format('h');
		var timeMin = moment().format('m');
		var ftHour = moment(departTrain, "hh:mm").format('h');
		var ftMin = moment(departTrain, "hh:mm").format('m');

		var ftMoment = (ftHour * 60) + (ftMin * 1);
		var timeMoment = (timeHour * 60) + (timeMin * 1);

	// Find how much time has passed since the first train
		var diff = timeMoment - ftMoment;

	// Find how many trains have come so far
		var trainsSinceFirst = Math.floor(diff/frequency);

	// Find how long until the next train comes
		var nextArrival = ((trainsSinceFirst + 1) * frequency) + ftMoment;
		
	// Handle negative values for minAway and nextArrival
		if (ftMoment < timeMoment) {
			var minAway = nextArrival - timeMoment;
			// var nextArrival = moment().add(minAway, 'minutes').format('HH:mm');
			var nextArrival = moment().add(minAway, 'minutes').format('h:m');

		} 
		else {
			var nextArrival = departTrain;
			var minAway = ftMoment - timeMoment;
		};

		// Appends new information to table
	$("#trainData").append("<tr><td>" + train + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minAway + "</td></tr>");

			}, function (errorObject) {
					console.log('The read failed' + errorObject.code);

		}); 




// use Moment.js to display current date in a div (#displayMoment)

(function () {

var now = moment();


var eDisplayMoment = document.getElementById('displayMoment');
eDisplayMoment.innerHTML = now.format('D MMM YYYY h:mm a');
})();





// End of Javascript

});








