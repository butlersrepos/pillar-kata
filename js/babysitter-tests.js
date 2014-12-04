QUnit.module( "Babysitter Tests", {
	setup: function setup() {
		// Each test starts with an input of 5pm - 4am with a bedtime of 9pm
		Pillar.Babysitter.startTime = new moment( '2014-12-01T17:00' );
		Pillar.Babysitter.endTime = new moment( '2014-12-02T04:00' );
		Pillar.Babysitter.bedTime = new moment( '2014-12-01T21:00' );
	}
} );

QUnit.test( "full calculation tests", function( assert ) {
	var fees = Pillar.Babysitter.calculateFees();

	assert.equal( fees == 136, true, 'Fees from 5pm - 4am with 9pm bedtime; $136 succeeds, value was ' + fees );

	// Work from 5pm - 9pm, bedtime is at 9pm
	Pillar.Babysitter.startTime = new moment( '2014-12-01T17:00' );
	Pillar.Babysitter.endTime = new moment( '2014-12-01T21:00' );
	Pillar.Babysitter.bedTime = new moment( '2014-12-01T21:00' );

	fees = Pillar.Babysitter.calculateFees();

	assert.equal( fees == 48, true, 'Fees from 5pm - 9pm with 9pm bedtime; $48 succeeds, value was ' + fees );
} );

QUnit.test( 'calculate awake hours test', function( assert ) {
	var hours = Pillar.Babysitter.calculateAwakeHours();
	assert.equal( hours == 4, true, '5pm - 4am with 9pm bedtime; 4 hrs succeeds, value was ' + hours );

	// Work from 5pm - 9pm, bedtime is at 5pm
	Pillar.Babysitter.startTime = new moment( '2014-12-01T17:00' );
	Pillar.Babysitter.endTime = new moment( '2014-12-01T21:00' );
	Pillar.Babysitter.bedTime = new moment( '2014-12-01T17:00' );

	hours = Pillar.Babysitter.calculateAwakeHours();
	assert.equal( hours == 0, true, '5pm - 9pm with 5pm bedtime; 0 hrs succeeds, value was ' + hours );

	// Work from 5pm - 9pm, bedtime is at 4pm
	Pillar.Babysitter.startTime = new moment( '2014-12-01T17:00' );
	Pillar.Babysitter.endTime = new moment( '2014-12-01T21:00' );
	Pillar.Babysitter.bedTime = new moment( '2014-12-01T16:00' );

	hours = Pillar.Babysitter.calculateAwakeHours();
	assert.equal( hours == 0, true, '5pm - 9pm with 4pm bedtime; 0 hrs succeeds, value was ' + hours );

	// Work from 5:15pm - 9pm, bedtime is at 7pm
	Pillar.Babysitter.startTime = new moment( '2014-12-01T17:15' );
	Pillar.Babysitter.endTime = new moment( '2014-12-01T21:00' );
	Pillar.Babysitter.bedTime = new moment( '2014-12-01T19:00' );

	hours = Pillar.Babysitter.calculateAwakeHours();
	assert.equal( hours == 1, true, '5:15pm - 9pm with 7pm bedtime; 1 hr succeeds, value was ' + hours );
} );

QUnit.test( 'calculate asleep hours test', function( assert ) {
	var hours = Pillar.Babysitter.calculateAsleepHours();
	assert.equal( hours == 3, true, '5pm - 4am with 9pm bedtime; 3 hrs succeeds, value was ' + hours );

	// Work from 5pm - 9pm, bedtime is at 7pm
	Pillar.Babysitter.startTime = new moment( '2014-12-01T17:00' );
	Pillar.Babysitter.endTime = new moment( '2014-12-01T21:00' );
	Pillar.Babysitter.bedTime = new moment( '2014-12-01T19:00' );

	hours = Pillar.Babysitter.calculateAsleepHours();
	assert.equal( hours == 2, true, '5pm - 9pm with 7pm bedtime; 2 hrs succeeds, value was ' + hours );

	// Work from 5pm - 9pm, bedtime is at 9pm
	Pillar.Babysitter.startTime = new moment( '2014-12-01T17:00' );
	Pillar.Babysitter.endTime = new moment( '2014-12-01T21:00' );
	Pillar.Babysitter.bedTime = new moment( '2014-12-01T21:00' );

	hours = Pillar.Babysitter.calculateAsleepHours();
	assert.equal( hours == 0, true, '5pm - 9pm with 9pm bedtime; 0 hrs succeeds, value was ' + hours );
} );

QUnit.test( 'calculate post midnight hours test', function( assert ) {
	var hours = Pillar.Babysitter.calculatePostMidnightHours();
	assert.equal( hours == 4, true, '5pm - 4am with 9pm bedtime; 4 hrs succeeds, value was ' + hours );

	// Work from 5pm - 12am, bedtime is at 9pm
	Pillar.Babysitter.startTime = new moment( '2014-12-01T17:00' );
	Pillar.Babysitter.endTime = new moment( '2014-12-02T00:00' );
	Pillar.Babysitter.bedTime = new moment( '2014-12-01T21:00' );

	hours = Pillar.Babysitter.calculatePostMidnightHours();
	assert.equal( hours == 0, true, '5pm - 12am with 9pm bedtime; 0 hrs succeeds, value was ' + hours );
} );

QUnit.test( "parse hours tests", function( assert ) {
	// This test is a bit redundant since the three calculations tests should account for it
	// but in a larger project this test would serve as a check on changes within parseHours()
	var hourSet = Pillar.Babysitter.parseHours();

	assert.equal( hourSet.awakeHours == 4, true, 'Awake hours for 5pm - 4am with 9pm bedtime; 4 hrs succeeds' );
	assert.equal( hourSet.asleepHours == 3, true, 'Asleep hours for 5pm - 4am with 9pm bedtime; 3 hrs succeeds' );
	assert.equal( hourSet.postMidnightHours == 4, true, 'Overnight hours for 5pm - 4am with 9pm bedtime; 4 hrs succeeds' );
} );