import Joi from "joi";



export const GrievanceCreationValidationModel = Joi.object({

    message : Joi.string()
        .required(),

    type : Joi.string()
        .required(),

    sub_type : Joi.string()
        .required()
})


export const GrievanceUpdationValidationModel = Joi.object({

    message : Joi.string()
        .optional(),

    type : Joi.string()
        .optional(),

    sub_type : Joi.string()
        .optional()
})

export const GrievanceTypeCreationValidationModel = Joi.object({

  grievance_type_name: Joi.string()
    .required(),
  
});

export const GrievanceTypeUpdationValidationModel = Joi.object({

  grievance_type_name: Joi.string()
    .optional(),

  is_active : Joi.boolean()
    .optional()
  
});


export const GrievanceSubTypeCreationValidationModel = Joi.object({
    grievance_sub_type_name: Joi.string()
        .required(),

    grievance_type_name: Joi.string()
        .required(),
  
});


export const GrievanceSubTypeUpdationValidationModel = Joi.object({
  
  grievance_sub_type_name: Joi.string()
    .optional(),

  grievance_type_name: Joi.number()
    .optional(),
  
  is_active: Joi.boolean()
    .optional()

});