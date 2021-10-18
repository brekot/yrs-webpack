import $ from "jquery";
import AOS from 'aos';

window.jQuery = $;
window.$ = $;

AOS.init();

import Motus from './lib/motus.web.js';

[].forEach.call(document.getElementsByClassName('paralax-left'), function (el) {

    var animation = new Motus.Animation({
        $el: el,
        keyframes: {
            40: {
                left: {
                    from: 0,
                    to: 50,
                    unit: "%"
                },
                opacity: {
                    from: 0,
                    to: 1,
                },
            },
            80: {
                left: {
                    to: 50,
                    unit: "%"
                },
            },
            100: {
                left: {
                    from: 50,
                    to: 100,
                    unit: "%"
                },
                opacity: {
                    from: 1,
                    to: 0,
                },
            },
        }
    });
    
    Motus.addAnimation(animation);
});

[].forEach.call(document.getElementsByClassName('paralax-right'), function (el) {

    var animation = new Motus.Animation({
        $el: el,
        keyframes: {
            40: {
                right: {
                    from: 0,
                    to: 50,
                    unit: "%"
                },
                opacity: {
                    from: 0,
                    to: 1,
                },
            },
            80: {
                right: {
                    to: 50,
                    unit: "%"
                },
            },
            100: {
                right: {
                    from: 50,
                    to: 100,
                    unit: "%"
                },
                opacity: {
                    from: 1,
                    to: 0,
                },
            },
        }
    });
    
    Motus.addAnimation(animation);
});

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

        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top + 1;

        $('html, body').stop().animate({ 
            scrollTop: offsetTop
        }, 1000);

        $('.main-nav').removeClass('main-nav_open');

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