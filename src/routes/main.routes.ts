import { Server } from "@hapi/hapi";
import { ItemsController } from '../controllers/item.controller';
import { validateIdSchema } from '../validators/schemas/main.schema';

const itemsController = new ItemsController();

export const defineRoutes = (server: Server) => {
    server.route({
        method: 'GET',
        path: '/ping',
        handler: async (request, h) => {
            return {
                ok: true
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/items',
        handler: itemsController.getItems
    });

    server.route({
        method: 'GET',
        path: '/items/{id}',
        handler: itemsController.getItemById,
        options: {
            validate: {
                params: validateIdSchema
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/items',
        handler: itemsController.createItem
    });

    server.route({
        method: 'PUT',
        path: '/items/{id}',
        handler: itemsController.updateItem,
        options: {
            validate: {
                params: validateIdSchema
            }
        }
    });

    server.route({
        method: 'DELETE',
        path: '/items/{id}',
        handler: itemsController.deleteItem,
        options: {
            validate: {
                params: validateIdSchema
            }
        }
    });
}
