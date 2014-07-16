'use strict';

/* GitHubApiServices */

var GitHubApiServices = angular.module( 'GitHubApiServices', []);

GitHubApiServices.service('GitHubApi', [
    '$http',
    '$cacheFactory',
    function ($http, $cacheFactory){
        var apiGitHub = 'https://api.github.com';
        var pagination = '?per_page=100';
        var listCommitter = new Array();
        var listCommit = {};
        var cacheCommit;
        var cacheCommitter;

        var indexCommitter = function (committer) {
            var index = -1;
            for(var i in listCommitter) {
                if(listCommitter[i].name == committer){
                    index = i;
                }
            }
            return index;
        }

        var createListCommitter = function (listDataAPI) {
            listCommitter = new Array();
            for(var i in listDataAPI) {
                var nameCommitter =  listDataAPI[i].commit.committer.name;
                var iCommit = indexCommitter(nameCommitter);

                var commit = {
                    date : new Date (listDataAPI[i].commit.committer.date),
                    message : listDataAPI[i].commit.message
                }
                
                var j = 0;
                var trouver = false;
                while(j<listCommitter.length && !trouver){
                    if (iCommit > -1)
                        trouver = true;
                    else
                        j++;
                }

                if(trouver) {
                    listCommitter[iCommit].commit.push(commit);
                } else {
                    var commit = [commit]
                    listCommitter.push({
                        name: nameCommitter, 
                        commit: commit
                    })
                }
            }
        }

        var createListCommit = function (listDataAPI) {
            listCommit = {};
            for(var i in listDataAPI) {
                var dateCommit =  new Date (listDataAPI[i].commit.committer.date).getFullYear();
                
                var commit = {
                    nameCommitter : listDataAPI[i].commit.committer.name,
                    message : listDataAPI[i].commit.message,
                    date : new Date (listDataAPI[i].commit.committer.date)
                }
                

                if(listCommit[dateCommit]){
                    listCommit[dateCommit].push(commit);
                } else {
                    listCommit[dateCommit] = new Array();
                    listCommit[dateCommit].push(commit);
                }
            }
        }

        function moinsUneHeure (timestamp) {
            var now = new Date();
            var currentBeforeOneHours = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours()-1, now.getMinutes(), now.getSeconds())
            if(now.getTime() >= timestamp && currentBeforeOneHours.getTime() <= timestamp)
                return true;
            return false;
        }
        
        function errorHttp (data, status, headers, config) {
            console.log('error : ' + status);
            console.log(data.message);
        }

        this.getUrlRepository = function (userRepository, nameRepository) {
            return (apiGitHub + '/repos/' + userRepository + '/' + nameRepository + '/commits' + pagination);
        }

        this.getUrlContributor = function (userRepository, nameRepository) {
            return (apiGitHub + '/repos/' + userRepository + '/' + nameRepository + '/contributors' + pagination);
        }

        this.getListCommitter = function () {
            return listCommitter;
        }

        this.getListCommit = function () {
            return listCommit;
        }

        this.loadingCommitter = function (userRepository, nameRepository, fnLoadSuccess) {
            var isCached = 0; 
            if($cacheFactory.get('listCommitter')){
                var repository = cacheCommitter.get('repository')
                if (moinsUneHeure(cacheCommitter.get('timestamp')) 
                && repository.user == userRepository && repository.name == nameRepository){
                    isCached = 1;
                } else {
                    isCached = -1;
                }
            }

            if (isCached == 1) {
                cacheCommitter = $cacheFactory.get('listCommitter');
                listCommitter = (cacheCommitter.get('listCurrent'));
                fnLoadSuccess();
                return;
            } else if (isCached == -1) {
                cacheCommitter = $cacheFactory.get('listCommitter');
            } else {
                cacheCommitter = $cacheFactory('listCommitter');
            }


            $http.get(this.getUrlContributor(userRepository, nameRepository)).
                success(
                    function (data) {
                        cacheCommitter.put('listCurrent', data);
                        cacheCommitter.put('timestamp', new Date().getTime());
                        cacheCommitter.put('repository', {
                            user: userRepository,
                            name: nameRepository
                        });
                        listCommitter = (cacheCommitter.get('listCurrent'));
                        fnLoadSuccess();
                    }
                ).
                error(errorHttp);
        }

        this.loadingCommit = function (userRepository, nameRepository, fnLoadSuccess) {
            var isCached = 0;
            if($cacheFactory.get('listCommit')){
                var repository = cacheCommit.get('repository')
                if (moinsUneHeure(cacheCommit.get('timestamp')) 
                && repository.user == userRepository && repository.name == nameRepository){
                    isCached = 1;
                } else {
                    isCached = -1;
                }
            }

            if (isCached == 1) {
                cacheCommit = $cacheFactory.get('listCommit');
                createListCommit(cacheCommit.get('listCurrent'));
                fnLoadSuccess();
                return;
            } else if (isCached == -1) {
                cacheCommit = $cacheFactory.get('listCommit');
            } else {
                cacheCommit = $cacheFactory('listCommit');
            }


            $http.get(this.getUrlRepository(userRepository, nameRepository)).
                success(
                    function (data) {
                        cacheCommit.put('listCurrent', data);
                        cacheCommit.put('timestamp', new Date().getTime());
                        cacheCommit.put('repository', {
                            user: userRepository,
                            name: nameRepository
                        });
                        createListCommit(cacheCommit.get('listCurrent'));
                        fnLoadSuccess();
                    }
                ).
                error(errorHttp);
        }
    }
])