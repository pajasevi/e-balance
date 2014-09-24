var EB = EB || {};






////////////////////////

$(document).ready(function() {

  var owl = $('.content');

  owl.owlCarousel({
    navigation : true,
    slideSpeed : 1000,
    paginationSpeed : 1000,
    pagination: false,
    singleItem: true,
    rewindNav: false,
    navigationText: ['předchozí', 'další'],
    addClassActive: true
  });

  $('#main-menu').on('click', 'li', function() {
    var item = $(this).data('section');
    $('#main-menu li').removeClass('active');
    $(this).addClass('active');
    owl.trigger('owl.goTo', item);
  });

});
