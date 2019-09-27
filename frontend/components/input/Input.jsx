import "./_input.scss";

function Input(props) {
    return (<div className={props.customClassName}>
        <input className={"input"}
            name={props.name}
            type={props.type} 
            placeholder={props.placeholder} 
            onChange={props.onChange}
            autoComplete={"off"}
            autoCorrect={"off"}
        />
        {Boolean(props.iconClassName) && <span className={props.iconClassName} />}
    </div>
    );
}

export default Input;