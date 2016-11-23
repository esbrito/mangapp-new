
dashboard.controller("searchController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash','$firebaseArray',
function ($rootScope, $scope, $state, $location, dashboardService, Flash, $firebaseArray) {
    var vm = this;

    $scope.search = function(query) {
        console.log(query);
        $scope.searchItem = query;
        var ref = firebase.database().ref('mangas/');
        var mangaList = $firebaseArray(ref);
        mangaList.$loaded().then(function(){
            console.log(mangaList)
            $scope.mangas = mangaList;

        });
}

}]);
