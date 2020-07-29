# PostCSS `100vh` Fix

[PostCSS] plugin to fix [iOS’s bug] with `100vh`.

It works in Chrome (just `-webkit-fill-available` causes problems in Chrome
in some cases), iOS/iPad/MacOS Safari and [all other browsers].
Pure CSS solution, no JS required.

```css
body {
  /* Footer will be hidden on iOS Safari because of bottom panel */
  height: 100vh;
}
```

```css
body {
  height: 100vh;
}

/* Avoid Chrome to see Safari hack */
@supports (-webkit-touch-callout: none) {
  body {
    /* The hack for Safari */
    height: -webkit-fill-available;
  }
}
```

<img src="https://maximilianschmitt.me/posts/css-100vh-mobile-browsers/lld-minimal-vs-normal-ui@2x.png"
     alt="100vh bug illusration Max Schmitt"
     title="By Max Schmitt">

It works with `min-height` and `max-height` too.

If you need to support partial `vh` values (e.g. `90vh`) we recommend
to use [`postcss-viewport-height-correction`] with JS-based hack.

[`postcss-viewport-height-correction`]: https://github.com/Faisal-Manzer/postcss-viewport-height-correction
[all other browsers]: https://caniuse.com/#feat=viewport-units
[iOS’s bug]: https://allthingssmitty.com/2020/05/11/css-fix-for-100vh-in-mobile-webkit/
[PostCSS]: https://github.com/postcss/postcss

<a href="https://evilmartians.com/?utm_source=postcss-dark-theme-class">
  <img src="https://evilmartians.com/badges/sponsored-by-evil-martians.svg"
       alt="Sponsored by Evil Martians" width="236" height="54">
</a>

## Usage


**Step 1:** Check your project for existing PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you do not use PostCSS, add it according to [official docs](https://github.com/postcss/postcss/tree/master/docs)
and set this plugin in settings.

**Step 2:** Add the plugin to plugins list:

```diff
module.exports = {
  plugins: [
+   require('postcss-100vh-fix'),
    require('autoprefixer')
  ]
}
```

**Step 3:** Use `height: 100vh` or `min-height: 100vh` in your CSS.
