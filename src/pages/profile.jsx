import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './profile.module.css';
import { requestLogout, requestUpdateUser } from '../services/actions/login';

export function ProfilePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const inputNameRef = useRef(null);
    const inputEmailRef = useRef(null);
    const inputPasswordRef = useRef(null);
    const { user, passwordUser } = useSelector(state => state.login);
    const [nameDisabled, useNameDisabled] = useState(true);
    const [nameIcon, useNameIcon] = useState("EditIcon");
    const [emailDisabled, useEmailDisabled] = useState(true);
    const [emailIcon, useEmailIcon] = useState("EditIcon");
    const [passwordDisabled, usePasswordDisabled] = useState(true);
    const [passwordIcon, usePasswordIcon] = useState("EditIcon");

    useEffect(() => {
        if (user.success) {
            setName(user.user.name);
            setEmail(user.user.email);
            passwordUser && setPassword(passwordUser);
        }
    }, [user]);

    const onIconEmailClick = () => {
        if (emailDisabled === true) {
            useEmailIcon("CloseIcon");
            useEmailDisabled(false);
        } else {
            useEmailIcon("EditIcon");
            useEmailDisabled(true);
        }
    }

    const onIconPasswordClick = () => {
        if (passwordDisabled === true) {
            usePasswordIcon("CloseIcon");
            usePasswordDisabled(false);
        } else {
            usePasswordIcon("EditIcon");
            usePasswordDisabled(true);
        }
    }

    const onIconNameClick = () => {
        if (nameDisabled === true) {
            useNameIcon("CloseIcon");
            useNameDisabled(false);
        } else {
            useNameIcon("EditIcon");
            useNameDisabled(true);
        }
    }

    const onClickHistory = () => {
        navigate('/*');
    };

    const onClickExit = () => {
        dispatch(requestLogout());
    };

    const onSubmitUpdateUser = (event) => {
        event.preventDefault();
        dispatch(requestUpdateUser(name, email, password));
        navigate('/');
    }

    const resetButton = () => {
        useEmailIcon("EditIcon");
        useEmailDisabled(true);
        useNameIcon("EditIcon");
        useNameDisabled(true);
        usePasswordIcon("EditIcon");
        usePasswordDisabled(true);
        setName(user.user.name);
        setEmail(user.user.email);
        passwordUser ? setPassword(passwordUser) : setPassword("")
    }

    return (
        < main className={styles.ProfileMain}>
            <form className={styles.ProfileForm} onSubmit={onSubmitUpdateUser}>
                <Input
                    disabled={nameDisabled}
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => setName(e.target.value)}
                    icon={nameIcon}
                    value={name}
                    name={'name'}
                    error={false}
                    ref={inputNameRef}
                    onIconClick={onIconNameClick}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1 mb-6"
                />
                <Input
                    disabled={emailDisabled}
                    type={'email'}
                    placeholder={'Логин'}
                    onChange={e => setEmail(e.target.value)}
                    icon={emailIcon}
                    value={email}
                    name={'name'}
                    error={false}
                    ref={inputEmailRef}
                    onIconClick={onIconEmailClick}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1 mb-6"
                />
                <Input
                    disabled={passwordDisabled}
                    type={'password'}
                    placeholder={'Пароль'}
                    onChange={e => setPassword(e.target.value)}
                    icon={passwordIcon}
                    value={password}
                    name={'name'}
                    error={false}
                    ref={inputPasswordRef}
                    onIconClick={onIconPasswordClick}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1 mb-6"
                />
                {(user.user.name !== name || user.user.email !== email ||
                    (password ? password !== passwordUser : password === passwordUser))
                    && <div className={styles.UnvisibleButtons}>
                        <span className={`${styles.CancelButton} text text_type_main-default`} onClick={resetButton}>Отмена</span>
                        <Button htmlType="submit" type="primary" size="medium">
                            Сохранить
                        </Button>
                    </div>}
            </form>
            <div className={styles.ProfileNavBar}>
                <a className={`${styles.ProfileButton} text text_type_main-medium`}>Профиль</a>
                <a className={`${styles.ProfileButton} text text_type_main-medium text_color_inactive`} onClick={onClickHistory}>История заказов</a>
                <a className={`${styles.ProfileButton} text text_type_main-medium text_color_inactive`} onClick={onClickExit}>Выход</a>
                <span className="text text_type_main-default text_color_inactive mt-20">В этом разделе вы можете
                    изменить&nbsp;свои персональные данные</span>
            </div>
        </main>
    );
} 