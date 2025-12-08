/**
 * reCAPTCHA v2 Invisible Implementation with Critical Fixes
 * 
 * This module handles reCAPTCHA v2 Invisible integration with proper:
 * 1. Button state restoration (text/icon preservation)
 * 2. Widget reset for retry functionality
 * 3. Global widget ID management
 * 4. Validation after reCAPTCHA success
 */

// Global widget ID for reset functionality - CRITICAL for retry
window.recaptchaWidgetId = null;
window.recaptchaInitialized = false;

/**
 * Initialize reCAPTCHA widget programmatically
 */
function initializeRecaptcha(form) {
    if (window.recaptchaInitialized) {
        return;
    }

    const sitekey = $(form).data('recaptcha-sitekey');
    if (!sitekey) {
        console.error('❌ reCAPTCHA site key not found');
        return;
    }

    try {
        window.recaptchaWidgetId = grecaptcha.render('recaptcha-container', {
            sitekey: sitekey,
            size: 'invisible',
            callback: function(token) {
                onRecaptchaSuccess(form, token);
            },
            'error-callback': function() {
                console.error('❌ reCAPTCHA error occurred');
                restoreButtonState(form);
                alert('reCAPTCHA verification failed. Please try again.');
            },
            'expired-callback': function() {
                console.warn('⚠️ reCAPTCHA expired');
                restoreButtonState(form);
                alert('reCAPTCHA expired. Please try again.');
            }
        });
        window.recaptchaInitialized = true;
    } catch (error) {
        console.error('❌ Failed to initialize reCAPTCHA:', error);
    }
}

/**
 * Execute reCAPTCHA verification
 */
function executeRecaptcha(form) {
    const button = $('button[type="submit"]', form);

    // CRITICAL FIX #1: Store original button HTML BEFORE any modifications
    if (!button.data('original-html')) {
        button.data('original-html', button.html());
    }

    // Basic HTML5 validation before reCAPTCHA
    if (!form.checkValidity()) {
        form.reportValidity();
        return false;
    }

    // Disable button and show loading state
    button.prop('disabled', true);
    button.html('<span class="button-text">Verifying...</span>');

    // Initialize widget if not already done
    if (window.recaptchaWidgetId === null) {
        // Wait for grecaptcha to be ready
        if (typeof grecaptcha === 'undefined' || !grecaptcha.render) {
            restoreButtonState(form);
            alert('reCAPTCHA is still loading. Please wait a moment and try again.');
            return false;
        }
        initializeRecaptcha(form);
    }

    // Execute reCAPTCHA challenge
    try {
        grecaptcha.execute(window.recaptchaWidgetId);
    } catch (error) {
        console.error('❌ Failed to execute reCAPTCHA:', error);
        restoreButtonState(form);
        alert('Failed to execute reCAPTCHA. Please refresh the page and try again.');
    }

    return false;
}

/**
 * Handle successful reCAPTCHA verification
 * Perform additional validation and submit form
 */
function onRecaptchaSuccess(form, token) {
    // Store token in hidden field
    $('#g-recaptcha-response', form).val(token);

    // Get form values
    const email = $('#form-field-email', form).val();
    const name = $('#form-field-name', form).val();
    const message = $('#form-field-message', form).val();

    // Additional validation after reCAPTCHA success
    if (!ValidateEmail(email)) {
        restoreButtonState(form);
        return false;
    }

    // Check for spam patterns
    const spam1_re = /Publicaremos tu empresa en más de (\d+)/;
    const spam1_match = message.match(spam1_re);
    if (spam1_match) {
        form.reset();
        $("input, select, textarea, button", form).prop("disabled", true);
        let i = 20;
        while (i--) alert("Spam detected. Message not sent.");
        return false;
    }

    // All validations passed - submit the form
    submitFormToGoogleForms(form);
}

/**
 * Submit form to Google Forms via AJAX
 */
function submitFormToGoogleForms(form) {
    const button = $('button[type="submit"]', form);
    button.html('<span class="button-text">Sending...</span>');

    const URL = "https://docs.google.com/forms/d/1CpamEupan42CHwtJN1VqJnjgoQGud8SI2WAb9XCVqPU/formResponse";
    const email = $("#form-field-email", form).val();
    const name = $("#form-field-name", form).val();
    let message = $("#form-field-message", form).val();
    const source = "beecoss.com";
    const href = window.location.href;

    // Add reference metadata
    message = ` 
    ${message} <br><br>
    ---
    <hr>
    <p><b>**Reference**</b>: ${href}</p>
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
                // Status 0 is normal for CORS requests to Google Forms
                const thanks = "<div class='contact-thanks'><h3>✓ Message Sent!</h3><p>Thanks! Your message was sent successfully.</p></div>";
                $(form).html(thanks);
            },
            200: function() {
                const thanks = "<div class='contact-thanks'><h3>✓ Message Sent!</h3><p>Thanks! Your message was sent successfully.</p></div>";
                $(form).html(thanks);
            }
        },
        error: function(xhr, status, error) {
            console.warn('⚠️ AJAX error (might be normal for CORS):', status);
            // For Google Forms CORS, error is expected but form still submits
            if (xhr.status === 0) {
                const thanks = "<div class='contact-thanks'><h3>✓ Message Sent!</h3><p>Thanks! Your message was sent successfully.</p></div>";
                $(form).html(thanks);
            } else {
                restoreButtonState(form);
                alert('Error submitting form. Please try again.');
            }
        }
    });
}

/**
 * CRITICAL FIX #2 & #3: Restore button to original state and reset reCAPTCHA
 * This allows users to retry after validation errors
 */
function restoreButtonState(form) {
    const button = $('button[type="submit"]', form);

    // Restore original button HTML - CRITICAL for maintaining text/icon
    const originalHtml = button.data('original-html');
    if (originalHtml) {
        button.html(originalHtml);
        console.log('✅ Button HTML restored from backup');
    } else {
        // Fallback if original HTML wasn't stored
        button.html('<span class="button-text"><svg width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16" style="margin-right: 5px;"><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/></svg>Send</span>');
        console.warn('⚠️ Button HTML restored from fallback');
    }

    // Re-enable button
    button.prop('disabled', false);
    console.log('✅ Button re-enabled');

    // CRITICAL: Reset reCAPTCHA widget to allow retry
    if (window.recaptchaWidgetId !== null && typeof grecaptcha !== 'undefined') {
        try {
            grecaptcha.reset(window.recaptchaWidgetId);
            console.log('✅ reCAPTCHA widget reset - ready for retry');
        } catch (error) {
            console.error('❌ Failed to reset reCAPTCHA:', error);
        }
    }
}

/**
 * Bind form submit handler
 */
function bindRecaptchaForm() {
    $('.contact-form').unbind('submit').bind('submit', function(e) {
        e.preventDefault();
        executeRecaptcha(this);
        return false;
    });
}

// Initialize when DOM is ready
$(document).ready(function() {
    // Check if contact form exists on page
    if ($('.contact-form').length > 0) {
        bindRecaptchaForm();
    }
});

