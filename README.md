# Frontend Mentor - FAQ accordion solution

This is a solution to the [FAQ accordion challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/faq-accordion-wyfFdeBwBz). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- Hide/Show the answer to a question when the question is clicked
- Navigate the questions and hide/show answers using keyboard navigation alone
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshots

![Mobile view](./assets/images/background-pattern-mobile.svg)

![Desktop view](./assets/images/background-pattern-desktop.svg)

### Links

- Github: [Github](https://github.com/jonathan401/fem-FAQ-accordion)
- Live Site URL deployed by Vercel: [Live site](https://fem-faq-accordion.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow

### What I learned

This project taught me about how attribute selectors could prove really useful. For example, in the project, I used the `aria-expanded` attribute on the accordion triggers to change the icon associated with the respective state:

```css
/* this selector hides the 'plus' icon when the button has titshe aria-expanded attribute set to  of 'true'  */
.accordion-item__trigger[aria-expanded="true"]
  .accordion-item__trigger--closed {
  display: none;
}

/* this selector shows the 'minus' icon when the button has its aria-expanded attribute set to true */
.accordion-item__trigger[aria-expanded="true"] .accordion-item__trigger--open {
  display: block;
}
```

The `aria-expanded` state of the button was toggle using Javascript.

I was able to animate height 💪🏽 - well not really 😆. I used a trick I got from Web Dev Simplified's [youtube short](https:://youtube.com/shorts/ehoLwSeuRi4?si=plqVGUheelUHpaEX).

The way it works it that you wrap the content which you want to 'animate' its height and wrap with two `div` elements. The wrapper has a height is a grid container with a `grid-template-row` of 0fr to start with. The second wrapper is given a `min-height` of 0. When button is triggered, you add a class that sets the `grid-template-rows` of the first wrapper to 1fr. You then add a transition to the `grid-template-rows` property to make things look nice. There's a look at the code:

```css
/* the first wrapper */
.collapsible-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  /* hide the visibility from screen readers so that the content of the accordion is read out only when the accordion is open */
  visibility: hidden;
  opacity: 0;
  transition: grid-template-rows 250ms ease, opacity 200ms ease;
}

.collapsible-wrapper.expanded {
  grid-template-rows: 1fr;
  visibility: visible;
  opacity: 1;
}

/* for the second wrapper. Makes sure it 'grows' with the first layer */
.accordion-item__content-wrapper {
  min-height: 0;
}
```

> The :has selector could have been useful in this case because there wouldn't be any need to add a class to the wrapper instead I would have done something like this:

```css
.accordion-item:has(.accordion-item__trigger[aria-expanded="true"])
  .collapsible-wrapper {
  grid-template-rows: 1fr;
  visibility: visible;
  opacity: 1;
}
```

but this increases its specificity to 3 0 😅. It's not too bad though.

For the keyboard functionality, I added an event listener to each of the accordion triggers and the created a separate function that keeps track of the current accordion trigger using its `index` (which is received as the second argument from the `forEach` method). It looks something like this:

```js
const handleKeyUp = (event, currentIndex) => {
  let firstItem = 0;
  let lastItem = accordionTriggers.length - 1;
  const nextItem = currentIndex + 1;
  const previousItem = currentIndex - 1;

  if (event.key === "ArrowDown" || event.key === "ArrowRight") {
    event.preventDefault();
    // first checks if the user is on the last item when the user presses the down arrow or right arrow. if this is true, return the focus to the first accordion trigger and if not go down the array of accordions and focus on each one
    if (currentIndex === lastItem) {
      accordionTriggers[0].focus();
      return;
    }
    accordionTriggers[nextItem].focus();
  }

  if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    event.preventDefault();
    // first checks if the user is on the first item and if true, give focus to the last item and if not, reduce the index of the current element by 1 and focus on the accordion trigger at that index
    if (currentIndex === 0) {
      accordionTriggers[lastItem].focus();
      return;
    }
    accordionTriggers[previousItem].focus();
  }
};
```

### Continued development

I created a class for the trigger buttons of the accordions. Thought I'm still learning how to associate an abstract class with dom elements. But this is something I'm working on.

### Useful resources

- [Web Dev Simpliefied Youtube Video short](https://www.example.com) - This really helped me 'animated' height. I really liked this pattern and will use it going forward.
- [Aria Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/) - This is an amazing article that helped me make the accordion accessible. I'd recommend it to anyone still learning this concept.

## Author

- Github - [jonathan401](https://github.com/jonathan401)
- Frontend Mentor - [@kehinde](https://www.frontendmentor.io/profile/jonathan401)
- Twitter - [@Okurin\_\_KG](https://www.twitter.com/Okurin__KG)
