'use strict';

var homeworkZengularity = angular.module('homeworkZengularity', [
    'ngCookies',
    'ngRoute',

    'pascalprecht.translate',

    'graphicServices',
    'GitHubApiServices',

    'homeworkZengularityControllers',
    'homeworkZengularityServices',
]);

//Rooting
homeworkZengularity.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/homepage.html',
                controller: 'HomepageController'
            }).
            when('/repository/:user/:nameRepository/committer', {
                templateUrl: 'partials/repository_committer.html',
                controller: 'RepositoryCommitterController'
            }).
            when('/repository/:user/:nameRepository/commit', {
                templateUrl: 'partials/repository_commit.html',
                controller: 'RepositoryCommitController'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);

//Configuration des différents fichier de traduction
homeworkZengularity.config(function ($translateProvider) {
    $translateProvider.useStaticFilesLoader({
        prefix: 'translations/translation.',
        suffix: '.json'
    });

    $translateProvider.determinePreferredLanguage(determinePreferredLanguage);
});

/**
*
**/
function determinePreferredLanguage() {
    var list_lang = new Array('fr');
    var current_lang = navigator.language.substr(0,2);
    if (list_lang.indexOf(current_lang) > -1) {
        return current_lang;
    } else {
        return 'en';
    }
}