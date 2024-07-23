import Joi from 'joi';

const signUpSchema = () => Joi.object({
  name: Joi.string()
    .max(50)
    .required()
    .messages({
      'string.base': 'Name should be a type of string',
      'string.empty': 'Name cannot be an empty field',
      'string.max': 'Name should have a maximum length of {#limit}',
      'any.required': 'Name is a required field'
    }),
  email: Joi.string()
    .email()
    .max(50)
    .required()
    .messages({
      'string.base': 'Email should be a type of string',
      'string.empty': 'Email cannot be an empty field',
      'string.email': 'Email must be a valid email',
      'string.max': 'Email should have a maximum length of {#limit}',
      'any.required': 'Email is a required field'
    }),
  password: Joi.string()
    .min(8)
    .max(255)
    .required()
    .messages({
      'string.base': 'Password should be a type of string',
      'string.empty': 'Password cannot be an empty field',
      'string.min': 'Password should have a minimum length of {#limit}',
      'string.max': 'Password should have a maximum length of {#limit}',
      'any.required': 'Password is a required field'
    }),
  passwordConfirm: Joi.any()
    .equal(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Passwords do not match',
      'any.required': 'Password confirmation is required'
    })
});

const loginSchema = () => Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.base': 'Email should be a type of string',
      'string.empty': 'Email cannot be an empty field',
      'string.email': 'Email must be a valid email',
      'any.required': 'Email is a required field'
    }),
  password: Joi.string()
    .required()
    .min(8)
    .max(255)
    .messages({
      'string.base': 'Password should be a type of string',
      'string.empty': 'Password cannot be an empty field',
      'any.required': 'Password is a required field'
    })
});

const updateUserSchema = () => Joi.object({
  name: Joi.string()
    .max(50)
    .optional()
    .messages({
      'string.base': 'Name should be a type of string',
      'string.empty': 'Name cannot be an empty field',
      'string.max': 'Name should have a maximum length of {#limit}'
    }),
  password: Joi.string()
    .min(8)
    .max(255)
    .optional()
    .messages({
      'string.base': 'Password should be a type of string',
      'string.empty': 'Password cannot be an empty field',
      'string.min': 'Password should have a minimum length of {#limit}',
      'string.max': 'Password should have a maximum length of {#limit}'
    }),
    adminPass : Joi.string().required()
});

export  { signUpSchema, loginSchema, updateUserSchema };
