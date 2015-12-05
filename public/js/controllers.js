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
  var placeholderDiv = document.getElementById("tableauViz");
  var url = "https://public.tableau.com/shared/53F327G7T?:display_count=yes";
  var options = {
    width: placeholderDiv.offsetWidth,
    height: placeholderDiv.offsetHeight,
    hideTabs: true,
    hideToolbar: true,
    onFirstInteractive: function () {
      workbook = viz.getWorkbook();
      activeSheet = workbook.getActiveSheet();
    }
    };
    var viz = new tableau.Viz(placeholderDiv, url, options);
    }).
    controller('interactiveMapCtrl', function ($scope) {
    }).
    controller('sudanCtrl', function ($scope, $http) {
        //Load Data
        $http.get('/api/sudan').
            success(function(data, status, headers, config) {
                $scope.dataSet = data.data;
                console.log($scope.dataSet);

                $.getJSON('/assets/maps/sd-all.json', function (geojson) {
                    $('#container').highcharts('Map', {

                        title : {
                            text : 'People with Visual Impairment in Sudan '
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
                                joinBy: 'hc-key',
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
        $(document).ready(function () {

            // Build the chart
            $('#pie').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Impairment Types'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    name: 'Brands',
                    colorByPoint: true,

                    data: [{
                        name: 'Physical',
                        y: 20
                    }, {
                        name: 'Sensory',
                        y: 30
                    }, {
                        name: 'Speech and Language',
                        y: 15
                    }, {
                        name: 'Learning',
                        y: 15
                    }, {
                        name: 'Cognitive',
                        y: 20
                    }]
                }]
            });
        });
    });
