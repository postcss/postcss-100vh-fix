# PostCSS `100vh` Fix

<img align="right" width="135" height="95"
     title="Philosopher’s stone, logo of PostCSS"
     src="https://postcss.org/logo-leftp.svg">

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

[all other browsers]: https://caniuse.com/#feat=viewport-units
[iOS’s bug]: https://allthingssmitty.com/2020/05/11/css-fix-for-100vh-in-mobile-webkit/
[PostCSS]: https://github.com/postcss/postcss

<a href="https://evilmartians.com/?utm_source=postcss-dark-theme-class">
  <img src="https://evilmartians.com/badges/sponsored-by-evil-martians.svg"
       alt="Sponsored by Evil Martians" width="236" height="54">
</a>


## Limits

Pure CSS solution is limited. For many cases you need to use JS-based hack like
[`postcss-viewport-height-correction`]:

Our hack do not work with partial height like `height: 90vh`
or `height: calc(100vh - 60px)`.

Also, we do not fix Chrome for Android bug:

<img src="https://chanind.github.io/assets/100vh_problem.png"
     alt="100vh Chrome bug illusration David Chanin"
     title="By David Chanin">

[`postcss-viewport-height-correction`]: https://github.com/Faisal-Manzer/postcss-viewport-height-correction


## Usage

**Step 1:** Install plugin:

```sh
npm install --save-dev postcss postcss-100vh-fix
```

**Step 2:** Check you project for existed PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you do not use PostCSS, add it according to [official docs][PostCSS]
and set this plugin in settings.

**Step 3:** Add the plugin to plugins list:

```diff
module.exports = {
  plugins: [
+   require('postcss-100vh-fix'),
    require('autoprefixer')
  ]
}
```

**Step 4:** Use `height: 100vh` or `min-height: 100vh` in your CSS.
