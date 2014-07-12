'use strict';
        
var repositoryController = [
    '$scope',
    '$http',
    '$routeParams',
    '$rootScope',
    function ($scope, $http, $routeParams, $rootScope){
        $scope.titleRepository = $routeParams.user;
        var listCommit;
        var dataSegment = new Array();
        var canvasCommiter;

        function getRandomColor() {
            var letters = '0123456789ABCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++ ) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        function FindCommitter (listCommit) {
            var tabCommitter = new Array();

            for(var i in listCommit) {
                var nameCommitter =  listCommit[i].commit.author.name;
                var j = 0;
                var trouver = false;
                
                while(j<tabCommitter.length && !trouver){
                    if (tabCommitter[j].name == nameCommitter)
                        trouver = true;
                    else
                        j++;
                }

                if(trouver) {
                    tabCommitter[j].nbCommit += 1;
                } else {
                    tabCommitter.push({name: nameCommitter, nbCommit: 1})
                }
            }
            return tabCommitter;
        }


        var listerRepository = function () {
            $http.get('https://api.github.com/repos/' + $routeParams.user + '/' + $routeParams.nameRepository + '/commits').
                success(
                    function (data) {
                        listCommit = data;
                        var tabName = FindCommitter(listCommit);
                        var dataCache;
                        for (var i in tabName) {
                            dataCache = {
                                value: tabName[i].nbCommit,
                                color: getRandomColor(),
                                highlight: "",
                                label: tabName[i].name
                            }
                            canvasCommiter.addValue(dataCache);
                            dataSegment.push(dataCache);
                        }
                    }
                ).
                error(
                    function(data, status, headers, config) {
                        console.log('error : ' + status)
                    }
                );
        }


        $scope.initCommitter = function () {
            canvasCommiter = new PolarAreaChart("chart-list-committer", dataSegment);
        }

        $scope.initCommits = function () {
            var datasPoint = [[1, 5, 6 ,7, 8, 10, 0]];
            var labelGraphs = ["Tout les commits"];
            var labelLegends = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche",];
            var canvasCommits= new LineChart ("chart-list-commit", datasPoint, labelGraphs, labelLegends )
        }

        listerRepository();
    }
];