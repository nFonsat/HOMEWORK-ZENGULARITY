'use strict';
        
var repositoryCommitController = [
    '$scope',
    '$routeParams',
    'LineChart',
    'colorService',
    '$cookies',
    'GitHubApi',
    function ($scope, $routeParams, LineChart, colorService, $cookies, GitHubApi){
        $scope.titleRepository = $routeParams.nameRepository;
        $scope.userRepository = $routeParams.user;

        var labelsLine = [""];
        var pointsLine = [0];

        var colorLine = colorService.getColorRVB();
        var dataLine = {
            labels: labelsLine,
            datasets: [
                {
                    label: "DatasetBar",
                    fillColor: 'rgba(' + colorLine + ',0.2)',
                    strokeColor: 'rgba(' + colorLine + ',1)',
                    pointColor: 'rgba(' + colorLine + ',1)',
                    pointHighlightStroke: 'rgba(' + colorLine + ',1)',
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    data: pointsLine
                }
            ]
        };

        function getCommit (){
            var listCommit = GitHubApi.getListCommit();
            for (var i in listCommit) {
                LineChart.addPoint(listCommit[i].length, i);
                pointsLine.push(listCommit[i].length);
            }
            LineChart.lineChart.destroy();
            LineChart.newLineChart(dataLine);

        }

        $scope.initCommits = function () {
            LineChart.defineContainer("chart-list-commit");
            LineChart.newLineChart(dataLine);
            GitHubApi.loadingCommit($scope.userRepository, $scope.titleRepository, getCommit);
        }
    }
];