
/*
var n = document.getElementById("navbar").clientHeight; // INNER HEIGHT:
var b = document.getElementById("navbar").offsetHeight; //OUTER HEIGHT:
var c = document.getElementById("navbar").scrollHeight;

document.getElementById("wrapper").style.marginTop = n + "px";
document.getElementById("sidebar").style.marginTop = (n - 1) + "px";
*/



document.addEventListener("DOMContentLoaded", function () {
    [].forEach.call(document.querySelectorAll('.dropimage'), function (img) {
        img.onchange = function (e) {
            var inputfile = this, reader = new FileReader();
            reader.onloadend = function () {
                inputfile.style['background-image'] = 'url(' + reader.result + ')';
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    });
});

/* modal */
var a = $('[data-toggle="modal"]');
for (var i = 0; i < a.length; i++) {
    $(a[i]).on('click', function () {
        var target = $(this).attr('data-target');
        $(target).css("display", "block");
    });
}

$("span.close").on('click', function () {
    var target = $(this).closest('.modal')[0];
    $(target).css("display", "none");
});

/*
 window.onclick = function(event) {
 console.log(event.target.id);
 }
 */

$("img.gallery-change").on('click', function () {
    $(".gallery-medium > img").attr('src', this.src);
});

/*
 function currentImage(img) {
 var currentImage = document.getElementById("current-image-medium").src = img;
 }*/

/* ------------------------- start input quantity ------------------------- */
function getInputQuantity() {
    var value = $(".qty-input").val();
    if (value == '')
        value = 0;
    return parseInt(value);
}
function setInputQuantity(quantity) {
    $(".qty-input").val(quantity);
}
$(".qty-btn-up").on('click', function () {
    var quantity = getInputQuantity();
    if (quantity < 10) {
        quantity = quantity + 1;
        setInputQuantity(quantity);
    }
});
$(".qty-btn-down").on('click', function () {
    var quantity = getInputQuantity();
    if (quantity > 1) {
        quantity = quantity - 1;
        setInputQuantity(quantity);
    }
});
/* ------------------------- end input quantity ------------------------- */

