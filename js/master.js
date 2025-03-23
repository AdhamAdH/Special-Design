// ===== Global Variables =====
// DOM Elements
let landing = document.getElementById("landing");
let gear = document.getElementById("gear");
let setting = document.getElementById("setting");
let gearIcon = document.getElementById("gearIcon");
let bullet = document.querySelector(".bullets");
let skills = document.querySelector(".ourSkills");
let toggleMenuButton = document.querySelector(".toggleMenu");
let navLinks = document.querySelector("nav ul");

// Background Image Configuration
let imgArr = ["https://raw.githubusercontent.com/AdhamAdH/Special-Design/refs/heads/main/images/1.jpg",
              "https://raw.githubusercontent.com/AdhamAdH/Special-Design/refs/heads/main/images/2.jpg",
              "https://raw.githubusercontent.com/AdhamAdH/Special-Design/refs/heads/main/images/3.jpg",
              "https://raw.githubusercontent.com/AdhamAdH/Special-Design/refs/heads/main/images/4.jpg",
              "https://raw.githubusercontent.com/AdhamAdH/Special-Design/refs/heads/main/images/5.jpg"];
let bgOption = true;
let backgroundInterval;

// ===== Helper Functions =====
/**
 * Function to start the background image randomization
 * Sets an interval to change the background image every 3 seconds
 * Only runs if bgOption is true
 */
function randomizeImg() {
  if (bgOption === true) {
    backgroundInterval = setInterval(() => {
      // Generate a random index to select an image from the array
      let rand = Math.floor(Math.random() * imgArr.length);
      // Update the background image of the landing element
      landing.style.backgroundImage = `url("${imgArr[rand]}")`;
    }, 3000);
  }
}

/**
 * Handles active state for UI elements
 * Removes active class from siblings and adds it to the clicked element
 */
function handleActive(event) {
  event.target.parentElement.querySelectorAll(".active").forEach((child) => {
    child.classList.remove("active");
  });
  event.target.classList.add("active");
}

// ===== Local Storage Initialization =====
// Initialize background image settings from localStorage
let randImgOption = localStorage.getItem("randImgOption");
if (randImgOption !== null) {
  // Update UI to reflect the stored preference
  document.querySelectorAll(".choise div").forEach((c) => {
    c.classList.remove("active");
    if (c.dataset.random == randImgOption) {
      c.classList.add("active");
    }
  });
  // Set the background option based on stored preference
  bgOption = randImgOption == "yes";
}

// Initialize theme color from localStorage
let mainColor = localStorage.getItem("colorOption");
if (mainColor !== null) {
  // Apply the stored color preference
  document.documentElement.style.setProperty("--mainColor", mainColor);
  // Update UI to reflect the stored color preference
  document.querySelectorAll(".colors li").forEach((c) => {
    c.classList.remove("active");
    if (c.dataset.color == mainColor) {
      c.classList.add("active");
    }
  });
}

// Initialize bullets visibility from localStorage
let bulletsChoiseOption = localStorage.getItem("bulletsChoiseOption");
if (bulletsChoiseOption !== null) {
  document.querySelectorAll(".bulletChoise div").forEach((div) => {
    div.classList.remove("active");
    if (div.dataset.bullet == bulletsChoiseOption) {
      div.classList.add("active");
    }
  });

  bullet.style.display = bulletsChoiseOption == "yes" ? "block" : "none";
}
// clear local storage when click on reset button
document.getElementById("reset").onclick = () => {
  // clear local storage
  localStorage.clear();
  // reload page
  location.reload();
};

// Start background randomization
randomizeImg();

// ===== Event Listeners =====
// Settings Panel Toggle
gear.onclick = function () {
  setting.classList.toggle("active");
  gearIcon.classList.toggle("active");
};
// Toggle Menu
toggleMenuButton.onclick = function (e) {
  //stop propagation
  e.stopPropagation();
  navLinks.classList.toggle("active");
};
// close menu when clicking anywhere outside the menu
document.onclick = function (e) {
  if (e.target !== navLinks && e.target !== toggleMenuButton) {
    // check if menu is open
    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
    }
  }
};
//stop propagation on menu
navLinks.onclick = function (e) {
  e.stopPropagation();
};

