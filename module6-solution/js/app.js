//Use IIFE to prevent the need for local variables to enter the global scope.
(function () {
    'use strict';

    var dependencies = [];
    var module = angular.module("application_name", dependencies)

    module.controller("controller_name", ["$scope", controllerLogic]);

    var controllerLogic = function ($scope) {
        $scope.checkIfTooMuch = function () {
            if ($scope.items == null || $scope.items == "") {
                $scope.message = "Please enter data first";
            } else {
                var itemsList = items.split(",").filter(function (item) {
                    return item.trim() != "";
                });

                if (itemsList.length > 3) {
                    $scope.message = "Too much!";
                } else {
                    $scope.message = "Enjoy!";
                }
            }
        }
    }
})();