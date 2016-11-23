
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

    $scope.loadComments = function(trade) {
        var ref = firebase.database().ref('trades/'+trade.$id+'/comments')
        var commentList = $firebaseArray(ref);
        commentList.$loaded().then(function(){
            $scope.comments = commentList;
        });
    }



    $scope.comment = function(trade, message) {

        console.log(message);
        var ref = firebase.database().ref('trades/'+trade.$id+'/comments')
        var comments = $firebaseArray(ref);
        var commentAdd = {'user': $rootScope.user.Username , 'message': message}
        console.log(commentAdd);
        comments.$loaded().then(function(){
            // add an item
            comments.$add(commentAdd).then(function(ref) {
                Flash.create('success', 'Comentário enviado!', 'large-text');

            });
        });
    }

    $scope.review = function(trade, user, message) {

        console.log(message);
        var ref = firebase.database().ref('users/'+user+'/ratings')
        var ratings = $firebaseArray(ref);
        var rateAdd = {'user': $rootScope.user.Username , 'message': message}
        console.log(rateAdd);
        ratings.$loaded().then(function(){
            // add an item
            ratings.$add(rateAdd).then(function(ref) {
                Flash.create('success', 'Avaliação enviada!', 'large-text');

            });
        });
        var ref = firebase.database().ref('trades/'+trade.$id)
        var tradeDB = $firebaseObject(ref);

        tradeDB.$loaded().then(function(){
            var done = []
            if(tradeDB.doneUser != undefined)
            done = tradeDB.doneUser;
            done.push($rootScope.userDB.uid)
            tradeDB.doneUser = done;

            tradeDB.$save().then(function(ref) {
                // Test to see if both users have compleated the trade
                if(trade.doneUser.length == 2){
                    tradeDB.$remove();
                    Flash.create('success', 'Ambos se avaliaram. Troca finalizada!', 'large-text');
                }
            }, function(error) {
                console.log("Error:", error);
            });

        })
    }




}]);
