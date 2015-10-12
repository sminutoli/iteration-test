(function(){
	
	'use strict';

	angular
		.module('categories')
		.service('Categories', Categories);

	function Categories($http, ENDPOINTS){
		var vm = this;

		//exposed members first
		vm.getAll = getAll;

		//implementation
		function getAll(){
			return $http
						.get(ENDPOINTS.categories)
						.then(fetchData);

			function fetchData(response){
				return response.data;
			}
		}

	}

})();