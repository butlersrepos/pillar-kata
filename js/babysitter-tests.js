QUnit.module( "Babysitter Tests", {
	setup: function setup() {
		// Each test starts with an input of 5pm - 4am with a bedtime of 9pm
		pillar.babysitter.startTime = new moment( '2014-12-01T17:00' );
		pillar.babysitter.endTime = new moment( '2014-12-02T04:00' );
		pillar.babysitter.bedTime = new moment( '2014-12-01T21:00' );
	}
} );

QUnit.test( "full calculation tests", function( assert ) {
	var fees = pillar.babysitter.calculateFees();

	assert.equal( fees == 136, true, 'Fees from 5pm - 4am with 9pm bedtime; $136 succeeds' );

	// Work from 5pm - 9pm, bedtime is at 9pm
	pillar.babysitter.startTime = new moment( '2014-12-01T17:00' );
	pillar.babysitter.endTime = new moment( '2014-12-01T21:00' );
	pillar.babysitter.bedTime = new moment( '2014-12-01T21:00' );

	fees = pillar.babysitter.calculateFees();

	assert.equal( fees == 48, true, 'Fees from 5pm - 9pm with 9pm bedtime; $48 succeeds' );
} );

QUnit.test( 'calculate awake hours test', function( assert ) {
	var hours = pillar.babysitter.calculateAwakeHours();
	assert.equal( hours == 4, true, '5pm - 4am with 9pm bedtime; 4 hrs succeeds' );

	// Work from 5pm - 9pm, bedtime is at 5pm
	pillar.babysitter.startTime = new moment( '2014-12-01T17:00' );
	pillar.babysitter.endTime = new moment( '2014-12-01T21:00' );
	pillar.babysitter.bedTime = new moment( '2014-12-01T17:00' );

	hours = pillar.babysitter.calculateAwakeHours();
	assert.equal( hours == 0, true, '5pm - 9pm with 5pm bedtime; 0 hrs succeeds' );

	// Work from 5pm - 9pm, bedtime is at 4pm
	pillar.babysitter.startTime = new moment( '2014-12-01T17:00' );
	pillar.babysitter.endTime = new moment( '2014-12-01T21:00' );
	pillar.babysitter.bedTime = new moment( '2014-12-01T16:00' );

	hours = pillar.babysitter.calculateAwakeHours();
	assert.equal( hours == 0, true, '5pm - 9pm with 4pm bedtime; 0 hrs succeeds' );

	// Work from 5:15pm - 9pm, bedtime is at 7pm
	pillar.babysitter.startTime = new moment( '2014-12-01T17:15' );
	pillar.babysitter.endTime = new moment( '2014-12-01T21:00' );
	pillar.babysitter.bedTime = new moment( '2014-12-01T19:00' );

	hours = pillar.babysitter.calculateAwakeHours();
	assert.equal( hours == 1, true, '5:15pm - 9pm with 7pm bedtime; 1 hr succeeds' );
} );

QUnit.test( 'calculate asleep hours test', function( assert ) {
	var hours = pillar.babysitter.calculateAsleepHours();
	assert.equal( hours == 3, true, '5pm - 4am with 9pm bedtime; 3 hrs succeeds' );

	// Work from 5pm - 9pm, bedtime is at 7pm
	pillar.babysitter.startTime = new moment( '2014-12-01T17:00' );
	pillar.babysitter.endTime = new moment( '2014-12-01T21:00' );
	pillar.babysitter.bedTime = new moment( '2014-12-01T19:00' );

	hours = pillar.babysitter.calculateAsleepHours();
	assert.equal( hours == 2, true, '5pm - 9pm with 7pm bedtime; 2 hrs succeeds' );

	// Work from 5pm - 9pm, bedtime is at 9pm
	pillar.babysitter.startTime = new moment( '2014-12-01T17:00' );
	pillar.babysitter.endTime = new moment( '2014-12-01T21:00' );
	pillar.babysitter.bedTime = new moment( '2014-12-01T21:00' );

	hours = pillar.babysitter.calculateAsleepHours();
	assert.equal( hours == 0, true, '5pm - 9pm with 9pm bedtime; 0 hrs succeeds' );
} );

QUnit.test( 'calculate post midnight hours test', function( assert ) {
	var hours = pillar.babysitter.calculatePostMidnightHours();
	assert.equal( hours == 4, true, '5pm - 4am with 9pm bedtime; 4 hrs succeeds' );

	// Work from 5pm - 12am, bedtime is at 9pm
	pillar.babysitter.startTime = new moment( '2014-12-01T17:00' );
	pillar.babysitter.endTime = new moment( '2014-12-02T00:00' );
	pillar.babysitter.bedTime = new moment( '2014-12-01T21:00' );

	hours = pillar.babysitter.calculatePostMidnightHours();
	assert.equal( hours == 0, true, '5pm - 12am with 9pm bedtime; 0 hrs succeeds' );
} );

QUnit.test( "parse hours tests", function( assert ) {
	// This test is a bit redundant since the three calculations tests should account for it
	// but in a larger project this test would serve as a check on changes within parseHours()
	var hourSet = pillar.babysitter.parseHours();

	assert.equal( hourSet.awakeHours == 4, true, '5pm - 4am with 9pm bedtime; 4 hrs succeeds' );
	assert.equal( hourSet.dayOneHours == 3, true, '5pm - 4am with 9pm bedtime; 3 hrs succeeds' );
	assert.equal( hourSet.dayTwoHours == 4, true, '5pm - 4am with 9pm bedtime; 4 hrs succeeds' );
} );