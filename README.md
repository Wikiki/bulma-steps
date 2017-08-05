# bulma-steps
Bulma's extension to manage steps


Preview
---
![Steps extension](https://img15.hostingpics.net/pics/827766ScreenShot20170719at121410.png)

Usage
---
```html
<ul class="step">
  <li class="step-item">
    <a href="#steps"></a>
  </li>
  <li class="step-item is-active">
    <a href="#steps"></a>
  </li>
  <li class="step-item">
    <a href="#steps"></a>
  </li>
  <li class="step-item">
    <a href="#steps"></a>
  </li>
</ul>

<ul class="step">
  <li class="step-item">
    <a href="#steps">Step 1</a>
  </li>
  <li class="step-item">
    <a href="#steps">Step 2</a>
  </li>
  <li class="step-item is-active">
    <a href="#steps">Step 3</a>
  </li>
  <li class="step-item">
    <a href="#steps">Step 4</a>
  </li>
</ul>
```

Integration
---
- Clone the [bulma repo](https://github.com/jgthms/bulma)
- Under the `sass` folder, create a new folder called `extensions`
- In this new folder, create a new file `steps.sass`
- Copy the code form the `bulma-steps repo`'s [steps.sass](https://github.com/Wikiki/bulma-steps/blob/master/steps.sass) file into your new file
- In the same folder create a new file `_all.sass` (this is not required, but will help when you add more extensions)
- In this file add this code:
```
@charset "utf-8"
@import "steps.sass"
```
At the end of the `bulma.sass` file, add this line: `@import "sass/extensions/_all"`

Now, you can just build the bulma project with `npm run build`, and the output will be available in the `css folder`.
