function MsgBox({name,textColor}){
    let styles = {color : textColor}
    return (
        <div style={styles}>
            <h1>Hello {name}</h1>
        </div>
    );
}

export default MsgBox;