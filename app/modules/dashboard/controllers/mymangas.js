

dashboard.controller("mymangasController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService','$firebaseObject','$firebaseArray',
function ($rootScope, $scope, $state, $location, dashboardService, $firebaseObject, $firebaseArray) {
    var vm = this;


    var ref = firebase.database().ref('mangas/');
    var mangaList = $firebaseArray(ref);
    mangaList.$loaded().then(function(){
        console.log(mangaList)
        $scope.mangas = mangaList;
    });


    $scope.remove = function(id) {
        console.log(id);
        console.log("deleting...");
        var ref = firebase.database().ref('mangas/');
        var mangaList = $firebaseArray(ref);
        mangaList.$loaded().then(function(){
            mangaList.$remove(id).then(function(){
            swal({
              title: "Manga deletado com sucesso!",
              timer: 2000,
              showConfirmButton: false });
        })
    })
}
}]);
