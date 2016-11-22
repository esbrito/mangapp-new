/*==========================================================
    Author      : Ranjithprabhu K
    Date Created: 24 Dec 2015
    Description : Base for Dashboard Application module

    Change Log
    s.no      date    author     description


 ===========================================================*/

var dashboard = angular.module('dashboard', ['ui.router', 'ngAnimate','ngMaterial']);


dashboard.config(["$stateProvider", function ($stateProvider) {


    $stateProvider.state('app.myaccount', {
        url: '/myaccount',
        templateUrl: 'app/modules/dashboard/views/myaccount.html',
        controller: 'myaccountController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'Minha Conta'
        }
    });


    $stateProvider.state('app.mymangas', {
        url: '/mymangas',
        templateUrl: 'app/modules/dashboard/views/mymangas.html',
        controller: 'mymangasController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'Meus Mangás'
        }
    });

    $stateProvider.state('app.addmanga', {
        url: '/addmanga',
        templateUrl: 'app/modules/dashboard/views/addmanga.html',
        controller: 'addmangaController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'Adicionar Mangá'
        }
    });

    $stateProvider.state('app.wishlist', {
        url: '/wishlist',
        templateUrl: 'app/modules/dashboard/views/wishlist.html',
        controller: 'wishlistController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'Lista de Desejos'
        }
    });

    $stateProvider.state('app.admin', {
        url: '/admin',
        templateUrl: 'app/modules/dashboard/views/admin.html',
        controller: 'adminController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'Administrator'
        }
    });



}]);
