import $ from "jquery";

window.jQuery = $;
window.$ = $;

$(function() {

});

// Cache selectors
var lastId,
    topMenu = $(".main-nav"),
    topMenuHeight = topMenu.outerHeight()+15,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.on('click', function(e){

    var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top + 1;

    $('html, body').stop().animate({ 
        scrollTop: offsetTop
    }, 1000);

    e.preventDefault();
});

// Bind to scroll
$(window).on('scroll', function(){
   // Get container scroll position
   var fromTop = $(this).scrollTop()+topMenuHeight;
   
   // Get id of current scroll item
    var cur = scrollItems.map(function(){

        if ($(this).offset().top < fromTop) return this;
    });
    // Get the id of the current element
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