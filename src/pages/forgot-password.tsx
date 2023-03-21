import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './forgot-password.module.css';
import { checkProtectResetPage, requestForgotPassword } from '../services/actions/forgot-reset-password';
import { useAppDispatch } from '../hooks/hooks';

export function ForogotPasswordPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('')

    const onClickLogin = () => {
        navigate('/login');
    };

    const inputRef = useRef(null)

    const onSubmitReset = (event: React.SyntheticEvent) => {
        event.preventDefault();
        dispatch(requestForgotPassword(email, goToResetPasswordPage));
        dispatch(checkProtectResetPage(true));
    }

    const goToResetPasswordPage = () => {
        navigate('/reset-password');
    };


    return (
        < main className={style.ForgotPasswordMain}>
            <form className={style.ForgotPasswordForm} onSubmit={onSubmitReset}>
                <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
                <Input
                    type={'email'}
                    placeholder={'Укажите e-mail'}
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    name={'name'}
                    error={false}
                    ref={inputRef}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1 mb-6"
                />
                <Button extraClass="mb-20" htmlType="submit" type="primary" size="medium">
                    Восстановить
                </Button>
            </form>
            <p className="text text_type_main-default mb-4">Вспомнили пароль?
                <span className={style.ForgotPasswordButton} onClick={onClickLogin}> Войти</span>
            </p>
        </main>
    );
} 