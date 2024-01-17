function handleFromSubmit(event){
    console.log(event);
    event.preventDefault();
    console.log("Form was submitted");
}
export default function Form(){
    return(
        <form >
        <input type="text" />
        <button onClick={handleFromSubmit}>Submit</button>
        </form>
    );

}