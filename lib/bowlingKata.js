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
			frameCount = 10,
			i;

		function newFrame(lastFrame) {
			var frame = {
					rollOne: null,
					rollTwo: null
				},
				allowBonusRolls = lastFrame;

			frame.roll = function(pins) {
				if (frame.rollOne == null) {
					frame.rollOne = pins;
				}
				else {
					frame.rollTwo = pins;
				}
			};

			frame.isSpare = function() {
				return frame.rollTwo !== null && frame.rollTwo !== 0 && (frame.rollOne + frame.rollTwo === 10);
			};

			frame.isStrike = function() {
				return frame.rollOne === 10;
			};

			frame.score = function(){
				return (frame.rollOne || 0) + (frame.rollTwo || 0);
			};

			frame.isComplete = function(){
				return frame.isStrike()	|| frame.rollTwo !== null;
			};

			return frame;
		}

		// Initialize frames
		for (i = 0; i < frameCount; i++) {
			frames[i] = newFrame((i+1) === frameCount);
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
			for (i = 0; i < frameCount; i++) {
				var frame = frames[i];

				total += frame.score();
				if (frame.isSpare()) {
					total += getNextBall(i);
				}
				else if (frame.isStrike()) {
					total += getNextTwoBalls(i);
				}
			}

			return total;
		};

		function getNextBall(frameIdx) {
			var nextFrameIdx = frameIdx + 1;
			if (nextFrameIdx >= frameCount) {
				return 0;
			}

			return frames[nextFrameIdx].rollOne || 0;
		}

		function getNextTwoBalls(frameIdx) {
			var nextFrameIdx = frameIdx + 1;
			if (nextFrameIdx >= frameCount) {
				return 0;
			}

			var frame = frames[nextFrameIdx];
			return frame.isStrike() ? (frame.rollOne + getNextBall(nextFrameIdx)) : frame.rollOne || 0;

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
