(function(){
	
	'use strict';

	angular
		.module('categories')
		.controller('Main', Main);

	function Main(Categories){
		var vm = this;

		//exposed members first
		vm.categories = [];
		vm.newCategory = {};
		vm.save = save;

		Categories
			.getAll()
			.then(populate);

		function populate(data){
			angular.copy(data, vm.categories);
		}

		function save(){
			vm.categories.push(vm.newCategory);
			vm.newCategory = {};
		}
	}

})();