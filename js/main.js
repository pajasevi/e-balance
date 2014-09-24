var EB = EB || {};






////////////////////////

$(document).ready(function() {

  var owl = $('.content');

  owl.owlCarousel({
    navigation : true,
    slideSpeed : 1000,
    paginationSpeed : 400,
    singleItem:true
  });

  $(window).on('load', function() {
    if ( window.location.hash != "") {
      var hash = window.location.hash;
      var item = $(hash);
      var index = item.index('section');

      owl.trigger('owl.jumpTo', index);
    }
  });

  $(window).on('hashchange', function(e) {
    e.preventDefault();
    e.stopPropagation();
  });

  $('#main-menu').on('click', 'a', function() {
    var hash = $(this).attr('href');
    var item = $(hash);
    var index = item.index('section');

    window.location.hash = hash;
    owl.trigger('owl.goTo', index);
  });

});
