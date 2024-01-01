const mongoose = require("mongoose");

main().then(() => {
    console.log("successful connection");
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}
const orderSchema = new mongoose.Schema({
    item: String,
    price: Number,
});
const customerSchema = new mongoose.Schema(
    {
        name: String,
        orders: [
            {  
                type: mongoose.Schema.Types.ObjectId,
                ref: "Order"
            }
        ]
    }
)

// customerSchema.pre("findOneAndDelete", async ()=>{
//     console.log("Pre middleware")
// })

customerSchema.post("findOneAndDelete", async (customer)=>{
    if(customer.orders.length){
        let res = await Order.deleteMany({ _id: {$in : customer.orders }});
        console.log(res)
    }
})


const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer",customerSchema);


const addCustomer = async ()=>{
    let cust1 = new Customer({
        name: "ankush More",
    });

    let order1 = new Order({
        item : "pizza",
        price :250
    });

    cust1.orders.push(order1);
    await order1.save();
    let res = await cust1.save();
    console.log(res);
}


// addCustomer();

const delCust = async ()=>{
    let data = await Customer.findByIdAndDelete("658fe92ae981677ad5b07acd")
    console.log(data)
}

delCust();

// const addCustomer = async ()=>{
//     let cust1 = new Customer({
//         name: " Virat Kohli",
//     });

//     let order1 = await Order.findOne({item:"chips"});
//     let order2 = await Order.findOne({item:"Chocolate"});

//     cust1.orders.push(order1);
//     cust1.orders.push(order2);

//     let res = await cust1.save();
//     console.log(res);
// }

// const addOrders = async () => {
//     let res = await Order.insertMany([
//         {
//             item: "Samosa",
//             price: 15,
//         }, {
//             item: "chips",
//             price: 10
//         }, {
//             item: "Chocolate",
//             price: 5
//         }]
//     )

//     console.log(res);
// }

// addCustomer();