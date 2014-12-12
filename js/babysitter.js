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
		if( Pillar.Babysitter.bedTime.isAfter( Pillar.Babysitter.endTime ) ) { return 0; }
		var hours = Pillar.Babysitter.endTime.diff( Pillar.Babysitter.bedTime, 'hours' );

		var postMidnightHours = Pillar.Babysitter.calculatePostMidnightHours();
		hours -= postMidnightHours;
		return Math.max( 0, hours );
	},
	calculateAwakeHours       : function calculateAwakeHours() {
		if( !Pillar.Babysitter.validInputs() ) { return 0; }
		var hours = Pillar.Babysitter.endTime.diff( Pillar.Babysitter.startTime, 'hours' );
		hours -= Pillar.Babysitter.calculateAsleepHours();
		hours -= Pillar.Babysitter.calculatePostMidnightHours();
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
	},
	process                   : function process() {
		Pillar.Babysitter.startTime = moment( $( '#start-time' ).val() );
		Pillar.Babysitter.bedTime = moment( $( '#bed-time' ).val() );
		Pillar.Babysitter.endTime = moment( $( '#end-time' ).val() );
		var total = Pillar.Babysitter.calculateFees();
		$( '#calculate-time' ).val( '$' + total );
	}
};

$( document ).ready( function() {
	$( '#start-time' ).datetimepicker( {
		datepicker: false,
		allowTimes: [
			'17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
		]
	} );
	$( '#bed-time' ).datetimepicker( {
		datepicker: false,
		allowTimes: [
			'17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
		]
	} );
	$( '#end-time' ).datetimepicker( {
		minDate   : 0,
		maxDate   : '+1970/01/02',
		allowTimes: [
			'17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00', '01:00', '02:00', '03:00', '04:00'
		]
	} );

	$( '#calculate-button' ).off( 'click' ).on( 'click', function( event ) {
		Pillar.Babysitter.process();
	} );
} );
