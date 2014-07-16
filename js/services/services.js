'use strict';

/* Services */

var homeworkZengularityServices = angular.module( 'homeworkZengularityServices', []);

homeworkZengularityServices.service('colorService', [
    function(){
        this.getColorRVB = function () {
            var tabNumber = new Array();
            for (var i=0; i<3; i++){
                tabNumber.push(Math.floor((Math.random() * 255) + 0));
            }
            return tabNumber.join(',');
        }

        this.getColorHexa = function () {
            var letters = '0123456789ABCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++ ) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
    }
])

homeworkZengularityServices.service('Repository', [
    function(){
        var repository = {
            description : ''
        };

        return {
            getDescription : function () {
                return repository.description;
            },

            setDescription : function (newDescription) {
                repository.description = newDescription;
            }
        }
    }
])