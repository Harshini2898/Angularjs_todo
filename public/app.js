(function () {
    var app = angular.module("app", ['ngRoute']);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'templates/home.html',
                controller :'homeController',
                controllerAs : 'home',
                resolve :
                {
                    style : function(){
                        angular.element(document.querySelector('head')).append('<link id="home" href="css/home.css" rel="stylesheet">');
                    }
                }
            })
            .when('/register',{
                templateUrl : 'templates/register.html',
                controller : 'registerController',
                controllerAs : 'reg',
                resolve :
                {
                    style : function(){
                        angular.element(document.querySelector('head')).append('<link id="home" href="css/register.css" rel="stylesheet">');
                    }
                }
            })
            .otherwise('/');
    }])
})(); 