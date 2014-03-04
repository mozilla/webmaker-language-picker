# Webmaker Language Picker

This is a template and library files for Webmaker's Language picker which is being used in all our apps and tools.

## Install

```
bower install webmaker-language-picker --save
```

## What's included?

```bash

# Main js file
js/
    languages.js

# Language Picker
template/
    languages.html // Main file for full page
    partial.html // Use in header or footer

# LESS file
styles/
    languages.less
```

## Example

```html
{% extends "layout.html" %}
{% block requirejs %}{% endblock %}
{% block body %}
<div class="ui-wrapper ui-section" id="language">
  {% include "webmaker-language-picker/template/languages.html" %}
</div>
{% endblock %}
```
