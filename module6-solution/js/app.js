//Use IIFE to prevent the need for local variables to enter the global scope.
(function () {
    'use strict';

    var dependencies = [];
    var module = angular.module("application_name", dependencies)

    function Controller($scope) {
        $scope.checkIfTooMuch = function () {
            if ($scope.items == null || $scope.items == "") {
                $scope.message = "Please enter data first";
            } else {
                var itemsList = $scope.items.split(",").filter(function (item) {
                    return item.trim() != "";
                });

                if (itemsList.length > 3) {
                    $scope.message = "Too much!";
                    $scope.borderType = "red";
                } else {
                    $scope.message = "Enjoy!";
                    $scope.borderType = "green";
                }
            }
        }
    }

    Controller.$inject = ['$scope'];

    module.controller("controller_name", Controller);
})();
