// writeMe for writeme.html
var writeMe = (function () {

	var _form = $('.formWriteme');

	var init = function () {
		_setUpListners();
	};

	var _setUpListners = function () {
		_form.on('submit', _sendForm);
		_form.find('input, textarea').on('input', _onInput);
		_form.on('reset', _resetForm);
	};

	var _resetForm = function () {
		workingForms.resetErrorForm($(this));
		$('.writeme-title__error').hide();
		$('.formWriteme__captcha-code').attr('src', "php/captcha.php?id=' + (+new Date());");
	};

	var _onInput = function () {
		var el = $(this);
		if (el.hasClass('error')) el.removeClass('error');
	};

	var _sendForm = function (e) {
		e.preventDefault();

		var form = $(this),
			url = '/php/contactme.php';

		if (!workingForms.validate(form)) return false;

		workingForms.ajaxSendNoFile(form, url)
			.done(function (result) {
				if (result.ans === 'OK') {
					_form.trigger('reset');
					$('.alertAdd').bPopup({
						modalClose: false,
						autoClose: 2000
					});
				} else {
					result.field.forEach(function (type) {
						form.find("input[name='" + type + "']").addClass('err');
						if(type === 'captcha') {
							form.find("input[name='" + type + "']").val('');
						}
					});
					workingForms.validate(form);
				}
			})
			.fail(function () {
				$('.writeme-title__error').show();
			});
	};


	return {
		init: init
	}

})();

writeMe.init();