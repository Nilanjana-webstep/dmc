import Joi from "joi";

export const PropertySubTypeCreationValidationModel = Joi.object({
  property_sub_type: Joi.string()
    .required(),

  charge : Joi.number()
    .required(),

  property_type_id : Joi.number()
    .required(),
  
});


export const PropertySubTypeUpdationValidationModel = Joi.object({
  property_sub_type: Joi.string()
    .required(),

  property_type_id : Joi.number()
    .required(),

  charge : Joi.number()
    .required(),
  
  is_active: Joi.boolean()
    .required()
});






