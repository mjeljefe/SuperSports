export const FETCH_ITEM = "FETCH_ITEM";
export const fetchItemAction = (items) => {
    return {
        type: "FETCH_ITEM",
        payoad: items,
    };
};