import style from './app-header-button.module.css';

export default function AppHeaderButton ({buttonIcon, buttonDefault, buttonText} : {
    buttonIcon: React.ElementType,
    buttonDefault: boolean,
    buttonText: string
}) {
    const ButtonIcon = buttonIcon;
    const buttonType = buttonDefault === false ? "secondary" : "primary";
    const buttonTextClass = buttonDefault === false ? "text_color_inactive" : "";

    return (
        <div className={style.Button}>
            <ButtonIcon type={buttonType} />
            <span className={`text text_type_main-default ml-2 ${buttonTextClass}`}>
                {buttonText}
            </span>
        </div>
    )
}