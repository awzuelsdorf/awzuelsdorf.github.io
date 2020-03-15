(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var itemAdder = this;

  itemAdder.items = ShoppingListCheckOffService.getUnboughtItems();

  itemAdder.buyItem = function (index) {
    ShoppingListCheckOffService.buyItem(index);
  }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var showList = this;

  showList.items = ShoppingListCheckOffService.getBoughtItems();
}


function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var toBuy = [
	  {
		  "quantity": 60,
		  "name": "burritos"
	  },
	  {
		  "quantity": 90,
		  "name": "tamales"
	  }
  ];

  var bought = [];

  service.buyItem = function (index) {
    bought.push(toBuy.pop(index));
  };

  service.getBoughtItems = function () {
    return bought;
  };

  service.getUnboughtItems = function () {
    return toBuy;
  };
}

})();
