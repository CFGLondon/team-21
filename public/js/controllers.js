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
  }).
controller('bangladeshCtrl', function ($scope, $http) {
        $(function ($scope) {

            //Load Data
            $http.get('/api/bangladesh').
                success(function(data, status, headers, config) {
                    $scope.bites = data.data;
                    console.log($scope.bites);

                    $.getJSON('/assets/maps/bd-all.json', function (geojson) {
                        $('#container').highcharts('Map', {

                            title : {
                                text : 'People with Visual Impairment in Bangladesh '
                            },

                            mapNavigation: {
                                enabled: true,
                                buttonOptions: {
                                    verticalAlign: 'bottom'
                                }
                            },

                            colorAxis: {
                                minColor: '#FFFFFF',
                                maxColor: '#FFA500'
                            },
                            series : [

                                {
                                data :  $scope.bites,
                                mapData: geojson,
                                joinBy: 'name',
                                name: 'No of visualy impaired people',
                                states: {
                                    hover: {
                                        color: '#EEE8AA'
                                    }
                                },
                                dataLabels: {
                                    enabled: true,
                                    format: '{point.properties.name}'
                                }
                            }]
                        });
                    });
                });
            // Prepare random data
            var data = [];
            console.log($scope.bites);
            console.log(data);
        });
    });
