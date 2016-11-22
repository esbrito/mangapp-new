angular.module("firebaseTestApp")
.controller("signUpFormCtrl", function($scope) {

	$scope.signUp = function() {



		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				console.log("Usuário autenticado...")
				

			} else {
				console.log($scope.user);
/*				firebase.database().ref('users/'+$scope.user.CPF).once('value', function(snapshot) {
					console.log("Verificando existencia de CPF...")
					if (!snapshot.exists()) { */
						console.log("Criando autenticação do usuário...")
						firebase.auth().createUserWithEmailAndPassword($scope.user.email, $scope.user.password).catch(function(error) {
							console.log("Error creating user")
							alert(error.message);
						});


					/*}else{
						alert("CPF já cadastrado")
					}
				});*/

			}
		});
	}

	$scope.returnSame = function(arg) {
		return arg;
	};
});
