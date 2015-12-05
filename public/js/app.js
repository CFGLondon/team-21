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
    when('/submit', {
      templateUrl: 'partials/submit.html',
      controller: 'submit'
    }).
    when('/landing', {
      templateUrl: 'partials/landing.html',
      controller: 'landing'
    }).
    when('/api', {
      templateUrl: 'partials/api.html',
      controller: 'api'
    }).
      when('/bangladesh', {
          templateUrl: 'partials/bangladesh.html',
          controller: 'bangladeshCtrl'
      }).
      when('/dashboard', {
          templateUrl: 'partials/bangladesh.html',
          controller: 'bangladeshCtrl'
      }).
      when('/interactiveMap', {
          templateUrl: 'partials/interactiveMap.html',
          controller: 'interactiveMapCtrl'
      }).
    otherwise({
      redirectTo: '/landing'
    });

  $locationProvider.html5Mode(true);
});
