// other
var workingForms = (function () {

	var validate = function (form) {
		var elems = form.find('input, textarea').not('input[type="hidden"]'),
			valid = true;

		$.each(elems, function (i, val) {
			if(val.value.length === 0) {
				val.classList.add('error');
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
		ajaxSendNoFile: ajaxSendNoFile
	}

})();