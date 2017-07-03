/*
* Plugin for pagination generation for tmMultimediaGallery 
*Version: 1.0;
*Author: Smart;
*/

(function($){
	$.fn.tmPaginationGenerator = function(o){
		return this.each(function(){
			var $this = $(this),
				data = $this.data('tmPaginationGenerator'),
				options = {
					urlList: {urlThumb: [], urlFull: []}, // url of images
					divWrapper: false, // wrap all li in div
					itemClass: 'item', // class for item
					anchorInnerHtml: '', // class for hover hmtl in <a> element
					// constructor of plugin
					constructor: function () {
						if (!options.urlList.urlThumb.length || !options.urlList.urlFull.length) {
							return false;
						}

						$this
					    	.empty()
					    	.append('<div></div>');

					    var length = Math.min(options.urlList.urlThumb.length, options.urlList.urlFull.length),
					    	$ul = $this.find('>div');
					    for (var i = 0; i < length; i++){
					    	var appendString = '<div class="' + options.itemClass + '"><a href="' + options.urlList.urlFull[i] + '">' + options.anchorInnerHtml + '<img src="' + options.urlList.urlThumb[i] + '" alt/></a></div>';
					    	options.divWrapper && (appendString = '<div>' + appendString + '</div>');
					    	$ul.append(appendString);
					    }

					    options.generateComplete($ul);

					    var images = $ul.find('img'),
					    	counter = images.length;
					    images.on('load abort error', function(){
					    	--counter;
					    	if(counter === 0) {
					    		options.loadComplete($ul);
					    	}
					    })
					},
					// function called when building html tree complete
					generateComplete: function(ul){
					},
					// function called when loading images complete
					loadComplete: function(ul){
					}
				}
			
			data?$this=data:$this.data({tmPaginationGenerator: options});
    		typeof o=='object' && $.extend(options, o);
    		options.me || options.constructor(options.me=$this);
		});
	}
})(jQuery);