const form = document.getElementById("login-form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const alertBox = document.getElementById("form-alert");
const toggle = document.getElementById("toggle-password");
const submit = document.getElementById("submit");
const themeToggle = document.getElementById("theme-toggle");

function syncThemeToggle() {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  themeToggle.textContent = isDark ? "Light" : "Dark";
  themeToggle.setAttribute("aria-pressed", String(isDark));
}

syncThemeToggle();

themeToggle.addEventListener("click", () => {
  const next =
    document.documentElement.getAttribute("data-theme") === "dark"
      ? "light"
      : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  syncThemeToggle();
});

function setError(input, output, message) {
  const field = input.closest(".field");
  if (message) {
    field.classList.add("invalid");
    output.hidden = false;
    output.textContent = message;
  } else {
    field.classList.remove("invalid");
    output.hidden = true;
    output.textContent = "";
  }
}

function showAlert(kind, message) {
  alertBox.hidden = false;
  alertBox.className = `alert ${kind}`;
  alertBox.textContent = message;
}

function validate() {
  let ok = true;

  if (!email.value.trim()) {
    setError(email, emailError, "Enter your email.");
    ok = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    setError(email, emailError, "Enter a valid email address.");
    ok = false;
  } else {
    setError(email, emailError, "");
  }

  if (!password.value) {
    setError(password, passwordError, "Enter your password.");
    ok = false;
  } else if (password.value.length < 8) {
    setError(password, passwordError, "Password must be at least 8 characters.");
    ok = false;
  } else {
    setError(password, passwordError, "");
  }

  return ok;
}

toggle.addEventListener("click", () => {
  const shown = password.type === "text";
  password.type = shown ? "password" : "text";
  toggle.textContent = shown ? "Show" : "Hide";
  toggle.setAttribute("aria-pressed", String(!shown));
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  alertBox.hidden = true;

  if (!validate()) {
    showAlert("error", "Check the highlighted fields and try again.");
    return;
  }

  submit.disabled = true;
  submit.textContent = "Signing in…";

  window.setTimeout(() => {
    submit.disabled = false;
    submit.textContent = "Sign in";
    showAlert(
      "success",
      "Credentials look valid. Connect this form to your auth API next."
    );
  }, 700);
});
