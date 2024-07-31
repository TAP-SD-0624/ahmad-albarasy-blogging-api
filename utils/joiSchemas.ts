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

const createUserSchema = () => Joi.object({
	adminPass: Joi.string()
	.required()
	.messages({
		'string.base': 'adminPass should be a type of string',
		'string.empty': 'adminPass cannot be an empty field',
		'any.required': 'adminPass is a required field'
	}),
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
    adminPass: Joi.string()
	.required()
	.messages({
		'string.base': 'adminPass should be a type of string',
		'string.empty': 'adminPass cannot be an empty field',
		'any.required': 'adminPass is a required field'
	}),
});

const deleteUserSchema = () => Joi.object({
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
    adminPass: Joi.string()
	.required()
	.messages({
		'string.base': 'adminPass should be a type of string',
		'string.empty': 'adminPass cannot be an empty field',
		'any.required': 'adminPass is a required field'
	}),
});

const createPostSchema = () => Joi.object({
    postId: Joi.string()
      .max(30)
      .required()
      .messages({
        'string.base': 'Post ID should be a type of string',
        'string.max': 'Post ID should have a maximum length of 30',
        'any.required': 'Post ID is required'
    }),
    content: Joi.string()
      .max(500)
      .required()
      .messages({
        'string.base': 'Content should be a type of string',
        'string.max': 'Content should have a maximum length of 500',
        'any.required': 'Content is required'
    })
});

const updatePostSchema = () => Joi.object({
	content: Joi.string()
	.max(500)
	.required()
	.messages({
		'string.base': 'Content should be a type of text.',
		'string.empty': 'Content cannot be an empty field.',
		'string.max': 'Content should have a maximum length of 500 characters.',
		'any.required': 'Content is a required field.'
	})
});

const deletePostSchema = () => Joi.object({
	adminPass: Joi.string()
	.required()
	.messages({
		'string.base': 'adminPass should be a type of string',
		'string.empty': 'adminPass cannot be an empty field',
		'any.required': 'adminPass is a required field'
	}),
	postId: Joi.string()
      .max(30)
      .required()
      .messages({
        'string.base': 'Post ID should be a type of string',
        'string.max': 'Post ID should have a maximum length of 30',
        'any.required': 'Post ID is required'
    }),

});

const createCommentSchema = () => Joi.object({
  content: Joi.string()
      .max(255)
      .required()
      .messages({
          'string.base': 'Content should be a type of text.',
          'string.empty': 'Content cannot be an empty field.',
          'string.max': 'Content should have a maximum length of 255 characters.',
          'any.required': 'Content is a required field.'
      })
});

const deleteCommentSchema = () => Joi.object({
	commentId: Joi.number()
		.required()
		.integer()
		.messages({
			'number.base': 'commentId should be a type of number.',
            'number.integer': 'commentId should be an integer.',
            'any.required': 'commentId is a required field.'
		}),
		adminPass: Joi.string()
		.required()
		.messages({
			'string.base': 'adminPass should be a type of string',
			'string.empty': 'adminPass cannot be an empty field',
			'any.required': 'adminPass is a required field'
		}),
});

const createCategorySchema = () => Joi.object({
    id: Joi.number()
        .integer()
        .required()
        .messages({
            'number.base': 'ID should be a type of number.',
            'number.integer': 'ID should be an integer.',
            'any.required': 'ID is a required field.'
        }),
    name: Joi.string()
        .required()
        .messages({
            'string.base': 'Name should be a type of text.',
            'string.empty': 'Name cannot be an empty field.',
            'any.required': 'Name is a required field.'
        }),
    adminPass: Joi.string()
    .required()
    .messages({
      'string.base': 'adminPass should be a type of string',
      'string.empty': 'adminPass cannot be an empty field',
      'any.required': 'adminPass is a required field'
    }),
});

const deleteCategorySchema = () => Joi.object({
    id: Joi.number()
        .integer()
        .required()
        .messages({
            'number.base': 'ID should be a type of number.',
            'number.integer': 'ID should be an integer.',
            'any.required': 'ID is a required field.'
        }),
	adminPass: Joi.string()
	.required()
	.messages({
		'string.base': 'adminPass should be a type of string',
		'string.empty': 'adminPass cannot be an empty field',
		'any.required': 'adminPass is a required field'
	}),
});

const addCategoryToPostSchema = () => Joi.object({
	categoryId: Joi.number()
		.integer()
		.required()
		.messages({
			'number.base': 'category ID should be a type of number.',
            'number.integer': 'category ID should be an integer.',
            'any.required': 'category ID is a required field.'
		})
});

const removePostCategorySchema = () => Joi.object({
	id: Joi.number()
		.integer()
		.required()
		.messages({
			'number.base': 'category ID should be a type of number.',
            'number.integer': 'category ID should be an integer.',
            'any.required': 'category ID is a required field.'
		})
});

export  { 
    signUpSchema, 
	  loginSchema,
  	createUserSchema,
    deleteUserSchema,
    updateUserSchema, 
    createPostSchema,
    updatePostSchema,
    deletePostSchema,
    createCommentSchema,
    deleteCommentSchema, 
    createCategorySchema,
    deleteCategorySchema, 
    addCategoryToPostSchema,
    removePostCategorySchema 
    };
