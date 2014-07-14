'use strict';
        
var repositoryCommitterController = [
    '$scope',
    '$routeParams',
    'BarChart',
    'colorService',
    'GitHubApi',
    function ($scope, $routeParams, BarChart, colorService, GitHubApi){
        $scope.titleRepository = $routeParams.nameRepository;
        $scope.userRepository = $routeParams.user;

        var tabValuesBar = new Array();
        var colorBar = colorService.getColorRVB();
        var dataBar = {
            labels: [],
            datasets: [
                {
                    label: "DatasetBar",
                    fillColor: 'rgba(' + colorBar + ',0.5)',
                    strokeColor: 'rgba(' + colorBar + ' ,0.8)',
                    highlightFill: 'rgba(' + colorBar + ' ,0.75)',
                    highlightStroke: 'rgba(' + colorBar + ' ,1)',
                    data: tabValuesBar
                }
            ]
        };

        function getCommit (){
            var listCommit = GitHubApi.getListCommitter();
            for (var i in listCommit) {
                BarChart.addValue(listCommit[i].commit.length, listCommit[i].name);
                tabValuesBar.push(listCommit[i].commit.length);
            }
            BarChart.barChart.destroy();
            BarChart.newBarChart(dataBar);
        }

        $scope.initCommitter = function () {
            BarChart.defineContainer("chart-list-committer")
            BarChart.newBarChart(dataBar);
            GitHubApi.loadingCommitter($scope.userRepository, $scope.titleRepository, getCommit);
        }

    }
];