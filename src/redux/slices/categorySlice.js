import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getCategories, addCategory, deleteCategory } from '../../api/api'

export const fetchCategories = createAsyncThunk(
	'categories/fetch',
	async (_, { rejectWithValue }) => {
		try {
			const response = await getCategories()
			return response // Firebase возвращает массив
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

export const createCategory = createAsyncThunk(
	'categories/create',
	async (data, { rejectWithValue }) => {
		try {
			const response = await addCategory(data)
			return response // Firebase возвращает объект
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

export const removeCategory = createAsyncThunk(
	'categories/remove',
	async (id, { rejectWithValue }) => {
		try {
			await deleteCategory(id)
			return id
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

const categorySlice = createSlice({
	name: 'categories',
	initialState: {
		list: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchCategories.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchCategories.fulfilled, (state, action) => {
				state.list = action.payload
				state.loading = false
			})
			.addCase(fetchCategories.rejected, (state, action) => {
				state.error = action.payload
				state.loading = false
			})
			.addCase(createCategory.fulfilled, (state, action) => {
				state.list.push(action.payload)
				state.loading = false
			})
			.addCase(removeCategory.fulfilled, (state, action) => {
				state.list = state.list.filter(cat => cat.id !== action.payload)
				state.loading = false
			})
	},
})

export default categorySlice.reducer
