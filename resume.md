---
title: Resume
layout: page
permalink: /resume/
---
<style>
  h3 {
    font-size: 24px;
    font-weight: bold;
  }
  h4 {
    font-size: 20px;
    font-weight: bold;
  }
  b, strong {
    color: var(--link-color);
  }
  ul {
    list-style: none;
  }
  ul li {
    padding-bottom: 10px;
  }
</style>
{% if site.lang == 'es' %}
{% include resume/es.md %}
{% elsif site.lang == 'pt' %}
{% include resume/pt.md %}
{% else %}
{% include resume/en.md %}
{% endif %}
