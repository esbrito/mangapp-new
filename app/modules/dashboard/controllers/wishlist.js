
dashboard.controller("wishlistController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash','$firebaseArray','$firebaseObject',
function ($rootScope, $scope, $state, $location, dashboardService, Flash, $firebaseArray,$firebaseObject) {
    var vm = this;

    var ref = firebase.database().ref('wishlist/');
    var wishListLoad = $firebaseArray(ref);
    wishListLoad.$loaded().then(function(){
      $scope.keywords = wishListLoad;
    });


    $scope.addKeywords = function(keywordsString){

        var arrayOfKeywords = keywordsString.split(" ");
        angular.forEach(arrayOfKeywords, function(keyword) {
            if(keyword != " "){
                var wish = {'word': keyword, 'user': $rootScope.userDB.uid};
                var ref = firebase.database().ref('wishlist/');
                var wishList = $firebaseArray(ref);
                wishList.$loaded().then(function(){
                    // add an item
                    wishList.$add(wish).then(function(ref) {

                    });
                });
            }
        })
    }

    $scope.removeKeyword = function(keyword){

        console.log("deleting...");
        var keywordID = keyword.$id;
        var ref = firebase.database().ref('wishlist/'+keyword.$id);
        var keywordObject = $firebaseObject(ref);

        keywordObject.$loaded().then(function(){
            keywordObject.$remove().then(function(){


            }, function(error) {
                console.log("Error:", error);
            });
        });
    }



}]);
