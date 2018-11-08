document.addEventListener("DOMContentLoaded", function() {
  [].forEach.call(document.querySelectorAll('.dropimage'), function(img){
    img.onchange = function(e){
      var inputfile = this, reader = new FileReader();
      reader.onloadend = function(){
        inputfile.style['background-image'] = 'url('+reader.result+')';
      }
      reader.readAsDataURL(e.target.files[0]);
    }
  });
});

/* modal */
var a = $('[data-toggle="modal"]');
for (var i = 0; i < a.length; i++) {
  $(a[i]).on('click', function() {
    var target = $(this).attr('data-target');
    $(target).css("display", "block");
  });
}

$("span.close").on('click', function() {
  var target = $(this).closest('.modal')[0];
  $(target).css("display", "none");
});

/*
window.onclick = function(event) {
	console.log(event.target.id);
}
*/
