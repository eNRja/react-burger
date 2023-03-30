import { useState, useRef, FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './reset-password.module.css';
import { checkProtectResetPage, requestResetPassword } from '../services/actions/forgot-reset-password';
import { useDispatch, useSelector } from '../hooks/hooks';
import { useForm } from '../hooks/useForm';

export function ResetPasswordPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [values, handleChange] = useForm<{ valuePass: string; valueCoin: string; }>(
        {
            valuePass: '',
            valueCoin: '',
        }
    );
    const inputRef = useRef(null);
    const [showPassword, setShowPassword] = useState<"password" | "text" | "email" | undefined>('password');
    const { protectedResetPage } = useSelector((state) => state.forgotPassword);

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
        dispatch(requestResetPassword(values.valuePass, values.valueCoin));
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
                        onChange={handleChange}
                        icon={'ShowIcon'}
                        value={values.valuePass}
                        name={'valuePass'}
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
                        onChange={handleChange}
                        value={values.valueCoin}
                        name={'valueCoin'}
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