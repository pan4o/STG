

function Game (options) {

	var self = this;

	this.numberOfHoles = options.numberOfHoles || 3;
	this.container = document.getElementsByClassName(options.container)[0];
	this.holesArr = [];
	this.delay = options.delay || 2000;

	this.init = function () {

		this.drawHoles();
		this.setHolePosition();
		this.insertManInRandomHole();

	}

	this.drawHoles = function () {

		var i, hole;

		for (i = 0; i < this.numberOfHoles; i++) {

			hole = document.createElement('div');
			hole.classList.add('hole');
			this.container.appendChild(hole);
			this.holesArr.push(hole);

		}

	}

	this.setHolePosition = function () {

		for (var i = 0; i < this.holesArr.length; i++) {

			if (i % 2) {
				this.holesArr[i].style.top = 50 + "px"
			}

		}

	}

	this.getRandomHole = function () {

		return Math.round(Math.random() * (this.holesArr.length - 1));

	}

	this.createMan = function (type) {

		var man = document.createElement('div'),
		interval;
		man.classList.add('guy', type);

		return man;
	}

	this.insertManInRandomHole = function () {

		var man = this.createMan('good'), holeIndex;

		var interval = setInterval(
			function () {
				self.holesArr[self.getRandomHole()].appendChild(man);
			}, self.delay
		);

	}

}