'use strict';

function LineChart (idCanvas, datasPoint, labelGraphs, labelLegends ) {
    this.nameCanvas = idCanvas;
    this.tabPoint = datasPoint;
    this.labelGraphs = labelGraphs;
    this.labelLegends = labelLegends;
    var tabGraphColor = new Array();

    var container = document.getElementById(this.nameCanvas).getContext("2d");

    function randomColor () {
        var tabNumber = new Array();
        for (var i=0; i<3; i++){
            tabNumber.push(Math.floor((Math.random() * 255) + 0));
        }
        var color = tabNumber.join(',');
        if (tabGraphColor.indexOf(color) == -1) {
            tabGraphColor.push(color);
            return color;
        } else {
            randomColor();
        }

    }

    var addGraph = function (label, tabPoints) {
        var color = randomColor();
        var newGraph = {
            label: label,
            fillColor: "rgba(" + color + ",0.2)",
            strokeColor: "rgba(" + color + ",1)",
            pointColor: "rgba(" + color + ",1)",
            pointHighlightStroke: "rgba(" + color + ",1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            data: tabPoints
        }
        tabGraph.push(newGraph);
    }

    this.addMultipleGraph = function (labelGraphs, tabPoint) {
        if (labelGraphs.length != tabPoint.length){
            console.log('Error');
            return;
        }
        for (var i in labelGraphs) {
            addGraph (this.labelGraphs[i], this.tabPoint[i])
        }
    }

    var tabGraph = new Array();
    this.addMultipleGraph(this.tabPoint, this.labelGraphs);

    var data = {
        labels: this.labelLegends,
        datasets: tabGraph
    }
    
    var legend = (
        '<ul class="<%=name.toLowerCase()%>-legend">' +
            '<% for (var i=0; i<datasets.length; i++){%>' +
                '<li>' +
                    '<span style="background-color:<%=datasets[i].lineColor%>"></span>' +
                    '<%if(datasets[i].label){%>' +
                        '<%=datasets[i].label%>' +
                    '<%}%>' +
                '</li>' +
            '<%}%>' +
        '</ul>'
    );
    
    this.myLineChart = new Chart(container).Line(data, {
        // Boolean - whether or not the chart should be responsive and resize when the browser does.
        responsive: true,

        ///Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines : true,

        //String - Colour of the grid lines
        scaleGridLineColor : "rgba(0,0,0,.05)",

        //Number - Width of the grid lines
        scaleGridLineWidth : 1,

        //Boolean - Whether the line is curved between points
        bezierCurve : true,

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
        legendTemplate : legend
    });

    this.updateGraph = function (nGraph, nPoint, value) {
        this.myLineChart.datasets[nGraph].points[nPoint].value = value;
        this.myLineChart.update();
    }

    this.addPointGraph = function (tabPoint, label) {
        this.myLineChart.addData(tabPoint, label);
    }

    this.removePointGraphs = function (nb) {
        this.myLineChart.removeData(nb)
    }
}
