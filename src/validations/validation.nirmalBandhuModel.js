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

    ward_id : Joi.number()
        .required(),

    borough_id : Joi.number()
        .required(),   

    adhar_number : Joi.string()
        .pattern(/^[0-9]{12}$/)
        .message("invalid adhar number") 
        .required(),
    
    start_date : Joi.date()
        .required(),
    
});


export const NirmalBandhuUpdationValidationModel = Joi.object({
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
    
    adhar_number : Joi.string()
        .pattern(/^[0-9]{12}$/)
        .message("invalid adhar number") 
        .required(),

    ward_id : Joi.number()
        .required(),

    borough_id : Joi.number()
        .required(), 
    
    start_date: Joi.date()
        .required(),
    
    is_active : Joi.boolean()
        .required(),
    
});
