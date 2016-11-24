
dashboard.controller("searchController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash','$firebaseArray','notification',
function ($rootScope, $scope, $state, $location, dashboardService, Flash, $firebaseArray, notification) {
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
        notification.send("Você recebeu proposta de troca. Verificar no menu 'Trocas'", manga.userUid);
        var tradesList = $firebaseArray(ref);
        tradesList.$loaded().then(function(){
            // add an item
            tradesList.$add(createTrade).then(function(ref) {
                Flash.create('success', 'Interesse enviado ao usuário!', 'large-text');

            });

        });


    }


}]);
