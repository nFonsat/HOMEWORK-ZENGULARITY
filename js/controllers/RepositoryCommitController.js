'use strict';
        
var repositoryCommitController = [
    '$scope',
    '$routeParams',
    'LineChart',
    'colorService',
    '$cookieStore',
    'GitHubApi',
    '$translate',
    'Repository',
    function ($scope, $routeParams, LineChart, colorService, $cookieStore, GitHubApi, $translate, Repository){
        $scope.titleRepository = $routeParams.nameRepository;
        $scope.userRepository = $routeParams.user;
        $scope.tabYears = new Array();
        $scope.valueCalendar = $translate.instant('repository.all_repository');

        $scope.$watch(
            function () { 
                return Repository.getDescription(); 
            }, 
            function (newValue) {
                if (newValue) 
                    $scope.descriptionRepository = newValue;
            }
        );

        var listCommit;

        if ($translate.use() ==  'fr'){
            var month = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];
        } else {
            var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        }

        var pointsLine = [0];
        var colorLine = colorService.getColorRVB();
        var dataLine = {
            labels: [""],
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
            listCommit = GitHubApi.getListCommit();
            $scope.list = listCommit;
            for (var i in listCommit) {
                $scope.list[i].reverse();
                $scope.tabYears.push(i);
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

        $scope.allCommit = function () {
            $scope.valueCalendar = $translate.instant('repository.all_repository');
            pointsLine = [0];
            dataLine = {
                labels: [""],
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
            LineChart.lineChart.destroy();
            LineChart.newLineChart(dataLine);
            
            for (var i in listCommit) {
                LineChart.addPoint(listCommit[i].length, i);
                pointsLine.push(listCommit[i].length);
            }
            LineChart.lineChart.destroy();
            LineChart.newLineChart(dataLine);
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
                userRepository: $scope.userRepository,
                descriptionRepository : $scope.descriptionRepository
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

        $scope.affiner = function (key) {
            $scope.valueCalendar = key;
            var listMonth = new Array();

            for (var j in listCommit[key]){
                var numero = listCommit[key][j].date.getMonth();
                var nameMonth = month[numero];

                if(listMonth[numero]){
                    listMonth[numero].push(listCommit[key][j]);
                } else {
                    listMonth[numero] = new Array();
                    listMonth[numero].name = nameMonth;
                    listMonth[numero].push(listCommit[key][j]);
                }
            }

            pointsLine = [0];
            dataLine = {
                labels: [""],
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
            LineChart.lineChart.destroy();
            LineChart.newLineChart(dataLine);
            for (var i in listMonth) {
                LineChart.addPoint(listMonth[i].length, listMonth[i].name);
                pointsLine.push(listMonth[i].length);
            }
            LineChart.lineChart.destroy();
            LineChart.newLineChart(dataLine);
        }

        var nameCookies = $scope.titleRepository + ':' + $scope.userRepository;

        if (isCookies(nameCookies)) {
            $scope.isSaving = true;
        } else {
            $scope.isSaving = false;
        }
    }
];