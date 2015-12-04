'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($http, $scope, socket) {
    socket.on('send:name', function (data) {
      $scope.name = data.name;

      $scope.login = function (argument) {
        $http.get('/auth/facebook');
      }

    });
  }).
  controller('MyCtrl1', function ($scope, socket) {
    socket.on('send:time', function (data) {
      $scope.time = new Date(data.time);
    });
  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here
  });
