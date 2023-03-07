import validator from "validator";
export default class Login {
  constructor(formClass) {
    this.form = document.querySelector(formClass);
  }

  init() {
    this.events();
  }

  events() {
    if (!this.form) return;
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.validate(e);
    });
  }

  validate(e) {
    const el = e.target;
    const emailInput = el.querySelector('input[name="email"]');
    const passwordInput = el.querySelector('input[name="password"]');
    let error = false;

    if (!validator.isEmail(emailInput.value)) {
      emailInput.style.border = "1px solid red";
      error = true;
    }
    if (passwordInput.value.length < 6 || passwordInput.value.length > 50) {
      let msg_error = "Senha precisa ter entre 6 e 50 caracteres.";
      passwordInput.style.border = "1px solid red";
      error = true;
    }

    if (!error) el.submit();
  }
}
