

function Game (options) {

	var self = this;

	this.gameTime = options.gameTime || 30;
	this.numberOfHoles = options.numberOfHoles || 3;
	this.delay = options.delay || 2000;

	this.container = document.getElementById(options.container);

	this.holesArr = null;
	this.busyHoleIndex = null;
	this.intervalForGood = null;
	this.intervalForBad = null;
	this.gamePoints = null;

	this.init = function () {

		this.holesArr = [];
		this.gamePoints = 0;

		this.prepareHTML();
		this.createTimer();

		this.intervalForGood = this.insertManInRandomHole('good');

		setTimeout(
			function () {

			self.intervalForBad = self.insertManInRandomHole('bad');

			}, this.delay / 2
		)

	}

	this.prepareHTML = function () {

		var holes = document.createElement('div'),
			timer = document.createElement('div'),
			points = document.createElement('div');

		points.classList.add('points-block');
		points.innerHTML = "Points: <span id='points'>" + this.gamePoints + "</span>";

		holes.setAttribute('id','holes');
		timer.setAttribute('id','timer');

		this.drawHoles(holes);

		this.container.appendChild(timer);
		this.container.appendChild(holes);
		this.container.appendChild(points);

	}

	this.drawHoles = function (container) {

		var i, hole;

		for (i = 0; i < this.numberOfHoles; i++) {

			hole = document.createElement('div');
			hole.classList.add('hole');
			container.appendChild(hole);
			this.holesArr.push(hole);

		}

		this.setHolePosition();

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

		if (!target.hasAttribute('clicked')) {

			if (self.checkAttribute(target, 'good')) {

				this.changePoints(true);


			} else if (self.checkAttribute(target, 'bad')) {

				this.changePoints(false);

			}

		}

		target.setAttribute('clicked', true);

	}

	this.changePoints = function (increase) {

		var pointsNode = document.getElementById('points');

		if (increase) {

			this.gamePoints += 10;

		} else {

			this.gamePoints -= 10;

		}

		pointsNode.innerHTML = this.gamePoints;

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

				if (man.hasAttribute('clicked')) {

					man.removeAttribute('clicked');

				}

			}, self.delay
		);

		return interval;

	}

	this.createTimer = function () {

		var startTime = this.gameTime,
			interval,
			timer;

		timer = document.getElementById('timer');

		interval = setInterval(
			function () {

				timer.innerHTML = startTime;

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

		this.showFinalScreen();

	}

	this.showFinalScreen = function () {

		var html = "<div class='final-screen-container'>" +
		"<button id='start-button' class='start-button'>Start</button>" +
		"<p>The end! You have " + this.gamePoints + " points</p>" +
		"</div>",
		button;

		this.container.innerHTML = html;

		button = document.getElementById('start-button');
		button.addEventListener('click', function () {
			self.container.innerHTML = "";
			self.init();
		}, false);
	}

}
