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
        welcomeText.innerHTML += "<br />";
        i = 0;
        line++;
        setTimeout(() => typeWriter(callback), 300);
      }
    } else if (callback) {
      callback();
    }
  }

  function showButton() {
    scrollButton.style.display = "inline-flex";
    scrollButton.classList.add("fade-in");
  }

  scrollButton.addEventListener("click", () => {
    const section2 = document.getElementById("section2");
    section2.scrollIntoView({ behavior: "smooth" });
  });

  typeWriter(showButton);
});

(function () {
  emailjs.init("g1pUfGR5AgOTCye8z");
})();

window.onload = function () {
  document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const form = this;
      const formData = new FormData(form);

      const name = formData.get("user_name");
      const email = formData.get("user_email");
      const message = formData.get("message");

      if (!name || !email || !message) {
        renderStatusMessage("Please fill out all fields.", "error");
        return;
      }

      emailjs.sendForm("service_anq7jbm", "template_t0p83if", form).then(
        () => {
          renderStatusMessage(`Thank you, ${name}!`, "success");
          form.reset();
        },
        (error) => {
          console.error("Failed to send the message:", error);
          renderStatusMessage(
            "Oops! Something went wrong. Please try again later.",
            "error"
          );
        }
      );
    });
};

function renderStatusMessage(message, status) {
  const statusElement = document.getElementById("form-status");
  statusElement.textContent = message;
  statusElement.className = `form-status ${status}`;
  statusElement.style.display = "block";

  setTimeout(() => {
    statusElement.style.display = "none";
  }, 5000);
}
