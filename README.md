# PostCSS `100vh` Fix

[PostCSS] plugin to fix [iOS’s bug] with `100vh`.

```css
body {
  height: 100vh;
}
```

```css
body {
  height: 100vh;
}

@supports (-webkit-touch-callout: none) {
  body {
    height: -webkit-fill-available;
  }
}
```

It works with `min-height` and `max-height` too.

[iOS’s bug]: https://allthingssmitty.com/2020/05/11/css-fix-for-100vh-in-mobile-webkit/
[PostCSS]: https://github.com/postcss/postcss

<a href="https://evilmartians.com/?utm_source=postcss-dark-theme-class">
  <img src="https://evilmartians.com/badges/sponsored-by-evil-martians.svg"
       alt="Sponsored by Evil Martians" width="236" height="54">
</a>
