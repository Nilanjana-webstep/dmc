import Joi from 'joi';

export const BillingProfileCreationValidationModel = Joi.object({

billing_start_date : Joi.number()
    .required(),

billing_due_date : Joi.number()
    .greater(Joi.ref('billing_start_date'))
    .message("due date should be greater than start date")
    .required(),

property_type_id : Joi.number()
    .required(),

property_sub_type_id : Joi.number()
    .required()
  

});



export const BillingProfileUpdationValidationModel = Joi.object({

billing_start_date : Joi.number()
    .required(),

billing_due_date : Joi.number()
    .required(),

property_type_id : Joi.number()
    .required(),

property_sub_type_id : Joi.number()
    .required()
  

});