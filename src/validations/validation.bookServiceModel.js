import Joi from 'joi';

export const ServiceBookingValidationModel = Joi.object({

  service_type_id : Joi.number()
    .required(),

  address : Joi.string()
    .required(),

  nirmal_bandhu_full_name : Joi.string()
    .required(),
  
  nirmal_bandhu_mobile_number: Joi.string() 
    .pattern(/^[0-9]{10}$/)
    .message("invalid phone number") 
    .required(),

  service_description:Joi.string()
    .required(),

  service_date_time : Joi.date()
    .required(),

  borough_id : Joi.number()
    .required(),

  ward_id : Joi.number()
    .required(),
  

});