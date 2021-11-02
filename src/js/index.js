import $ from "jquery";
import b from "./lib/svgxuse.js";
import cssVars from 'css-vars-ponyfill';

cssVars();

window.jQuery = $;
window.$ = $;

require('motus');

/* if IE */
if (document.body.style.msTextCombineHorizontal !== undefined)
{
    alert('123123123');
    alert($('#id10'))
}

$(function() {

    var lastId,
        topMenu = $(".main-nav"),
        topMenuHeight = topMenu.outerHeight()+15,
        menuItems = topMenu.find(".main-nav__link"),
        scrollItems = menuItems.map(function(){
            var item = $($(this).attr("href"));
            if (item.length) { return item; }
        });

    menuItems.on('click', function(e){

        $('.main-nav').removeClass('main-nav_open');

        $('html, body').stop().animate({ 
            scrollTop: $($(this).attr("href")).offset().top + 1
        }, 1000);

        $('body').removeClass('overflow-hidden');

        e.preventDefault();
    });

    $(window).on('scroll', function(){

        var fromTop = $(this).scrollTop()+topMenuHeight;

        var cur = scrollItems.map(function(){

            if ($(this).offset().top < fromTop) return this;
        });

        cur = cur[cur.length-1];

        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id)
        {
            lastId = id;

            $('.main-nav__link_active').removeClass('main-nav__link_active');

            var elem = menuItems.filter("[href='#"+id+"']");

            var color = elem.data('color');

            elem.addClass("main-nav__link_active");

            menuItems
            .parent().removeClass("main-nav_white main-nav_black").addClass("main-nav_hide")
            .end().filter("[href='#"+id+"']").parent().addClass("main-nav_active main-nav_" + color).removeClass("main-nav_hide");
        }                 
    });

    $('.to-top').on('click', function(){

        $('html, body').animate({scrollTop: '0px'}, 2000);
    });

    $('.to-next').on('click', function(){

        $('html, body').animate({scrollTop: $('#id40').offset().top}, 1000);
    });

    $('.main-nav-btn').on('click', function(){

        $('.main-nav').addClass('main-nav_open');

        $('body').addClass('overflow-hidden');
    });

    $('.main-nav__close').on('click', function(){

        $('.main-nav').removeClass('main-nav_open');

        $('body').removeClass('overflow-hidden');
    });

    $('.share-block__link').on('click', function(){

        $(this).next('.share-block-links').toggleClass('share-block-links_open');
    });

    $(document).on('mouseup', function (e){

		var div = $(".share-block");

		if (!div.is(e.target) && div.has(e.target).length === 0)
        {
			$('.share-block-links').removeClass('share-block-links_open');
		}
	});

	$(".copy-link").on('click', function() {

		var tmp = $("<input>");

		$("body").append(tmp);

		tmp.val(location.href).select();

		document.execCommand("copy");

		tmp.remove();

		return false;
	});
});

