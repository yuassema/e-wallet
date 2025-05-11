import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { registerUser, loginUser } from '../../api/api'

export const register = createAsyncThunk(
	'auth/register',
	async (data, { rejectWithValue }) => {
		try {
			const response = await registerUser(data) // Firebase возвращает { user }
			return response // Возвращаем напрямую
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

export const login = createAsyncThunk(
	'auth/login',
	async (data, { rejectWithValue }) => {
		try {
			const response = await loginUser(data) // Firebase возвращает { user }
			return response // Возвращаем напрямую
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: null,
		isAuthenticated: false,
		loading: false,
		error: null,
	},
	reducers: {
		logout: state => {
			state.user = null
			state.isAuthenticated = false
		},
	},
	extraReducers: builder => {
		builder
			.addCase(register.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(register.fulfilled, (state, action) => {
				state.loading = false
				state.user = action.payload.user
				state.isAuthenticated = true
			})
			.addCase(register.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
			.addCase(login.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(login.fulfilled, (state, action) => {
				state.loading = false
				state.user = action.payload.user
				state.isAuthenticated = true
			})
			.addCase(login.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
	},
})

export const { logout } = authSlice.actions
export default authSlice.reducer
