function scrollToSection(direction) {
  const sections = document.querySelectorAll(".section");
  let currentSection = document.querySelector(".section:hover") || sections[0];
  const index = Array.from(sections).indexOf(currentSection);

  if (direction === "down" && index < sections.length - 1) {
    sections[index + 1].scrollIntoView({ behavior: "smooth" });
  } else if (direction === "up" && index > 0) {
    sections[index - 1].scrollIntoView({ behavior: "smooth" });
  }
}

// Event listeners for keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") {
    scrollToSection("down");
  } else if (e.key === "ArrowUp") {
    scrollToSection("up");
  }
});

// Mousewheel scroll handling
window.addEventListener("wheel", (e) => {
  if (e.deltaY > 0) {
    scrollToSection("down");
  } else if (e.deltaY < 0) {
    scrollToSection("up");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const text = [
    "Hi, I’m Amin! 👋",
    "I’m a full-stack web and mobile app developer.",
    "Let’s build something amazing together! 🚀",
  ];

  const welcomeText = document.getElementById("welcomeText");
  const scrollButton = document.getElementById("scrollButton");

  let i = 0;
  let line = 0;

  function typeWriter(callback) {
    if (line < text.length) {
      if (i < text[line].length) {
        welcomeText.innerHTML += text[line].charAt(i);
        i++;
        setTimeout(() => typeWriter(callback), 30);
      } else {
        welcomeText.innerHTML += "<br />"; // Insert line break after each line
        i = 0;
        line++;
        setTimeout(() => typeWriter(callback), 300);
      }
    } else if (callback) {
      callback();
    }
  }

  // Render the button after typing animation is complete
  function showButton() {
    scrollButton.style.display = "inline-flex"; // Make button visible
    scrollButton.classList.add("fade-in"); // Add animation class
  }

  scrollButton.addEventListener("click", () => {
    const section2 = document.getElementById("section2");
    section2.scrollIntoView({ behavior: "smooth" });
  });

  typeWriter(showButton);
});
