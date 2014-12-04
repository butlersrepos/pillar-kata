var Pillar = Pillar || {};

Pillar.Babysitter = {
	startTime                 : null,
	endTime                   : null,
	bedTime                   : null,
	awakeRate                 : 12,
	asleepRate                : 8,
	overnightRate             : 16,
	validInputs               : function validInputs() {
		if( !Pillar.Babysitter.startTime || !Pillar.Babysitter.endTime || !Pillar.Babysitter.bedTime ) {
			console.debug( 'One of the time components is missing!' );
			return false;
		}
		return true;
	},
	calculatePostMidnightHours: function calculatePostMidnightHours() {
		if( !Pillar.Babysitter.validInputs() ) { return 0; }
		var midnight = moment();
		midnight.date( Pillar.Babysitter.startTime.date() + 1 );
		midnight.hour( 0 ).minutes( 0 ).seconds( 0 ).milliseconds( 0 );

		var hours = Pillar.Babysitter.endTime.diff( midnight, 'hours' );
		return Math.max( 0, hours );
	},
	calculateAsleepHours      : function calculateAsleepHours() {
		if( !Pillar.Babysitter.validInputs() ) { return 0; }
		var hours = Pillar.Babysitter.endTime.diff( Pillar.Babysitter.bedTime, 'hours' );

		var postMidnightHours = Pillar.Babysitter.calculatePostMidnightHours();
		hours -= postMidnightHours;
		return Math.max( 0, hours );
	},
	calculateAwakeHours       : function calculateAwakeHours() {
		if( !Pillar.Babysitter.validInputs() ) { return 0; }
		var hours = Pillar.Babysitter.bedTime.diff( Pillar.Babysitter.startTime, 'hours' );
		return Math.max( 0, hours );
	},
	parseHours                : function parseHours() {
		if( !Pillar.Babysitter.validInputs() ) { return {}; }
		var hourSet = {};
		hourSet.awakeHours = Pillar.Babysitter.calculateAwakeHours();
		hourSet.asleepHours = Pillar.Babysitter.calculateAsleepHours();
		hourSet.postMidnightHours = Pillar.Babysitter.calculatePostMidnightHours();
		return hourSet;
	},
	calculateFees             : function calculateFees() {
		if( !Pillar.Babysitter.validInputs() ) { return 0; }
		var hourSet = Pillar.Babysitter.parseHours();
		var totalFees = 0;
		totalFees += Pillar.Babysitter.awakeRate * hourSet.awakeHours;
		totalFees += Pillar.Babysitter.asleepRate * hourSet.asleepHours;
		totalFees += Pillar.Babysitter.overnightRate * hourSet.postMidnightHours;
		return totalFees;
	}
};