const Joi = require("joi");
const { errorHandler } = require("../../utils/responseHandler");



const Validators = {
  createUserVal: Joi.object({
     first_name: Joi.string()
      .max(100)
      .required()
      .messages({
        "string.base": "First name must be a string",
        "string.empty": "First name is required",
        "any.required": "First name is required",
      }),

    middle_name: Joi.string()
      .max(100)
      .allow(null, "")
      .optional(),

    last_name: Joi.string()
      .max(100)
      .required()
      .messages({
        "string.base": "Last name must be a string",
        "string.empty": "Last name is required",
        "any.required": "Last name is required",
      }),

    figma_id: Joi.string()
      .max(128)
      .allow(null, "")
      .optional(),

    email: Joi.string()
      .email()
      .max(255)
      .required()
      .messages({
        "string.email": "Invalid email format",
        "any.required": "Email is required",
      }),

    phone: Joi.string()
      .pattern(/^[0-9]{10,15}$/)
      .allow(null, "")
      .optional()
      .messages({
        "string.pattern.base": "Phone number must be 10–15 digits",
      }),

    code_generate_limit_left: Joi.number()
      .integer()
      .min(0)
      .optional(),

    is_active: Joi.boolean()
      .optional()
  })
};

function userValidator(func) {
  return async function Validator(req, res, next) {
    try {
      const validated = await Validators[func].validateAsync(req.body, {
        abortEarly: false,
      });
      req.body = validated;
      next();
    } catch (err) {
      let _er = {};
      if (err.isJoi) {
        err.details.forEach((d) => {
          let _key = d.context.key;
          _er[_key] = d.message;
        });
      }
      await next(
        errorHandler({
          res,
          statusCode: 400,
          message: _er,
        })
      );
    }
  };
}

module.exports = userValidator;
