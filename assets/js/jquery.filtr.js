/*----------------------------------------------

	FILTR.JS

	Filter a selection of elements

	@author Todd Francis
	@version 1.0.1

----------------------------------------------*/

;(function($, window){

	'use strict';

	/**
	 * Filters a list
	 *
	 * @param  {Object} $items  jQuery selection object
	 * @param  {Object} settings
	 * @return {Object}         Initial jQuery selection object
	 */
	$.fn.filtr = function($items, settings){

		var defaults = {
				beforeFilter		: function(value){ return value; },
				afterFilter			: function(){},
				beforeManip			: function(toShow, toHide){},
				show				: function($item){
					$item.show();
				},
				hide				: function($item){
					$item.hide();
				},
				checkItem			: function(value, item){
					var reg = new RegExp(value.split('').join('[\\w\\W]*'), 'i');
					return item.data.match(reg);
				},
				trigger				: 'keyup',
				wait				: 200,
				attr				: 'data-filtr'
			},
			o = $.extend(true, {}, defaults, settings),
			p = this,
			toShow = [],
			toHide = [],
			timeout;

		// Loop through each item
		return this
			.each(function(){

				var $input = $(this),
					items = [],
					bind = [];

				// Populate the item
				$items
					.each(function(){

						var $item = $(this);

						// Build the array
						items.push({
							data	: $item.attr(o.attr),
							item	: $item
						});

					});

				bind[o.trigger] = function(){

					// Clear timeout if there currently is one set
					if( timeout ){
						window.clearTimeout(timeout);
					}

					// Set the new timeout
					timeout = window.setTimeout(function() {

						var val = $input.val();

						// Call the before callback
						val = o.beforeFilter.call(p, val);

						// Filter the items
						filter(val, items);

						// Call the after callback
						o.afterFilter.call(p);

					}, o.wait);

				};

				// Bind the event
				$input
					.on(bind)
					.trigger(o.trigger);

			});

		/**
		 * Filter the list
		 *
		 * @param  {string} value	value to filter by
		 * @param  {array} items	items to filter against
		 * @return {void}
		 */
		function filter(value, items) {

			// Clear
			toShow.length = 0;
			toHide.length = 0;

			// Filter the items
			items.filter(function(item) {

				if( o.checkItem.call(p, value, item) ){

					toShow.push(item.item);

				}else{

					toHide.push(item.item);

				}

			});

			o.beforeManip.call(p, toShow, toHide);

			// Show the ones that need to be shown
			$.each(toShow, function(){

				o.show.call(p, $(this));

			});

			// Hide the ones that need to be hidden
			$.each(toHide, function(){

				o.hide.call(p, $(this));

			});
		}

	};

}(jQuery, window));