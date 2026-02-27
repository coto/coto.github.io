Si deseas comunicarte conmigo, por favor usa este Formulario de Contacto. En caso de que te importe encriptar alguna información, por favor usa [esta Llave][pgp_key]{:target="_blank"}.

<form class="contact-form" method="post" id="contact-form" data-recaptcha-sitekey="6Le1PEsUAAAAAE9nZ1xNHYDupmR9b1HbSuMF_71f">
   <p><input name="Name" type="text" placeholder="Tu Nombre" required="required" id="form-field-name" /></p>
   <p><input name="_replyto" type="email" placeholder="Tu Correo" required="required" id="form-field-email" /></p>
   <p><label for="form-field-message">Mensaje:</label>
   	<textarea name="message" required="required" placeholder="Escribe tu mensaje" rows="4" cols="50" id="form-field-message"></textarea>
   </p>

   <!-- Hidden field for reCAPTCHA token -->
   <input type="hidden" id="g-recaptcha-response" name="g-recaptcha-response" value="">

   <!-- Hidden container for reCAPTCHA widget -->
   <div id="recaptcha-container" style="display: none;"></div>

   <p>
      <button type="submit" class="btn btn-primary" id="contact-submit-btn">
         <span class="button-text">
            <svg width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16" style="margin-right: 5px;">
               <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
            </svg>
            Enviar
         </span>
      </button>
   </p>
</form>

[pgp_key]: /es/public-key/
