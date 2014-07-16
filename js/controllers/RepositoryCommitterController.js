'use strict';
        
var repositoryCommitterController = [
    '$scope',
    '$routeParams',
    'BarChart',
    'colorService',
    'GitHubApi',
    '$cookieStore',
    'Repository',
    function ($scope, $routeParams, BarChart, colorService, GitHubApi, $cookieStore, Repository){
        $scope.titleRepository = $routeParams.nameRepository;
        $scope.userRepository = $routeParams.user;

        $scope.$watch(
            function () { 
                return Repository.getDescription(); 
            }, 
            function (newValue) {
                if (newValue) 
                    $scope.descriptionRepository = newValue;
            }
        );

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

        function isCookies (nameCookies) {
            if ($cookieStore.get(nameCookies))
                return true;
            return false;
        }

        $scope.savingSearch = function () {
            var nameCookies = $scope.titleRepository + ':' + $scope.userRepository;

            var data = {
                nameRepository: $scope.titleRepository,
                userRepository: $scope.userRepository
            }

            $cookieStore.put(nameCookies, data);

            $scope.isSaving = true;
        }

        $scope.removeSearch = function () {
            var nameCookies = $scope.titleRepository + ':' + $scope.userRepository;

            if (isCookies(nameCookies))
                $cookieStore.remove(nameCookies);

            $scope.isSaving = false;
        }

        $scope.initCommitter = function () {
            BarChart.defineContainer("chart-list-committer")
            BarChart.newBarChart(dataBar);
            GitHubApi.loadingCommitter($scope.userRepository, $scope.titleRepository, getCommit);
        }

        var nameCookies = $scope.titleRepository + ':' + $scope.userRepository;

        if (isCookies(nameCookies)) {
            $scope.isSaving = true;
        } else {
            $scope.isSaving = false;
        }
    }
];