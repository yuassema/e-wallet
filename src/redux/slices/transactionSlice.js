import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
	addTransaction,
	getTransactions,
	updateTransaction,
	deleteTransaction,
} from '../../api/api'

export const fetchTransactions = createAsyncThunk(
	'transactions/fetch',
	async (_, { rejectWithValue }) => {
		try {
			const response = await getTransactions()
			return response
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

export const createTransaction = createAsyncThunk(
	'transactions/create',
	async (data, { rejectWithValue }) => {
		try {
			const response = await addTransaction(data)
			return response
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

export const updateTransactionAsync = createAsyncThunk(
	'transactions/update',
	async ({ id, data }, { rejectWithValue }) => {
		try {
			const response = await updateTransaction(id, data)
			return response
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

export const removeTransaction = createAsyncThunk(
	'transactions/remove',
	async (id, { rejectWithValue }) => {
		try {
			await deleteTransaction(id)
			return id
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

const transactionSlice = createSlice({
	name: 'transactions',
	initialState: {
		list: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchTransactions.pending, state => {
				state.loading = true
			})
			.addCase(fetchTransactions.fulfilled, (state, action) => {
				state.list = action.payload
				state.loading = false
			})
			.addCase(fetchTransactions.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
			.addCase(createTransaction.fulfilled, (state, action) => {
				state.list.push(action.payload)
				state.loading = false
			})
			.addCase(updateTransactionAsync.fulfilled, (state, action) => {
				const index = state.list.findIndex(tx => tx.id === action.payload.id)
				if (index !== -1) {
					state.list[index] = action.payload
				}
				state.loading = false
			})
			.addCase(removeTransaction.fulfilled, (state, action) => {
				state.list = state.list.filter(tx => tx.id !== action.payload)
				state.loading = false
			})
	},
})

export default transactionSlice.reducer
