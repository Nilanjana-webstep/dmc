import Joi from 'joi';


export const NoticeBoardCreationValidationModel = Joi.object({

    title : Joi.string()
        .required(),

    content : Joi.string()
        .required(),

    start_date : Joi.date()
        .min(new Date())
        .message("start date should be greater than current date")
        .required(),

    end_date: Joi.date()
        .optional()
        .greater(Joi.ref('start_date'))
        .message("end date should be greater than start date")

})

export const NoticeBoardUpdationValidationModel = Joi.object({

    title : Joi.string()
        .required(),

    content : Joi.string()
        .required(),

    start_date : Joi.date()
        .min(new Date())
        .message("start date should be greater than current date")
        .required(),

    end_date: Joi.date()
        .optional()
        .greater(Joi.ref('start_date'))
        .message("end date should be greater than start date"),

    is_active : Joi.boolean()
        .required()

})