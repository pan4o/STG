

function Game (options) {

	var self = this;
	this.gameTime = options.gameTime || 30;
	this.numberOfHoles = options.numberOfHoles || 3;
	this.timerContainer = document.getElementsByClassName(options.timer)[0];
	this.container = document.getElementsByClassName(options.container)[0];
	this.holesArr = [];
	this.delay = options.delay || 2000;
	this.busyHoleIndex = null;

	this.init = function () {
		this.createTimer();
		this.drawHoles();
		this.setHolePosition();
		this.insertManInRandomHole('good');

		setTimeout(
			function () {

				self.insertManInRandomHole('bad');

			}, this.delay / 2
		)

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

	this.insertManInRandomHole = function (type) {

		var man = this.createMan(type),
			randomHoleIndex,
			interval;

		interval = setInterval(
			function () {

				randomHoleIndex = self.getRandomHole();

				if (self.busyHoleIndex == randomHoleIndex) {

					if (randomHoleIndex == self.holesArr.length - 1) {

						randomHoleIndex--;

					} else {

						randomHoleIndex++;

					}
				}

				self.busyHoleIndex = randomHoleIndex;

				self.holesArr[randomHoleIndex].appendChild(man);

			}, self.delay
		);

	}

	this.createTimer = function () {

		var startTime = this.gameTime,
			interval;

		interval = setInterval(
			function () {

				self.timerContainer.innerHTML = startTime;

				if (!startTime) {

					clearInterval(interval);

				}

				startTime--;

			}, 1000
		);

	}

}
