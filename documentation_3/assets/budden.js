
/*
 var n = document.getElementById("navbar").clientHeight; // INNER HEIGHT:
 var b = document.getElementById("navbar").offsetHeight; //OUTER HEIGHT:
 var c = document.getElementById("navbar").scrollHeight;
 document.getElementById("wrapper").style.marginTop = n + "px";
 document.getElementById("sidebar").style.marginTop = (n - 1) + "px";
 */

/* sidebar toggle */
var sidebar = document.getElementById("sidebar_toggle");
if (sidebar) {
    sidebar.addEventListener("click", function (e) {
        document.getElementById("wrapper").classList.toggle("side-show");
    });
}
/* menu toggle */
var menu = document.getElementsByClassName("menu-toggle");
var sidebarToggle = function () {
    var attribute = this.getAttribute("data-toggle");
    document.getElementById(attribute).classList.toggle("show");
};
for (var i = 0; i < menu.length; i++) {
    menu[i].addEventListener('click', sidebarToggle);
}

/* drop image */
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

$("img.gallery-change").on('click', function () {
    $(".gallery-medium > img").attr('src', this.src);
});

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




/* -------------------------------------------------------- validate ----------------------------------------------------------------------------------- */
function validateMessage() {
    this.app_invalid = document.querySelectorAll('p[app-invalid]');
    this.length = this.app_invalid.length;

    this.setMessage = function (name, message) {
        for (var i = 0; i < this.length; i++) {
            var tag = this.app_invalid[i];
            if (name == tag.getAttribute('app-invalid')) { /* firstname*/
                tag.innerHTML = message;
                tag.removeAttribute('hidden');
            }
        }
    }
    this.getMessage = function () {
        return this;
    }
    this.resetMessage = function () {
        for (var i = 0; i < this.length; i++) {
            var tag = this.app_invalid[i];
            tag.setAttribute('hidden', 'true');
            tag.innerHTML = '';
        }
    }
}

function validateForm(form_id, validate) {
    var is_vaild = true;
    var m = new validateMessage();
    m.resetMessage();

    var formData = document.getElementById(form_id).querySelectorAll('input[name], select[name], textarea[name]');
    var length = formData.length;

//    console.log(formData);
//    return;

    if (isset(validate['detail'])) {
        var rowCount = document.getElementById(validate['detail']['table']).rows.length;
        if (rowCount <= 1) {
            m.setMessage('detail', 'The detail is required');
            is_vaild = false;
            console.log('detail is required');
        }
    }

    for (var i = 0; i < length; i++) {

        var d = formData[i].name;
        var v = formData[i].value.trim();

        if (isset(validate[d])) {

            if (isset(validate[d].required) && validate[d].required === true && v == '') {
                m.setMessage(d, 'The field is required');
                is_vaild = false;
                console.log('This field is required ' + d);
                continue;

            }

            if (isset(validate[d].numeric) && validate[d].numeric === true && v != '' && !isNumber(v)) {
                m.setMessage(d, 'The field should be numeric');
                is_vaild = false;
                continue;
                //console.log('in vaid numeric');
            }

            if (isset(validate[d].minlength) && v.length < validate[d].minlength) {
                m.setMessage(d, 'The field is minlength ' + validate[d].minlength + ' character');
                is_vaild = false;
                continue;
                //console.log('in vaid minlength');
            }

            if (isset(validate[d].maxlength) && v.length > validate[d].maxlength) {
                m.setMessage(d, 'The field is maxlength ' + validate[d].maxlength + ' character');
                is_vaild = false;
                continue;
                //console.log('in vaid maxlength');
            }

            if (isset(validate[d].email) && validate[d].email === true && v !== '' && !validateEmail(v)) {
                m.setMessage(d, 'The field should be email');
                is_vaild = false;
                continue;
                //console.log('in vaid email');
            }

            if (isset(validate[d].min)) {
                if (isNumber(v)) {
                    if (v < validate[d].min) {
                        m.setMessage(d, 'The field is greater than or equal to ' + validate[d].min);
                        is_vaild = false;
                        continue;
                        //console.log('in vaid min');
                    }
                } else {
                    m.setMessage(d, 'The field is not equal');
                    is_vaild = false;
                    continue;
                    //console.log('can not process in vaid min');
                }
            }

            if (isset(validate[d].max)) {
                if (isNumber(v)) {
                    if (v > validate[d].max) {
                        m.setMessage(d, 'The field is less than or equal to ' + validate[d].max);
                        is_vaild = false;
                        continue;
                        //console.log('in vaid max');
                    }
                } else {
                    m.setMessage(d, 'The field is not equal');
                    is_vaild = false;
                    continue;
                    //console.log('can not process in vaid max');
                }
            }

            if (isset(validate[d].match)) {
                var match = validate[d].match;
                var value_match = document.getElementById(form_id).querySelectorAll('input[name=' + match + '], select[name=' + match + ']')[0].value.trim();
                if (v !== value_match) {
                    m.setMessage(d, 'The field is not matching to ' + match);
                    is_vaild = false;
                    continue;
                }
            }
        } else {
//            is_vaild = false;
//            console.log('data invalid : ' + d);
        }
    }
    console.log('is valid : ' + is_vaild);
    return is_vaild;
    //   return false;
}

