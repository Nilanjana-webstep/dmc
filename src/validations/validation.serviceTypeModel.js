import Joi from "joi";

export const ServiceTypeCreationValidationModel = Joi.object({

  service_type: Joi.string()
    .required(),
  service_charge : Joi.number()
    .required()
  
});

export const ServiceTypeUpdationValidationModel = Joi.object({

  service_type: Joi.string()
    .required(),
  
  service_charge : Joi.number()
    .required(),
    
  is_active : Joi.boolean()
    .required()
  
});
