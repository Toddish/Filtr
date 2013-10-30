# Filtr.js

---

A small jQuery plugin that helps filter a selection of items.

---

## Features

* Can filter any selection of elements...
* On any property you want!
* Lightweight - ~0.5kb minified and gzipped
* Made to be customized - callbacks and options

---

## Installation

Place `/assets/js/jquery.filtr.min.js` in `/your/js/folder/`.

Add this just before your closing `body` tag, after you've included jQuery:

```html
<script src="/your/js/folder/filtr.min.js"></script>
```

---

## Usage

Set up your html:

```html
<form action="/">
    <input name="filter">
</form>

<ul class="filter_items">
    <li data-filtr="item 1">Item 1</li>
    <li data-filtr="item 2">Item 2</li>
    <li data-filtr="item 3">Item 3</li>
</ul>
```

Call the plugin:

```javascript
var options = {};
$('input[name="filter"]').filtr($('.filter_items li'), options);
```

---

## Documentation

For full documentation, have a look at [http://docs.toddish.co.uk/filtr](http://docs.toddish.co.uk/filtr).
