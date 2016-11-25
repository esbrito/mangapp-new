
dashboard.controller("tradesController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash','$firebaseArray','$firebaseObject','notification',
function ($rootScope, $scope, $state, $location, dashboardService, Flash, $firebaseArray, $firebaseObject, notification) {
    var vm = this;

    $scope.currentDate = moment().locale('pt-br').toISOString();

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

    $scope.modal = function(manga) {
        $scope.modalmanga = manga;
        console.log($scope.modalmanga);
    }

    $scope.tradeModal = function(trade) {
        $scope.modaltrade = trade;

    }

    $scope.offer = function(trade,manga,mangaID) {
        var ref = firebase.database().ref('trades/'+trade.$id)
        var tradeDB = $firebaseObject(ref);

        tradeDB.$loaded().then(function(){
            tradeDB.mangaReceiverIsInterested = {'id': manga.$id, 'manga': manga}
            notification.send("Você recebeu uma oferta de troca. Verificar no menu 'Trocas'", manga.userUid);
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
            notification.send("Uma de suas propostas foi aceita! Verificar no menu 'Trocas'", trade.receiver);
            tradeDB.state = "accepted"
            var date = moment().locale('pt-br').add(7, 'days');
            tradeDB.deadline = date.toISOString();
            tradeDB.$save().then(function(ref) {
                Flash.create('success', 'Interesse enviado ao usuário!', 'large-text');
            }, function(error) {
                console.log("Error:", error);
            });

        })
    }


    $scope.timeDiff = function(trade) {

        var now = moment($scope.currentDate);
        var end = moment(trade.deadline);
        var diff = end.diff(now, 'days') // 1
        // TODO Modify to '<=0' so it tests if it has reached the deadline
        if(diff > 1){
            return true;
        }else {
            return false;
        }


    }

    $scope.report = function(trade,reportMessage) {
        console.log(trade);
        var refUserSender = firebase.database().ref('users/'+ trade.sender );
        var sender = $firebaseObject(refUserSender);
        sender.$loaded().then(function(){
            var refUserReceiver = firebase.database().ref('users/'+ trade.receiver );
            var receiver = $firebaseObject(refUserReceiver);
            receiver.$loaded().then(function(){
                var ref = firebase.database().ref('admin/reports')
                var reports = $firebaseArray(ref);
                var reportAdd = {'user': $rootScope.userDB.uid , 'message': reportMessage, 'trade': trade, 'senderCPF': sender.CPF, 'receiverCPF' : receiver.CPF, 'senderEmail' : sender.Email,  'receiverEmail' : receiver.Email, 'senderName' : sender.Username,  'receiverName' : receiver.Username }
                console.log(reportAdd);
                reports.$loaded().then(function(){
                    // add an item
                    reports.$add(reportAdd).then(function(ref) {
                        var ref = firebase.database().ref('trades/'+trade.$id)
                        var tradeDB = $firebaseObject(ref);

                        tradeDB.$loaded().then(function(){



                            tradeDB.reported = true;
                            tradeDB.reportmotive = reportMessage;
                            tradeDB.state = "done";

                            tradeDB.$save().then(function(ref) {
                                notification.send("Uma de suas trocas foi reportada! Verificar no menu 'Trocas'", trade.receiver);
                                notification.send("Uma de suas trocas foi reportada! Verificar no menu 'Trocas'", trade.sender);
                                Flash.create('success', 'Reportado com Sucesso!', 'large-text');
                            }, function(error) {
                                console.log("Error:", error);
                            });

                        })


                    });
                });
            });
        });
    }

    $scope.reject = function(trade) {
        var ref = firebase.database().ref('trades/'+trade.$id)
        var tradeDB = $firebaseObject(ref);
        notification.send("Uma de suas trocas foi rejeitada! Verificar no menu 'Trocas'", trade.receiver);
        notification.send("Uma de suas trocas foi rejeitada! Verificar no menu 'Trocas'", trade.sender);
        tradeDB.$loaded().then(function(){
            tradeDB.$remove();
            Flash.create('danger', 'Troca excluída!', 'large-text');
        })


    }
    $scope.getAddress = function(trade) {
        console.log(trade);
        var refUser = firebase.database().ref('users/'+trade.sender);
        var user = $firebaseObject(refUser);

        user.$loaded().then(function(){
            console.log(user);
            $scope.address1 = user.addr;

        });

        var refUser2 = firebase.database().ref('users/'+trade.receiver);
        var user2 = $firebaseObject(refUser2);

        user2.$loaded().then(function(){
            console.log(user2);
            $scope.address2 = user2.addr;

        });

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
                    notification.send("Recebido código de rastreio de uma troca! Verificar no menu 'Trocas'", trade.sender);
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
                    notification.send("Recebido código de rastreio de uma troca! Verificar no menu 'Trocas'", trade.receiver);
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
                notification.send("Um dos usuários confirmou o recebimento de seu mangá! Verificar no menu 'Trocas'", trade.receiver);
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
                notification.send("Um dos usuários confirmou o recebimento de seu mangá! Verificar no menu 'Trocas'", trade.sender);
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
                notification.send("Você recebeu uma avaliação! Verificar no menu 'Minha Conta'", user);
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
                    tradeDB.state = "done";
                    tradeDB.$save().then(function(ref) {
                        notification.send("Uma de suas trocas foi concluída! Verificar no menu 'Trocas'", user);
                        notification.send("Uma de suas trocas foi concluída! Verificar no menu 'Trocas'", $rootScope.userDB.uid);
                        Flash.create('success', 'Ambos se avaliaram. Troca finalizada!', 'large-text');
                    });
                }
            }, function(error) {
                console.log("Error:", error);
            });

        })
    }




}]);
