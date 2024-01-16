import './Product.css';
import Price from './Price';

function Product({ title, idx }) {
    let oldPrices = ["12,495","11,900","1,599","599"]
    let newPrices = ["8,999","9,199","999","299"]
    let descriptions = [["8,000 DPI","5 Programmable buttons"], ["Intutive surface","designed for iPad pro"], ["designed for iPad pro","Intutive surface"], ["true wireless","optical orientation"]]
    return (
        <div className="product" >
           <h4>{title}</h4>
           &nbsp;
           <p>{descriptions[idx].map((description)=><li>{description}</li>)}</p>
           <Price oldPrice={oldPrices[idx]} newPrice={newPrices[idx]}/>
        </div>
    )
}

export default Product;