describe("register controller test suite", function () {
    var $controller;
    var serveData;
    var $location;
    var $log;
    var $q;
    var response= "added User";
    var $rootScope;
    var userList = [
        {
            "name": "Harshini",
            "email": "harshini2898@gmail.com",
            "password": "harshu@08",
            "todo": []
        },
        {
            "name": "Sanju",
            "email": "sanju@gmail.com",
            "password": "sanju@08",
            "todo": []
        }];

    var newUserData;

    beforeEach(module('app'));

    beforeEach(inject(function (_$controller_, _$q_, _serveData_, _$log_, _$location_, _$rootScope_) {
        $controller = _$controller_;
        serveData = _serveData_;
        $location = _$location_;
        $log = _$log_;
        $q = _$q_;
        $rootScope = _$rootScope_;
    }));

    beforeEach(function(){
        spyOn(serveData, 'addUser').and.callFake(function(){
            var deferred = $q.defer();
            deferred.resolve(response);
            return deferred.promise;
        });
        spyOn(serveData, 'getUser').and.callFake(function(){
             var deferred = $q.defer();
             deferred.resolve(userList);
             return deferred.promise;
        });
    })

    it("Should add user if username is unique and redirect to login", function () {
        newUserData =  {
            "name": "Arun",
            "email": "arun@gmail.com",
            "password": "arun@08"
        }
     
        //console.log(dump($location.url()));
        $this = $controller('registerController', { serveData: serveData, $location: $location, $log: $log });

        $this.newUser = newUserData;
        $this.duplicate = false;
        $this.getUserData();

        $rootScope.$apply();
        //console.log(dump($location.url()));
        expect(serveData.addUser).toHaveBeenCalled();
        expect(serveData.getUser).toHaveBeenCalled();
        expect($location.url()).toBe('/login');

    });

    it("If user is not unique then don't redirect to login", function(){
        newUserData =  {
            "name": "Sanju",
            "email": "sanju@gmail.com",
            "password": "sanju@08"
        }
       
        //console.log(dump($location.url()));
        $this = $controller('registerController', { serveData: serveData, $location: $location, $log: $log });

        $this.newUser = newUserData;
        $this.duplicate = false;
        $this.getUserData();

        $rootScope.$apply();
        //console.log(dump($location.url()));
        expect($location.url()).toBe('');
        expect(serveData.getUser).toHaveBeenCalled();
    })


})