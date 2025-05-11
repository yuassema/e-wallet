import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login, register } from '../redux/slices/authSlice'

function AuthForm({ isRegister }) {
	const dispatch = useDispatch()
	const [formData, setFormData] = useState({ email: '', password: '' })

	const handleSubmit = e => {
		e.preventDefault()
		if (isRegister) {
			dispatch(register(formData))
		} else {
			dispatch(login(formData))
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='max-w-md mx-auto p-4 bg-white shadow-md rounded'
		>
			<h2 className='text-2xl mb-4'>{isRegister ? 'Регистрация' : 'Вход'}</h2>
			<div className='mb-4'>
				<label className='block text-gray-700'>Email</label>
				<input
					type='email'
					value={formData.email}
					onChange={e => setFormData({ ...formData, email: e.target.value })}
					className='w-full p-2 border rounded'
					required
				/>
			</div>
			<div className='mb-4'>
				<label className='block text-gray-700'>Пароль</label>
				<input
					type='password'
					value={formData.password}
					onChange={e => setFormData({ ...formData, password: e.target.value })}
					className='w-full p-2 border rounded'
					required
				/>
			</div>
			<button
				type='submit'
				className='w-full bg-blue-500 text-white p-2 rounded'
			>
				{isRegister ? 'Зарегистрироваться' : 'Войти'}
			</button>
		</form>
	)
}

export default AuthForm
