angular.module("firebaseTestApp")
.controller("logoutDummyCtrl", function($scope) {

	$scope.loggedUser = "None"
	console.log("logout ctrl loaded")
	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyDjAxvojQESjdCa2jX6hP3PEaa6jk3MLx4",
		authDomain: "manga-trades.firebaseapp.com",
		databaseURL: "https://manga-trades.firebaseio.com",
		storageBucket: "manga-trades.appspot.com",
		messagingSenderId: "996783263888"
	};
	firebase.initializeApp(config);
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {

				$scope.loggedUser = firebase.auth().currentUser.displayName;
				console.log($scope.loggedUser)
		} else {


		}
	});


	$scope.logout = function() {
		firebase.auth().signOut().then(function() {
			// Sign-out successful.
		}, function(error) {
			// An error happened.
		});

		window.location = 'index.html';
	}
});
