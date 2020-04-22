(function(){
    angular.module("app")
    .factory("currentUser", currentUser);

    function currentUser(){
       
        var User = {
            email : 'harshini2898@gmail.com',
            password: 'harshu@08'
        }
        
        return {
            User : User
         }
         
    }
})();