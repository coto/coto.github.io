function ValidateEmail(email) {
	if(email.indexOf("@agenciasubido.com") >= 0) {
		alert("spam detected.");
		return false;
	}
	if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
		return (true)
	}
	alert(email + " is an invalid email address! Plese insert a valid one.");

	return false;
}

function postForm(form) {

	if ($(form).hasClass("contact-form")) {
		var URL = "https://docs.google.com/forms/d/1CpamEupan42CHwtJN1VqJnjgoQGud8SI2WAb9XCVqPU/formResponse";
		var thanks = "<div class='contact-thanks'>Thanks! Your contact was sent.</div>";
	}

	var email = $("input#form-field-email", form).val();
	var name = $("input#form-field-name", form).val();
	var message = $("#form-field-message", form).val();
	var source = "beecoss.com";
	var href = window.location.href;

	const spam1_re = /Publicaremos tu empresa en más de (\d+)/;
	const spam1_match = message.match(spam1_re);
	if (spam1_match) {
		form.reset();
		$("input, select, textarea, button", form).prop("disabled", true);
		let i=20; while(i--) alert("Spam detected. Message not send.");
		return;
	}

	if (email == "") {
		alert("Insert your email addrees before sending.");
		return false;
	}
	if (!ValidateEmail(email)) return false;
	if (URL == "") {
		alert("There's something wrong... Please try again later.");
		return false;
	}

	$('.fa-inactive', form).addClass('fa-active');
	$('button[type=submit]', form).disabled = true;

	message = ` 
	${message} <br><br>
	---
	<hr>
	<p><b>**Referencia**</b>: ${href}</p>
	`;

	$.ajax({
		url: URL,
		data: {
			"entry.1155430950": email,
			"entry.545860963": name,
			"entry.1997542075": message,
			"entry.26006045": source
		},
		type: "POST",
		dataType: "xml",
		statusCode: {
			0: function() {
				$(form).html('<p class="nea-form-sent">' + thanks + '</p>');
				console.warn("statusCode: 0");
				$('button[type=submit]', form).disabled = false;
				$('.fa-inactive', form).removeClass('fa-active');
			},
			200: function() {
				$(form).html('<p class="nea-form-sent">' + thanks + '</p>');
				$('button[type=submit]', form).disabled = false;
				$('.fa-inactive', form).removeClass('fa-active');
			}
		}
	});
}
