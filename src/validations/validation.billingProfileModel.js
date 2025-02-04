import Joi from 'joi';

export const BillingProfileCreationValidationModel = Joi.object({

billing_start_date : Joi.date()
    .required(),

billing_due_date : Joi.date()
    .required(),

property_type_id : Joi.number()
    .required(),

property_sub_type_id : Joi.number()
    .required()
  

});



export const BillingProfileUpdationValidationModel = Joi.object({

billing_start_date : Joi.date()
    .optional(),

billing_due_date : Joi.date()
    .optional(),

property_type_id : Joi.number()
    .optional(),

property_sub_type_id : Joi.number()
    .optional()
  

});