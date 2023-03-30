import { useState, useEffect, useRef, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './profile.module.css';
import { requestUpdateUser } from '../services/actions/login';
import { useDispatch, useSelector } from '../hooks/hooks';
import { TICons } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { ProfileNavBar } from '../components/profile-navbar/profile-navbar';
import { TUserState } from '../services/reducers/login';

export function ProfilePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const inputNameRef = useRef(null);
    const inputEmailRef = useRef(null);
    const inputPasswordRef = useRef(null);
    const { user, passwordUser } = useSelector<TUserState>((state) => state.login);
    const [nameDisabled, setNameDisabled] = useState(true);
    const [nameIcon, setNameIcon] = useState<keyof TICons | undefined>("EditIcon");
    const [emailDisabled, setEmailDisabled] = useState(true);
    const [emailIcon, setEmailIcon] = useState<keyof TICons | undefined>("EditIcon");
    const [passwordDisabled, setPasswordDisabled] = useState(true);
    const [passwordIcon, setPasswordIcon] = useState<keyof TICons | undefined>("EditIcon");

    useEffect(() => {
        if (user && user.success) {
            setName(user.user.name);
            setEmail(user.user.email);
            passwordUser && setPassword(passwordUser);
        }
    }, [user]);

    const onIconEmailClick = () => {
        if (emailDisabled === true) {
            setEmailIcon("CloseIcon");
            setEmailDisabled(false);
        } else {
            setEmailIcon("EditIcon");
            setEmailDisabled(true);
        }
    }

    const onIconPasswordClick = () => {
        if (passwordDisabled === true) {
            setPasswordIcon("CloseIcon");
            setPasswordDisabled(false);
        } else {
            setPasswordIcon("EditIcon");
            setPasswordDisabled(true);
        }
    }

    const onIconNameClick = () => {
        if (nameDisabled === true) {
            setNameIcon("CloseIcon");
            setNameDisabled(false);
        } else {
            setNameIcon("EditIcon");
            setNameDisabled(true);
        }
    }

    const onSubmitUpdateUser = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(requestUpdateUser(name, email, password));
        navigate('/');
    }

    const resetButton = () => {
        setEmailIcon("EditIcon");
        setEmailDisabled(true);
        setNameIcon("EditIcon");
        setNameDisabled(true);
        setPasswordIcon("EditIcon");
        setPasswordDisabled(true);
        user && setName(user.user.name);
        user && setEmail(user.user.email);
        passwordUser ? setPassword(passwordUser) : setPassword("")
    }

    return (
        < main className={styles.ProfileMain}>
            <ProfileNavBar />
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
                {(user && user.user.name !== name || user && user.user.email !== email ||
                    (password ? password !== passwordUser : password === passwordUser))
                    && <div className={styles.UnvisibleButtons}>
                        <span className={`${styles.CancelButton} text text_type_main-default`} onClick={resetButton}>Отмена</span>
                        <Button htmlType="submit" type="primary" size="medium">
                            Сохранить
                        </Button>
                    </div>}
            </form>
        </main>
    );
} 