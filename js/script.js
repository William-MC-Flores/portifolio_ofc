document.addEventListener("DOMContentLoaded", () => {
  const menuHamburguer = document.getElementById("menu-hamburguer");
  const nav = document.getElementById("nav");
  const navLinks = document.querySelectorAll("#nav a");
  const sections = document.querySelectorAll("main section");
  const form = document.getElementById("formContato");
  const button = form?.querySelector("button");
  const typing = document.querySelector(".typing");
  const title = document.querySelector(".glitch");
  const bootScreen = document.getElementById("boot-screen");
  const bootProgressBar = document.getElementById("boot-progress-bar");

  if (menuHamburguer && nav) {
    menuHamburguer.addEventListener("click", () => {
      nav.classList.toggle("aberto");
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("aberto");
    });
  });

  const revealSections = () => {
    sections.forEach((section) => {
      const top = section.getBoundingClientRect().top;
      section.classList.toggle("show", top < window.innerHeight - 120);
    });
  };

  const highlightCurrentSection = () => {
    let currentId = "";

    sections.forEach((section) => {
      const top = window.scrollY;
      const offset = section.offsetTop - 180;
      const height = section.offsetHeight;

      if (top >= offset && top < offset + height) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const isActive = currentId && link.getAttribute("href") === `#${currentId}`;
      link.classList.toggle("active", isActive);
    });
  };

  let scrollTimeout;
  window.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      revealSections();
      highlightCurrentSection();
    }, 30);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      nav.classList.remove("aberto");
    }

    revealSections();
    highlightCurrentSection();
  });

  revealSections();
  highlightCurrentSection();

  if (title) {
    title.classList.add("glitch-live");
  }

  if (bootScreen && bootProgressBar) {
    let progress = 0;

    const bootInterval = setInterval(() => {
      progress += 10;
      bootProgressBar.style.width = `${Math.min(progress, 100)}%`;

      if (progress >= 100) {
        clearInterval(bootInterval);
        setTimeout(() => {
          bootScreen.classList.add("hidden");
        }, 250);
      }
    }, 90);
  }

  if (form && button) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const dados = new FormData(form);
      button.disabled = true;
      button.textContent = "Enviando...";

      try {
        const resposta = await fetch("contato.php", {
          method: "POST",
          body: dados
        });

        if (!resposta.ok) {
          throw new Error("Erro no envio");
        }

        showToast("Mensagem enviada com sucesso!", "success");
        form.reset();
      } catch {
        showToast("Erro ao enviar mensagem.", "error");
      }

      button.disabled = false;
      button.textContent = "Enviar mensagem";
    });
  }

  function showToast(message, type) {
    const previousToast = document.querySelector(".toast");
    if (previousToast) {
      previousToast.remove();
    }

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add("show");
    });

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 180);
    }, 2600);
  }

  if (typing) {
    const texto = typing.dataset.text?.trim() || "";
    let index = 0;

    typing.textContent = "";
    typing.classList.add("is-typing");

    const escrever = () => {
      if (index < texto.length) {
        typing.textContent += texto.charAt(index);
        index += 1;
        setTimeout(escrever, 28);
      } else {
        typing.classList.remove("is-typing");
      }
    };

    escrever();
  }
});
