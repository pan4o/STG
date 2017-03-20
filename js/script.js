

function Game (options) {

	var self = this;

	this.gameTime = options.gameTime || 30;
	this.numberOfHoles = options.numberOfHoles || 3;
	this.delay = options.delay || 2000;

	this.timerContainer = document.getElementsByClassName(options.timer)[0];
	this.container = document.getElementsByClassName(options.container)[0];
	this.pointsNode = document.getElementById('points');

	this.holesArr = [];
	this.busyHoleIndex = null;

	this.intervalForGood = null;
	this.intervalForBad = null;

	this.gamePoints = 0;

	this.init = function () {

		this.createTimer();
		this.drawHoles();
		this.setHolePosition();
		this.intervalForGood = this.insertManInRandomHole('good');

		setTimeout(
			function () {

			self.intervalForBad = self.insertManInRandomHole('bad');

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

		var length = this.holesArr.length;

		for (var i = 0; i < length; i++) {

			if (i % 2) {

				this.holesArr[i].style.top = 50 + "px";

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

		man.setAttribute('data-type', type);

		man.addEventListener('click', function (event) {

			self.clickHandler(event.target);

		}, false);

		return man;

	}

	this.clickHandler = function (target) {

		if (self.checkAttribute(target, 'good')) {

			this.plusPoints();

		} else if (self.checkAttribute(target, 'bad')) {

			this.minusPoints();

		}

	}

	this.plusPoints = function () {

		this.gamePoints += 10;
		this.pointsNode.innerHTML = this.gamePoints;

	}

	this.minusPoints = function () {

		this.gamePoints -= 10;
		this.pointsNode.innerHTML = this.gamePoints;

	}

	this.checkAttribute = function (node, value) {

		return node.getAttribute('data-type') == value;

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

		return interval;

	}

	this.createTimer = function () {

		var startTime = this.gameTime,
			interval;

		interval = setInterval(
			function () {

				self.timerContainer.innerHTML = startTime;

				if (!startTime) {

					clearInterval(interval);

					self.endGame();

				}

				startTime--;

			}, 1000
		);

	}

	this.endGame = function () {

		clearInterval(this.intervalForGood);
		clearInterval(this.intervalForBad);

	}

}
