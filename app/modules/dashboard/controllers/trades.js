
dashboard.controller("tradesController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash','$firebaseArray','$firebaseObject',
function ($rootScope, $scope, $state, $location, dashboardService, Flash, $firebaseArray, $firebaseObject) {
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

    $scope.offer = function(trade,manga,mangaID) {
        var ref = firebase.database().ref('trades/'+trade.$id)
        var tradeDB = $firebaseObject(ref);

        tradeDB.$loaded().then(function(){
            tradeDB.mangaReceiverIsInterested = {'id': manga.$id, 'manga': manga}

            tradeDB.$save().then(function(ref) {
              swal({
                title: "Interesse enviado ao usuário!",
                timer: 2000,
                showConfirmButton: false });
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
            var date = moment().locale('pt-br').add(7, 'days');
            tradeDB.deadline = date.toISOString();
            tradeDB.$save().then(function(ref) {
              swal({
                title: "Interesse enviado ao usuário!",
                timer: 2000,
                showConfirmButton: false });
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


        var ref = firebase.database().ref('admin/reports')
        var reports = $firebaseArray(ref);
        var reportAdd = {'user': $rootScope.userDB.uid , 'message': reportMessage, 'trade': trade}
        console.log(reportAdd);
        reports.$loaded().then(function(){
            // add an item
            reports.$add(reportAdd).then(function(ref) {
              swal({
                title: "Reportado com sucesso!",
                timer: 2000,
                showConfirmButton: false });

            });
        });


    }

    $scope.reject = function(trade) {
        var ref = firebase.database().ref('trades/'+trade.$id)
        var tradeDB = $firebaseObject(ref);

        tradeDB.$loaded().then(function(){
            tradeDB.$remove();
            swal({
              title: "Troca excluída!",
              timer: 2000,
              showConfirmButton: false });
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
          swal({
            title: "Código inválido!",
            timer: 2000,
            showConfirmButton: false });
        }
        else{
            var ref = firebase.database().ref('trades/'+trade.$id)
            var tradeDB = $firebaseObject(ref);
            tradeDB.$loaded().then(function(){
                tradeDB.receiverTrack = rastreio;

                tradeDB.$save().then(function(ref) {
                  swal({
                    title: "Código registrado",
                    timer: 2000,
                    showConfirmButton: false });
                }, function(error) {
                    console.log("Error:", error);
                });

            })
        }


    }


    $scope.trackSender = function(trade,rastreio) {

        if(rastreio.length != 13)
        {
          swal({
            title: "Código inválido!",
            timer: 2000,
            showConfirmButton: false });
        }
        else{
            var ref = firebase.database().ref('trades/'+trade.$id)
            var tradeDB = $firebaseObject(ref);
            tradeDB.$loaded().then(function(){
                tradeDB.senderTrack = rastreio;

                tradeDB.$save().then(function(ref) {
                  swal({
                    title: "Código registrado!",
                    timer: 2000,
                    showConfirmButton: false });
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
              swal({
                title: "Confirmado o recebimento!",
                timer: 2000,
                showConfirmButton: false });
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
              swal({
                title: "Confirmado o recebimento!",
                timer: 2000,
                showConfirmButton: false });
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
              swal({
                title: "Comentário enviado!",
                timer: 2000,
                showConfirmButton: false });

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
              swal({
                title: "Avaliação enviada!",
                timer: 2000,
                showConfirmButton: false });

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
                      swal({
                        title: "Ambos se avaliaram. Troca finalizada!",
                        timer: 2000,
                        showConfirmButton: false });
                    });
                }
            }, function(error) {
                console.log("Error:", error);
            });

        })
    }




}]);
