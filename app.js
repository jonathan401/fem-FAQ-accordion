const accordionTriggers = document.querySelectorAll(".accordion-item__trigger");
const accordionsWrapper = document.querySelector(".accordions");

// handle keyup event for the accordion triggers
const handleKeyUp = (event, currentIndex) => {
  let firstItem = 0;
  let lastItem = accordionTriggers.length - 1;
  const nextItem = currentIndex + 1;
  const previousItem = currentIndex - 1;

  if (event.key === "ArrowDown" || event.key === "ArrowRight") {
    event.preventDefault();
    if (currentIndex === lastItem) {
      accordionTriggers[0].focus();
      return;
    }
    accordionTriggers[nextItem].focus();
  }

  if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    event.preventDefault();
    if (currentIndex === 0) {
      accordionTriggers[lastItem].focus();
      return;
    }
    accordionTriggers[previousItem].focus();
  }
};

accordionTriggers.forEach((accordionTrigger, index) => {
  accordionTrigger.addEventListener("keyup", (e) => {
    handleKeyUp(e, index);
  });
});

class Accordion {
  constructor(accordionTrigger) {
    this.accordionTrigger = accordionTrigger;
    this.accordionContent = document.getElementById(
      this.accordionTrigger.getAttribute("aria-controls")
    );

    this.accordionTrigger.addEventListener("click", this.toggleTrigger);
  }

  toggleTrigger = () => {
    let isExpanded =
      this.accordionTrigger.getAttribute("aria-expanded") === "true";

    this.accordionTrigger.setAttribute("aria-expanded", !isExpanded);
    if (!isExpanded) {
      this.accordionContent.classList.add("expanded");
    } else {
      this.accordionContent.classList.remove("expanded");
    }
  };
}

accordionTriggers.forEach(
  (accordionTrigger) => new Accordion(accordionTrigger)
);
