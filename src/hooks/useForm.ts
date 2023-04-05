import { Dispatch, SetStateAction, ChangeEventHandler, useState, ChangeEvent } from "react";

export const useForm = <T>(inputValues: T): [
    T,
    ChangeEventHandler<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | ChangeEvent<HTMLInputElement>
    >,
    Dispatch<SetStateAction<T>>
] => {
    const [values, setValues] = useState<T>(inputValues);

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const { value, name } = event.target;

        setValues({ ...values, [name]: value });
    };

    return [values, handleChange, setValues];
};