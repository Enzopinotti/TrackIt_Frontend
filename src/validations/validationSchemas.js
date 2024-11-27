// src/validations/validationSchemas.js

import * as yup from 'yup';

// Condiciones de contraseña
const passwordConditions = {
  minLength: 6,
  hasUpperCase: /[A-Z]/,
  hasNumber: /\d/,
  hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/,
};



export const loginSchema = yup.object().shape({
  email: yup.string().email('Correo electrónico inválido').required('El correo es requerido'),
  password: yup.string().required('La contraseña es requerida'),
});

export const requirementSchema = yup.object().shape({
  subject: yup.string().required('El asunto es obligatorio'),
  requirementTypeId: yup.number().typeError('Seleccione un tipo').required('El tipo es obligatorio'),
  categoryId: yup.number().typeError('Seleccione una categoría').required('La categoría es obligatoria'),
  description: yup.string().nullable(),
  priorityId: yup.number().nullable(),
  assignedUser: yup.string().when('userRole', {
    is: 'Interno',
    then: yup.string().required('Debe asignar el requerimiento a un usuario'),
    otherwise: yup.string().notRequired(),
  }),
});

// Esquema para Registro Externo
export const registerExternalSchema = yup.object().shape({
  firstName: yup.string().required('El nombre es requerido'),
  lastName: yup.string().required('El apellido es requerido'),
  email: yup.string().email('Correo electrónico inválido').required('El correo electrónico es requerido'),
  password: yup.string()
    .required('La contraseña es requerida')
    .min(passwordConditions.minLength, 'La contraseña debe tener más de 6 caracteres')
    .matches(passwordConditions.hasUpperCase, 'La contraseña debe contener al menos una letra mayúscula')
    .matches(passwordConditions.hasNumber, 'La contraseña debe contener al menos un número')
    .matches(passwordConditions.hasSpecialChar, 'La contraseña debe contener al menos un carácter especial'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir')
    .required('Confirma tu contraseña'),
  cuil: yup.string().required('El CUIL es requerido'),
  empresa: yup.string().required('La empresa es requerida'),
  descripcion: yup.string().required('La descripción es requerida'),
});
// Esquema para Registro Interno
export const registerInternalSchema = yup.object().shape({
  firstName: yup.string().required('El nombre es requerido'),
  lastName: yup.string().required('El apellido es requerido'),
  email: yup.string().email('Correo electrónico inválido').required('El correo electrónico es requerido'),
  password: yup.string()
    .required('La contraseña es requerida')
    .min(passwordConditions.minLength, 'La contraseña debe tener más de 6 caracteres')
    .matches(passwordConditions.hasUpperCase, 'La contraseña debe contener al menos una letra mayúscula')
    .matches(passwordConditions.hasNumber, 'La contraseña debe contener al menos un número')
    .matches(passwordConditions.hasSpecialChar, 'La contraseña debe contener al menos un carácter especial'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir')
    .required('Confirma tu contraseña'),
  cargo: yup.string().required('El cargo es requerido'),
  departamento: yup.string().required('El departamento es requerido'),
});
export const resetPasswordSchema = yup.object().shape({
  password: yup.string()
    .required('La contraseña es requerida')
    .min(passwordConditions.minLength, 'La contraseña debe tener más de 6 caracteres')
    .matches(passwordConditions.hasUpperCase, 'La contraseña debe contener al menos una letra mayúscula')
    .matches(passwordConditions.hasNumber, 'La contraseña debe contener al menos un número')
    .matches(passwordConditions.hasSpecialChar, 'La contraseña debe contener al menos un carácter especial'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir')
    .required('Confirma tu contraseña'),
});
