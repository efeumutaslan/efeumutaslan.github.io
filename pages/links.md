---
layout: mypost
title: Takip Listem
---

Takip Ettiğim Araştırma Kaynaklarını Burada Tutuyorum

<!-- >
```
Title: {{ site.title }}
Description: {{ site.description }}
BaseUrl：{{ site.domainUrl }}{{ site.baseurl }}
``` 
<!-->
<ul>
  {%- for link in site.links %}
  <li>
    <p><a href="{{ link.url }}" title="{{ link.desc }}" target="_blank" >{{ link.title }}</a></p>
  </li>
  {%- endfor %}
</ul>
