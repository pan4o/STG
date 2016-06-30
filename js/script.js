

function Game (options) {

	var self = this;

	this.numberOfHoles = options.numberOfHoles || 3;
	this.container = document.getElementsByClassName(options.container)[0];
	this.holesArr = [];

	this.init = function () {
		this.drawHoles();
	}

	this.drawHoles = function () {
		for(var i = 0; i < this.numberOfHoles; i++) {
			var hole = document.createElement('div');
			hole.className = 'hole';
			this.container.appendChild(hole);
			this.holesArr.push(hole);
		}
	}

	this.setHolePosition = function () {

	}

}