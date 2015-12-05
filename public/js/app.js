'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'ngRoute',

  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'partials/partial1.html',
      controller: 'MyCtrl1'
    }).
    when('/submit', {
      templateUrl: 'partials/submit.html',
      controller: 'submit'
    }).
    when('/version', {
      templateUrl: 'partials/partial2.html',
      controller: 'MyCtrl2'
    }).
      when('/bangladesh', {
          templateUrl: 'partials/bangladesh.html',
          controller: 'bangladeshCtrl'
      }).
    otherwise({
      redirectTo: '/bangladesh'
    });

  $locationProvider.html5Mode(true);
});
