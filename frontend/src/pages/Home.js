import Http from "../js_modules/Http.js"
import { useEffect, useState, useContext } from "react";
import CartContext from "../store/cart-context";

function Home() {
    // variables
    const [productsState, setProducts] = useState([]);
    const [suppliersState, setSuppliers] = useState([]);

    useEffect(() => {
        // Declare a async function to fetch the data
        const fetchProducts = async () => {
            // Get the json object from the server
            const json = await Http.fetchJson("/products/");

            // sort by montlySales
            const orderBySales = json.sort(function (a, b) {
                if (a.monthlySales < b.monthlySales) {
                    return 1;
                }
                if (a.monthlySales > b.monthlySales) {
                    return -1;
                }

                return 0;
            });

            const suppliers = [...new Set(json.map(item => item.supplier))]; // [ 'A', 'B']

            setProducts(orderBySales)
            setSuppliers(suppliers)
        }
        // Call the async function
        fetchProducts();
    }, []);

    return (
        <div className="row">
            <div className="col-sm-12 bg-secondary fs-1 col-sm-12 text-center text-light"> Shop Now</div>
            <h5>products are ordered by monthly sales</h5>
            
            <ProductList products={productsState} />
        </div>

    )
}

function SupplierList() {
    // Todo
}

function ProductList(props) {
    const productList = props.products.map((product) => {
        return (
            <OneProduct product={product} key={product.id} />
        )
    })

    return (
        <div className="p-5 col-sm-12 d-flex justify-content-start flex-wrap flex-row">
            {productList}
        </div>
    )
}

function OneProduct(props) {
    const [productState, setProduct] = useState([]);
    const [quantityState, setQuantity] = useState(0)
    const { addCartItem } = useContext(CartContext);

    const addCartItemHandler = () => {
        addCartItem({
            id: props.product.id,
            name: props.product.name,
            price: props.product.price,
            quantity:quantityState
        });
    };

    return (
        <div className="card w-25 m-2 mx-5">
            <img src={props.product.image} className="card-img-top" />
            <div className="card-body">
                <h5 className="card-title">{props.product.name}</h5>
                <p className="card-text">Montly sales: {props.product.monthlySales}</p>
                <p className="card-text">Price: {props.product.price}</p>
                <p className="card-text">Supplier: {props.product.supplier}</p>
                <label>quantity: </label> <input type="number" value={quantityState} onChange={(e) => setQuantity(e.target.value)}></input>
                <a href="#" className="btn btn-primary" onClick={addCartItemHandler}>Add to cart</a>
            </div>
        </div>
    )
}


export default Home