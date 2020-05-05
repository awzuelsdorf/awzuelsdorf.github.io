(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemDetailController', ItemDetailController);


ItemDetailController.$inject = ['$stateParams', 'items'];
function ItemDetailController($stateParams, items) {
  var itemDetail = this;
  var item = items[$stateParams.itemId];

  item.items.then(function (result) {
    itemDetail.items = result;
  });
}

})();
