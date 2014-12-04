var Pillar = Pillar || {};

Pillar.Babysitter = {
	startTime                 : null,
	endTime                   : null,
	bedTime                   : null,
	calculatePostMidnightHours: function calculatePostMidnightHours() {
		if( !Pillar.Babysitter.startTime || !Pillar.Babysitter.endTime || !Pillar.Babysitter.bedTime ) {
			console.debug( 'One of the time components is missing!' );
			return 0;
		}
		var midnight = moment();
		midnight.date( Pillar.Babysitter.startTime.date() + 1 );
		midnight.hour( 0 ).minutes( 0 ).seconds( 0 ).milliseconds( 0 );

		var hours = Pillar.Babysitter.endTime.diff( midnight, 'hours' );
		return Math.max( 0, hours );
	},
	calculateAsleepHours      : function calculateAsleepHours() {
		if( !Pillar.Babysitter.startTime || !Pillar.Babysitter.endTime || !Pillar.Babysitter.bedTime ) {
			console.debug( 'One of the time components is missing!' );
			return 0;
		}
		var hours = Pillar.Babysitter.endTime.diff( Pillar.Babysitter.bedTime, 'hours' );

		var postMidnightHours = Pillar.Babysitter.calculatePostMidnightHours();
		hours -= postMidnightHours;
		return Math.max( 0, hours );
	},
	calculateAwakeHours       : function calculateAwakeHours() {
		if( !Pillar.Babysitter.startTime || !Pillar.Babysitter.endTime || !Pillar.Babysitter.bedTime ) {
			console.debug( 'One of the time components is missing!' );
			return 0;
		}
		var hours = Pillar.Babysitter.bedTime.diff( Pillar.Babysitter.startTime, 'hours' );
		return Math.max( 0, hours );
	},
	parseHours                : function parseHours() {
		return {};
	},
	calculateFees             : function calculateFees() {
		return -1;
	}
};