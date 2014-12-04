var Pillar = Pillar || {};

Pillar.Babysitter = {
	startTime                 : null,
	endTime                   : null,
	bedTime                   : null,
	calculatePostMidnightHours: function calculatePostMidnightHours() {
		return -1;
	},
	calculateAsleepHours      : function calculateAsleepHours() {
		return -1;
	},
	calculateAwakeHours       : function calculateAwakeHours() {
		if( !Pillar.Babysitter.startTime || !Pillar.Babysitter.endTime || !Pillar.Babysitter.bedTime ) {
			console.debug( 'Either the start time or the end time are missing!' );
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