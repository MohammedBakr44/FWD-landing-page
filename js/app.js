let nav = document.querySelector("nav");
let sections = document.getElementsByTagName("section");

for (let i = 0; i < sections.length; i++) {
  let node = document.createElement("li");
  let section = sections[i].id;
  node.innerHTML = `<a href="#${section}">${section}</a>`;
  nav.children[0].appendChild(node);
}

function getCurrent(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

//get all the links on the page containing # in the href (^= means starting with)
const links = document.querySelectorAll('a[href^="#"]');

links.forEach((link) => {
  // getting the target element by choosing the element based on the ID in href value
  let scrollTarget = document.querySelector(`${link.getAttribute("href")}`);
  console.log(scrollTarget);
  // for clicking on any of the links
  link.addEventListener("click", (e) => {
    // we need to prevent default behaviour which would be just jumping to the element without scrolling
    e.preventDefault();
    // call scrollIntoView to start the function
    scrollTarget.scrollIntoView({ behavior: "smooth" });
  });
});

// document.addEventListener('scroll',() => {
//     [...sections].forEach(section => {
//         if(getCurrent(section)) {
//             console.log(section);
//         }

//     })
// }, {passive: true})

const observer = new IntersectionObserver(
  (entries) => {
    for (let entry of entries) {
      entry.target.classList.remove("active");
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    }
  },
  { threshold: [0.3] }
);

[...sections].forEach((section) => observer.observe(section));

// To top button
const button = document.querySelector(".toTop");

document.addEventListener("scroll", (e) => {
  document.body.scrollTop > 900 || document.documentElement.scrollTop > 900
    ? (button.style.display = "block")
    : (button.style.display = "none");
});

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
  console.log(width);
});

document.getElementsByClassName("logo")[0].addEventListener("click", () => {
  if (width <= 768) {
    document
      .querySelectorAll("nav ul li:not(.logo)")
      .forEach((item) => item.classList.toggle("active-menu"));
  }
});
