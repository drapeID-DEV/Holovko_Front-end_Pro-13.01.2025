function Button(props) {
    function handleClick() {
        props.onOperation(props.operation);
    }

    return (
        <>
            <button className="operation-btn" onClick={handleClick}>{props.operation}</button>
        </>
    );
}

export default Button;