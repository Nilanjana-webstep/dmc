import Joi from "joi";

export const ServiceTypeCreationValidationModel = Joi.object({

  service_type: Joi.string()
    .required(),
  charge : Joi.number()
    .required()
  
});

export const ServiceTypeUpdationValidationModel = Joi.object({

  service_type: Joi.string()
    .optional(),
  
  charge : Joi.number()
    .optional(),
    
  is_active : Joi.boolean()
    .optional()
  
});
