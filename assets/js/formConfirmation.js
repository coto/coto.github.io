function ValidateEmail(email) {
	if (email.indexOf("@agenciasubido.com") >= 0) {
		alert("spam detected.");
		return false;
	}
	if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
		return (true)
	}
	// Use translations if available
	const invalidEmailMsg = (translations && translations.pages && translations.pages.forms) ? translations.pages.forms.email_novalid : "is an invalid email address! Please insert a valid one.";
	alert(email + " " + invalidEmailMsg);

	return false;
}

function postForm(form, modal = false) {
	const $form = $(form);
	let URL = "";
	// Get localized thanks message
	let thanks = (translations && translations.pages && translations.pages.forms && translations.pages.forms.thanks_response) ? translations.pages.forms.thanks_response : "Thanks! Your contact was sent.";

	if ($form.hasClass("contact-form") || $form.hasClass("nea-contact") || $form.hasClass("nea-formModal")) {
		URL = "https://docs.google.com/forms/d/1CpamEupan42CHwtJN1VqJnjgoQGud8SI2WAb9XCVqPU/formResponse";
	}

	function restoreButtonStateLocal() {
		const button = $form.find('button[type="submit"]');
		const originalHtml = button.data('original-html');

		if (originalHtml) {
			button.html(originalHtml);
		}
		button.prop('disabled', false);

		// Reset reCAPTCHA widget if it exists
		const widgetId = $form.data('recaptcha-widget-id');
		if (widgetId !== undefined && widgetId !== null && typeof grecaptcha !== 'undefined') {
			try {
				grecaptcha.reset(widgetId);
			} catch (e) {
				console.warn('reCAPTCHA reset failed:', e);
			}
		}
	}

	const email = $form.find("#form-field-email").val();
	const name = $form.find("#form-field-name").val();
	let message = $form.find("#form-field-message").val();
	const source = "beecoss.com";
	const href = window.location.href;

	if (email == "") {
		const emptyEmailMsg = (translations && translations.pages && translations.pages.forms) ? translations.pages.forms.email_empty : "Insert your email address before sending.";
		alert(emptyEmailMsg);
		restoreButtonStateLocal();
		return false;
	}
	if (!ValidateEmail(email)) {
		restoreButtonStateLocal();
		return false;
	}

	// Add reference metadata
	message = ` 
	${message} <br><br>
	---
	<hr>
	<p><b>**Reference**</b>: ${href}</p>
	<p><b>**Language**</b>: ${currentLang}</p>
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
			0: function () {
				handleSuccess();
			},
			200: function () {
				handleSuccess();
			}
		},
		error: function () {
			handleSuccess(); // Google Forms often returns 0/error block even on success due to CORS
		}
	});

	function handleSuccess() {
		if (modal) {
			const formSaved = $form.html();
			const willCloseMsg = (translations && translations.pages && translations.pages.forms) ? translations.pages.forms.will_close : "This window will close in 3 seconds.";

			$form.html(`
				<p class="alert alert-success">${thanks}</p>
				<p class="mt-4 mb-0 text-center text-secondary">${willCloseMsg}</p>
			`);

			// Special toast for RSS subscription
			if (form.id === 'rss-email-form') {
				const successToast = document.getElementById('successToast');
				if (successToast) {
					console.log('Showing success toast...');
					new bootstrap.Toast(successToast).show();
				}
			}

			setTimeout(function () {
				$form.html(formSaved);
				form.reset();
				$form.closest('.modal').modal('hide');
				restoreButtonStateLocal();
			}, 3000);
		} else {
			$form.html('<p class="alert alert-success">' + thanks + '</p>');
			restoreButtonStateLocal();
		}
	}
}
