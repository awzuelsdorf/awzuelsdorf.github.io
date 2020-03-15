//Use IIFE to prevent the need for local variables to enter the global scope.
(function () {
    'use strict';

    var module = angular.module("ShoppingListCheckOff", []).controller("ToBuyController", toBuyControllerLogic).controller("AlreadyBoughtController", alreadyBoughtControllerLogic).service("ShoppingListCheckOffService", ShoppingListCheckOffService);

    var toBuyControllerLogic = function ($scope) {
        var itemBuyer = this;
        
        itemBuyer.toBuy = ShoppingListCheckOffService.getUnboughtItems();

        itemBuyer.buyItem = function (index) {
            ShoppingListCheckOffService.buyItem(index);
	}

	console.log(itemBuyer.toBuy);
    };

    toBuyControllerLogic.$inject = ["ShoppingListCheckOffService"];

    var alreadyBoughtControllerLogic = function (ShoppingListCheckOffService) {
        var itemBought = this;

        itemBought.bought = ShoppingListCheckOffService.getBoughtItems();

	console.log(itemBought.bought);
    };

    alreadyBoughtControllerLogic.$inject = ["ShoppingListCheckOffService"];

    function ShoppingListCheckOffService() {
        var service = this;

        var toBuy = [
            {
                "name": "Cookies",
                "quantity": 10,
                "unit": "boxes",
                "pricePerItem": 4.50
            },
            {
                "name": "Pepto Bismol",
                "quantity": 3,
                "unit": "bottles",
                "pricePerItem": 10.90
            },
	];

        var bought = [];

        service.buyItem = function (itemIndex) {
            bought.push(this.toBuy.pop(itemIndex));
	}

        service.getUnboughtItems = function () {
            return toBuy;
	}

        service.getBoughtItems = function () {
            return bought;
	}
    }
})();
