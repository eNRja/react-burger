import { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './register.module.css';
import { requestRegistration } from '../services/actions/registration'
import { useAppDispatch } from '../hooks/hooks';

export function RegisterPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const inputRef = useRef(null);
    const dispatch = useAppDispatch();
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
        dispatch(requestRegistration(email, password, name));
    }

    return (
        < main className={styles.RegisterMain}>
            <form className={styles.RegisterForm} onSubmit={onSubmitRegistration}>
                <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => setName(e.target.value)}

                    value={name}
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
                    onChange={e => setEmail(e.target.value)}

                    value={email}
                    name={'name'}
                    error={false}
                    ref={inputRef}

                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1 mb-6"
                />
                <Input
                    type={hiddenPassword}
                    placeholder={'Пароль'}
                    onChange={e => setPassword(e.target.value)}
                    icon={'ShowIcon'}
                    value={password}
                    name={'name'}
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