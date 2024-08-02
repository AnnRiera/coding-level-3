import BaseService from './base.service';
import { BadRequestError, InternalError } from '../errors/main.error';
import { ICreateItem, IItem } from '../interfaces/item.interface';

class ItemsService extends BaseService {
    public async createItem(item: ICreateItem): Promise<ICreateItem> {
        try {
            return await this.db.item.create({
                data: {
                    name: item.name,
                    price: item.price
                },
                select: {
                    id: true,
                    name: true,
                    price: true
                }
            });
        } catch (error) {
            console.error(error);
            if (error instanceof BadRequestError) throw new BadRequestError(error.message, error.data);
            throw new InternalError();
        }
    }

    public async updateItem(item: IItem): Promise<ICreateItem> {
        try {
            return await this.db.item.update({
                data: {
                    name: item.name,
                    price: item.price
                },
                where: {
                    id: item.id
                },
                select: {
                    id: true,
                    name: true,
                    price: true
                }
            });
        } catch (error) {
            console.error(error);
            if (error instanceof BadRequestError) throw new BadRequestError(error.message, error.data);
            throw new InternalError();
        }
    }

    public async deleteItem(id: number): Promise<ICreateItem | null> {
        try {
            const item = await this.getItemById(id);
            if (item) {
                return await this.db.item.update({
                    data: {
                        deleted: true,
                        deletedAt: new Date()
                    },
                    where: {
                        id,
                        deleted: false
                    },
                    select: {
                        id: true,
                        name: true,
                        price: true
                    }
                });
            }
            return null;
        } catch (error) {
            console.error(error);
            if (error instanceof BadRequestError) throw new BadRequestError(error.message, error.data);
            throw new InternalError();
        }
    }

    public async getItems(): Promise<IItem[]>{
        try {
            return await this.db.item.findMany({
                where: {
                    deleted: false
                },
                select: {
                    id: true,
                    name: true,
                    price: true
                }
            });
        } catch (error) {
            console.error(error);
            if (error instanceof BadRequestError) throw new BadRequestError(error.message, error.data);
            throw new InternalError();
        }
    } 

    public async getItemById(id: number): Promise<IItem | null>{
        try {
            return await this.db.item.findUnique({
                where: {
                    id,
                    deleted: false
                },
                select: {
                    id: true,
                    name: true,
                    price: true
                }
            });
        } catch (error) {
            console.error(error);
            if (error instanceof BadRequestError) throw new BadRequestError(error.message, error.data);
            throw new InternalError();
        }
    } 
}

export { ItemsService }