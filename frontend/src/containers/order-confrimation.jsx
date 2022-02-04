import React, { useEffect } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { getUser } from "../../reducks/users/selectors";
import { push } from "connected-rect-router";

const OrderConfirmation = () => {
    const selector = useSelector((state) => state);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("LOGIN_USER_KEY"));
    useEffect(() => {
        console.log(user);
    }, []);
    return (
        <>
            <section class="main01">
                <div class="top">
                    <p>- Thank You For Your Order -</p>
                </div>
                <div class="shipment-details">
                    <div class="shipment">
                        <p>
                            Thank you for your order {user.user_name}. We recieved your request. <br />
                            Our staff will be contacting you to tell you the next steps!
                        </p>
                    </div>
                </div>
                <div class="details">
                    <form action="">
                        <button onClick={() => dispatch(push("/"))}>Back to Hoome </button>
                    </form>
                </div>
            </section>
        </> 
    );
};

export default OrderConfirmation;