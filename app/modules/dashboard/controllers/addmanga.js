

dashboard.controller("addmangaController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash','$firebaseObject','$firebaseArray','Upload','$timeout',
function ($rootScope, $scope, $state, $location, dashboardService, Flash, $firebaseObject, $firebaseArray, Upload, $timeout) {
    var vm = this;



    vm.addManga = function (manga, file) {

        Upload.base64DataUrl(file).then(function(base64Url) {
            manga.userUid = $rootScope.userDB.uid;
            manga.imageFile = base64Url;
            var ref = firebase.database().ref('mangas/');

            var mangaList = $firebaseArray(ref);
            mangaList.$loaded().then(function(){
                // add an item
                mangaList.$add(manga).then(function(ref) {
                    Flash.create('success', 'Mangá Adicionado com Sucesso!', 'large-text');
                    


                });
            });
        });












    }

}]);
