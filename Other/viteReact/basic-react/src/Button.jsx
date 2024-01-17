function doSomething(){
    console.log("Button is Clicked!")
}
export default function Button(){
    return (
        <div>
            <button onClick={doSomething}>
                Click Me!
            </button>
        </div>
    );
}