window.addEventListener("load", function() {

    document.querySelector('.block-start__block').classList.add('block-start__block_show');

    if (window.innerWidth > 991)
    {
        [].forEach.call(document.getElementsByClassName('speed-50'), function (el) {

            var animation = new Motus.Animation({
                $el: el,
                keyframes: {
                    30: {
                        translateY: {
                            from: 50,
                            to: 30,
                            unit: "%"
                        },
                        opacity: {
                            from: 0,
                            to: 1,
                        }
                    },
                    80: {
                        translateY: {
                            from: 30,
                            to: 0,
                            unit: "%"
                        },
                        opacity: {
                            from: 1,
                            to: 1,
                        }
                    },
                    100: {
                        translateY: {
                            from: 0,
                            to: -20,
                            unit: "%"
                        },
                        opacity: {
                            from: 1,
                            to: 0,
                        }
                    },
                }
            });
            
            Motus.addAnimation(animation);
        });
    }
    else
    {
        [].forEach.call(document.getElementsByClassName('mobile-speed-50'), function (el) {

            var animation = new Motus.Animation({
                $el: el,
                keyframes: {
                    30: {
                        top: {
                            from: 10,
                            to: 5,
                            unit: "%"
                        },
                        opacity: {
                            from: 0,
                            to: 1,
                        }
                    },
                    70: {
                        top: {
                            from: 5,
                            to: -10,
                            unit: "%"
                        },
                        opacity: {
                            from: 1,
                            to: 1,
                        }
                    },
                    100: {
                        top: {
                            from: -10,
                            to: -15,
                            unit: "%"
                        },
                        opacity: {
                            from: 1,
                            to: 0,
                        }
                    },
                }
            });
            
            Motus.addAnimation(animation);
        });

        [].forEach.call(document.getElementsByClassName('mobile-opacity'), function (el) {

            var animation = new Motus.Animation({
                $el: el,
                keyframes: {
                    30: {
                        opacity: {
                            from: 0,
                            to: 1,
                        }
                    },
                    70: {
                        opacity: {
                            from: 1,
                            to: 1,
                        }
                    },
                    100: {
                        opacity: {
                            from: 1,
                            to: 0,
                        }
                    },
                }
            });
            
            Motus.addAnimation(animation);
        });
    }

    [].forEach.call(document.getElementsByClassName('speed-100'), function (el) {
        
        var animation = new Motus.Animation({
            $el: el,
            keyframes: {
                30: {
                    translateY: {
                        from: 30,
                        to: 0,
                        unit: "%"
                    },
                    opacity: {
                        from: 0,
                        to: 1,
                    }
                },
                80: {
                    translateY: {
                        from: 0,
                        to: -20,
                        unit: "%"
                    },
                    opacity: {
                        from: 1,
                        to: 1,
                    }
                },
                100: {
                    translateY: {
                        from: -20,
                        to: -50,
                        unit: "%"
                    },
                    opacity: {
                        from: 1,
                        to: 0,
                    }
                }
            }
        });
        
        Motus.addAnimation(animation);
    });

    [].forEach.call(document.getElementsByClassName('opacity-set'), function (el) {

        var animation = new Motus.Animation({
            $el: el,
            keyframes: {
                30: {
                    opacity: {
                        from: 0,
                        to: 1,
                    }
                },
                70: {
                    opacity: {
                        from: 1,
                        to: 1,
                    }
                },
                100: {
                    opacity: {
                        from: 1,
                        to: 0,
                    }
                },
            }
        });
        
        Motus.addAnimation(animation);
    });

    [].forEach.call(document.getElementsByClassName('bg-position'), function (el) {
    
        var animation = new Motus.Animation({
            $el: el,
            keyframes: {
                100: {
                    backgroundPositionY: {
                        from: 0,
                        to: 50,
                        unit: "%"
                    }
                }
            }
        });
        
        Motus.addAnimation(animation);
    });
});

var isScrolling = false;

window.addEventListener("scroll", throttleScroll, false);

function throttleScroll(e)
{
    if (isScrolling == false)
    {
        window.requestAnimationFrame(function() {

            dealWithScrolling(e);

            isScrolling = false;
        });
    }

    isScrolling = true;
}

function dealWithScrolling(e)
{
    [].forEach.call(document.getElementsByClassName('animate-elem'), function (el) {

        if (isFullyVisible(el))
        {
            el.classList.add('animate-active');
        }

        if (!isPartiallyVisible(el))
        {
            el.classList.remove('animate-active');
        }
    });
}

function isPartiallyVisible(el)
{
    var elementBoundary = el.getBoundingClientRect();

    var top = elementBoundary.top;
    var bottom = elementBoundary.bottom;
    var height = elementBoundary.height;

    return ((top + height >= 0) && (height + window.innerHeight >= bottom));
}

function isFullyVisible(el)
{
    var elementBoundary = el.getBoundingClientRect();

    var top = elementBoundary.top;
    var bottom = elementBoundary.bottom;

    return ((top >= 0) && (bottom <= window.innerHeight));
}