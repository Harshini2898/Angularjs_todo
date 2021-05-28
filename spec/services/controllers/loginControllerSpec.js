describe("login controller test suite", function(){
    var mockserveData, mockcurrentUser, currentUser, serveData;
    var $controller, $q, $location, $log, $rootScope;
    var userById =  {
        "name": "Sanju",
        "email": "sanju@gmail.com",
        "password": "sanju@08",
        "todo": [{
            id:1,
            task:"complete Assignments",
            done:false
        }]
    };

  
    beforeEach(angular.mock.module("app"));
    beforeEach(function(){
        mockserveData = jasmine.createSpyObj('serveData', ['getUserById', 'testing']);
        var ans = mockserveData.testing();
        console.log(dump(ans));
        console.log(dump(mockserveData));
    });
    beforeEach(angular.mock.inject(function(_$controller_, _$q_, _$location_, _$log_, _currentUser_, _$rootScope_){
        $controller = _$controller_;
        $q = _$q_;
        $location = _$location_;
        $log = _$log_;
        currentUser = _currentUser_;
        $rootScope = _$rootScope_;

        mockserveData.getUserById.and.callFake(function(){
            var deferred = $q.defer();
            deferred.resolve(userById);
            return deferred.promise;
        });

      
        var answ = mockserveData.getUserById();
        $rootScope.$apply();
        console.log(dump(answ));

    }));

    it("currentUserData function shoudld redirect to todo page if pwd and username are correct",  function(){
        var presentUser = {email :'sanju@gmail.com', password : 'sanju@08'};
        $this = $controller('loginController', {serveData : mockserveData, currentUser : currentUser, $log :$log, $location:$location});
        $this.currentUser = presentUser;
        $this.currentUserData();
        $rootScope.$apply();
        expect($location.url()).toBe('/todo');
        expect(mockserveData.testing).toHaveBeenCalledWith('hello');
    })
})



