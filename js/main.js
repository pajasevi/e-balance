$(document).ready(function() {

  window.owl = $('.content');

  owl.owlCarousel({
    navigation : true,
    slideSpeed : 1000,
    paginationSpeed : 1000,
    pagination: false,
    singleItem: true,
    rewindNav: false,
    navigationText: ['předchozí', 'další'],
    addClassActive: true,
    afterAction: function() {
      EB.carouselChange(this);
    }
  });
});


///////////////////////////////////


/**
 * @namespace EB
 *
 * Applications controlling the page behavior.
 */
var EB = {
  showTarget: function(element) {
    var target = $(element).data('target');
    $(target).fadeIn();
  },
  carouselChange: function(item) {
    var currentItem = item.currentItem;
    var $menu = $('#main-menu');
    var element = $menu.children()[currentItem];

    $('#main-menu li').removeClass('active');
    $(element).addClass('active');
  },
  menuClick: function(menu) {
    var item = $(menu).data('section');
    owl.trigger('owl.goTo', item);
  },
  getURLParam: function (oTarget, sVar) {
    return decodeURI(oTarget.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
  }
};

/**
 * @event handling
 */
$(window).on('load', function() {
  var section = EB.getURLParam(window.location, 'section');
  owl.trigger('owl.goTo', section);
});
$('#main-menu').on('click', 'li', function() {
  EB.menuClick(this);
});
$('.cloud .arrow').on('click touchend', function() {
  EB.showTarget(this);
});
