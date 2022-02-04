import { createSelector } from "reselect";

const cartSelecetor = (state) => state.carts;

export const getCarts = createSelector([cartsSelector], (state) => state.list);

export const getSUbtotal = createSelector(
    [cartsSelector],
    (state) => state.subtotal
);