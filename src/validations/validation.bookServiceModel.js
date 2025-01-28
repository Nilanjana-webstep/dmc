import Joi from 'joi';

export const ServiceBookingValidationModel = Joi.object({

  service_type : Joi.string()
    .required(),

  address : Joi.string()
    .required(),

  nirmal_bandhu_full_name : Joi.string()
    .required(),
  
  nirmal_bandhu_mobile_number: Joi.number() 
    .positive()
    .message("invalid phone number") 
    .required(),

  service_description:Joi.string()
    .required(),

  service_date_time : Joi.date()
    .required(),

  ward_no : Joi.number()
    .required(),
  

});