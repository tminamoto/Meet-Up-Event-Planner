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