// Color Options
const colorLi = document.querySelectorAll(".colors li");
colorLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    // Update the CSS variable for main color
    document.documentElement.style.setProperty(
      "--mainColor",
      e.target.dataset.color
    );
    // Save the color preference to localStorage
    localStorage.setItem("colorOption", e.target.dataset.color);
    // Update active state in UI
    handleActive(e);
  });
});

// Random Background Options
const randomImg = document.querySelectorAll(".choise div");
randomImg.forEach((div) => {
  div.addEventListener("click", (e) => {
    // Save the random image preference to localStorage
    localStorage.setItem("randImgOption", e.target.dataset.random);
    // Update active state in UI
    handleActive(e);
    // Enable or disable background randomization based on selection
    if (e.target.dataset.random == "yes") {
      bgOption = true;
      randomizeImg();
    } else {
      bgOption = false;
      // Stop the background image rotation if disabled
      clearInterval(backgroundInterval);
    }
  });
});

// Bullet Navigation Options
const bulletChoise = document.querySelectorAll(".bulletChoise div");
bulletChoise.forEach((div) => {
  div.addEventListener("click", (e) => {
    // Save the bullet choise preference to localStorage
    localStorage.setItem("bulletsChoiseOption", e.target.dataset.bullet);
    // Update active state in UI
    handleActive(e);
    // Enable or disable bullet nav based on selection
    bullet.style.display = e.target.dataset.bullet == "yes" ? "block" : "none";
  });
});

// Skills Animation on Scroll
window.onscroll = function () {
  //skills ofset top
  let skillsOffsetTop = skills.offsetTop;
  //skills Outer Height
  let skillsOuterHeight = skills.offsetHeight;
  //window scroll top
  let windowScrollTop = window.scrollY;
  //check if the skills section is in the viewport
  if (
    windowScrollTop > skillsOffsetTop &&
    windowScrollTop < skillsOffsetTop + skillsOuterHeight
  ) {
    //get all skills progress bars
    let skillsProgress = document.querySelectorAll(
      ".ourSkills .skill .progress span"
    );
    //loop on skills progress bars
    skillsProgress.forEach((progress) => {
      //get progress bar width
      let progressWidth = progress.dataset.progress;
      //set progress bar width
      progress.style.width = progressWidth;
    });
  }
};

// Gallery Popup
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    //create overlay element
    let overlay = document.createElement("div");
    //add class to overlay
    overlay.classList.add("popupOverlay");
    //append overlay to body
    document.body.appendChild(overlay);
    //creat popup
    let popup = document.createElement("div");
    //add class to popup
    popup.classList.add("popup");
    //creat image
    let popupImg = document.createElement("img");
    //set image src
    popupImg.src = e.target.src;
    //append image to popup
    popup.appendChild(popupImg);
    //append popup to budy
    document.body.appendChild(popup);
    //check if img.alt is not null
    if (e.target.alt !== null) {
      //create popup title
      let imgtitle = document.createElement("h3");
      //add class to popup title
      imgtitle.classList.add("popupTitle");
      //set popup title text
      imgtitle.textContent = e.target.alt;
      //append popup title to popup
      popup.appendChild(imgtitle);
    }
    //creat close button
    let closeBtn = document.createElement("span");
    //add class to close button
    closeBtn.classList.add("close");
    //set close button text
    closeBtn.textContent = "X";
    //append close button to popup
    popup.appendChild(closeBtn);
    //add event listener to close button
    closeBtn.addEventListener("click", () => {
      //remove overlay
      overlay.remove();
      //remove popup
      popup.remove();
    });
  });
});

// Smooth Scrolling for Bullets
let bullets = document.querySelectorAll(".bullets .bullet");
bullets.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    //scroll to the section that has the same calss as the bullet's data-scroll attribute
    document.querySelector(e.target.dataset.scroll).scrollIntoView({
      behavior: "smooth",
    });
  });
});
