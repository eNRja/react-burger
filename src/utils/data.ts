export interface IIngredient {
    element: {
        calories: number;
        carbohydrates: number;
        fat: number;
        image_large: string;
        name: string;
        proteins: number
    }
    __v?: number,
    _id?: string,
    calories?: number,
    carbohydrates?: number,
    fat?: number,
    image?: string,
    image_large?: string,
    image_mobile?: string,
    name?: string,
    price?: number,
    proteins?: number,
    type?: string,
    counter?: number
};

export interface IDragIngredient {
    map(arg0: (element: IDragIngredient) => false | JSX.Element): import("react").ReactNode
    _id: string,
    image_mobile: string,
    name: string,
    price: number
    type: string
    uuid: string
}

export type TIngredientList = {
    items: IDragIngredient;
    typeDragElement: string;
    bun: {
        _id: string;
        name: string;
        price: number;
        image_mobile: string;
    };
}

export type TDragIngredients = {
    items: [
        _id: string,
        image_mobile: string,
        name: string,
        price: number,
        type: string | undefined,
        uuid: any,
    ];
    bun: {
        _id: string;
        name: string;
        price: number;
        image_mobile: string;
    };
}

export type TOrderItems = {
    orderItems: [{
        action: {
            name: string;
            order: {
                _id: string;
                status: string;
                name: string;
                number: number
            };
            success: boolean; type: string;
        }
    }],
    setmodal: false,
}

export type TStateIngredient = {
    price: number;
    items: [
        _id: string,
        image_mobile: string,
        name: string,
        price: number,
        type: string | undefined,
        uuid: string,
    ];
    bun: {
        _id: string;
        name: string;
        price: number;
        image_mobile: string;
    };
}

export type TStateOrder = {
    setmodal: boolean;
}

export type TStateUser = {
    user: {
        success: boolean,
        user: {
            email: string,
            name: string
        }
    }
}