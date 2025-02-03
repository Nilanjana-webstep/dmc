import Joi from 'joi';

export const NirmalBandhuCreationValidationModel = Joi.object({
    full_name: Joi.string()
        .required(),
    
    date_of_birth: Joi.date()
        .required(),
    
    gender: Joi.string()
        .valid('male', 'female', 'other')
        .required(),

    mobile_number: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .message("invalid phone number") 
        .required(),

    street_1: Joi.string()
        .required(),
    
    street_2: Joi.string()
        .optional(),
    
    landmark: Joi.string()
        .required(),

    ward_no : Joi.number()
        .required(),

    borough_no : Joi.number()
        .required(),   

    adhar_no: Joi.number()
        .integer()
        .positive()
        .required(),
    
    start_date: Joi.date()
        .required(),
    
});


export const NirmalBandhuUpdationValidationModel = Joi.object({
    full_name: Joi.string()
        .optional(),
    
    date_of_birth: Joi.date()
        .optional(),
    
    gender: Joi.string()
        .valid('male', 'female', 'other')
        .optional(),

    mobile_number: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .message("invalid phone number") 
        .optional(),

    street_1: Joi.string()
        .optional(),
    
    street_2: Joi.string()
        .optional(),
    
    landmark: Joi.string()
        .optional(),
    
    adhar_no: Joi.number()
        .integer()
        .positive()
        .optional(),

    ward_no : Joi.number()
        .optional(),

    borough_no : Joi.number()
        .optional(), 
    
    start_date: Joi.date()
        .optional(),
    
});
