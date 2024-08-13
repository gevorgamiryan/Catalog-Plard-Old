import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const productsUrl = 'http://localhost:4000/products'

const categoriesUrl = 'http://localhost:4000/categories'

const usersUrl = 'http://localhost:4000/users'



export const getCategories = createAsyncThunk("categories/getCategories", async () => {
    try {
        const { data } = await axios.get(categoriesUrl);
        return data;
    } catch (error) {
        return []
    }
}
);
export const getProducts = createAsyncThunk("products/getProducts", async (payload) => {
    try {
        const { data } = await axios.get(productsUrl);
        return data;
    } catch (error) {
        return []
    }

}
);
export const addCategories = createAsyncThunk("categories/setCategories", async (category) => {
    try {
        const { data } = await axios.post(categoriesUrl, category)
        return data

    } catch (err) {
        return []
    }
})

export const addSubCategory = createAsyncThunk("categories/setSubCategories", async (category) => {
    try {

        const { data } = await axios.patch(categoriesUrl + '/' + category.id, category)
        return data
    } catch (err) {
        return []
    }
})
export const deletProduct = createAsyncThunk("products/deleteProduct", async (payload) => {
    try {
        return payload
    } catch (error) {
        return error
    }
}
);
export const addUser = createAsyncThunk("users/addUser", async (payload) => {
    try {
        await axios.post(usersUrl, payload);
        return payload
    } catch (error) {
        throw error
    }
}
);
export const addProduct = createAsyncThunk("product/addProduct", async (payload) => {
    try {
        const { data } = await axios.post(productsUrl, payload);
        return data
    } catch (error) {
        throw error
    }
}
);

const initialState = {
    allProducts: [],
    categories: [],
    user: {},
    golds: [
        {
            color: "#c0c0c0",
            prob: 585
        },
        {
            color: "#E9D07A",
            prob: 585
        },
        {
            color: "#EDC8C8",
            prob: 585
        },
        {
            color: "#c0c0c0",
            prob: 750
        },
        {
            color: "#E9D07A",
            prob: 750
        },
        {
            color: "#EDC8C8",
            prob: 750
        },
    ]
}

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setUser: (state, action) => {
            sessionStorage.setItem("user", JSON.stringify(action.payload));
            state.user = action.payload
        },
        logOutUser: () => {
            sessionStorage.removeItem("user");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.fulfilled, (state, action) => {
                state.categories = action.payload
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.allProducts = action.payload
            })
            .addCase(addCategories.fulfilled, (state, action) => {
                state.categories.push(action.payload)
            })
            .addCase(addSubCategory.fulfilled, (state, action) => {
                state.categories = state.categories.map((el) => {
                    return el.id === action.payload.id ? { ...action.payload } : el
                })
            })
            .addCase(deletProduct.fulfilled, (state, action) => {
                state.allProducts = state.allProducts.filter((el) => el.id !== action.payload.id)
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                if (action.data) state.allProducts.push(action.payload)
            })



    }

})

export const selectAllProducts = (state) => state.products.allProducts;
export const selectCategories = (state) => state.products.categories;
export const selectGolds = (state) => state.products.golds;
export const selectProductsSlice = (state) => state.products;

export const userSelect = (state) => state.products.user;
export const { setUser, logOutUser } = productSlice.actions;
export default productSlice.reducer;