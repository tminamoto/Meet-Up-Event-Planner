"use strict";var myApp=angular.module("meetup",["ui.router","firebase","ngMaterial","ngMessages"]);myApp.run(["$rootScope","$state",function(e,t){e.$on("$stateChangeError",["event","toState","toParams","fromState","fromParams","error",function(e,n,r,a,o,i){i&&t.go("login")}])}]),myApp.config(["$stateProvider","$urlRouterProvider",function(e,t){t.otherwise("/login"),e.state("login",{url:"/login",controller:"authCtrl",templateUrl:"./template/login.html"}).state("register",{url:"/register",controller:"authCtrl",templateUrl:"./template/register.html"}).state("event",{url:"/event",controller:"eventCtrl",templateUrl:"./template/event.html",resolve:{currentAuth:["Auth",function(e){return e}]}}).state("event.create",{url:"/create",controller:"eventCtrl",templateUrl:"./template/createevent.html",resolve:{currentAuth:["Auth",function(e){return e}]}}).state("event.view",{url:"/view",controller:"eventCtrl",templateUrl:"./template/viewevent.html",resolve:{currentAuth:["Auth",function(e){return e}]}}).state("test",{url:"/test",templateUrl:"./template/test.html"})}]),myApp.factory("Auth",["$firebaseAuth",function(e){return e()}]),myApp.directive("autofocus",["$document",function(e){return{link:function(e,t,n){setTimeout(function(){t[0].focus()},100)}}}]),myApp.controller("authCtrl",["$scope","$firebaseAuth","$state",function(e,t,n){function r(e,t,n){a.$onAuthStateChanged(function(e){e&&e.updateProfile({displayName:t,company:n}).then(function(){},function(e){})})}var a=t();e.signIn=function(){e.message=null,e.error=null,a.$signInWithEmailAndPassword(e.email,e.password).then(function(t){e.message="Logged in as: "+t.uid,console.log("Logged in as:",t.uid),n.go("event")}).catch(function(t){e.error=t,console.error("Authentication failed:",t)})},e.createUser=function(){e.message=null,e.error=null;var t=e.newname,o=e.newcompany;a.$createUserWithEmailAndPassword(e.newemail,e.newpassword).then(function(a){r(a,t,o),e.message="User created with uid: "+a.uid,console.log("User created with uid: "+a.uid),n.go("login")}).catch(function(t){e.error=t,console.error("User creation failed:",t)})}}]),myApp.factory("eventData",["$firebaseArray",function(e){var t=firebase.database().ref();return e(t)}]),myApp.controller("eventCtrl",["Auth","$scope","$state","eventData",function(e,t,n,r){function a(e){return angular.isUndefined(e)?null:e}var o=e,i="";t.eventdata=r,o.$onAuthStateChanged(function(e){e?t.username=e.displayName:t.username="no name"}),t.signout=function(){o.$signOut().then(function(){n.go("login")},function(e){})},t.createEvent=function(){if(i=0)return!1;var e=t.username,r=a(t.neweventname),o=a(t.newtypeofevent),s=a(t.neweventhost),u=a(t.neweventstartdateandtime),l=a(t.neweventenddateandtime),c=a(t.neweventguestlist),m=a(t.neweventlocation),d=a(t.neweventmessage);t.eventdata.$add({username:e,neweventname:r,newtypeofevent:o,neweventhost:s,neweventstartdateandtime:u.toString(),neweventenddateandtime:l.toString(),neweventguestlist:c,neweventlocation:m,neweventmessage:d}),n.go("event.view")},t.checkTimeErr=function(){var e=t.neweventstartdateandtime,n=t.neweventenddateandtime,r=new Date;return new Date(e)<r?(t.errMessageStart="Start date should not be before today.",i=1,!1):(t.errMessageStart="",new Date(e)>=new Date(n)?(t.errMessageEnd="End date should be greater than start date.",i=1,!1):(t.errMessageEnd="",void(i=0)))}}]);