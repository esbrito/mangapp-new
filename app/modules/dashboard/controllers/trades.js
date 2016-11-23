
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

    $scope.accept = function(trade) {
        var ref = firebase.database().ref('trades/'+trade.$id)
        var tradeDB = $firebaseObject(ref);

        tradeDB.$loaded().then(function(){
            tradeDB.state = "accepted"

            tradeDB.$save().then(function(ref) {
                Flash.create('success', 'Interesse enviado ao usuário!', 'large-text');
            }, function(error) {
                console.log("Error:", error);
            });

        })
    }

    $scope.trackReceiver = function(trade,rastreio) {

        if(rastreio.length != 13)
        {
            Flash.create('danger', 'Código inválido!', 'large-text');
        }
        else{
            var ref = firebase.database().ref('trades/'+trade.$id)
            var tradeDB = $firebaseObject(ref);
            tradeDB.$loaded().then(function(){
                tradeDB.receiverTrack = rastreio;

                tradeDB.$save().then(function(ref) {
                    Flash.create('success', 'Código Registrado!', 'large-text');
                }, function(error) {
                    console.log("Error:", error);
                });

            })
        }


    }


    $scope.trackSender = function(trade,rastreio) {

        if(rastreio.length != 13)
        {
            Flash.create('danger', 'Código inválido!', 'large-text');
        }
        else{
            var ref = firebase.database().ref('trades/'+trade.$id)
            var tradeDB = $firebaseObject(ref);
            tradeDB.$loaded().then(function(){
                tradeDB.senderTrack = rastreio;

                tradeDB.$save().then(function(ref) {
                    Flash.create('success', 'Código Registrado!', 'large-text');
                }, function(error) {
                    console.log("Error:", error);
                });

            })
        }


    }

    $scope.confirmSender = function(trade) {


            var ref = firebase.database().ref('trades/'+trade.$id)
            var tradeDB = $firebaseObject(ref);
            tradeDB.$loaded().then(function(){
                tradeDB.senderConfirm = true;

                tradeDB.$save().then(function(ref) {
                    Flash.create('success', 'Confirmado o recebimento!', 'large-text');
                }, function(error) {
                    console.log("Error:", error);
                });

            })



    }


    $scope.confirmReceiver = function(trade) {


            var ref = firebase.database().ref('trades/'+trade.$id)
            var tradeDB = $firebaseObject(ref);
            tradeDB.$loaded().then(function(){
                tradeDB.receiverConfirm = true;

                tradeDB.$save().then(function(ref) {
                    Flash.create('success', 'Confirmado o recebimento!', 'large-text');
                }, function(error) {
                    console.log("Error:", error);
                });

            })



    }

}]);
