

dashboard.controller("adminController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash','$firebaseArray',
function ($rootScope, $scope, $state, $location, dashboardService, Flash, $firebaseArray) {
    var vm = this;
    var ref = firebase.database().ref('admin/reports');
    var reportsList = $firebaseArray(ref);
    reportsList.$loaded().then(function(){
        console.log(reportsList)
        $scope.reports = reportsList;
    });



    $scope.ban = function (cpf) {

        var ref = firebase.database().ref('admin/banned')
        var bannedCPFs = $firebaseArray(ref);
        bannedCPFs.$loaded().then(function(){
            bannedCPFs.$add(cpf).then(function(ref) {
                Flash.create('success', 'CPF Banido com Sucesso!', 'large-text');

            });
        });


    }

    $scope.unban = function (cpf) {

        var ref = firebase.database().ref('admin/banned')
        var bannedCPFs = $firebaseArray(ref);
        bannedCPFs.$loaded().then(function(){
            angular.forEach(bannedCPFs, function(cpfBan) {

                if(cpf == cpfBan.$value){
                    bannedCPFs.$remove(cpfBan).then(function(ref) {
                        Flash.create('success', 'CPF Desbanido com Sucesso!', 'large-text');

                    });


                }

        });


    })
}


}]);
