(function(){
    var app = angular.module("app", ['ngRoute']);

    app.config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl :'templates/home.html',
                resolve:{
                    style : function(){
                        angular.element(document.querySelector('head')).append("<link id='home' href='css/home.css' rel='stylesheet'>")
                    }
                }
            })
            .otherwise('/');
    }])
})();