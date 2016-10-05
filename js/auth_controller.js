"use strict";

myApp.controller("authCtrl", function($scope, $firebaseAuth, $state) {

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

    // Create a new user
    auth.$createUserWithEmailAndPassword($scope.newemail, $scope.newpassword)
    .then(function(firebaseUser) {
      updateProfile(firebaseUser);
      $scope.message = "User created with uid: " + firebaseUser.uid;
      console.log("User created with uid: " + firebaseUser.uid);
      $state.go("login");
    }).catch(function(error) {
      $scope.error = error;
      console.error("User creation failed:", error);
    });
  };

  function updateProfile(user){

    auth.$onAuthStateChanged(function(user) {
      if (user) {
        user.updateProfile({
          displayName: "Jane Q. User",
          photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(function() {
        // Update successful.
        }, function(error) {
        // An error happened.
        });
      } else {
      }
    });

  };

});

