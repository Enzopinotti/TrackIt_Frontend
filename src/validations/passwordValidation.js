// src/validations/passwordValidation.js

export const validatePasswordConditions = (password) => {
    const conditions = {
      minLength: password.length > 6,
      hasUpperCase: /[A-Z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    return conditions;
};
  