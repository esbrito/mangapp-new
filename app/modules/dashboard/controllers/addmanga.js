

dashboard.controller("addmangaController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash','$firebaseObject','$firebaseArray',
function ($rootScope, $scope, $state, $location, dashboardService, Flash, $firebaseObject, $firebaseArray) {
    var vm = this;



    vm.addManga = function (manga) {
        manga.userUid = $rootScope.userDB.uid;
        var ref = firebase.database().ref('mangas/');

        var mangaList = $firebaseArray(ref);
        mangaList.$loaded().then(function(){
            // add an item
            mangaList.$add(manga).then(function(ref) {
                Flash.create('success', 'Mangá Adicionado com Sucesso!', 'large-text');

                /*console.log("ref");
                console.log(ref.path.o[1]);
                var userRef = firebase.database().ref('users/'+$rootScope.userDB.uid+'/mangas/'+ref.path.o[1]);
                var obj =  $firebaseObject(userRef);
                obj.$loaded().then(function(){
                console.log(obj);
                obj.$value = ref.path.o[1];
                obj.$save().then(function(ref) {
                console.log("saved");
            });
        }); */

    });
});
}
}]);
