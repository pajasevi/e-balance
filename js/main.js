/**
 * @namespace EB
 *
 * Applications controlling the page behavior.
 */

var owl;
var navigation = ['kdo-jsme', 'co-umime', 'jak-pracujeme', 'co-jsme-dokazali'];
var isNotScrolled = true;

setInterval(function() {
  isNotScrolled = true;
}, 3000);

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
    var section = EB.getURLParam(window.location, 's');
    var index = navigation.indexOf(section);
    if (owl !== undefined && index > -1) {
      owl.trigger('owl.jumpTo', index);
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
    if($(element).data('tooltip')) {
      var tooltip = $(element).data('tooltip');
      var elBottom = $(element).offset().top + $(element).outerHeight();
      var elCenter = $(element).offset().left + $(element).outerWidth() - ($(tooltip).outerWidth()/2) - 20;

      $('.tooltip').hide();
      $(tooltip).css({
        'top': elBottom + 'px',
        'left': elCenter + 'px'
        })
        .show()
        .addClass('fadeIn');
    }
    else {
      var tooltip = element;

      $('.tooltip').hide();
      $(tooltip).show();
    }
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
if ($(window).innerWidth() > 767) {
  addWheelListener( window, function(e) {
    e.preventDefault();
    e.stopPropagation();

    if(isNotScrolled) {

      var scrolled = e.deltaY;

      if (scrolled >= 1) {
        owl.trigger('owl.next');
        isNotScrolled = false;
      }
      if (scrolled <= -1) {
        owl.trigger('owl.prev');
        isNotScrolled = false;
      }
    }
  });
}

$(document).ready(function() {
  if ($(window).innerWidth() > 767) {
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
  if ($(window).innerWidth() > 767) {
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
  if ($(window).innerWidth() > 767) {
    e.preventDefault();
  }
  else {
    EB.anchorSlide(e, this);
  }
});
$('.logo').on('click', function() {
  if ($(window).innerWidth() > 767) {
    owl.trigger('owl.goTo', 0);
  }
});
$('.cloud .arrow, #contact-us').on('click touchend', function() {
  EB.showTarget(this);
});
$('.tent, .tooltip').on('mouseover', function() {
  EB.tooltipShow(this);
});
$('.tent, .tooltip').on('mouseout', function() {
  EB.tooltipHide(this);
});
