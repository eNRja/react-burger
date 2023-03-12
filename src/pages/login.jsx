import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './login.module.css';
import { requestLogin } from '../services/actions/login'

export function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const inputRef = useRef(null);

    const onClickRegister = () => {
        navigate('/register');
    };

    const onClickForgotPassword = () => {
        navigate('/forgot-password');
    };

    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
        alert('Icon Click Callback')
    }

    const onSubmitLogin = function (event) {
        event.preventDefault();
        dispatch(requestLogin(email, password));
        navigate(-1);
    }

    return (
        < main className={styles.LoginMain}>
            <form className={styles.LoginForm} onSubmit={onSubmitLogin}>
                <h1 className="text text_type_main-medium mb-6">Вход</h1>
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
                    type={'text'}
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
                    Войти
                </Button>
            </form>
            <p className="text text_type_main-default mb-4">Вы — новый пользователь?
                <span className={styles.LoginButton} onClick={onClickRegister}> Зарегистрироваться</span>
            </p>
            <p className="text text_type_main-default">Забыли пароль?
                <span className={styles.LoginButton} onClick={onClickForgotPassword}> Восстановить пароль</span>
            </p>
        </main>
    );
} 