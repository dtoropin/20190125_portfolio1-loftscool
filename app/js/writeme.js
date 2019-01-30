// other
var myModule = (function () {

	var init = function () {
		console.log('It is myModule other!');
	};

	return {
		init: init
	}

})();

myModule.init();