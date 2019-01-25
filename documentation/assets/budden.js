
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

/* on bottom */
var bottom = document.getElementsByClassName("on-bottom");
var onBottom = function () {
    $('html, body').animate({scrollTop: $(document).height()}, 'slow');
//    var scrollingElement = (document.scrollingElement || document.body);
//    scrollingElement.scrollTop = scrollingElement.scrollHeight;
};
for (var i = 0; i < bottom.length; i++) {
    bottom[i].addEventListener('click', onBottom);
}

/* on top */
var ontop = document.getElementsByClassName("on-top");
var onTop = function () {
    $('html, body').animate({scrollTop: 0}, 'slow');
};
for (var i = 0; i < ontop.length; i++) {
    ontop[i].addEventListener('click', onTop);
}

/* drop image */
//document.addEventListener("DOMContentLoaded", function () {
//    [].forEach.call(document.querySelectorAll('.dropimage'), function (img) {
//        img.onchange = function (e) {
//            var inputfile = this, reader = new FileReader();
//            reader.onloadend = function () {
//                inputfile.style['background-image'] = 'url(' + reader.result + ')';
//            }
//            reader.readAsDataURL(e.target.files[0]);
//        }
//    });
//});
$(".dropimage").on('change', function (e) {
    var inputfile = this, reader = new FileReader();
    reader.onloadend = function () {
        inputfile.style['background-image'] = 'url(' + reader.result + ')';
    }
    reader.readAsDataURL(e.target.files[0]);
});

/* push image */
function pushImage(input, w, h) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var $input = $(input.closest('.pushimage'));
            $input.children('img[src]')
                    .attr('src', e.target.result)
                    .width(w)
                    .height(h);
            var name = $input.children('input[type=file]').attr('data-name');
            if (isset(name)) {
                $input.children('input[type=file]').attr('name', name);
            }
        };
        reader.readAsDataURL(input.files[0]);
    }
}
$(".pushimage-delete").on('click', function () {
    var $input = $(this).closest('.pushimage');
    $input.children('input[type=file]').val('');
    $input.children('img[src]').attr('src', '');
    $input.children('input[type=file]').attr('name', 'x');
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

/* close alert */
$(".close-alert").on('click', function () {
    var target = $(this).closest('.alert')[0];
    $(target).css("visibility", "hidden"); /* The element is hidden (but still takes up space) */
    $(target).css("transition", "0.5s");
});

/* toggle display */
var a = $('[data-toggle="display"]');
for (var i = 0; i < a.length; i++) {
    $(a[i]).on('click', function () {
        var target = $(this).attr('data-target');
        if ($(target).css("display") == 'none') {
            $(target).css("display", "block");
        } else {
            $(target).css("display", "none");
        }
    });
}

/* collapse */
$(".collapse-btn").on('click', function () {
    this.classList.toggle("collapse-active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
    }
});
//var coll = document.getElementsByClassName("collapse-btn");
//var i;
//for (i = 0; i < coll.length; i++) {
//    coll[i].addEventListener("click", function () {
//        this.classList.toggle("collapse-active");
//        var content = this.nextElementSibling;
//        if (content.style.maxHeight) {
//            content.style.maxHeight = null;
//        } else {
//            content.style.maxHeight = content.scrollHeight + "px";
//        }
//    });
//}
function set_collapse_max(self) { /* when (add element) inside (collapse) : onclick="javascript:set_collapse_max(this)" */
    $(self).closest('.collapse-content').css("max-height", "1000px");
}

/* clone element : button => data-toggle="clone" data-parent="#temp_attribute" data-target="#texture_attribute"  */
var a = $('[data-toggle="clone"]');
for (var i = 0; i < a.length; i++) {
    $(a[i]).on('click', function () {
        var parent = $(this).attr('data-parent');
        var target = $(this).attr('data-target');
        var clone = $(parent).children().clone(true); /* true = withDataAndEvents */
        $(target).append(clone);

        var length = (1 * $(target).children().length);
        clone.find("input[name], select[name], textarea[name]").each(function () {
            if (isset(this.name)) {
                this.name = this.name.replace(/\[NEW_ID\]/g, '[' + (length) + ']');
                this.disabled = '';
            }
        });
    });
}
/* clone element level 1 & level 2 */
var a = $('[data-toggle="clone-level-1"]');
for (var i = 0; i < a.length; i++) {
    $(a[i]).on('click', function () {
        var parent = $(this).attr('data-parent');
        var target = $(this).attr('data-target');
        var clone = $(parent).children().clone(true);
        $(target).append(clone);

        // var level = clone.attr('data-level-1');
        /* NEW_ID_1 */
        var length = (1 * $(target).children().length);
        clone.attr('data-level-1', length);

        clone.find("[data-toggle], div[id^='temp_'], div[id^='texture_']").each(function () {
            if (!isnull(this.getAttribute('data-toggle'))) {
                this.setAttribute('data-parent', "{0}_{1}".format(this.getAttribute('data-parent'), length));
                this.setAttribute('data-target', "{0}_{1}".format(this.getAttribute('data-target'), length));
            } else if (!isnull(this.getAttribute('id'))) {
                this.setAttribute('id', "{0}_{1}".format(this.getAttribute('id'), length));
            }
        });
        clone.find("input[name], select[name], textarea[name]").each(function () {
            this.name = this.name.replace(/\[NEW_ID_1\]/, '[' + (length) + ']');
            var data_name = $(this).attr('data-name');
            if (isset(data_name)) {
                $(this).attr('data-name', data_name.replace(/\[NEW_ID_1\]/, '[' + (length) + ']'));
            }
            if (isnull(this.name.match(/\[NEW_ID_2\]/))) {
                this.disabled = '';
            }
        });
    });
}
var a = $('[data-toggle="clone-level-2"]');
for (var i = 0; i < a.length; i++) {
    $(a[i]).on('click', function () {
        var parent = $(this).attr('data-parent');
        var target = $(this).attr('data-target');
        var clone = $(parent).children().clone(true);
        $(target).append(clone);

        /* NEW_ID_2 */
        var length = (1 * $(target).children().length);
        clone.attr('data-level-2', length);

        clone.find("input[name], select[name], textarea[name]").each(function () {
            this.name = this.name.replace(/\[NEW_ID_2\]/, '[' + (length) + ']');
            this.disabled = '';
        });
    });
}

$("img.gallery-change").on('click', function () {
    $(".gallery-medium > img").attr('src', this.src);
});

/* ------------------------- format : "{0}_{1}".format(var1, var2) ------------------------- */
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                    ? args[number]
                    : match
                    ;
        });
    };
}

