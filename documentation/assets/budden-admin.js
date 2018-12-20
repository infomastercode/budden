



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

function addAttribute(type, listId) {
    var box = jQuery('#list' + listId);
    idx = idx + 1;
    var line = jQuery('.create-tpl').clone(true);
    line.show().removeClass('create-tpl').addClass('create-line').addClass('line').find('.attribute-value').each(function (
            ) {
        if (!jQuery(this).hasClass('type-' + type.toLowerCase()))
            jQuery(this).remove()
    });
    line.find(':input').each(function () {
        if (this.id)
            this.id = this.id.replace(/-new-id/, '-n' + idx);
        this.name = this.name.replace(/\[NEW_ID\]/, '[' + (-1 * idx) + ']');
        this.value = this.value.replace(/NEW_LIST_ID/, listId);
        this.value = this.value.replace(/NEW_TYPE/, type)
    });
    box.append(line);
    line.parents('form').get(0).commonController.bindElements();
    box.parent().removeClass('empty');
    var form = box.parents('form').get(0);
    if (form)
        form.commonController.bindElements()
}
;