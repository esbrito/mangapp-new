angular.module("firebaseTestApp")
.controller("logInFormCtrl", function($scope) {
	console.log("login ctrl loaded")


	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			if($scope.user!=undefined){
				firebase.database().ref('users/'+$scope.user.CPF).once('value', function(snapshot) {
					if (snapshot.exists()) {
						alert("CPF já cadastrado")
						var user = firebase.auth().currentUser;
						user.delete().then(function() {
							$scope.user = null;
						}, function(error) {
							// An error happened.
						});		
					}
					else{
						console.log("Criando dados do usuário no banco de dados...")
						if($scope.user!=undefined)
						firebase.database().ref('users/'+$scope.user.CPF).set({
							user: $scope.user
						});

						//Send to page
						window.location = '/../../login.html';
					}

				});
			}else{
				window.location = '/../../login.html';
			}
		} else {


		}
	});
	$scope.logIn = function() {
		$scope.user = null;
		firebase.auth().signInWithEmailAndPassword($scope.userLog.emailLog, $scope.userLog.passwordLog).catch(function(error) {
			// Handle Errors here.
			alert(error.message)
			var errorCode = error.code;
			var errorMessage = error.message;
			// ...
		});



	}

	$scope.returnSame = function(arg) {
		return arg;
	};
});
