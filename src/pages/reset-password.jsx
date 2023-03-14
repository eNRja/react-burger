import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './reset-password.module.css';
import { requestResetPassword } from '../services/actions/forgot-reset-password';

export function ResetPasswordPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [valuePass, setValuePass] = useState('');
    const [valueCoin, setValueCoin] = useState('');
    const inputRef = useRef(null);
    const [showPassword, setShowPassword] = useState('password')

    const onClickLogin = () => {
        navigate('/login');
    };

    const onIconClick = () => {
        if (showPassword === "password") {
            setShowPassword("text");
        } else {
            setShowPassword("password");
        }
    }

    const onSubmitReset = (event) => {
        event.preventDefault();
        dispatch(requestResetPassword(valuePass, valueCoin));
        navigate('/');
    }

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