var pillar = pillar || {};

pillar.babysitter = {
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
		return -1;
	},
	parseHours                : function parseHours() {
		return {};
	},
	calculateFees             : function calculateFees() {
		return -1;
	}
};