"use strict";

myApp.run(["$rootScope", "$state", function($rootScope, $state) {
  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {

//    if (error === "AUTH_REQUIRED") {
    if (error) {
      $state.go("login");
    }

  });

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
