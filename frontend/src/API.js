import axios from 'axios';
const LOGIN_USER_KEY = 'WD_FORUM_LOGIN_USER_KEY';

var baseURL;
if (process.env.REACT_APP_ENVIRONMENT && process.env.REACT_APP_ENVIRONMENT === 'PRODUCTION') {
    baseURL = process.env.REACT_APP_API_BASE_URL;
} else {
    baseURL = 'http://127.0.0.1:8000';
}

const api = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

/**
 * Add requireToken: true in request config, for API that required Authorization token
 */
api.interceptors.request.use(
    config => {
        if (config.requireToken && localStorage.getItem(LOGIN_USER_KEY)) {
            config.headers.common['Authorization'] = JSON.parse(localStorage.getItem(LOGIN_USER_KEY)).token;
        }

        return config;
    },
    err => {
        console.error(err);
    }
);

export default class API {

    /// USERS /////

    signUp = async (user_name, email, password) => {
        const savedPost =await api
            .post("/users/signup", {
                user_name: user_name, 
                email: password,
                password: password,
            })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw new Error(error);
            })
        return savedPost;
    };

    signIn = async (email,password) => {
        const savedPost = await api
            .post("/users/signin", {
                email: email,
                password: password,
            })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw new Error(error);
            });
        return savedPost;
    };

    getUsers = async () => {
        const posts = await api
            .get("/users/")
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw new Error(error);
            });
        return posts;
    };

    /// ITEMS /////

    getItems = async () => {
        let url = "/items/";
        const items = await api
            .get(url)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw new Error(error);
            });
        return items;
    };

    /// CARTS /////

    getCarts = async () => {
        const carts = await api
            .get("/carts/")
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw new Error(error);
            });
        return carts;
    };

    addCarts = async (item_id) => {
        const savedCart = await api
            .post("/carts/add/", {
                item: item_id,
                quantity: 1,
            })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw new Error(error);
            });
        return savedCart;
    };

    updateCarts = async (cart_id, quantity) => {
        const savedCart = await api
            .put("/carts/update/" + cart_id + "/", {
                quantity: quantity;
            })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw new Error(error);
            });
        return savedCart;
    };

    deleteCarts = async (cart_id) => {
        const response = await api
            .put("/carts/delete/" + cart_id + "/")
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw new Error(error);
            });
        return response;
    };

    /// ORDER CHECKOUT /////

    orderAdd = async (params = {}) => {
        const order = await api
            .post("/order/add/", params)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw new Error(error);
            });
        return order;
    };

    /// REFERENCE POSTS /////

    getPosts = params => {
        return api
            .get('/posts/', { params })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw new Error(error);
            });
    };
    addPost = postBody => {
        const formData = new FormData();

        for (const key in postBody) {
            formData.append(key, postBody[key]);
        }

        return api
            .post('/posts/add/', formData)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw new Error(error);
            });
    };
    deletePost = id => {
        return api.delete(`/posts/delete/${id}/`).catch(error => {
            throw new Error(error);
        });
    };
}
