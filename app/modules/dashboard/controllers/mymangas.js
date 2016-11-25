

dashboard.controller("mymangasController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash','$firebaseObject','$firebaseArray',
function ($rootScope, $scope, $state, $location, dashboardService, Flash, $firebaseObject, $firebaseArray) {
  var vm = this;


  var ref = firebase.database().ref('mangas/');
  var mangaList = $firebaseArray(ref);
  mangaList.$loaded().then(function(){
    console.log(mangaList)
    $scope.mangas = mangaList;
  });

  $scope.modal = function(manga) {
      $scope.modalmanga = manga;
      console.log($scope.modalmanga);
  }

  $scope.remove = function(manga) {
    console.log("deleting...");
    var mangaID = manga.$id;
    console.log(mangaID);
    var ref = firebase.database().ref('mangas/'+manga.$id);
    var mangaObject = $firebaseObject(ref);

    mangaObject.$loaded().then(function(){
      mangaObject.$remove().then(function(){
        Flash.create('danger', 'Mangá Removido!', 'large-text');
      }, function(error) {
        console.log("Error:", error);
      });
    });
  }
}]);
