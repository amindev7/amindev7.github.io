document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".section");
  let currentSection = sections[0];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          currentSection = entry.target;
        }
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach((section) => observer.observe(section));

  function scrollToSection(direction) {
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
  window.addEventListener(
    "wheel",
    (e) => {
      if (e.deltaY > 0) {
        scrollToSection("down");
      } else if (e.deltaY < 0) {
        scrollToSection("up");
      }
    },
    { passive: true }
  );
});

const welcomeText = document.getElementById("welcomeText");
const scrollButton = document.getElementById("scrollButton");
const expertisess = document.querySelectorAll(".expertises");

// Typing Animation
document.addEventListener("DOMContentLoaded", () => {
  const text = [
    "Hey there! 👋 I’m Amin.",
    "Software engineer. <i class='fa-solid fa-code'></i>",
  ];

  let i = 0;
  let line = 0;

  function typeWriter(callback) {
    if (line < text.length) {
      if (i < text[line].length) {
        if (text[line][i] === "<") {
          const htmlTag = text[line].substring(i);
          welcomeText.innerHTML += htmlTag;
          i = text[line].length;
        } else {
          welcomeText.innerHTML += text[line].charAt(i);
          i++;
          requestAnimationFrame(() => typeWriter(callback));
        }
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
    expertisess.forEach((expertises) => {
      expertises.classList.add("fade-in");
    });
  }

  typeWriter(showButton);

  scrollButton.addEventListener("click", () => {
    const section2 = document.getElementById("section2");
    section2.scrollIntoView({ behavior: "smooth" });
  });

  typeWriter(showButton);
});

// EmailJS Form Submission
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

      const name = formData.get("user_name").trim();
      const email = formData.get("user_email").trim();
      const message = formData.get("message").trim();

      if (!name || !email || !message) {
        renderStatusMessage("Please fill out all fields.", "error");
        return;
      }

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        renderStatusMessage("Please enter a valid email address.", "error");
        return;
      }

      emailjs.sendForm("service_anq7jbm", "template_t0p83if", form).then(
        () => {
          renderStatusMessage(
            `Thank you, ${name}! I have received your message and I get back to you shortly.`,
            "success"
          );
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

// Feedback Message Renderer
function renderStatusMessage(message, status) {
  const statusElement = document.getElementById("form-status");
  statusElement.textContent = message;
  statusElement.className = `form-status ${status}`;
  statusElement.style.display = "block";

  setTimeout(() => {
    statusElement.style.display = "none";
  }, 5000);
}

// Custom cursor
const cursor = document.createElement("div");
cursor.classList.add("custom-cursor");
document.body.appendChild(cursor);

document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.pageX}px`;
  cursor.style.top = `${e.pageY}px`;
});

document.querySelectorAll(".circle").forEach((circle) => {
  circle.addEventListener("mouseover", () => {
    cursor.classList.add("hovered");
  });
  circle.addEventListener("mouseout", () => {
    cursor.classList.remove("hovered");
  });
});

const footer = document.getElementById("footer");
const targetContainer = document.getElementById("target-container");

// Create a MutationObserver to watch for changes
const observer = new MutationObserver((mutationsList) => {
  mutationsList.forEach((mutation) => {
    if (mutation.type === "childList") {
      const divRendered = Array.from(mutation.addedNodes).some(
        (node) => node.nodeType === 1 && node.tagName === "form"
      );

      if (divRendered) {
        footer.classList.add("hidden"); // Hide footer
      } else if (mutation.removedNodes.length > 0) {
        footer.classList.remove("hidden"); // Show footer if div is removed
      }
    }
  });
});
