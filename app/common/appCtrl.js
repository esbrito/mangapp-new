
app.controller("appCtrl", ['$rootScope', '$scope', '$state', '$location', 'Flash','appSettings','$firebaseAuth','$firebaseObject','$firebaseArray',
function ($rootScope, $scope, $state, $location, Flash,appSettings,$firebaseAuth,  $firebaseObject, $firebaseArray) {

    $rootScope.theme = appSettings.theme;
    $rootScope.layout = appSettings.layout;

    var vm = this;
    vm.auth = $firebaseAuth();


    vm.auth.$onAuthStateChanged(function(firebaseUser) {
        if (firebaseUser) {


            vm.currentUser = vm.auth.$getAuth();
            $rootScope.userDB = vm.currentUser;
            console.log(vm.currentUser.uid);
            var refUser = firebase.database().ref('users/'+vm.currentUser.uid);
            var user = $firebaseObject(refUser);

            user.$loaded().then(function(){
                console.log(user);
                $rootScope.user = user;
                console.log($rootScope.user)
                //Check if it is banned CPF
                var refBan = firebase.database().ref('admin/banned');
                var bannedList = $firebaseArray(refBan);
                var alreadyExist = false;
                bannedList.$loaded().then(function(){
                    angular.forEach(bannedList, function(cpf) {
                        console.log(cpf);
                        if(user.CPF == cpf.$value){
                            Flash.create('danger', 'CPF - Banido!', 'large-text');
                            vm.auth.$signOut();


                        }
                    })

                });
            });
            console.log(vm.currentUser);

        } else {
            console.log("Signed out");
            $state.go('login');
        }
    });

    //avalilable themes
    vm.themes = [
        {
            theme: "black",
            color: "skin-black",
            title: "Dark - Black Skin",
            icon:""
        },
        {
            theme: "black",
            color: "skin-black-light",
            title: "Light - Black Skin",
            icon:"-o"
        },
        {
            theme: "blue",
            color: "skin-blue",
            title: "Dark - Blue Skin",
            icon:""
        },
        {
            theme: "blue",
            color: "skin-blue-light",
            title: "Light - Blue Skin",
            icon:"-o"
        },
        {
            theme: "green",
            color: "skin-green",
            title: "Dark - Green Skin",
            icon:""
        },
        {
            theme: "green",
            color: "skin-green-light",
            title: "Light - Green Skin",
            icon:"-o"
        },
        {
            theme: "yellow",
            color: "skin-yellow",
            title: "Dark - Yellow Skin",
            icon:""
        },
        {
            theme: "yellow",
            color: "skin-yellow-light",
            title: "Light - Yellow Skin",
            icon:"-o"
        },
        {
            theme: "red",
            color: "skin-red",
            title: "Dark - Red Skin",
            icon: ""
        },
        {
            theme: "red",
            color: "skin-red-light",
            title: "Light - Red Skin",
            icon: "-o"
        },
        {
            theme: "purple",
            color: "skin-purple",
            title: "Dark - Purple Skin",
            icon: ""
        },
        {
            theme: "purple",
            color: "skin-purple-light",
            title: "Light - Purple Skin",
            icon: "-o"
        },
    ];

    //available layouts
    vm.layouts = [
        {
            name: "Boxed",
            layout: "layout-boxed"
        },
        {
            name: "Fixed",
            layout: "fixed"
        },
        {
            name: "Sidebar Collapse",
            layout: "sidebar-collapse"
        },
    ];


    //Main menu items of the dashboard
    vm.menuItems = [
        {
            title: "Minha Conta",
            icon: "user",
            state: "myaccount"
        },
        {
            title: "Meus Mangás",
            icon: "book",
            state: "mymangas"
        },
        {
            title: "Adicionar Mangá",
            icon: "plus-circle",
            state: "addmanga"
        },
        {
            title: "Pesquisar Mangás",
            icon: "search",
            state: "search"
        },
        {
            title: "Trocas",
            icon: "exchange",
            state: "trades"
        },
        {
            title: "Lista de Desejos",
            icon: "heart",
            state: "wishlist"
        },
        {
            title: "Administrator",
            icon: "gears",
            state: "admin"
        }
    ];

    //set the theme selected
    vm.setTheme = function (value) {
        $rootScope.theme = value;
    };


    //set the Layout in normal view
    vm.setLayout = function (value) {
        $rootScope.layout = value;
    };


    //controll sidebar open & close in mobile and normal view
    vm.sideBar = function (value) {
        if($(window).width()<=767){
            if ($("body").hasClass('sidebar-open'))
            $("body").removeClass('sidebar-open');
            else
            $("body").addClass('sidebar-open');
        }
        else {
            if(value==1){
                if ($("body").hasClass('sidebar-collapse'))
                $("body").removeClass('sidebar-collapse');
                else
                $("body").addClass('sidebar-collapse');
            }
        }
    };

    //navigate to search page
    vm.search = function () {
        $state.go('app.search');
    };

    console.log('getting in to the app controller');

}]);