function empty(str) {
    return !(typeof str === 'string' && str.length > 0)
}

function isnull(str) {
    return typeof str === 'object' && str === null;
}

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
    this.app_invalid = document.querySelectorAll('small[data-invalid]');
    this.length = this.app_invalid.length;
    this.setMessage = function (name, message) {
        for (var i = 0; i < this.length; i++) {
            var tag = this.app_invalid[i];
            if (name == tag.getAttribute('data-invalid')) { /* firstname*/
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

var vaildate_delete = function (selected_count) {
    if (selected_count == 0) {
        dialog_infomation('Please select data');
        return false;
    } else if (selected_count > 10) {
        dialog_infomation('You can not selected more than 10 data');
        return false;
    } else {
        return true;
    }
}

var delete_selector = function (form_id, link) {
    $("#" + form_id).attr('action', link).submit();
}

/* test save */
//var validate = {
//    name: {required: true},
//    last_name: {required: true},
//    email: {required: true, email: true},
//    password: {required: true},
//    confirm_new_password: {required: true, match: 'password'},
//    email: {required: true, email: true},
//    password: {required: true, minlength: 6},
//    confirm_password: {required: true, minlength: 6, match: 'password'},
//    phone: {required: true, minlength: 6}
//};
//var validate = {
//    vendor_id: {required: true},
//    vendor_delivery_id: {required: true},
//    store_id: {required: true},
//    store_delivery_id: {required: true},
//    detail: {required: true, table: 'tbl_master_detail'}
//};
//function savetion(form_id, type) {
//    var valid = validateForm(form_id, validate);
//    console.log(valid);
//    if (valid) {
//        save_selector(form_id, type);
//    }
//}

/* -------------------------------------------------------- message alert ----------------------------------------------------------------------------------- */
function message_alert(status, message) {
    alert(message);
//    var type = '';
//    if (status == 'E') {
//        type = 'danger';
//    } else if (status == 'S') {
//        type = 'success';
//    } else if (status == 'I') {
//        type = 'info';
//    } else {
//        type = 'warning';
//    }
//    $(".alert." + type + "").css('display', 'block');
//    $(".alert." + type + "").css('opacity', '1');
//    $(".alert." + type + " > .message").html(message);
//
//    setTimeout(function () {
//        $(".alert." + type + "").css('display', 'none');
//        $(".alert." + type + "").css('opacity', '0');
//    }, 5000);
}
//var close = document.getElementsByClassName("closebtn");
//var i;
//for (i = 0; i < close.length; i++) {
//    close[i].onclick = function () {
//        var div = this.parentElement;
//        div.style.opacity = "0";
//        setTimeout(function () {
//            div.style.display = "none";
//        }, 600);
//    }
//}

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

/* -------------------------------------------------------- cookie ----------------------------------------------------------------------------------- */
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function deleteCookie(cname) {
    var cvalue = "";
    var d = new Date();
    d.setTime(d.getTime() - (1000 * 60 * 60 * 24)); //Set the time to the past. 1000 milliseonds = 1 second
    var expires = "expires=" + d.toUTCString(); //Compose the expirartion date
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"; //Set the cookie with name and the expiration date
}
/* -------------------------------------------------------- cart ----------------------------------------------------------------------------------- */
var cookieProduct = {
    setProduct: function (product) {
        setCookie('products', JSON.stringify(product), 3);
    },
    getProduct: function () {
        var products = getCookie('products');
        if (products != '') {
            return JSON.parse(products);
        }
        return '';
    },
    deleteProduct: function () {
        deleteCookie('products');
    }
}
function count_cart() {
    var myProduct = cookieProduct.getProduct();
    var cart_price = 0;
    var count_cart = myProduct.length;
    if (count_cart > 0) {
        for (var index in myProduct) {
            var p = parseInt(myProduct[index].price);
            var q = parseInt(myProduct[index].quantity);
            cart_price = cart_price + (p * q);
        }
    }
    $("#cart_count_1").html(count_cart);
    $("#cart_count_2").html(count_cart);
    $("#cart_price").html(cart_price);
    console.log('count_cart', count_cart, cart_price);
}
count_cart();
function delete_cart($obj) {
    dialog_confirm('delete').then(function (is_confirm) {
        if (is_confirm) {
            var myData = new Array();
            var $tr = $obj.parents('tr');
            var id_product_combination = $tr.attr('id_product_combination');
            var myProduct = cookieProduct.getProduct();
            for (var index in myProduct) {
                if (myProduct[index].id_combination != id_product_combination) {
                    myData.push({id_combination: myProduct[index].id_combination, quantity: myProduct[index].quantity, price: myProduct[index].price});
                }
            }
            $tr.remove();
            cookieProduct.setProduct(myData);
            count_cart();
            view_total_2();
        }
    });
}
function add_cart() {
    var comb_price = $("input[name=comb_price]:checked").val().split(":");
    var qty = $("#input_quantity").val();
    var myData = new Array();
    var id_combination = comb_price[0]; //$("input[name=combination]:checked").val()
    var price = comb_price[1]; //$("#input_price").html();
    var quantity = qty; //$("#input_quantity").val();
    var myProduct = cookieProduct.getProduct();
    var is_d = false;
    for (var index in myProduct) {
        if (myProduct[index].id_combination == id_combination) {
            myData.push({id_combination: id_combination, quantity: quantity, price: price});
            is_d = true;
            continue;
        }
        if (isset(myProduct[index].id_combination))
            myData.push({id_combination: myProduct[index].id_combination, quantity: myProduct[index].quantity, price: myProduct[index].price});
    }
    if (!is_d) {
        myData.push({id_combination: id_combination, quantity: quantity, price: price});
    }
    //console.log(myData);
    cookieProduct.setProduct(myData);
    count_cart();
    alert('success');
//    message_alert('S', 'success');
}
function buy_product() {
    add_cart();
    window.location = base_url + "/cart/view_cart";
}
$("#btn-down").on('click', function () {
    var $obj = $(this);
    var myData = new Array();
    var $tr = $obj.parents('tr');
    var id_product_combination = $tr.attr('id_product_combination');
    var price = $tr.attr('price');
    var qty = 0;
    var myProduct = cookieProduct.getProduct();

    for (var index in myProduct) {
        if (myProduct[index].id_combination == id_product_combination) {
            qty = parseInt(myProduct[index].quantity) - 1;
            if (qty < 1) {
                qty = 1;
            }
            myData.push({id_combination: id_product_combination, quantity: qty, price: price});
        } else {
            myData.push({id_combination: myProduct[index].id_combination, quantity: myProduct[index].quantity, price: myProduct[index].price});
        }
    }
    $tr.find('.view-qty').val(qty);
    cookieProduct.setProduct(myData);
    view_total_1($tr, price, qty);
});
$("#btn-up").on('click', function () {
    var $obj = $(this);
    var myData = new Array();
    var $tr = $obj.parents('tr');
    var id_product_combination = $tr.attr('id_product_combination');
    var price = $tr.attr('price');
    var qty = 0;
    var myProduct = cookieProduct.getProduct();

    for (var index in myProduct) {
        if (myProduct[index].id_combination == id_product_combination) {
            qty = parseInt(myProduct[index].quantity) + 1;
            if (qty > 99) {
                qty = 99;
            }
            myData.push({id_combination: id_product_combination, quantity: qty, price: price});
        } else {
            myData.push({id_combination: myProduct[index].id_combination, quantity: myProduct[index].quantity, price: myProduct[index].price});
        }
    }
    $tr.find('.view-qty').val(qty);
    cookieProduct.setProduct(myData);
    view_total_1($tr, price, qty);
});
function view_total_1($tr, price, qty) {
    $tr.find('.view-total-1').html(parseInt(price * qty));
    view_total_2();
}
function view_total_2() {
    var view_total_2 = 0;
    $("#tbl_view_cart").find('.view-total-1').each(function () {
        view_total_2 += parseInt($(this).html());
    });
    $(".view-total-2").html(view_total_2);
}



//function minus($obj) {
//    $('.qty-btn-down').unbind('click');
//    var myData = new Array();
//    var $tr = $obj.parents('tr');
//    var id_product_combination = $tr.attr('id_product_combination');
//    var price = $tr.attr('price');
//    var qty = 0;
//    var myProduct = cookieProduct.getProduct();
//
//    for (var index in myProduct) {
//        if (myProduct[index].id_combination == id_product_combination) {
//            qty = parseInt(myProduct[index].quantity) - 1;
//            if (qty < 1) {
//                qty = 1;
//            }
//            myData.push({id_combination: id_product_combination, quantity: qty, price: price});
//        } else {
//            myData.push({id_combination: myProduct[index].id_combination, quantity: myProduct[index].quantity, price: myProduct[index].price});
//        }
//    }
//    $tr.find('.view-qty').val(qty);
//    cookieProduct.setProduct(myData);
//    view_total_1($tr, price, qty);
//}
//function plus($obj) {
//    $('.qty-btn-up').unbind('click');
//    var myData = new Array();
//    var $tr = $obj.parents('tr');
//    var id_product_combination = $tr.attr('id_product_combination');
//    var price = $tr.attr('price');
//    var qty = 0;
//    var myProduct = cookieProduct.getProduct();
//
//    for (var index in myProduct) {
//        if (myProduct[index].id_combination == id_product_combination) {
//            qty = parseInt(myProduct[index].quantity) + 1;
//            if (qty > 99) {
//                qty = 99;
//            }
//            myData.push({id_combination: id_product_combination, quantity: qty, price: price});
//        } else {
//            myData.push({id_combination: myProduct[index].id_combination, quantity: myProduct[index].quantity, price: myProduct[index].price});
//        }
//    }
//    $tr.find('.view-qty').val(qty);
//    cookieProduct.setProduct(myData);
//    view_total_1($tr, price, qty);
//}


$("#input_select_alias").on("change", function () {
    $.ajax({
        type: 'POST',
        url: base_url + '/home/getAddressById',
        data: {id_address: $(this).val()},
        dataType: 'JSON',
        success: function (response) {
            console.log(response);

            $("#input_alias").val(response.alias);
            $("#input_first_name").val(response.first_name);
            $("#input_last_name").val(response.last_name);
            $("#input_address").val(response.address);
            $("#input_distinct").val(response.distinct);
            $("#input_sub_distinct").val(response.sub_distinct);
            if (isset(response.id_province)) {
                $("#input_province").val(response.id_province + '-' + response.province);
            }
            $("#input_post_code").val(response.post_code);
            $("#input_phone_1").val(response.phone_1);
            $("#input_note").val(response.note);
        }
    });

});

$.fn.expandtable = function (options) {
    var defaults = {
        type: 'text',
        align: 'left',
        visible: true,
    }
    function writeRow(record, $object_tr) {
        var tr = '';
        for (var i = 0, len = record.length; i < len; i++) {
            tr += writeColumn(record[i]);
        }
        if ($object_tr != '') {
            return tr;
        }
        return '<tr>' + tr + '</tr>';
    }
    function writeColumn(record) {
        var td = '<td ';
        var html = '';
        var input = '';
        var button = '';
        var image = '';

        var align = (typeof (record.align) === 'undefined') ? defaults.align : record.align;
        var visible = (typeof (record.visible) === 'undefined') ? defaults.visible : record.visible;
        var classes = (typeof (record.class) === 'undefined') ? '' : record.class;
        var type = (typeof (record.type) === 'undefined') ? '' : record.type;
        var icon = (typeof (record.icon) === 'undefined') ? '' : record.icon;
        var name = (typeof (record.name) === 'undefined') ? '' : record.name;
        var value = (typeof (record.value) === 'undefined') ? '' : record.value;

        if (typeof (record.button) !== 'undefined') {
            td += 'class="text-' + record.button[0].align + '" ';
        } else {
            td += 'class="text-' + align + '" ';
        }
        if (typeof (record.datarow) !== 'undefined' && record.datarow == true && typeof (record.text) !== 'undefined') {
            td += 'datarow=' + record.text;
        }
        if (!visible || type === 'hidden') {
            td += 'style="display:none;"';
        }
        if (type == 'text' || type == 'hidden') {
            input += '<input type="' + type + '" ';
            if (name != '') {
                input += 'name = "' + name + '" ';
            }
            if (value != '') {
                input += 'value = "' + value + '" ';
            }
            if (classes != '') {
                input += 'class = "' + classes + '" ';
            }
            input = $.trim(input) + '>';
        }
        if (typeof (record.button) !== 'undefined') {
            if ($.isArray(record.button)) {
                button = writeButton(record.button);
            }
        }
        if (typeof (record.text) !== 'undefined') {
            html += record.text;
        }
        if (typeof (record.image) !== 'undefined' && record.image == true) {
            image += '<img src = "' + record.text + '"  width="32" class="img-thumbnail" >';
            html = '';
        }
        td = $.trim(td) + '>'
        td += button + image + input + html + '</td>';
        return td;
    }
    function writeButton(record) {
        var button = '';
        for (var i = 0, len = record.length; i < len; i++) {
            var btn = record[i];
            button += '<button type="button" ';
            if (typeof (btn.event) !== 'undefined') {
                button += 'onclick = "' + btn.event + '" ';
            }
            if (typeof (btn.toggle) !== 'undefined' && btn.toggle === true) {
                button += 'data-toggle="tooltip" ';
            }
            if (typeof (btn.title) !== 'undefined') {
                button += 'title = "' + btn.title + '" ';
            }
            if (typeof (btn.class) !== 'undefined') {
                //button += 'class = "btn ' + btn.class + '" ';
                button += 'class = "' + btn.class + '" ';
            }
            button = $.trim(button) + '>';
            if (typeof (btn.icon) !== 'undefined') {
                button += '<i class="fa ' + btn.icon + '"></i>';
            }
            if (typeof (btn.text) !== 'undefined') {
                button += ' ' + btn.text;
            }
            button += '</button> ';
        }
        return button;
    }
    var dataset = options.columns;
    var $object_tr = options.$object_tr || ''; // $object_tr is flag add or update
    var row = writeRow(dataset, $object_tr);
    var $this = $(this);
    if ($object_tr != '') {
        $object_tr.html(row);
    } else {
        $($this).append(row);
    }
};

var get_level_table = function ($obj_table, $obj_tr) {
    var level = parseInt($obj_table.find(" > tbody > tr").length);
    if ($obj_tr != '') {
        level = parseInt($obj_tr.find('td').attr('datarow')) - 1;
    } else if (level == 0) {
        level = 0;
    } else {
        //level = parseInt($obj_table.find(" > tbody > tr:last").find('td').attr('datarow'));
    }
    return level;
}

$(".dialog-product").on('click', function () {
    $('#table_dyna_product').dynatable({
        dataset: {
            ajax: true,
//            ajaxMethod: 'POST',
            ajaxUrl: 'http://test.com/css/budden/documentation/dynatable-ajax.json',
            ajaxOnLoad: true,
            records: []
        }
    });
    $('#modal_product').css("display", "block");
});

$(document).on('click', '.onselect', function () {
//    if ($(this).attr('data-key') == 'select_product') {
//        select_product(1);
//    }
    
    if ($(this).attr('data-key') == 'select_product') {
//        console.log('s');
//        view_detail();
        $('#modal_product').css("display", "none");
        $('#modal_view_product').css("display", "block");
    }
});

var $object_tr = '';
var data = {
    id: '1',
    name: 'book',
    qty: '<input type="number" class="input">',
    price: '<input type="number" class="input">',
    total: 30,
    orders_detail_id: 99,
    product_id: 7,
};

function select_product(product_id) { // select from dialog
    $('#modal_product').css("display", "none");
    var level = get_level_table($("#table_display"), $object_tr);
    $("#table_display").expandtable({
        columns: [
            {text: (level + 1), align: 'center', class: '', datarow: true},
            {text: data.name, align: 'left', class: ''},
            {text: data.qty, align: 'right', class: ''},
            {text: data.price, align: 'right', class: ''},
            {text: data.total, align: 'right', class: ''},
            {
                button: [
                    {event: 'remove_detail($(this))', align: 'right', class: 'btn-danger btn-sm', icon: 'far fa-trash-alt', toggle: true, title: 'add'},
                    {event: 'view_detail($(this))', align: 'right', class: 'btn-info btn-sm', icon: 'fas fa-tasks', toggle: true, title: 'remove'}
                ]
            },
            {type: 'hidden', name: 'detail[' + level + '][orders_detail_id]', value: data.orders_detail_id},
            {type: 'hidden', name: 'detail[' + level + '][product_id]', value: data.product_id},
            {type: 'hidden', name: 'detail[' + level + '][qty]', value: data.qty},
        ],
        $object_tr: $object_tr,
    });
    $object_tr = '';
//    $.ajax({
//        type: 'POST',
//        url: base_url + '/middle/product/getProductSelect',
//        data: {data: product_id},
//        dataType: 'JSON',
//        success: function (data) {
//            //console.log(data); return;
//            $product_id.val(data.product_id);
//            $image_small.val(data.image_small);
//            $reference.val(data.reference);
//            $product_name.val(data.product_name);
//            $unit_cost.val(data.unit_cost);
//            $unit_price.val(data.unit_price);
//            // qty
//            set_unit(data.unit, $unit);
//            // grade
//        }
//    });
}

function remove_detail($obj) {
    $obj.parent().parent().remove(); // into tr
    $object_tr = '';
}

function view_detail(){
    $('#modal_view_product').css("display", "block");
}

function setproduct($obj){
    $('#modal_view_product').css("display", "none");
    select_product();
    
    console.log($("#qty").val());
}