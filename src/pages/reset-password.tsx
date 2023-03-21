import { useState, useRef, FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './reset-password.module.css';
import { checkProtectResetPage, requestResetPassword } from '../services/actions/forgot-reset-password';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';

export function ResetPasswordPage() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [valuePass, setValuePass] = useState('');
    const [valueCoin, setValueCoin] = useState('');
    const inputRef = useRef(null);
    const [showPassword, setShowPassword] = useState<"password" | "text" | "email" | undefined>('password');
    const { protectedResetPage } = useAppSelector((state) => state.forgotPassword);

    const onClickLogin = () => {
        dispatch(checkProtectResetPage(false));
        navigate('/login');
    };

    const onIconClick = () => {
        if (showPassword === "password") {
            setShowPassword("text");
        } else {
            setShowPassword("password");
        }
    }

    const onSubmitReset = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(requestResetPassword(valuePass, valueCoin));
        dispatch(checkProtectResetPage(false));
        navigate('/');
    }

    if (!protectedResetPage) {
        return <Navigate to="/forgot-password" />;
    } else {
        return (
            < main className={styles.ResetPasswordMain}>
                <form className={styles.ResetPasswordForm} onSubmit={onSubmitReset}>
                    <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
                    <Input
                        type={showPassword}
                        placeholder={'Введите новый пароль'}
                        onChange={e => setValuePass(e.target.value)}
                        icon={'ShowIcon'}
                        value={valuePass}
                        name={'name'}
                        error={false}
                        ref={inputRef}
                        onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="ml-1 mb-6"
                    />
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={e => setValueCoin(e.target.value)}
                        value={valueCoin}
                        name={'name'}
                        error={false}
                        ref={inputRef}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="ml-1 mb-6"
                    />
                    <Button extraClass="mb-20" htmlType="submit" type="primary" size="medium">
                        Сохранить
                    </Button>
                </form>
                <p className="text text_type_main-default mb-4">Вспомнили пароль?
                    <span className={styles.ResetPasswordButton} onClick={onClickLogin}> Войти</span>
                </p>
            </main>
        );
    }

} 