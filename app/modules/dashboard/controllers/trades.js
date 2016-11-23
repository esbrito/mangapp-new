
dashboard.controller("tradesController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash','$firebaseArray','$firebaseObject',
function ($rootScope, $scope, $state, $location, dashboardService, Flash, $firebaseArray, $firebaseObject) {
    var vm = this;

    var ref = firebase.database().ref('trades/');
    var tradesList = $firebaseArray(ref);
    tradesList.$loaded().then(function(){
        console.log(tradesList)
        $scope.trades = tradesList;
    });

    var ref = firebase.database().ref('mangas/');
    var mangaList = $firebaseArray(ref);
    mangaList.$loaded().then(function(){
        console.log(mangaList)
        $scope.mangas = mangaList;
    });

    $scope.offer = function(trade,manga,mangaID) {
        var ref = firebase.database().ref('trades/'+trade.$id)
        var tradeDB = $firebaseObject(ref);

        tradeDB.$loaded().then(function(){
            tradeDB.mangaReceiverIsInterested = {'id': manga.$id, 'manga': manga}

            tradeDB.$save().then(function(ref) {
                Flash.create('success', 'Interesse enviado ao usuário!', 'large-text');
            }, function(error) {
                console.log("Error:", error);
            });

        })
    }

}]);
