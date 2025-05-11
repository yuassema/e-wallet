import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import transactionReducer from './slices/transactionSlice'
import categoryReducer from './slices/categorySlice'

export default configureStore({
	reducer: {
		auth: authReducer,
		transactions: transactionReducer,
		categories: categoryReducer,
	},
})
