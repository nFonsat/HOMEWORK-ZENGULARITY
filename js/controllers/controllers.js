'use strict';

/* Controllers */

var homeworkZengularityControllers = angular.module( 'homeworkZengularityControllers', []);

//On instancie tout les controleurs
homeworkZengularityControllers.controller( 'HomepageController', homepageController );
homeworkZengularityControllers.controller( 'RepositoryCommitterController', repositoryCommitterController );
homeworkZengularityControllers.controller( 'RepositoryCommitController', repositoryCommitController );