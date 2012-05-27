/*global require:true */
var bowlingKata = require('../lib/bowlingKata.js');

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

var game;
exports['bowlingKata_test'] = {
	setUp: function (done) {
		game = bowlingKata.bowlingGame();
		done();
	},

	'roll a 5 the score should be 5': function (test) {
		test.expect(1);

		game.roll(5);
		test.equal(game.score(), 5);

		test.done();
	},

	'roll a 5 twice the score should be 10': function (test) {
		test.expect(1);

		game.roll(5);
		game.roll(5);
		test.equal(game.score(), 10);

		test.done();
	},

	'roll a 5 thrice the score should be 20': function (test) {
		test.expect(1);

		game.roll(5);
		game.roll(5);
		game.roll(5);
		test.equal(game.score(), 20);

		test.done();
	}

};
