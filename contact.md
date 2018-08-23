---
layout: page
title: Contact
permalink: /contact/
---

If you would like to reach me, please use this Contact Form. 

In case you would mind to encrypt the communication, use other way with [this Key][pgp_key]{:target="_blank"}[^tip].


<form class="contact-form" method="post" action="https://formspree.io/spam-filter@beecoss.com">
   <p><input name="Name" type="text" placeholder="Your Name" required="required" /></p>
   <p><input name="_replyto" type="email" placeholder="Your Email" required="required" /></p>
   <p>Message: 
   	<textarea name="message" required="required" placeholder="Type your message" rows="4" cols="50"></textarea> 
   </p>
    <input type="submit" value="Send">
    <input type="hidden" name="_subject" value="Contact form">
    <input type="hidden" name="_next" value="thanks.html">
</form>



<small class="warn">
This contact form is delidered by formspree.io and is not under my control.
</small>

[^tip]: If you are able to use the Key to encrypt, you are able to use the other way.

[pgp_key]: https://pgp.key-server.io/pks/lookup?op=get&fingerprint=on&search=0xC92E223E3F366DB1
