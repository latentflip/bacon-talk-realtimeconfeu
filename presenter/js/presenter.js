var Present = { currentSlide: 0 };
Present.bind = MicroEvent.prototype.bind;
Present.unbind = MicroEvent.prototype.unbind;
Present.trigger = MicroEvent.prototype.trigger;

Present.showSlide = function(slide) {
  Present.currentSlide = slide;
  $('.centered').html(Present.slides[Present.currentSlide]);
  $('.slideCount').html('Slide ' + (Present.currentSlide+1) + ' of ' + Present.slides.length);
  
  $('code').attr('data-language', 'javascript');
  Rainbow.color()

  Present.trigger('slide:show', { number: Present.currentSlide+1, count: Present.slides.length})
};

Present.nextSlide = function() {
  if (Present.currentSlide < Present.slides.length-1) {
    Present.showSlide(Present.currentSlide+1);
  }
};
Present.prevSlide = function() {
  if (Present.currentSlide > 0) {
    Present.showSlide(Present.currentSlide-1);
  }
};

Present.reload = function() {
    var deck = window.location.search.slice(1);
    if (deck.length == 0) {
      deck = 'presentation'
    }
    $.ajax({
        url: deck+'.md',
        success: function(data) {
            if (data.length>0) {
                converter = new Showdown.converter();
                var converted = converter.makeHtml(data);
                Present.slides = converted.split('<p>!</p>');
                Present.showSlide(Present.currentSlide);
            }
        }
    });
};
Present.reload();

$('#next').click(function() {Present.nextSlide(); return false})
$('#prev').click(function() {Present.prevSlide(); return false})
$(document).keydown(function(e){
    if (e.keyCode == 37) {
       Present.prevSlide();
       return false;
    }
    if (e.keyCode == 39) {
      Present.nextSlide();
      return false;
    }
    if (e.keyCode == 32) { // space
        Present.reload();
        return false;
    }
});


