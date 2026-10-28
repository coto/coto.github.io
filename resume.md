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
    list-style: disc;
    margin-left: 12px;
    font-size: 17px;
  }
  ul li {
    padding-bottom: 0px;
  }
</style>
{% if site.lang == 'es' %}
{% include resume/es.md %}
{% elsif site.lang == 'pt' %}
{% include resume/pt.md %}
{% else %}
{% include resume/en.md %}
{% endif %}
