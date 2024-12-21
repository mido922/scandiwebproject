import React from "react"

interface CartListProps extends Record<string, any> { }

const CartList: React.FC<CartListProps> = (props) => {

    const totalItems = props.cartItems.reduce((total: number, item: any) => total + item.quantity, 0)

    const totalCost = props.cartItems.reduce((sum: any, item: any) => sum + item.prices[0].amount * item.quantity, 0);

    var totalItemsText = "No items."

    if (totalItems == 1)
        totalItemsText = "1 item."
    else
        totalItemsText = `${totalItems} items.`

    console.log(props)

    return (
        <div className="cartList ">
            <div className="d-flex align-items-center"><div className="p-3 ralewayFont-700">My Bag,</div><div>{totalItemsText}</div></div>
            {props.cartItems.map((item: any) => (
                <div className="cartBox container d-flex flex-row ralewayFont-300 m-3">
                    <div className="cartDetail d-flex flex-column">
                        <h3>{item.name}</h3>
                        <h3>${item.prices[0].amount * item.quantity}</h3>
                        {item.attributes.map((attribute: any) => (
                            <div className="propertyHolder" key={attribute.type}>
                                <strong>{attribute.type}:</strong>{" "} <br />
                                <div className="d-flex flex-row">
                                    {attribute.options.map((option: string) => (
                                        <span
                                            key={option}
                                            style={{
                                                border: 2,
                                                borderStyle: "solid",
                                                padding: 10,
                                                marginRight: 10,
                                                backgroundColor: option === attribute.selected ? "black" : "white",
                                                fontWeight: option === attribute.selected ? "bold" : "normal",
                                                color: option === attribute.selected ? "white" : "black",
                                            }}
                                        >
                                            {option}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="d-flex flex-column justify-content-between align-items-center">
                        <button className="quantityButtons d-flex justify-content-center align-items-center" onClick={() => props.handleIncreaseQuantity(item.id, item.attributes)}>
                            +
                        </button>
                        {item.quantity}
                        <button className="quantityButtons d-flex justify-content-center align-items-center" onClick={() => props.handleDecreaseQuantity(item.id, item.attributes)}>
                            -
                        </button>
                    </div>
                    <div className="d-flex align-items-center">
                        <img style={{ width: 200, height: 200, }} src={item.galleries[0].url}></img>

                    </div>
                </div>
            ))}

            <div className="d-flex robotoFont-500 justify-content-between align-items-center">
                <h1>Total</h1>
                <div>${totalCost}</div>
            </div>

            <button
                disabled={props.cartItems.length == 0}
                onClick={props.handlePlaceOrder}
                className="addToCartButton d-flex justify-content-center align-items-center"
                style={{
                    fontWeight: 600,
                }}
            >PLACE ORDER</button>
            

        </div>
    )
}
export default CartList;