var addProject=function(){var o=null,e=function(){$(".sites-add__link").on("click",t),$(".formAddProject").on("submit",i),$(".formAddProject").find("input, textarea").on("input",r)},r=function(o){var e=$(this);e.hasClass("error")&&e.removeClass("error")},t=function(e){e.preventDefault(),o=$(".addProject").bPopup({modalClose:!1,onClose:n})},n=function(){$(".alertError").hide(),$(".formAddProject").trigger("reset").find("input, textarea").not('input[type="hidden"]').removeClass("error"),a(1)},i=function(e){e.preventDefault();var r=$(this);if(!workingForms.validate(r))return!1;workingForms.ajaxSend("addProject.php").done(function(){console.log("success"),o.close(),$(".alertAdd").bPopup({modalClose:!1,autoClose:2e3})}).fail(function(){console.log("error"),$(".alertError").show()})},a=function(o){var e=$(".file-upload__text");if(e.css("color","#48cbe8"),e.text("Загрузите изображение"),o)return!1;$(".file-upload__input").change(function(){e.css("color","#000000"),e.text(this.files[0].name)})};return{init:function(){e(),a()}}}();addProject.init();