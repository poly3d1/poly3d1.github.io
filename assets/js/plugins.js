// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

(function($) {
	$.fn.outerHTML = function() {
	    return jQuery("<p>").append(this.clone()).html();
	}
	// Топер
	$.fn.toper = function(___start, ___bottom) {
		var $window = $(self),
			$body = $('body'),
			$this = $(this);
		
		return this.each(function() {
			var window_height = parseInt($(self).height()),
				body_height = parseInt($('body').height()),
				max_top = body_height - window_height - (parseInt(___bottom) - 57);
			
			var get_toper = function() {
				window_height = parseInt($(self).height()),
				body_height = parseInt($('body').height()),
				max_top = body_height - window_height - (parseInt(___bottom) - 57);
			
				if ($window.scrollTop() > parseInt(___start) && $window.scrollTop() < max_top) {
					if ($this.css('display') == 'none') $this.removeClass('hidden');
					if ($this.hasClass('abs')) $this.removeClass('abs');
				} else if ($window.scrollTop() > max_top) {
					if ($this.css('display') == 'none') $this.removeClass('hidden');
					if (!$this.hasClass('abs')) $this.addClass('abs');
				} else {
					$this.addClass('hidden');
				}
				
				if (body_height < 1200) $this.addClass('hidden')
			}
			
			$window.resize(function() {
				body_height = $body.height(),
				window_height = $window.height(),
				max_top = body_height - window_height - (parseInt(___bottom) - 8);
			});
			
			get_toper();
			
			$window.scroll(function() {
				get_toper();
			});
			
			$this.on('click', this, function() {
				$('html, body').stop().animate({scrollTop: 0}, (body_height - window_height)/2);
			});
		});
	}
	// Слайдер
	$.fn.slider = function($w) {
		return this.each(function() {
                        var $this = $(this);
			var $arrows = $this.find('.arrows'),
				$arrow = $arrows.find('li'),
				$wrapper = $this.find('.wrapper > ul'),
				$a = $wrapper.find('li');
                                
			var bind = function() {
				$arrow.on('click', this, function() {
					$arrow.unbind('click');
					if ($(this).hasClass('prev')) slide('right');
					else slide('left');
				});
			}
				
			var slide = function(direct) {
				if (direct == 'right') {
					var a = '<li>'+
						$a.filter(':last').html()+
						'</li>';
					$a.filter(':last').remove();
					$wrapper.css('left', -$w).prepend(a).animate({'left': 0}, "fast", function() {
						bind();
				
						$a = $wrapper.find('li');
					});
				} else {
					var a = '<li>'+
						$a.filter(':first').html()+
						'</li>';
					$wrapper.append(a).animate({'left': -$w}, "fast", function() {
						$wrapper.css('left', 0);
						$a.filter(':first').remove();
						
						bind();
				
						$a = $wrapper.find('li');
					});
				}
			}
                        if($a.length < 2) $arrows.remove();
			bind();
		});
	}
	// Даунер
	$.fn.downer = function() {
                var $contacts = $('#contacts');
                var $search = $('#search');
                var $closer = $('#contacts, #search').find('a.close');
                var $query = $('#search').find('#query');
                $contacts.data('height', $contacts.children().outerHeight(true)).css({display : 'none'});
                $search.data('height', $search.children().outerHeight(true)).css({display : 'none'});
                
                return this.each(function() {
                    var $this = $(this);
                    var $link;
                    var $el;
                    var $another_link;
                    var $another_el;

                    var who = function() {
                        if ($this.data('id') == 'contacts'){
                            $el = $('#contacts');
                            $another_el = $('#search');
                            $another_link = $('.get-search');
                        } else if ($this.data('id') == 'search') {
                            $el = $('#search');
                            $another_el = $('#contacts');
                            $another_link = $('.get-contacts');
                        }
                    };

                    var open = function() {
                        who();
                        $another_link.removeClass('active');
                        $another_el.css({height : 0});
                        $link.addClass('active');
                        $el.animate({height : $el.data('height')}, $el.data('height')/1.5).css({display : 'block'});
                        yamap();
                    };

                    var close = function() {
                        $query.val(null);
                        who();
                        $el.animate({height : 0}, 200);
                        window.setTimeout(function(){
                            $el.css({display : 'none'})
                            $link.removeClass('active');
                        }, 200);
                    };

                    $this.on('click', this, function() {
                        if ($this.hasClass('active')) {
                            $link = $(this);
                            close();
                        } else {
                            $link = $(this);
                            open();
                        }
                    });
                    
                    $closer.on('click', this, function() {
                        $link = $('.get-'+$(this).data('id'));
                        close();
                    });
                    
                });
        }
        // Визуал
        $.fn.visualler = function() {
            var $this = $(this);
            var $iprev = $this.find('.prev');
            var $inext = $this.find('.next');
            var $loader = $this.find('.loading');
            var $paginator = $this.find('.paginator');
            var speed = 1000;
            var delay = 5000;
            var $ul, $li, interval, ww, lw, left;
            return this.each(function() {
                var init = function() {
                    ww = $(window).width() < 1400 ? $(window).width() : 1400;
                    lw = $this.find('.loading').outerWidth();
                    $ul = $this.find('ul');
                    $li = $ul.find('li');
                    left = $ul.css('left');
                    $this.width(ww);
                    $ul.width($li.length*ww);
                    $paginator.html('');
                    $li.each(function(){
                        $(this).prev().index() != -1 ? index = $(this).prev().index() : index = $li.length-1;
                        $(this).width(ww);
                        $paginator.append('<a href="javascript:void(0)" data-id="'+index+'"></a>');
                    });

                    var $points = $paginator.find('a');
                    $points.eq($ul.find('li').eq(0).data('id')).addClass('selected');
                    $paginator.css({width : $points.outerWidth(true)*$points.length});

                    $points.bind('click', slide);

                    $ul.css('left', -ww);
                };

                var bindSlider = function() {
                    $iprev.bind('click', slide);
                    $inext.bind('click', slide);
                    $paginator.find('a').bind('click', slide);
                }

                var start = function() {
                    clearLoader();
                    $loader.find('span').animate({width : lw}, delay+speed);
                    interval = setInterval(slide, delay+speed);
                }

                var clearLoader = function() {
                    $loader.find('span').remove();
                    $loader.append('<span></span>');
                }

                var slide = function(e) {
                    left = $ul.css('left');
                    if(!e) {
                        var $target = $inext;
                    } else {
                        var $target = $(e.currentTarget);
                        clearLoader();
                        clearInterval(interval);
                        start();
                    }
                    var $clon = null;
                    $iprev.unbind('click');
                    $inext.unbind('click');
                    $paginator.find('a').unbind('click');
                    if($target.is('.paginator > a')) {
                        $paginator.find('a').removeClass('selected');
                        $target.addClass('selected');
                        $paginator.find('a').each(function(){
                            if($(this).data('id') == $target.data('id')) index = $(this).index();
                        });
                        var html = '';
                        for (i = index; i <= $ul.find('li').length; i++) {
                            html += $ul.find('[data-id="'+i+'"]').outerHTML();
                        }
                        for (i = 0; i < index; i++) {
                            html += $ul.find('[data-id="'+i+'"]').outerHTML();
                        }
                        $ul.html(html);
                        bindSlider();
                    } else if ($target.hasClass('next')){
                        $clon = $ul.find('li').eq(0);
                        var id = $clon.data('id');
                        $ul.append($clon.clone()).find('li').eq($ul.find('li').length-1).data('id', id);
                        $ul.css({left : (Number(left.substring(0, left.length - 2)) + ww)});
                        $clon.remove();
                        $paginator.find('a').removeClass('selected');
                        $paginator.find('[data-id="'+id+'"]').addClass('selected');
                        $ul.animate({left : left}, speed, 'linear', bindSlider);
                        clearLoader();
                        $loader.find('span').animate({width : lw}, delay+speed);
                    } else {
                        $clon = $ul.find('li').eq($ul.find('li').length-1);
                        var id = $clon.data('id');
                        $ul.prepend($clon.clone()).find('li').eq(0).data('id', id);
                        $ul.css({left : (Number(left.substring(0, left.length - 2)) - ww)});
                        $clon.remove();
                        $paginator.find('a').removeClass('selected');
                        $paginator.find('[data-id="'+$ul.find('li').eq($ul.find('li').length-1).data('id')+'"]').addClass('selected');
                        $ul.animate({left : left}, speed, 'linear', bindSlider);
                        clearLoader();
                        $loader.find('span').animate({width : lw}, delay+speed);
                    }

                };

                $iprev.bind('click', slide);
                $inext.bind('click', slide);

                $(window).on('resize', function(){
                    clearInterval(interval);
                    $ul.stop();
                    init();
                    start();
                });

                init();
                start();
            });
        }
	// Задать вопрос
	$.fn.modal = function() {
            var $this = $(this);
            var $helper = $('#helper');
            var $form = $helper.find('form');
            var $closer = $helper.find('.close');
            var $validate = $form.find('.validate');
            
            var init = function() {
                var dw = $(window).width();
                var dh = $(document).height();
                $('body').find('div.overlay').css({width : dw, height: dh, zIndex: 500});   
                $helper.css({marginTop : -Math.round($helper.outerHeight(true)/2)});
                $form.find('input, textarea').each(function(){
                    $(this).val(null);
                });
            }
            
            var validate = function($div) {
                var $it = $div.find('input, textarea');
                var val = $it.val();
                if ($it.attr('type') == "text") {
                    if (val != '') {
                        $it.removeClass('error');
                    }else {
                        $it.addClass('error');
                    }
                } else if ($it.attr('type') == "email") {
                    var regexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                    if (val.match(regexp)) {
                        $it.removeClass('error');
                    } else {
                        $it.addClass('error');
                    }
                } else if ($it.attr('type') == "tel") {
                    var regexp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
                    if (val.match(regexp)) {
                        $it.removeClass('error');
                    } else {
                        $it.addClass('error');
                    }
                }
            }
            
            var validate_form = function() {
                $validate.find('input, textarea').each(function() {
                    validate($(this).parent());
                });
            }
            
            var close = function() {
                 $('body').find('.overlay').remove();
                 $helper.css({display : 'none', marginTop: 0});
            };
            
            var submit_form = function(){
                var data = {};
                $form.find('input, textarea').each(function(){
                    data[$(this).attr('name')] = $(this).val();
                });
                $.ajax({
                        url: '/ajax/feedback',
                        type: 'POST',
                        data: (data),
                        dataType: 'html',
                        success: function(html){
                            $form.addClass('hidden');
                            $helper.append('<h3>Ваше сообщение успешно отправлено</h3>');
                        },
                        error: function (request, status, error) {
                            console.log('Ошибка: '+request.responseText);
                        }
                });
                return false;
            };
            
            $validate.find('input, textarea').blur(function() {
                validate($(this).parent());
            });
            
            $this.on('click', this, function(){
                $('body').append('<div class="overlay"></div>');
                $helper.css({display : 'block'});
                init();
                $form.removeClass('hidden');
                $helper.find('h3').remove();
            });
            
            $closer.on('click', this, function(){
                close();
            });
            
            $form.on('submit', this, function(){
                validate_form();		
                var validation = true;
                $validate.each(function() {
                    if ($(this).find('input, textarea').hasClass('error')) validation = false;
                });
                if (validation) {
                    submit_form();
                }
                return false;
            });
            
            $(window).on('resize', function(){
                init();
            });
        }
        // Ховер у продукции
        $.fn.hoverer = function() {
            var $this = $(this);
            $this.each(function(){
                var bg = $(this).find('td').css('backgroundColor');
                $(this).hover(
                    function(){
                        $(this).find('td').css({background : 'none'});
                    },
                    function(){
                        $(this).find('td').css({background : bg});
                    }              
                )
            })
        }
        
        // Форма в гостевой
        $.fn.former = function() {
            var $this = $(this);
            var $a = $this.find('a.more');
            var $form = $this.find('form');
            var $validate = $form.find('.validate');
            var h = $form.outerHeight();
            $form.css({height : 0});
            $a.on('click', this, function() {
                if ($(this).is('.active')) {
                    $(this).html('написать').removeClass('active');
                    $form.animate({height : 0}, 300, function(){ $form.css({display : 'none'}); });
                } else {
                    $(this).html('отменить').addClass('active');
                    $form.css({display : 'block'}).animate({height : h}, 300);
                }
            });
            
            var validate = function($div) {
                var $it = $div.find('input, textarea');
                var val = $it.val();
                if ($it.attr('type') == "text") {
                    if (val != '') {
                        $it.removeClass('error');
                    }else {
                        $it.addClass('error');
                    }
                } else if ($it.attr('type') == "email") {
                    var regexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                    if (val.match(regexp)) {
                        $it.removeClass('error');
                    } else {
                        $it.addClass('error');
                    }
                } else if ($it.attr('type') == "tel") {
                    var regexp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
                    if (val.match(regexp)) {
                        $it.removeClass('error');
                    } else {
                        $it.addClass('error');
                    }
                }
            }
            
            var validate_form = function() {
                $validate.find('input, textarea').each(function() {
                    validate($(this).parent());
                });
            }
            
            $validate.find('input, textarea').blur(function() {
                validate($(this).parent());
            });
            
            $form.on('submit', this, function(){
                validate_form();		
                var validation = true;
                $validate.each(function() {
                    if ($(this).find('input, textarea').hasClass('error')) validation = false;
                });
                return validation ? true : false;
            });
            
        }
        
        // Виджет новостей
        $.fn.newser = function() {
            var $this = $(this);
            var $article = $this.find('.wrapper');
            var $a = $this.find('.pagination > a').not('.more');
            
            $article.each(function(index){
                if(index != 0) $(this).css({display : 'none'});
            });
            
            $a.on('click', this, function(){
                var aindex = $(this).data('id');
                $article.each(function(index){
                    if (index == aindex) {
                        $(this).css({display : 'block'})
                    } else {
                        $(this).css({display : 'none'})
                    }
                });
            });
            
        }
        
        // Поиск
        $.fn.searcher = function() {
            var $this = $(this);
            var $form = $(this).find('form');
            var $ss = $(this).find('.searchstring');
            var $al = $(this).find('.ajax-loader');
            var $result = $(this).find('.result > div');
            var $query = $(this).find('#query');
            
            var show_result = function(html) {
                $al.addClass('hidden');
                $result.html(html);
                
                var h = $this.find('.form').outerHeight(true)+$result.outerHeight(true);
                $this.css({height : h});
            }
            
            $form.on('submit', this, function(){
                $al.removeClass('hidden');
                $.ajax({
                        url: '/ajax/search',
                        type: 'POST',
                        data: ({q : $query.val()}),
                        dataType: 'html',
                        success: function(html){
                            show_result(html);
                        },
                        error: function (request, status, error) {
                            $al.addClass('hidden');
                            console.log('Ошибка: '+request.responseText);
                        }
                });
                return false;
            });
        }


    //Maginific Popup
    $('.block-poluren__button').magnificPopup({
        removalDelay: 300,
        mainClass: 'mfp-fade'
    });


})(jQuery);
// Place any jQuery/helper plugins in here.

