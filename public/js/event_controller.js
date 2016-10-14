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
        
        if(new Date(startDate) > new Date(endDate)){
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

