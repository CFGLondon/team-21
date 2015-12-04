'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, socket) {
    socket.on('send:name', function (data) {
      $scope.name = data.name;
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
    controller('bangladeshCtrl', function ($scope) {
        $(function () {

            // Prepare demo data
            var data = [
                {
                    "hc-key": "bd-da",
                    "value": 0
                },
                {
                    "hc-key": "bd-kh",
                    "value": 1
                },
                {
                    "hc-key": "bd-ba",
                    "value": 2
                },
                {
                    "hc-key": "bd-cg",
                    "value": 3
                },
                {
                    "hc-key": "bd-sy",
                    "value": 4
                },
                {
                    "hc-key": "bd-rj",
                    "value": 5
                },
                {
                    "hc-key": "bd-rp",
                    "value": 6
                }
            ];

            // Initiate the chart
            $('#container').highcharts('Map', {

                title : {
                    text : 'Highmaps basic demo'
                },

                subtitle : {
                    text : 'Source map: <a href="https://code.highcharts.com/mapdata/countries/bd/bd-all.js">Bangladesh</a>'
                },

                mapNavigation: {
                    enabled: true,
                    buttonOptions: {
                        verticalAlign: 'bottom'
                    }
                },

                colorAxis: {
                    min: 0
                },

                series : [{
                    data : data,
                    mapData: Highcharts.maps['countries/bd/bd-all'],
                    joinBy: 'hc-key',
                    name: 'Random data',
                    states: {
                        hover: {
                            color: '#BADA55'
                        }
                    },
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    }
                }]
            });
        });

    });
