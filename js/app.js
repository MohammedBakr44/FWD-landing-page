let nav = document.querySelector("nav"); // Selecting the nav element
let sections = document.getElementsByTagName("section"); // get all the sections

// Create nav bar links from the existing sections
for (let i = 0; i < sections.length; i++) {
  // create a new li
  let node = document.createElement("li");
  // get the section id to use it in the link
  let section = sections[i].id;
  // link the li to the section using `section` variable
  node.innerHTML = `<a href="#${section}">${section}</a>`;
  // add everything to the ul
  nav.children[0].appendChild(node);
}

//get all the links on the page containing # in the href (^= means starting with)
const links = document.querySelectorAll('a[href^="#"]');

links.forEach((link) => {
  // getting the target element by choosing the element based on the ID in href value
  let scrollTarget = document.querySelector(`${link.getAttribute("href")}`);
  // for clicking on any of the links
  link.addEventListener("click", (e) => {
    // we need to prevent default behaviour which would be just jumping to the element without scrolling
    e.preventDefault();
    // call scrollIntoView to start the function
    scrollTarget.scrollIntoView({ behavior: "smooth" });
  });
});

// Using intersectionObserver to add/remove the active class
const observer = new IntersectionObserver(
  (entries) => {
    // accepting entries so the observer works on many elements
    for (let entry of entries) {
      // looping through all the elements
      entry.target.classList.remove("active"); //remove the class from the rest of the elements
      if (entry.isIntersecting) {
        // check if the element is intersecting with the screen, if so, add the class active
        entry.target.classList.add("active");
      }
    }
  },
  { threshold: [0.3] }
);

// Using spread operator to make an array out of sections, looping on it and observe every element
[...sections].forEach((section) => observer.observe(section));

// To top button
const button = document.querySelector(".toTop");

document.addEventListener("scroll", (e) => {
  // Getting the scrolled amount to show the button, || is used to support more browsers
  document.body.scrollTop > 900 || document.documentElement.scrollTop > 900
    ? (button.style.display = "block")
    : (button.style.display = "none");
});
// Scroll back to the main element
button.addEventListener("click", () =>
  document
    .getElementsByTagName("main")[0]
    .scrollIntoView({ behavior: "smooth" })
);

// Navigation menu toggle
let width = 0;
window.addEventListener("resize", () => {
  width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
}); // Update the width on windowResize

document.getElementsByClassName("logo")[0].addEventListener("click", () => {
  if (width <= 768) {
    document
      .querySelectorAll("nav ul li:not(.logo)")
      .forEach((item) => item.classList.toggle("active-menu"));
  }
}); // When the logo is clicked, check for the width, if on mobile add the class active-menu(display: block) to all li elements except for the logo
