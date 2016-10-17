"use strict";

var myApp = angular.module("meetup", ["ui.router", "firebase", "ngMaterial", "ngMessages"]);



"use strict";

myApp.run(["$rootScope", "$state", function($rootScope, $state) {
  $rootScope.$on("$stateChangeError", ["event", "toState", "toParams", "fromState", "fromParams", "error", function(event, toState, toParams, fromState, fromParams, error) {

//    if (error === "AUTH_REQUIRED") {
    if (error) {
      $state.go("login");
    }

  }]);

}]);

myApp.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/login");

  $stateProvider
    .state("login", {
      url: "/login",
      controller: "authCtrl",
      templateUrl: "./template/login.html"
    })
    .state("register", {
      url: "/register",
      controller: "authCtrl",
      templateUrl: "./template/register.html"
    })
    .state("event", {
      url: "/event",
      controller: "eventCtrl",
      templateUrl: "./template/event.html",
      resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth;
        }]
      }
    })
    .state("event.create", {
      url: "/create",
      controller: "eventCtrl",
      templateUrl: "./template/createevent.html",
      resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth;
        }]
      }
    })
    .state("event.view", {
      url: "/view",
      controller: "eventCtrl",
      templateUrl: "./template/viewevent.html",
      resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth;
        }]
      }
    })
    .state("test", {
      url: "/test",
      templateUrl: "./template/test.html"
    });

}]);

myApp.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    return $firebaseAuth();
  }
]);

"use strict";

myApp.directive('autofocus', ['$document', function($document) {
    return {
      link: function($scope, $element, attrs) {
        setTimeout(function() {
          $element[0].focus();
        }, 100);
      }
    };
  }])
;

"use strict";

myApp.controller("authCtrl", ["$scope", "$firebaseAuth", "$state", function($scope, $firebaseAuth, $state) {

  var auth = $firebaseAuth();
 
  $scope.signIn = function() {

    $scope.message = null;
    $scope.error = null;

    auth.$signInWithEmailAndPassword($scope.email, $scope.password)
    .then(function(firebaseUser) {
      $scope.message = "Logged in as: " + firebaseUser.uid;
      console.log("Logged in as:", firebaseUser.uid);
      $state.go("event");
      //$state.go("test");
    }).catch(function(error) {
      $scope.error = error;
      console.error("Authentication failed:", error);
    });

  };

  $scope.createUser = function() {

    $scope.message = null;
    $scope.error = null;
    var username = $scope.newname;
    var company = $scope.newcompany;

    // Create a new user
    auth.$createUserWithEmailAndPassword($scope.newemail, $scope.newpassword)
    .then(function(firebaseUser) {
      updateProfile(firebaseUser, username, company);
      $scope.message = "User created with uid: " + firebaseUser.uid;
      console.log("User created with uid: " + firebaseUser.uid);
      $state.go("login");
    }).catch(function(error) {
      $scope.error = error;
      console.error("User creation failed:", error);
    });
  };

  function updateProfile(user, username, company){

    auth.$onAuthStateChanged(function(user) {
      if (user) {
        user.updateProfile({
          displayName: username,
          company: company
        }).then(function() {
        // Update successful.
        }, function(error) {
        // An error happened.
        });
      } else {
      }
    });

  };

}]);


"use strict";

myApp.factory("eventData", ["$firebaseArray",
  function($firebaseArray) {
    // create a reference to the database location where we will store our data
    var ref = firebase.database().ref();

    // this uses AngularFire to create the synchronized array
    return $firebaseArray(ref);
  }
]);

myApp.controller("eventCtrl", ["Auth", "$scope", "$state", "eventData", function(Auth, $scope, $state, eventData) {

  var auth = Auth;
  var errorchecker = "";
  $scope.eventdata = eventData;

  auth.$onAuthStateChanged(function(user) {
    if (user) {
      $scope.username = user.displayName;
    } else {
      $scope.username = "no name";
    }
  });

  $scope.signout = function (){

    auth.$signOut().then(function() {

    $state.go("login");

    }, function(error) {
    // An error happened.
    });

  };

  $scope.createEvent = function (){
    
    if (errorchecker = 0) {
      return false;
    }

    var username = $scope.username;
    var neweventname = UndefinedCheck($scope.neweventname);
    var newtypeofevent = UndefinedCheck( $scope.newtypeofevent);
    var neweventhost = UndefinedCheck($scope.neweventhost);
    var neweventstartdateandtime = UndefinedCheck($scope.neweventstartdateandtime);
    var neweventenddateandtime = UndefinedCheck($scope.neweventenddateandtime);
    var neweventguestlist = UndefinedCheck($scope.neweventguestlist);
    var neweventlocation = UndefinedCheck($scope.neweventlocation);
    var neweventmessage = UndefinedCheck($scope.neweventmessage);
    
    $scope.eventdata.$add({
      username      : username,
      neweventname  : neweventname,
      newtypeofevent: newtypeofevent,
      neweventhost : neweventhost,
      neweventstartdateandtime : neweventstartdateandtime.toString(),
      neweventenddateandtime : neweventenddateandtime.toString(),
      neweventguestlist : neweventguestlist,
      neweventlocation : neweventlocation,
      neweventmessage: neweventmessage
    });

    $state.go("event.view");

  };

  $scope.checkTimeErr = function() {

        var errMessageStart = "";
        var errMessageEnd = "";
        var startDate = $scope.neweventstartdateandtime;
        var endDate = $scope.neweventenddateandtime;
        var curDate = new Date();

        if(new Date(startDate) < curDate){
          $scope.errMessageStart = "Start date should not be before today.";
          errorchecker = 1;
          return false;
        } else {
          $scope.errMessageStart = "";
        }
        
        if(new Date(startDate) >= new Date(endDate)){
          $scope.errMessageEnd = "End date should be greater than start date.";
          errorchecker = 1;
          return false;
        } else {
          $scope.errMessageEnd = "";
        }

        errorchecker = 0;

  };

  function UndefinedCheck(value) {

    if (angular.isUndefined(value)) {
      return null;
    } else {
      return value;      
    }

  };

}]);

