import Joi from "joi";

export const PropertyTypeCreationValidationModel = Joi.object({

  property_type: Joi.string()
    .required(),
  
});

export const PropertyTypeUpdationValidationModel = Joi.object({

  property_type: Joi.string()
    .required(),

  is_active : Joi.boolean()
    .required()
  
});
