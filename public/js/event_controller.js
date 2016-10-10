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
      neweventstartdateandtime : neweventstartdateandtime,
      neweventenddateandtime : neweventenddateandtime,
      neweventguestlist : neweventguestlist,
      neweventlocation : neweventlocation,
      neweventmessage: neweventmessage
    });

    $state.go("event.view");

  };

  function UndefinedCheck(value) {

    if (angular.isUndefined(value)) {
      return null;
    } else {
      return value;      
    }

  };

}]);

