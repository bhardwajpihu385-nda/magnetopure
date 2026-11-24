// --- MagneToPure Interactive Animations & Form Handling ---

document.addEventListener('DOMContentLoaded', () => {
    console.log("MagneToPure website loaded successfully!");

    // Smooth scroll enhancement for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Confirmation alert on review/inquiry form submission (Sent directly to your email via Formspree)
    const inquiryForm = document.querySelector('.inquiry-form');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            alert('Thank you for your review/inquiry! Your message is being sent directly to the MagneToPure team email.');
        });
    }

    // Scroll Animation Observer for Cards & Sections
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedBoxes = document.querySelectorAll('.animate-box');
    animatedBoxes.forEach(box => {
        box.style.opacity = '0';
        box.style.transform = 'translateY(20px)';
        box.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(box);
    });
});
/* ===== MagneToPure Videos & Diagram Interactions ===== */
document.addEventListener("DOMContentLoaded", function () {
  const animatedSections = document.querySelectorAll(
    ".mtp-media-section, .mtp-diagram-section"
  );

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("mtp-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    animatedSections.forEach((sec) => sectionObserver.observe(sec));
  } else {
    animatedSections.forEach((sec) => sec.classList.add("mtp-visible"));
  }

  const players = Array.from(document.querySelectorAll(".mtp-video-player"));
  players.forEach((player) => {
    const wrapper = player.closest(".mtp-video-box");

    player.addEventListener("play", () => {
      players.forEach((otherPlayer) => {
        if (otherPlayer !== player && !otherPlayer.paused) {
          otherPlayer.pause();
        }
      });
      if (wrapper) wrapper.classList.add("mtp-playing");
    });

    const removePlayingState = () => {
      if (wrapper) wrapper.classList.remove("mtp-playing");
    };

    player.addEventListener("pause", removePlayingState);
    player.addEventListener("ended", removePlayingState);
  });
});