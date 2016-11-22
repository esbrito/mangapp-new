angular.module("firebaseTestApp")
	.directive("signUpForm", function() {
		return {
			link: function(scope, element, attrs) { },
			replace: true,
			templateUrl: "app/signUpForm/signUpForm.template.html"
		}
	});
