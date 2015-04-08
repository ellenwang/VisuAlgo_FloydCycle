//actions panel stuff
var actionsWidth = 150;
var statusCodetraceWidth = 420;

//

function hideEntireActionsPanel() {
	hideActionsPanel();
}

$( document ).ready(function() {
	
	
	
	//tutorial mode
	$('#graphds-tutorial-2 .tutorial-next').click(function() {
		showActionsPanel();
	});
	$('#graphds-tutorial-3 .tutorial-next').click(function() {
		hideEntireActionsPanel();
	});
	$('#graphds-tutorial-4 .tutorial-next').click(function() {
		window.scrollTo(0,500);
	});
	$('#graphds-tutorial-8 .tutorial-next').click(function() {
		window.scrollTo(0,0);
	});
});