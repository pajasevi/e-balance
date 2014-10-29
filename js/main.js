/**
 * @namespace EB
 *
 * Applications controlling the page behavior.
 */

var owl;

var EB = {
  initCarousel: function() {
    owl = $('.content');

    owl.owlCarousel({
      navigation : true,
      slideSpeed : 1000,
      paginationSpeed : 1000,
      pagination: false,
      singleItem: true,
      rewindNav: false,
      navigationText: ['<img src="img/sipka2.png">', '<img src="img/sipka.png">'],
      addClassActive: true,
      afterAction: function() {
        EB.carouselChange(this);
      }
    });
  },
  destroyCarousel: function() {
    if (owl !== undefined && owl.data('owlCarousel') !== undefined) {
      owl.data('owlCarousel').destroy();
    }
  },
  loadJump: function() {
    var section = EB.getURLParam(window.location, 'section');
    if (owl !== undefined) {
      owl.trigger('owl.jumpTo', section);
    }
  },
  anchorSlide: function(event, element) {
    event.preventDefault();
    event.stopPropagation();

    var elem = $(element).attr('href');
    var target = $(elem).offset().top;

    $('html, body').animate({
      scrollTop: target
    }, 1000);
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
$(document).ready(function() {
  if ($(window).innerWidth() > 991) {
    EB.initCarousel();
  }
  else {
    $('section').css('min-height', $(window).innerHeight());
  }
});
$(window).on('load', function() {
  EB.loadJump();
});
$(window).on('resize', function() {
  if ($(window).innerWidth() > 991) {
    window.location.hash= '';
    EB.initCarousel();
  }
  else {
    EB.destroyCarousel();
  }
});
$('#main-menu').on('click', 'li', function() {
  EB.menuClick(this);
});
$('#main-menu').on('click', 'a', function(e) {
  if ($(window).innerWidth() > 991) {
    e.preventDefault();
  }
  else {
    EB.anchorSlide(e, this);
  }
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
