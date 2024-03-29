(function(){
	
	'use strict';

	angular
		.module('categories')
		.directive('wixCategories', WixCategories);

	function WixCategories(){
		return {
			restrict: 'A',
			scope: {
				all: '=wixCategories'
			},
			link: function(scope, domElement, attrs){

				//in order to handle the async population we need to watch the collection!
				var kill = scope.$watchCollection('all', dataChanged);
				scope.$on('$destroy', kill);
				kill = scope.$on('redraw', dataChanged.bind(null, scope.all) );
				scope.$on('$destroy', kill);

				//some research over iteration strategy: http://codereview.stackexchange.com/questions/47932/recursion-vs-iteration-of-tree-structure
				function dataChanged(newVal, oldVal){
					if(!newVal.length) return;

					var all = newVal;
					domElement.empty();
					
					for(var i=0; i < all.length; i++){

						var category = all[i];
						
						var current = category;
						var last = current;

						current.next = null;
						current.container = domElement;

						while (current) {
						  
							var li = angular.element('<li>').text(current.name)
							current.container.append( li );

							var children = current.subcategories;
							
							for (var i2 = 0; children && i2 < children.length; i2++) {
						  		var ul = angular.element('<ul>');
						    	li.append(ul);

						    	var child = children[i2];
						    	child.next = null;
						    	child.container = ul;
						    	last.next = child;
						    	last = child;
							}
							current = current.next;

						}

					}

				}
				
			}
		}

	}

})();