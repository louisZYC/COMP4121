import StripeCheckout from "react-stripe-checkout";
import Http from "../js_modules/Http.js"
import CartContext from "../store/cart-context";
import { useState, useContext } from "react";
const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

function Cart() {

    // define variable
    const jwtToken = 'abc'
    // Desctructure cartState from CartContext
    const { cartState, clearCart } = useContext(CartContext);
    console.log(cartState)
    const totalAmount = cartState.reduce(
        (accumulator, currentValue) => accumulator + currentValue.price * currentValue.quantity,
        0
    )
    const [addressState, setAddress] = useState("");
    const [contactState, setContact] = useState("");

    // Send payment request to server after get the stripe token
    const onToken = async (stripeToken) => {
        const body = {
            tokenId: stripeToken.id,
            amount: totalAmount,
        };

        // since the ecommerce website is opened to public, anyone can buy things from our website.
        const headers = {
            Authorization: `Bearer ${jwtToken}`,
        }
        try {
            const response = await Http.sendPostRequest('/payment', body, headers)

            if (response.status === 200) {
                alert("Payment successful");
            } else {
                alert("Payment failed");
            }
        } catch (error) {
            console.log(error);
            alert("Payment failed");
        }


        const details = cartState.reduce(
            (accumulator, currentValue) => accumulator + `${currentValue.name} x ${currentValue.quantity}\n`,
            ""
        )
        const transactionBody = {
            details: details,
            deliverTo: addressState,
            contact: contactState,
            totalAmount: totalAmount
        }
        // alert(transactionBody)
        const response = await Http.sendPostRequest('/transactions', transactionBody)
    };

    return (
        <div className="row p-5">
            <div className="col-sm-12 bg-primary fs-1 col-sm-12 text-center"> Cart Items</div>
            <ListOfItems items={cartState} />
            <div className="border border-3 border-dark p-4">
                <h3>Please kindly input some information before your checkout</h3>
                <label for="address">Delivery Address: </label> <input type="text" id="address" onChange={(e) => setAddress(e.target.value)}></input>
                <br />
                <label for="contact">Your contact: </label> <input type="text" id="contact" onChange={(e) => setContact(e.target.value)}></input>
            </div>
            <h2>totalAmount: {totalAmount}</h2>
            <StripeCheckout token={onToken} stripeKey={publishableKey}>
                <button>Checkout</button>
            </StripeCheckout>
        </div>
    )
}

function ListOfItems(props) {
    const rows = props.items.map((item) => (
        <tr key={item.name}>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
            <td>{item.price}</td>
        </tr>
    ))

    return (
        <table className="table table-borderedpy-2">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Unit Price</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}


export default Cart