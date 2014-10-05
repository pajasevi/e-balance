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
  menuClick: function(item) {
    var item = $(item).data('section');
    owl.trigger('owl.goTo', item);
  }
};

/**
 * @event handling
 */
$('#main-menu').on('click', 'li', function() {
  EB.menuClick(this);
});
$('.cloud .arrow').on('click touchend', function() {
  EB.showTarget(this);
});
