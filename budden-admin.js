

document.getElementById("sidebar_toggle").addEventListener("click", function (e) {
    var is_show = document.getElementById("wrapper_sidebar").classList.toggle("side-show");
    if (is_show)
        document.getElementById("wrapper_content").style.marginLeft = "200px";
    else
        document.getElementById("wrapper_content").style.marginLeft = "0";
});

var classname = document.getElementsByClassName("sidebar-toggle");
var sidebarToggle = function () {
    var attribute = this.getAttribute("data-toggle");
    document.getElementById(attribute).classList.toggle("show");
};
for (var i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click', sidebarToggle);
}

//document.addEventListener("DOMContentLoaded", function() {
//  [].forEach.call(document.querySelectorAll('.dropimage'), function(img){
//    img.onchange = function(e){
//      var inputfile = this, reader = new FileReader();
//      reader.onloadend = function(){
//        inputfile.style['background-image'] = 'url('+reader.result+')';
//      }
//      reader.readAsDataURL(e.target.files[0]);
//    }
//  });
//});