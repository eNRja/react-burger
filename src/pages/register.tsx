import { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './register.module.css';
import { requestRegistration } from '../services/actions/registration'
import { useDispatch } from '../hooks/hooks';
import { useForm } from '../hooks/useForm';

export function RegisterPage() {
    const navigate = useNavigate();
    const [values, handleChange] = useForm<{ name: string; email: string; password: string }>(
        {
            name: '',
            email: '',
            password: ''
        }
    );
    const inputRef = useRef(null);
    const dispatch = useDispatch();
    const [hiddenPassword, setHiddenPassword] = useState<"email" | "password" | "text" | undefined>('password');

    const onIconClick = () => {
        if (hiddenPassword === 'password') {
            setHiddenPassword('text')
        } else {
            setHiddenPassword('password')
        }
    }

    const onClickLogin = () => {
        const initialBreadcrumb = [{ path: '/', url: '/', title: 'Register' }];
        navigate('/login', { state: initialBreadcrumb });
    };

    const onSubmitRegistration = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(requestRegistration(values.email, values.password, values.name));
    }

    return (
        < main className={styles.RegisterMain}>
            <form className={styles.RegisterForm} onSubmit={onSubmitRegistration}>
                <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={handleChange}
                    value={values.name}
                    name={'name'}
                    error={false}
                    ref={inputRef}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1 mb-6"
                />
                <Input
                    type={'text'}
                    placeholder={'E-mail'}
                    onChange={handleChange}
                    value={values.email}
                    name={'email'}
                    error={false}
                    ref={inputRef}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1 mb-6"
                />
                <Input
                    type={hiddenPassword}
                    placeholder={'Пароль'}
                    onChange={handleChange}
                    icon={'ShowIcon'}
                    value={values.password}
                    name={'password'}
                    error={false}
                    ref={inputRef}
                    onIconClick={onIconClick}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1 mb-6"
                />
                <Button extraClass="mb-20" htmlType="submit" type="primary" size="medium">
                    Зарегистрироваться
                </Button>
            </form>
            <p className="text text_type_main-default mb-4">Уже зарегистрированы?
                <span className={styles.RegisterButton} onClick={onClickLogin}> Войти</span>
            </p>
        </main>
    );
} 