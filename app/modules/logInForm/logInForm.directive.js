angular.module("firebaseTestApp")
	.directive("logInForm", function() {
		return {
			link: function(scope, element, attrs) { },
			replace: true,
			templateUrl: "app/logInForm/logInForm.template.html"
		}
	});
