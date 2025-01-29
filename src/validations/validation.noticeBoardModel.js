import Joi from 'joi';
import { currentISTDate } from '../config/constraint.js';

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
        .optional(),

    content : Joi.string()
        .optional(),

    start_date : Joi.date()
        .min('now')
        .optional(),

    end_date : Joi.date()
        .optional(),

})