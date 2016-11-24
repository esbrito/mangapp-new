
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


    $scope.trade = function(manga, id) {
        var createTrade = ({'state': 'received', 'sender': $rootScope.userDB.uid, 'receiver': manga.userUid, 'mangaSenderIsInterested': {'id': manga.$id, 'manga': manga}, 'mangaReceiverIsInterested' : null})
        var ref = firebase.database().ref('trades/');

        var tradesList = $firebaseArray(ref);
        tradesList.$loaded().then(function(){
            // add an item
            tradesList.$add(createTrade).then(function(ref) {
              swal({
                title: "Interesse enviado ao usuário!",
                timer: 2000,
                showConfirmButton: false });
            });

        });


    }


}]);
