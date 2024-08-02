import Joi from 'joi';
import { Request } from '@hapi/hapi';

export class Validator {
    validateBody(
        req: Request,
        joiSchema: Joi.ObjectSchema<any>
    ) {      
          const result = joiSchema.validate(req.payload);
          
          if (result.error) {
            const errors = result.error.details.map(detail => ({
                field: detail.context?.key,
                message: detail.message
            }));
    
            return errors;
        }
    }
}