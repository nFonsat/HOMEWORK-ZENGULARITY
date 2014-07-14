'use strict';

/* graphicServices */

var graphicServices = angular.module( 'graphicServices', []);

graphicServices.service('BarChart', [
    function(){
        var option = {
            // Boolean - whether or not the chart should be responsive and resize when the browser does.
            responsive: true,
                
            //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
            scaleBeginAtZero : true,

            //Boolean - Whether grid lines are shown across the chart
            scaleShowGridLines : true,

            //String - Colour of the grid lines
            scaleGridLineColor : "rgba(0,0,0,.05)",

            //Number - Width of the grid lines
            scaleGridLineWidth : 1,

            //Boolean - If there is a stroke on each bar
            barShowStroke : true,

            //Number - Pixel width of the bar stroke
            barStrokeWidth : 2,

            //Number - Spacing between each of the X value sets
            barValueSpacing : 5,

            //Number - Spacing between data sets within X values
            barDatasetSpacing : 1,

            //String - A legend template
            legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
        }

        this.barChart = null;

        var container = null;

        this.defineContainer = function (nameCanvas) {
            container = document.getElementById(nameCanvas).getContext("2d");
        }

        this.newBarChart = function (value) {
            this.barChart = new Chart(container).Bar(value, option);
            return this.barChart;
        }

        this.updateBar = function (nBar, value) {
            this.barChart.datasets[0].bars[nBar].value = value;
            this.barChart.update();
        }

        this.addValue = function (value, label) {
            this.barChart.addData([value], label);
        }

        this.removeValue = function (index) {
            this.barChart.removeData(index);
        }
    }
])


graphicServices.service('LineChart', [
    function(){
        var option = {
            // Boolean - whether or not the chart should be responsive and resize when the browser does.
            responsive: true,

            ///Boolean - Whether grid lines are shown across the chart
            scaleShowGridLines : true,

            //String - Colour of the grid lines
            scaleGridLineColor : "rgba(0,0,0,.05)",

            //Number - Width of the grid lines
            scaleGridLineWidth : 1,

            //Boolean - Whether the line is curved between points
            bezierCurve : false,

            //Number - Tension of the bezier curve between points
            bezierCurveTension : 0.4,

            //Boolean - Whether to show a dot for each point
            pointDot : true,

            //Number - Radius of each point dot in pixels
            pointDotRadius : 4,

            //Number - Pixel width of point dot stroke
            pointDotStrokeWidth : 1,

            //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
            pointHitDetectionRadius : 20,

            //Boolean - Whether to show a stroke for datasets
            datasetStroke : true,

            //Number - Pixel width of dataset stroke
            datasetStrokeWidth : 2,

            //Boolean - Whether to fill the dataset with a colour
            datasetFill : true,

            //String - A legend template
            legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
        }

        this.lineChart = null;

        var container = null;

        this.defineContainer = function (nameCanvas) {
            container = document.getElementById(nameCanvas).getContext("2d");
        }

        this.newLineChart = function (value) {
            this.lineChart = new Chart(container).Line(value, option);
            return this.lineChart;
        }

        this.updateGraph = function (nPoint, value) {
            this.lineChart.datasets[0].points[nPoint].value = value;
            this.lineChart.update();
        }

        this.addPoint= function (point, label) {
            this.lineChart.addData([point], label);
        }

        this.removePoint = function (nb) {
            this.lineChart.removeData(nb)
        }
    }
])