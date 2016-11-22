describe('signUpFormCtrl dummy tests', function() {

	beforeEach(angular.mock.module('firebaseTestApp'));

	var $controller;
	var $scope;
	var controller;

	beforeEach(angular.mock.inject(function(_$controller_) {
		$controller = _$controller_;
		$scope = {};
		controller = $controller('signUpFormCtrl', { $scope: $scope });
	}));

	it('returnSame(arg) should return arg', function() {
		expect($scope.returnSame('bla')).toEqual('bla');
	});

});
