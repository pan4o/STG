

function Game (options) {

	var self = this;

	options.numberOfHoles = options.numberOfHoles;
	options.container = options.container;

	if (!options.numberOfHoles) {
		options.numberOfHoles = 3;
	}

	this.init = function () {
		this.drawHoles();
	}

	this.drawHoles = function () {
		var container = document.getElementsByClassName(options.container)[0];

		for(var i = 0; i < options.numberOfHoles; i++) {
			var hole = document.createElement('div');
			hole.className = 'hole';
			container.appendChild(hole);
		}
	}
}