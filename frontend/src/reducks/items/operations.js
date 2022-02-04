import API from "../../API";
import { fetchItemsAction } from "./actions";

const api = new API();

ecport const fetchItems = () => {
    return async (dispatch) => {
        retrun api
            .getItems()
            .then((items) => {
                dispatch(fetchItemsActions(items));
            })
            .catch((error) => {
                alert("Failed to connect API: /items/");
            });
    };
};