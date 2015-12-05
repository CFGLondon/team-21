'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($http, $scope, socket) {

    socket.on('send:name', function (data) {
      $scope.name = data.name;
    });

    socket.on('send:new_sms', function (data) {
      console.log(data)
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
  controller('submit', function ($scope) {
    // write Ctrl here
  }).
controller('bangladeshCtrl', function ($scope, $http) {
        $(function ($scope) {

            //Load Data
            $http.get('/api/bangladesh').
                success(function(data, status, headers, config) {
                    $scope.dataSet = data.data;
                    console.log($scope.dataSet);

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
                                data :  $scope.dataSet,
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
            console.log($scope.dataSet);
            console.log(data);
        }).
    controller('interactiveMapCtrl', function ($scope) {
        // write Ctrl here
    });
    });
