$(document).ready(function(){
	$('.contact-form').unbind('submit').bind('submit', function() {
		postForm(this);
		return false;
	});

});
