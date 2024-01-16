import Product from "./Product";

function ProductList() {
    let styles = {
        display : "flex",
        flexWrap : "wrap",
        justifyContent:"center",
        alignItems : "center"
    }
    return (
        <div style={styles}>
            <Product title={"Logitech MX master"} idx={0}/>
            <Product title={"Apple pencil (2nd Gen)"} idx={1}/>
            <Product title={"Zebronics zeb-transformer"} idx={2}/>
            <Product title={"Petronics Toad 23"} idx={3}/>
        </div>
    )
}

export default ProductList;