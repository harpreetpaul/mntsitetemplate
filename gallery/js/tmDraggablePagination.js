/*
* Plugin for draggable pagination for tmMultimediaGallery 
*Version: 1.0;
*Author: Smart;
*/

(function($){
	$.fn.tmDraggablePagination = function(o){
		return this.each(function(){
			var $this = $(this),
				data = $this.data('tmDraggablePagination'),
				options = {
					itemClass: '.item',
					prevButtonClass: '.prev',
					nextButtonClass: '.next',
					controlHiddenClass: '.hide-button',
					step: null,

					constructor: function () {
						var $paginHolder = $this.find(">div"),
							$win = $(window),
							$next = $(options.nextButtonClass),
							$prev = $(options.prevButtonClass),
							totalWidth = 0,
							step = (options.step) ? options.step : $paginHolder.find(options.itemClass).outerWidth(true);

						init();

						function checkFunction(rule, position){
							if ($paginHolder.length) {
								if (rule){
									$paginHolder.stop().animate({'left': position});
					                return false;
								}
							}
							return true;
						}

						function checkLeftBorder(){
							return checkFunction(($paginHolder.position().left > 0), 0);
						}

						function checkWidth(){
							return checkFunction(($paginHolder.width() < $this.width()), 0);
						}

						function checkRightBorder(){
							var leftPos = Math.abs($paginHolder.position().left) + $this.width(); 
					        return checkFunction((leftPos > $paginHolder.width()), (-1*($paginHolder.width() - $this.width())));
						}

						function init(){
							var controlHiddenClassName = options.controlHiddenClass.substr(1);
						    $paginHolder
							    .find(options.itemClass).each(function(){
									totalWidth += $(this).outerWidth(true);
							    })
							    .end()
							    .width(totalWidth)
							    .draggable({
							        axis: "x",
							        start: onDragStart,
							        stop: onDragStop
							    });
							onDragStart();

							// set listeners
							$next && $next.on('click', onClickNext);
						    $prev && $prev.on('click', onClickPrev);
						    $win.on('resize', onResize);

							function onClickPrev(e){
						        var leftPosNew = $paginHolder.position().left + step;
						        (leftPosNew > 0) && (leftPosNew = 0);

						        checkFunction(true, leftPosNew);
							}

							function onClickNext(e){
								var leftPosNew = $paginHolder.position().left - step,        
						            leftPos = -($paginHolder.width() - $this.width());         
						        (leftPosNew < leftPos) && (leftPosNew = leftPos);

						        checkFunction(true, leftPosNew);
							}

							function onDragStart(event, ui){
					        	if ($this.width() > totalWidth) {
					        		$next && $next.addClass(controlHiddenClassName);
					        		$prev && $prev.addClass(controlHiddenClassName);
				        			return false;
					        	} else {
				        			$next && $next.removeClass(controlHiddenClassName);
					        		$prev && $prev.removeClass(controlHiddenClassName);
					        	}
					        }

					        function onDragStop(event, ui){
			        	        checkWidth();
					            checkRightBorder();
					            checkLeftBorder();
						    }

						    function onResize(e){
						    	onDragStart();
						    	if($paginHolder.width() > $this.width()){
						            checkRightBorder();
						        }else{
						        	$paginHolder.css('left', 0);
						            checkLeftBorder();
						        }
						    }
						}
					}
				}

			data?$this=data:$this.data({tmDraggablePagination: options});
    		typeof o=='object' && $.extend(options, o);
    		options.me || options.constructor(options.me=$this);
		});
	}
})(jQuery);