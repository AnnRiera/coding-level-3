
export interface ICreateItem {
    name: string;
    price: number;
}

export interface IItem extends ICreateItem{
    id: number;
}