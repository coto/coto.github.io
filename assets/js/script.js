/**
 * reCAPTCHA v2 Invisible Implementation & Subscription Hub Logic
 */

// Initialize tooltips and search/modal triggers
$(document).ready(function () {
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // --- RSS Modal Logic ---
    $(document).off('click', '.rss-icon-link').on('click', '.rss-icon-link', function (e) {
        e.preventDefault();
        const rssModal = new bootstrap.Modal(document.getElementById('rssModal'));
        rssModal.show();
    });

    // Copy RSS Link functionality
    $(document).on('click', '#copy-rss-btn', function () {
        const rssUrlInput = document.getElementById('rss-url-input');
        const copyBtn = $(this);
        const copyBtnText = $('#copy-btn-text');
        const originalText = copyBtnText.text();
        const originalBg = copyBtn.css('background-color');
        const originalBorder = copyBtn.css('border-color');
        const originalColor = copyBtn.css('color');

        rssUrlInput.select();
        rssUrlInput.setSelectionRange(0, 99999); // For mobile devices
        navigator.clipboard.writeText(rssUrlInput.value).then(() => {
            // Visual feedback
            const copiedText = (translations && translations.rss_modal) ? translations.rss_modal.copied : 'Copied!';
            copyBtnText.text(copiedText);
            copyBtn.css({
                'background-color': '#198754',
                'border-color': '#198754',
                'color': 'white'
            });

            setTimeout(() => {
                copyBtnText.text(originalText);
                copyBtn.css({
                    'background-color': originalBg,
                    'border-color': originalBorder,
                    'color': originalColor
                });
            }, 2000);
        });
    });

    // --- reCAPTCHA Form Handling ---

    $('.contact-form, .nea-formModal').unbind('submit').bind('submit', function (e) {
        e.preventDefault();
        const form = this;
        const $form = $(form);
        const button = $form.find('button[type="submit"]');
        const sitekey = $form.data('recaptcha-sitekey');
        const isModal = $form.hasClass('nea-formModal');

        // Validate form first
        if (!form.checkValidity()) {
            form.reportValidity();
            return false;
        }

        // Store original button HTML
        if (!button.data('original-html')) {
            button.data('original-html', button.html());
        }

        // Disable button
        button.prop('disabled', true);
        if (button.find('.button-text').length) {
            button.find('.button-text').text('Verifying...');
        } else {
            button.html('<span class="button-text">Verifying...</span>');
        }

        // If reCAPTCHA is configured
        if (sitekey && typeof grecaptcha !== 'undefined' && grecaptcha.ready) {
            grecaptcha.ready(function () {
                try {
                    let widgetId = $form.data('recaptcha-widget-id');

                    if (widgetId === undefined || widgetId === null) {
                        // Ensure container exists
                        let container;
                        if (isModal) {
                            if (!$form.find('.recaptcha-modal-container').length) {
                                $form.append('<div class="recaptcha-modal-container" style="display: none;"></div>');
                            }
                            container = $form.find('.recaptcha-modal-container')[0];
                        } else {
                            container = document.getElementById('recaptcha-container');
                            if (!container) {
                                $('body').append('<div id="recaptcha-container" style="display: none;"></div>');
                                container = document.getElementById('recaptcha-container');
                            }
                        }

                        widgetId = grecaptcha.render(container, {
                            'sitekey': sitekey,
                            'size': 'invisible',
                            'callback': function (token) {
                                $('#g-recaptcha-response', form).val(token);
                                // Submit using postForm from formConfirmation.js
                                postForm(form, isModal);
                            },
                            'error-callback': function () {
                                console.error('reCAPTCHA error');
                                restoreButtonState(form);
                                alert('reCAPTCHA verification failed. Please refresh and try again.');
                            }
                        });
                        $form.data('recaptcha-widget-id', widgetId);
                    }

                    grecaptcha.execute(widgetId);
                } catch (error) {
                    console.error('reCAPTCHA error:', error);
                    postForm(form, isModal);
                }
            });
        } else {
            postForm(form, isModal);
        }

        return false;
    });
});

/**
 * Restores submit button to initial state
 */
function restoreButtonState(form) {
    const $form = $(form);
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
            // Invisible reCAPTCHA might not need reset sometimes, but good to try
        }
    }
}
