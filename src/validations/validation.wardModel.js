import Joi from "joi";

export const WardCreationValidationModel = Joi.object({
  ward_no: Joi.number()
    .required(), 

});


export const WardUpdationValidationModel = Joi.object({

  ward_no: Joi.number()
    .optional(),

  is_active : Joi.boolean()
    .optional()
  
});
