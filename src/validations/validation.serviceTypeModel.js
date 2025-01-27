import Joi from "joi";

export const ServiceTypeCreationValidationModel = Joi.object({

  service_type: Joi.string()
    .required(),
  
});

export const ServiceTypeUpdationValidationModel = Joi.object({

  service_type: Joi.string()
    .optional(),
    
  is_active : Joi.boolean()
    .optional()
  
});
