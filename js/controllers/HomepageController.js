'use strict';
        
var homepageController = [
    '$scope',
    '$http',
    '$cookieStore',
    '$cookies',
    '$location',
    function ($scope, $http, $cookieStore, $cookies, $location){
        var listerRepository = function () {
            $http.get('https://api.github.com/repositories?per_page=100').
                success(
                    function (data) {
                        $scope.listRepo = data;
                    }
                ).
                error(
                    function(data, status, headers, config) {
                        console.log('error : ' + status);
                        console.log(data.message);
                    }
                );
        }

        var listerFavorite = function () {
            $scope.listFavorite = new Array();
            for (var key in $cookies) {
                $scope.listFavorite.push($cookieStore.get(key));
            }
        }

        $scope.submit = function () {
            var query = $scope.searchGlobal.split(" ");
            $http.get('https://api.github.com/search/repositories?q=' + query.join('+') + '&per_page=100').
                success(
                    function (data) {
                        $scope.listRepo = data.items;
                    }
                ).
                error(
                    function(data, status, headers, config) {
                        console.log('error : ' + status);
                        console.log(data.message);
                    }
                );
        }

        $scope.selectedFavorite = function (obj) {
            var name = obj.nameRepository;
            var user = obj.userRepository;
            $location.path('/repository/' + user + '/' + name + '/committer');
        }

        listerFavorite();
        listerRepository();
    }
];