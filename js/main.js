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
  loadJump: function() {
    var section = EB.getURLParam(window.location, 'section');

    owl.trigger('owl.jumpTo', section);
  },
  showTarget: function(element) {
    var target = $(element).data('target');
    var animation = $(element).data('animation') || 'fadeIn';

    $(target).show().addClass(animation);
  },
  tooltipShow: function(element) {
    var tooltip = $(element).data('tooltip')
    var elBottom = $(element).offset().top + $(element).outerHeight();
    var elCenter = $(element).offset().left + $(element).outerWidth() - ($(tooltip).outerWidth()/2) - 20;

    $(tooltip).css({'top': elBottom + 'px', 'left': elCenter + 'px'}).show().addClass('fadeIn');
  },
  tooltipHide: function(element) {
    var tooltip = $(element).data('tooltip');

    $(tooltip).hide();
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
  EB.loadJump();
});
$('#main-menu').on('click', 'li', function() {
  EB.menuClick(this);
});
$('.cloud .arrow, #contact-us').on('click touchend', function() {
  EB.showTarget(this);
});
$('.camp').on('mouseover', '.tent', function() {
  EB.tooltipShow(this)
});
$('.camp').on('mouseout', '.tent', function() {
  EB.tooltipHide(this)
});
