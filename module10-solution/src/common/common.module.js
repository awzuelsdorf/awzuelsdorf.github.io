(function() {
"use strict";

angular.module('common', [])
.constant('ApiPath', 'https://morning-reef-62571.herokuapp.com')
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
