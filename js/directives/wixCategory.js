(function(){
	
	'use strict';

	angular
		.module('categories')
		.directive('wixCategory', WixCategory);

	function WixCategory(){
		return {
			restrict: 'A',
			scope: {
				category: '=wixCategory'
			},
			link: function(scope, element, attrs){

				drawCategory(element, scope.category);
				
			}
		}

		function drawCategory(element, category){
			element.text( category.name );
			if( category.subcategories ){
				var ul = angular.element('<ul>');
				for(var i=0; i < category.subcategories.length; i++){
					var li = angular.element('<li>');
					drawCategory(li, category.subcategories[i]);
					ul.append(li);
				}
				element.append(ul);
			}
		}
	}

})();