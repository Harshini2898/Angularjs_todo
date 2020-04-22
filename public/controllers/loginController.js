(function(){
  angular.module('app')
      .controller('loginController', ['serveData', '$log','$location' , loginController]);

  function loginController(serveData, $log, $location){

      var vm = this;
      vm.currentUser = {};
      vm.invaildUser=false;
      vm.invalidPassword = false;

      vm.print = function(){
        console.log("button called");
      }

      vm.currentUserData = function(){
        serveData.getUserById(vm.currentUser.email)
        .then(onSuccess)
        .catch(onError);
      }

      function onSuccess(response)
      {

        console.log("in onSuccess");
        console.log(response.password);
        console.log(vm.currentUser.password);
        if(response.email == vm.currentUser.email && response.password == vm.currentUser.password)
        {
          $location.path('/');
        }
        else
        {
          vm.invalidPassword = true;
        }

      }

      function onError(reason)
      {
        console.log("in onError");
        vm.invaildUser=true;
      }
  }
})();