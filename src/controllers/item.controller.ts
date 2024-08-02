import { Request, ResponseObject, ResponseToolkit } from '@hapi/hapi';
import { ItemsService } from '../services/item.service';
import { ICreateItem, IItem } from '../interfaces/item.interface';
import { validateBodySchema } from '../validators/schemas/main.schema';
//import { validateCreateRoute, validateIdRoute } from '../validators/main.validator';
import { Validator } from '../validators/main.validator';

const itemsService = new ItemsService();
const validator = new Validator();

class ItemsController {
    public async getItems(
        req: Request,
        res: ResponseToolkit,
        err?: Error
    ): Promise<ResponseObject> {
        try {
            const data = await itemsService.getItems();
            return res.response(data).code(200);
        } catch (error) {
            console.log(error);
            return res.response(err).code(500);
        }
    };

    public async getItemById(
        req: Request,
        res: ResponseToolkit,
        err?: Error
    ) {
        try {
            const id = parseInt(req.params.id);

            const item = await itemsService.getItemById(id);
            if (item) {
                return res.response(item);
            }
            
            return res.response().code(404);
        } catch (error) {
            console.log(error);
            return res.response(err).code(500);
        }
    };

    public async createItem(
        req: Request,
        res: ResponseToolkit,
        err?: Error
    ) {
        try {
            const { error } = validateBodySchema.validate(req.payload);
            if (error) {
                const errors = validator.validateBody(req, validateBodySchema);
                return res.response({ errors }).code(400);
            }

             /* According to this https://github.com/DefinitelyTyped/DefinitelyTyped/issues/25605#issuecomment-442445467 
                comment on an issue's thread, is better just cast the payload instead of using generics.
            */
            const body = req.payload as ICreateItem;
            const item = await itemsService.createItem(body);

            return res.response(item).code(201);
        } catch (error) {
            console.log(error);
            return res.response(err).code(500);
        }
    };

    public async updateItem(
        req: Request,
        res: ResponseToolkit,
        err?: Error
    ) {
        try {
            const { error } = validateBodySchema.validate(req.payload);
            if (error) {
                //const errors = validateCreateRoute(req);
                const errors = validator.validateBody(req, validateBodySchema);
                return res.response({ errors }).code(400);
            }

            const id = parseInt(req.params.id);
            const body = req.payload as IItem;
            const item = await itemsService.updateItem({
                id,
                name: body.name,
                price: body.price
            });
            return res.response(item);
        } catch (error) {
            console.log(error);
            return res.response(err).code(500);
        }
    };

    public async deleteItem(
        req: Request,
        res: ResponseToolkit,
        err?: Error
    ) {
        try {
            const id = parseInt(req.params.id);
            const item = await itemsService.deleteItem(id);
            if (item) {
                return res.response(item).code(204); 
            }
            return res.response({
                message: 'Item not found',
                status: 404
            }).code(404);
        } catch (error) {
            console.log(error);
            return res.response(err).code(500);
        }
    };
}

export { ItemsController };