import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createTransaction } from '../redux/slices/transactionSlice' // Используем createTransaction

function TransactionForm() {
	const dispatch = useDispatch()
	const categories = useSelector(state => state.categories.list)
	const [formData, setFormData] = useState({
		type: 'expense',
		amount: '',
		category: '',
		date: new Date().toISOString().split('T')[0],
		comment: '',
	})

	const handleSubmit = e => {
		e.preventDefault()
		dispatch(createTransaction(formData))
		setFormData({
			type: 'expense',
			amount: '',
			category: '',
			date: new Date().toISOString().split('T')[0],
			comment: '',
		})
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='max-w-md mx-auto p-4 bg-white shadow-md rounded'
		>
			<h2 className='text-xl mb-4'>Добавить транзакцию</h2>
			<div className='mb-4'>
				<label className='block text-gray-700'>Тип</label>
				<select
					value={formData.type}
					onChange={e => setFormData({ ...formData, type: e.target.value })}
					className='w-full p-2 border rounded'
				>
					<option value='expense'>Расход</option>
					<option value='income'>Доход</option>
				</select>
			</div>
			<div className='mb-4'>
				<label className='block text-gray-700'>Сумма</label>
				<input
					type='number'
					value={formData.amount}
					onChange={e => setFormData({ ...formData, amount: e.target.value })}
					className='w-full p-2 border rounded'
					required
				/>
			</div>
			<div className='mb-4'>
				<label className='block text-gray-700'>Категория</label>
				<select
					value={formData.category}
					onChange={e => setFormData({ ...formData, category: e.target.value })}
					className='w-full p-2 border rounded'
				>
					<option value=''>Выберите категорию</option>
					{categories.map(cat => (
						<option key={cat.id} value={cat.id}>
							{cat.name}
						</option>
					))}
				</select>
			</div>
			<div className='mb-4'>
				<label className='block text-gray-700'>Дата</label>
				<input
					type='date'
					value={formData.date}
					onChange={e => setFormData({ ...formData, date: e.target.value })}
					className='w-full p-2 border rounded'
				/>
			</div>
			<div className='mb-4'>
				<label className='block text-gray-700'>Комментарий</label>
				<input
					type='text'
					value={formData.comment}
					onChange={e => setFormData({ ...formData, comment: e.target.value })}
					className='w-full p-2 border rounded'
				/>
			</div>
			<button
				type='submit'
				className='w-full bg-blue-500 text-white p-2 rounded'
			>
				Добавить
			</button>
		</form>
	)
}

export default TransactionForm
