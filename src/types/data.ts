export type TDragItem = {
    items?: TDragItem[];
    readonly hoverIndex?: any;
    readonly dragIndex?: any;
    readonly _id: string,
    readonly uuid: string,
    readonly image_mobile: string,
    readonly name: string,
    readonly price: number,
    readonly type: string,
};

export type TIngredientsOrder = {
    burgerIngredient: Array<TDragItem>
}

export type TFrogotPass = {
    readonly success: true,
    readonly message: string
};

export type TIngredients = {
    readonly __v: number,
    readonly _id: string,
    readonly calories: number,
    readonly carbohydrates: number,
    readonly fat: number,
    readonly image: string,
    readonly image_large: string,
    readonly image_mobile: string,
    readonly name: string,
    readonly price: number,
    readonly proteins: number,
    readonly type: string,
    counter: number
};

export type TIngredientsArray = {
    ingredients: Array<TIngredients>;
}

export type TUser = {
    success: boolean,
    accessToken: string,
    refreshToken: string,
    user: {
        email: string,
        name: string
    }
}

export type TOrder = {
    name: string,
    order: {
        number: number
    },
    success: boolean
}

export type TOrderasd = {
    _id: string;
    name: string;
};

