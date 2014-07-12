'use strict';
        
var homepageController = [
    '$scope',
    '$http',
    function ($scope, $http){

        var listerRepository = function () {
            $http.get('https://api.github.com/repositories').
                success(
                    function (data) {
                        $scope.listRepo = data;
                        console.log($scope.listRepo)
                    }
                ).
                error(
                    function(data, status, headers, config) {
                        console.log('error : ' + status)
                    }
                );
        }

        listerRepository();
    }
];