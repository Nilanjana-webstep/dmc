import Joi from "joi";

export const PropertyTypeCreationValidationModel = Joi.object({

  type_name: Joi.string()
    .required(),
  
});

export const PropertyTypeUpdationValidationModel = Joi.object({

  type_name: Joi.string()
    .required(),
  
});
