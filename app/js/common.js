var myModule = (function () {

	var init = function () {
		console.log('It is myModule!');
	};

	return {
		init: init
	}

})();

myModule.init();