// other
var workingForms = (function () {

	var _createQtip = function (element, position) {
		// target для custom input 'file'
		var target = element.attr('type') === 'file' ? element.siblings('div') : element;
		// позиция тултипа
		if (position === 'right') {
			position = {
				my: 'center left',
				at: 'center right',
				target: target
			}
		} else {
			position = {
				my: 'center right',
				at: 'center left',
				target: target
			}
		}

		// инициализация тултипа
		element.qtip({
			content: {
				text: function () {
					return $(this).attr('qtip-content');
				}
			},
			show: {
				event: 'show'
			},
			hide: {
				event: 'change keydown hideTooltip'
			},
			position: position,
			style: {
				classes: 'qtip-mystyle',
				tip: {
					border: 0,
					heigth: 10,
					width: 16
				}
			}
		}).trigger('show');

	};

	var _getCookie = function (name) {
		var matches = document.cookie.match(new RegExp(
			"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	};

	var resetErrorForm = function (form) {
		$('.qtip').hide();
		form.find('input, textarea').not('input[type="hidden"]').removeClass('error');
	};

	var validate = function (form) {
		var elems = form.find('input, textarea').not('input[type="hidden"]'),
			valid = true;

		$.each(elems, function (i, val) {
			var pos = val.hasAttribute('qtip-position')
				? val.getAttribute('qtip-position')
				: 'left';
			// (val.getAttribute('name') === 'captcha' && md5(val.value) !== _getCookie('imgcaptcha_'))
			if (val.value.length === 0 || (val.getAttribute('name') === 'captcha' && md5(val.value) !== _getCookie('imgcaptcha_'))) {
				val.classList.add('error');
				_createQtip($(val), pos);
				valid = false;
			}
		});
		return valid;
	};

	var ajaxSend = function (url) {
		var data = new FormData();

		//присоединяем файл
		data.append('file', $('input[type="file"]')[0].files[0]);
		//присоединяем остальные поля
		jQuery.each($('input:not(input[type="file"]), textarea'), function (i, input) {
			data.append(input.getAttribute('name'), input.value);
		});

		return $.ajax({
			url: url,
			type: 'POST',
			dataType: 'json',
			cache: false,
			contentType: false,
			processData: false,
			data: data
		})
	};

	var ajaxSendNoFile = function (form, url) {
		var data = form.serialize();

		return $.ajax({
			url: url,
			type: 'POST',
			dataType: 'json',
			data: data
		})
	};

	return {
		validate: validate,
		ajaxSend: ajaxSend,
		ajaxSendNoFile: ajaxSendNoFile,
		resetErrorForm: resetErrorForm
	}

})();