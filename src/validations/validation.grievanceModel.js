import Joi from "joi";



export const GrievanceCreationValidationModel = Joi.object({

    message : Joi.string()
        .required(),

    grievance_type : Joi.string()
        .required(),

    grievance_sub_type : Joi.string()
        .required(),

    address : Joi.string()
        .required(),
})


export const GrievanceUpdationValidationModel = Joi.object({

    message : Joi.string()
        .optional(),

    grievance_type : Joi.string()
        .optional(),

    grievance_sub_type : Joi.string()
        .optional(),

    address : Joi.string()
        .optional(),
})

export const GrievanceTypeCreationValidationModel = Joi.object({

  grievance_type: Joi.string()
    .required(),
  
});

export const GrievanceTypeUpdationValidationModel = Joi.object({

  grievance_type: Joi.string()
    .optional(),

  is_active : Joi.boolean()
    .optional()
  
});


export const GrievanceSubTypeCreationValidationModel = Joi.object({
    grievance_sub_type: Joi.string()
        .required(),

    grievance_type: Joi.string()
        .required(),
  
});


export const GrievanceSubTypeUpdationValidationModel = Joi.object({
  
  grievance_sub_type: Joi.string()
    .optional(),

  grievance_type: Joi.number()
    .optional(),
  
  is_active: Joi.boolean()
    .optional()

});