

dashboard.controller("myaccountController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash', '$firebaseArray',
function ($rootScope, $scope, $state, $location, dashboardService, Flash, $firebaseArray) {
    var vm = this;

    $scope.showAccountinfo = function(user){
      $scope.show = true;
      $scope.Username = user.Username;
      $scope.Email = user.Email;
      $scope.addr = user.addr;
      $scope.id = user.$id;
    }

    $scope.editFormSubmit = function(user){
      var id = $scope.id;
      console.log($scope.id);
      var record = user;
      record.Username = $scope.Username;
      record.Email = $scope.Email;
      record.addr = $scope.addr;

      $scope.user.$save(record);
    }
}]);
