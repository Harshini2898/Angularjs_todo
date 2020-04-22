(function(){
    angular.module("app")
    .factory("currentUser", currentUser);

    function currentUser(){
       
        var User = {
            email : '',
            password: ''
        }
        
        return {
            User : User
         }
         
    }
})();