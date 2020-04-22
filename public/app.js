
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
                        angular.element(document.querySelector('head')).append('<link href="css/home.css" rel="stylesheet">');
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
                        angular.element(document.querySelector('head')).append('<link  href="css/register.css" rel="stylesheet">');
                    }
                }
               })  
            .when('/login', {
                templateUrl :'templates/login.html',
                controller : 'loginController',
                controllerAs : 'log',
                resolve:{
                    style : function(){
                        angular.element(document.querySelector('head')).append('<link  href="css/login.css" rel="stylesheet">')
                    }
                }
            })
            .when('/todo', {
                templateUrl : 'templates/todo.html',
                controller : 'todoController',
                controllerAs : 'td',
                resolve:{
                    style : function(){
                        angular.element(document.querySelector('head')).append('<link href = "css/todo.css" rel = "stylesheet">')
                    }
                }
            })  
            .otherwise('/');
    }])
})(); 