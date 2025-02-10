import Joi from "joi";

export const ServiceDetailCreationModel = Joi.object({
  service_detail : Joi.string()
    .required(),

  service_charge : Joi.number()
    .required(),

  service_type_id : Joi.number()
    .required(),
  
});


export const ServiceDetailUpdationValidationModel = Joi.object({
  service_detail : Joi.string()
    .required(),

  service_charge : Joi.number()
    .required(),

  service_type_id : Joi.number()
    .required(),
  
  is_active: Joi.boolean()
    .required()
});






