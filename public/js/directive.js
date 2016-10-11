"use strict";
/*
myApp.directive("autofocus", function($timeout) {
  return {
            link: function(scope, element, attrs) {
              $timeout(function() {
              element.focus();
            });
         }
        }
    });
*/
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