function validateEmail(email) {
    /* true is email , false is not email */
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function isset(data) {
    if (typeof data === 'undefined') {
        return false;
    }
    return true;
}

function validateDetail(data, validate) {

    var is_vaild = true;
    var m = new validateMessage();
    m.resetMessage();

    for (var key in data) {

        if (isset(validate[key])) {

            var v = data[key];
            // console.log(validate[key]);

            if (isset(validate[key].required) && validate[key].required === true && v == '') {
                m.setMessage(key, 'The field is required');
                is_vaild = false;
                continue;
                //console.log('This field is required ' + d);
            }

            if (isset(validate[key].numeric) && validate[key].numeric === true && v != '' && !isNumber(v)) {
                m.setMessage(key, 'The field should be numeric');
                is_vaild = false;
                continue;
                //console.log('in vaid numeric');
            }

            if (isset(validate[key].minlength) && v.length < validate[d].minlength) {
                m.setMessage(key, 'The field is minlength ' + validate[d].minlength + ' character');
                is_vaild = false;
                continue;
                //console.log('in vaid minlength');
            }

            if (isset(validate[key].maxlength) && v.length > validate[d].maxlength) {
                m.setMessage(key, 'The field is maxlength ' + validate[d].maxlength + ' character');
                is_vaild = false;
                continue;
                //console.log('in vaid maxlength');
            }

            if (isset(validate[key].email) && validate[key].email === true && v !== '' && !validateEmail(v)) {
                m.setMessage(key, 'The field should be email');
                is_vaild = false;
                continue;
                //console.log('in vaid email');
            }

            if (isset(validate[key].min)) {
                if (isNumber(v)) {
                    if (v < validate[key].min) {
                        m.setMessage(key, 'The field is greater than or equal to ' + validate[d].min);
                        is_vaild = false;
                        continue;
                        //console.log('in vaid min');
                    }
                } else {
                    m.setMessage(key, 'The field is not equal');
                    is_vaild = false;
                    continue;
                    //console.log('can not process in vaid min');
                }
            }

            if (isset(validate[key].max)) {
                if (isNumber(v)) {
                    if (v > validate[key].max) {
                        m.setMessage(key, 'The field is less than or equal to ' + validate[d].max);
                        is_vaild = false;
                        continue;
                        //console.log('in vaid max');
                    }
                } else {
                    m.setMessage(key, 'The field is not equal');
                    is_vaild = false;
                    continue;
                    //console.log('can not process in vaid max');
                }
            }
        }
    }
    return is_vaild;
}

function save_selector(form_id, type, url) {
    if (type == 'ajax') {
        var data = $("#" + form_id).serialize();
        return ajax_post(base_url + url, data, 'JSON');
    } else {
        var button_value = $("<input type='hidden'/>");
        button_value.attr("name", "save");
        button_value.attr("value", type); // get value save or save_stay
        button_value.appendTo("#" + form_id);

        $("#" + form_id).submit();
        button_value.remove();
    }
}

/* -------------------------------------------------------- ajax ----------------------------------------------------------------------------------- */
/* .done() , .fail(), .always(), .then() */
function ajax_get(url, type) {
    return $.ajax({
        type: 'GET',
        url: url,
        dataType: type,
    });
}

function ajax_post(url, data, datatype) {
    return $.ajax({
        type: 'POST',
        url: url,
        data: data,
        dataType: datatype, /* JSON, HTML */
    });
}

function ajax_action(type, url, data, datatype) {
    return $.ajax({
        type: type,
        url: url,
        data: data,
        dataType: datatype,
    });
}