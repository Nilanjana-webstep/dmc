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
        .required(),

    grievance_type : Joi.string()
        .required(),

    grievance_sub_type : Joi.string()
        .required(),

    address : Joi.string()
        .required(),
})

export const GrievanceTypeCreationValidationModel = Joi.object({

  grievance_type: Joi.string()
    .required(),
  
});

export const GrievanceTypeUpdationValidationModel = Joi.object({

  grievance_type: Joi.string()
    .required(),

  is_active : Joi.boolean()
    .required()
  
});


export const GrievanceSubTypeCreationValidationModel = Joi.object({
    grievance_sub_type: Joi.string()
        .required(),

    grievance_type_id : Joi.number()
        .required(),
  
});


export const GrievanceSubTypeUpdationValidationModel = Joi.object({
  
  grievance_sub_type: Joi.string()
    .required(),

  grievance_type_id: Joi.number()
    .required(),
  
  is_active: Joi.boolean()
    .required()

});