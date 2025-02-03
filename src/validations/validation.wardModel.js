import Joi from "joi";

export const WardCreationValidationModel = Joi.object({

  borough_id : Joi.number()
    .required(),

  ward : Joi.string()
    .required(), 

});


export const WardUpdationValidationModel = Joi.object({

  borough_id : Joi.number()
    .optional(),

  ward : Joi.string()
    .optional(),

  is_active : Joi.boolean()
    .optional()
  
});
