# PostCSS `100vh` Fix

[PostCSS] plugin to fix [iOS’s bug] with `100vh`. It works in Chrome,
iOS/iPad/MacOS Safari and [all other browsers].
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

<img src="https://chanind.github.io/assets/100vh_problem.png"
     alt="100vh bug illusration by David Chanin"
     title="By David Chanin">

It works with `min-height` and `max-height` too.

[all other browsers]: https://caniuse.com/#feat=viewport-units
[iOS’s bug]: https://allthingssmitty.com/2020/05/11/css-fix-for-100vh-in-mobile-webkit/
[PostCSS]: https://github.com/postcss/postcss

<a href="https://evilmartians.com/?utm_source=postcss-dark-theme-class">
  <img src="https://evilmartians.com/badges/sponsored-by-evil-martians.svg"
       alt="Sponsored by Evil Martians" width="236" height="54">
</a>

## Usage


**Step 1:** Check you project for existed PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you do not use PostCSS, add it according to [official docs]
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
