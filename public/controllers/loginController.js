(function () {
  angular.module('app')
    .controller('loginController', ['serveData', 'currentUser', '$log', '$location', loginController]);

  function loginController(serveData, currentUser, $log, $location) {
    var vm = this;
    vm.currentUser = currentUser.User;
    vm.invaildUser = false;
    vm.invalidPassword = false;
    vm.test = "";
    console.log("In login controller");
    vm.currentUserData = function () {
      vm.test = serveData.testing("hello");
      serveData.getUserById(vm.currentUser.email)
        .then(onSuccess)
        .catch(onError);
    }

    function onSuccess(response) {
      console.log("in onSuccess");
      console.log(response.password);
      console.log(vm.currentUser.password);
      if (response.email == vm.currentUser.email && response.password == vm.currentUser.password) {
        $location.path('/todo');
      }
      else {
        vm.invalidPassword = true;
      }

    }

    function onError(reason) {
      console.log("in onError");
      vm.invaildUser = true;
    }
  }
})();