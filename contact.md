---
layout: page
title: Contact
permalink: /contact/
---


<small class="warn">
This contact form uses a third party service that is not under my control.
</small>

<form class="contact-form" method="post" action="https://formspree.io/spam-filter@beecoss.com">
   <p>Name: <input name="Name" placeholder="Your Name" /></p>
   <p>Email: <input name="_replyto" placeholder="Your Email" /></p>
   <p>Message: 
   	<textarea name="message" placeholder="Type your message" rows="4" cols="50"></textarea> 
   </p>
    <input type="submit" value="Send">
    <input type="hidden" name="_subject" value="Contact form">
    <input type="hidden" name="_next" value="thanks.html">
</form>