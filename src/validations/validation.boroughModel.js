import Joi from "joi";

export const BoroughCreationValidationModel = Joi.object({
  borough : Joi.string()
    .required(), 

});


export const BoroughUpdationValidationModel = Joi.object({

  borough : Joi.string()
    .required(),

  is_active : Joi.boolean()
    .required()
  
});
