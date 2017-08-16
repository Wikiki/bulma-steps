# bulma-steps
Bulma's extension to manage steps


Preview
---
![Steps extension](https://img4.hostingpics.net/pics/787860ScreenShot20170816at123716.png)

Usage
---
```html
<ul class="steps">
  <li class="step-item is-completed is-success">
    <div class="step-marker">
      <span class="icon">
        <i class="fa fa-check"></i>
      </span>
    </div>
    <div class="step-content">
      <p class="step-title">Step 1</p>
      <p>This is the first step, which means you start here.</p>
    </div>
  </li>
  <li class="step-item is-active">
    <div class="step-marker">
      <span class="icon">
        <i class="fa fa-star"></i>
      </span>
    </div>
    <div class="step-content">
      <p class="step-title">Step 2</p>
      <p>This is the second step. Once you complete the first step, you will end up here.</p>
    </div>
  </li>
  <li class="step-item">
    <div class="step-marker">
    <div class="step-content">
      <p class="step-title">Step 3</p>
      <p>This is the third step. This is halfway between the start and the end.</p>
    </div>
  </li>
  <li class="step-item">
    <div class="step-marker">
    <div class="step-content">
      <p class="step-title">Step 4</p>
      <p>And finally the last step. You have successfully completed all 5 steps.</p>
    </div>
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

## Related Project

There is another steps extensions for Bulma available from
[aramvisser](https://github.com/aramvisser/bulma-steps). It even has the same name!
