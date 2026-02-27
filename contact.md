---
layout: page
title: Contact
permalink: /contact/
---

{% if site.lang == 'es' %}
{% include contact/es.md %}
{% elsif site.lang == 'pt' %}
{% include contact/pt.md %}
{% else %}
{% include contact/en.md %}
{% endif %}
