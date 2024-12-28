import React from "react";

interface CartListProps extends Record<string, any> {}

const CartList: React.FC<CartListProps> = (props) => {
  console.log("CartList got", props);

  const totalItems = props.cartItems.reduce(
    (total: number, item: any) => total + item.quantity,
    0
  );

  const totalCost = props.cartItems.reduce(
    (sum: any, item: any) => sum + item.prices[0].amount * item.quantity,
    0
  );

  var totalItemsText = "No items";

  if (totalItems == 1) totalItemsText = "1 item";
  else totalItemsText = `${totalItems} items`;

  const toKebabCase = (str: any) => str.replace(/\s+/g, "-").toLowerCase();

  return (
    <div className="cartList" data-testid="cart-overlay">
      <div className="d-flex align-items-center mb-2">
        <div className="ralewayFont-700">My Bag,</div>
        <div className="ralewayFont-500 ms-1" data-testid="cart-item-amount">
          {totalItemsText}
        </div>
      </div>

      {props.cartItems.map((item: any) => (
        <div
          className="cartBox row container d-flex flex-row ralewayFont-300 mb-5"
          style={{ paddingLeft: 0 }}
        >
          <div className="cartAlign col-7 cartDetail d-flex flex-column justify-content-between">
            <h3 className="roboto" style={{ fontWeight: 300 }}>
              {item.name}
            </h3>
            <h3 id="cartPrice">${item.prices[0].amount * item.quantity}</h3>
            {item.attributes.map((attribute: any) => (
              <div className="propertyHolder" key={attribute.type}>
                <strong className="raleway" style={{ fontWeight: 400 }}>
                  {attribute.type}:
                </strong>{" "}
                <br />
                <div
                  className="d-flex flex-row"
                  id="CartItemContainer"
                  data-testid={`cart-item-attribute-${toKebabCase(
                    attribute.type
                  )}`}
                >
                  {attribute.type != "Color" &&
                    attribute.options.map((option: string) => (
                      <span
                        key={option}
                        className="sourceSansPro"
                        data-testid={
                          option === attribute.selected
                            ? `cart-item-attribute-${attribute.type}-${option}-selected`
                            : `cart-item-attribute-${attribute.type}-${option}`
                        }
                        style={{
                          border: 2,
                          borderStyle: "solid",
                          padding: 10,
                          marginRight: 10,
                          backgroundColor:
                            option === attribute.selected ? "black" : "white",
                          fontWeight:
                            option === attribute.selected ? "bold" : "normal",
                          color:
                            option === attribute.selected ? "white" : "black",
                        }}
                      >
                        {option}
                      </span>
                    ))}
                  {attribute.type == "Color" &&
                    attribute.options.map((option: string) => (
                      <span
                        key={option}
                        data-testid="cart-item-attribute-${attribute name in kebab case}-${attribute name in kebab case}-selected"
                        style={{
                          border: 2,
                          borderStyle: "solid",
                          padding: 10,
                          marginRight: 10,
                          backgroundColor:
                            option === attribute.selected ? option : option,
                          fontWeight:
                            option === attribute.selected ? "bold" : "normal",
                          color:
                            option === attribute.selected ? "white" : "black",
                        }}
                      ></span>
                    ))}
                </div>
              </div>
            ))}
          </div>

          <div className="col-1 cartQuantityButtons d-flex flex-column justify-content-between align-items-center">
            <button
              className="quantityButtons d-flex justify-content-center align-items-center"
              onClick={() =>
                props.handleIncreaseQuantity(item.id, item.attributes)
              }
              data-testid="cart-item-amount-increase"
            >
              +
            </button>
            {item.quantity}
            <button
              className="quantityButtons d-flex justify-content-center align-items-center"
              onClick={() =>
                props.handleDecreaseQuantity(item.id, item.attributes)
              }
              data-testid="cart-item-amount-decrease"
            >
              -
            </button>
          </div>

          <div className="cartAlign col-4 cartImage d-flex align-items-center">
            <img
              style={{ width: 150, height: 200 }}
              src={item.galleries[0].url}
            ></img>
          </div>
        </div>
      ))}

      <div className="d-flex robotoFont-500 justify-content-between align-items-center mb-3">
        <div style={{ fontWeight: 500, fontSize: 16 }}>Total</div>
        <div data-testid="cart-total">${totalCost}</div>
      </div>

      <button
        disabled={props.cartItems.length == 0}
        onClick={props.handlePlaceOrder}
        className="addToCartButton d-flex justify-content-center align-items-center"
        style={{
          fontWeight: 600,
          backgroundColor:props.cartItems.length == 0 ? "grey" : "",
        }}
      >
        PLACE ORDER
      </button>
    </div>
  );
};
export default CartList;
