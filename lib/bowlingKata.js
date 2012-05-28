/*
 * bowlingKata
 * https://github.com/chrisbobo/bowlingKata
 *
 * Copyright (c) 2012 Chris Bobo
 * Licensed under the MIT license.
 */

(function (exports) {

	exports.bowlingGame = function () {
		var game = {},
			frames = [],
			currFrameIdx = 0,
			FRAME_COUNT = 10,
			frameIdx;

		function newFrame(lastFrame) {
			var frame = {
					isLastFrame: function () {
						return lastFrame;
					},
					rollOne: function() {
						return rolls.length > 0 ? rolls[0] : 0;
					},
					rollTwo: function() {
						return rolls.length > 1 ? rolls[1] : 0;
					},
					rollThree: function() {
						return rolls.length > 2 ? rolls[2] : 0;
					}
				},
				rolls = [];


			frame.roll = function(pins) {
				rolls[rolls.length] = pins;
			};

			frame.isSpare = function() {
				return !frame.isLastFrame() && rolls.length === 2 && frame.score() === 10;
			};

			frame.isStrike = function() {
				return !frame.isLastFrame() && rolls.length === 1 && frame.score() === 10;
			};

			frame.score = function(){
				return frame.rollOne() + frame.rollTwo() + frame.rollThree();
			};

			frame.isComplete = function() {
				if (frame.isLastFrame()) {
					if (frame.rollOne() === 10 || (frame.rollOne() + frame.rollTwo()) === 10) {
						return rolls.length === 3;
					}
					return rolls.length === 2;
				}
				else {
					return frame.isStrike() || rolls.length === 2;
				}
			};

			return frame;
		}

		// Initialize frames
		for (frameIdx = 0; frameIdx < FRAME_COUNT; frameIdx++) {
			frames[frameIdx] = newFrame((frameIdx+1) === FRAME_COUNT);
		}

		game.roll = function(pins){
			var frame = getCurrentFrame();
			frame.roll(pins);
			if(frame.isComplete()) {
				advancedFrame();
			}
		};

		game.score = function() {
			var total = 0;
			for (frameIdx = 0; frameIdx < FRAME_COUNT; frameIdx++) {
				var frame = frames[frameIdx];

				total += frame.score();
				if (!frame.isLastFrame()) {
					if (frame.isSpare()) {
						total += getNextBall(frameIdx);
					}
					else if (frame.isStrike()) {
						total += getNextTwoBalls(frameIdx);
					}
				}
			}

			return total;
		};

		function getNextBall(frameIdx) {
			var nextFrameIdx = frameIdx + 1;
			if (nextFrameIdx >= FRAME_COUNT) {
				return 0;
			}

			return frames[nextFrameIdx].rollOne();
		}

		function getNextTwoBalls(frameIdx) {
			var nextFrameIdx = frameIdx + 1;
			if (nextFrameIdx >= FRAME_COUNT) {
				return 0;
			}

			var nextFrame = frames[nextFrameIdx],
				total = 0;

			if (nextFrame.isStrike()) {
				total += nextFrame.rollOne() + getNextBall(nextFrameIdx);
			}
			else {
				total += nextFrame.rollOne() + nextFrame.rollTwo();
			}
			return total;
		}

		function getCurrentFrame() {
			return frames[currFrameIdx];
		}

		function advancedFrame() {
			currFrameIdx++;
		}

		return game;
	};

}(typeof exports === 'object' && exports || this));
