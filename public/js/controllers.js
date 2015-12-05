'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($http, $scope) {

  }).
  controller('landing', function ($timeout,$scope) {

    var x = 0;;

    for (var i = 0; i < $('.info-container').length; i++) 
    {
      $timeout(function () {
             $($('.info-container').get(x++)).css('opacity','1');
      },1000 * (i+1));
    };
    
  }).
  controller('api', function ($scope) {
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

        })
    }).
    controller('interactiveMapCtrl', function ($scope) {
    });
