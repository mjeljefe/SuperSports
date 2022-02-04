import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import API from "../API";
import { getCarts, getSubtotal } from "../reducks/carts/selectors";
import { fetchCarts } from "../reducks/carts/operations";
import { addOrder } from "../reducks/order/operations";
import { push } from "connected-react-router";
const api = new API();

const Shipping = () => {
  const selector = useSelector((state) => state);
  const dispatch = useDispatch();

  const subtotal = getSubtotal(selector);
  const carts = getCarts(selector);

  const [full_name, setFullName] = useState(""),
    [phone, setPhone] = useState(""),
    [address, setAddress] = useState(""),
    [pincode, setPincode] = useState(""),
    [apt, setApt] = useState(""),
    [city, setCity] = useState(""),
    [state, setState] = useState(""),
    [totalitem, setTotalItem] = useState(0);

  useEffect(() => {
    dispatch(fetchCarts());
  }, []);

  useEffect(() => {
    let arr = [];
    if (carts != undefined && carts.length > 0) {
      for (let key in carts) {
        arr.push(carts[key].quantity);
      }
      let sum = arr.reduce(function (a, b) {
        return a + b;
      }, 0);
      setTotalItem(sum);
    }
  }, [carts]);

  const inputFullname = (e) => {
    setFullName(e.target.value);
  };

  const inputPhoneNumber = (e) => {
    setPhone(e.target.value);
  };

  const inputAddress = (e) => {
    setAddress(e.target.value);
  };

  const inputPin = (e) => {
    setPincode(e.target.value);
  };

  const inputHouse = (e) => {
    setApt(e.target.value);
  };

  const inputCity = (e) => {
    setCity(e.target.value);
  };

  const inputState = (e) => {
    setState(e.target.value);
  };

  const orderButton = (e) => {
    let params = {
      total_price: subtotal,
      full_name: full_name,
      address_line1: address,
      address_line2: apt,
      city: city,
      state: state,
      postal_code: pincode,
      country: "US",
      telephone: phone,
    };
    dispatch(addOrder(params));
    e.preventDefault();
    dispatch(push("order-confirmation"));
  };

  return (
    <>
      <div class="top">
        <p>- Order your items -</p>
      </div>
      <div class="shipment-details">
        <div class="shipment">
          <h2>Shipment Details</h2>
          <p>Please check your items and confirm it</p>
          <table>
            {carts &&
              carts.map((cart) => (
                <tr>
                  <td class="widder-td">{cart.item.description}</td>
                  <td class="widder-td2">{cart.quantity}</td>
                  <td>{cart.item.price}</td>
                </tr>
              ))}

            <tr class="total">
              <td class="widder-td">Total Price</td>
              <td class="widder-td2">{totalitem}</td>
              <td>${subtotal}</td>
            </tr>
          </table>
        </div>
        <div class="details">
          <form action="">
            <label for="fullName">
              Full Name<br></br>
            </label>
            <input
              type="text"
              placeholder="Enter Recipient's name"
              name="fullName"
              required
              onChange={inputFullname}
              value={full_name}
            />
            <br></br>
            <label for="phone">
              Phone Number <br></br>
            </label>
            <input
              type="tel"
              placeholder="Enter Phone Number"
              name="phone"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              required
              onChange={inputPhoneNumber}
              value={phone}
            />
            <br></br>
            <label for="Address">
              Street address or P.O. Box<br></br>
            </label>
            <input
              type="text"
              placeholder="Enter Street address or P.O. Box"
              name="Address"
              required
              onChange={inputAddress}
              value={address}
            />
            <br></br>
            <label for="pincode">
              PIN Code <br></br>
            </label>
            <input
              type="tel"
              placeholder="Enter Pin Code"
              name="pincode"
              pattern="[0-9]{6}"
              required
              onChange={inputPin}
              value={pincode}
            />
            <br></br>
            <label for="Address2">
              Apt, suite, unit, building, floor, etc.<br></br>
            </label>
            <input
              type="text"
              placeholder="Enter Apt, suite, unit, building, floor, etc."
              name="Address2"
              required
              onChange={inputHouse}
              value={apt}
            />
            <br></br>
            <label for="city">
              City <br></br>
            </label>
            <input
              type="text"
              placeholder="Enter City"
              name="Address"
              required
              onChange={inputCity}
              value={city}
            />
            <br></br>
            <label for="State">
              State<br></br>
            </label>
            <input
              type="text"
              placeholder="Enter State"
              name="State"
              required
              onChange={inputState}
              value={state}
            />
            <br></br>
            <button value="SUBMIT" onClick={orderButton}>
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
