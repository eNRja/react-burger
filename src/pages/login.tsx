import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './login.module.css';
import { requestLogin } from '../services/actions/login';
import { useAppDispatch } from '../hooks/hooks';

export function LoginPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hiddenPassword, setHiddenPassword] = useState<"text" | "email" | "password" | undefined>('password');

    const onIconClick = () => {
        if (hiddenPassword === 'password') {
            setHiddenPassword('text')
        } else {
            setHiddenPassword('password')
        }
    }

    const onClickRegister = () => {
        navigate('/register');
    };

    const onClickForgotPassword = () => {
        navigate('/forgot-password');
    };

    const onSubmitLogin = function (event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        dispatch(requestLogin(email, password));
        navigate(-1);
    }

    return (
        < main className={style.LoginMain}>
            <form className={style.LoginForm} onSubmit={onSubmitLogin}>
                <h1 className="text text_type_main-medium mb-6">Вход</h1>
                <Input
                    type={'text'}
                    placeholder={'E-mail'}
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1 mb-6"
                />
                <Input
                    type ={hiddenPassword}
                    placeholder={'Пароль'}
                    onChange={e => setPassword(e.target.value)}
                    icon={'ShowIcon'}
                    value={password}
                    name={'name'}
                    error={false}
                    onIconClick={onIconClick}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1 mb-6"
                />
                <Button extraClass="mb-20" htmlType="submit" type="primary" size="medium">
                    Войти
                </Button>
            </form>
            <p className="text text_type_main-default mb-4">Вы — новый пользователь?
                <span className={style.LoginButton} onClick={onClickRegister}> Зарегистрироваться</span>
            </p>
            <p className="text text_type_main-default">Забыли пароль?
                <span className={style.LoginButton} onClick={onClickForgotPassword}> Восстановить пароль</span>
            </p>
        </main>
    );
} 