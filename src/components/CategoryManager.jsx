import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createCategory, removeCategory } from '../redux/slices/categorySlice' // Исправлено: addCategory -> createCategory, deleteCategory -> removeCategory

function CategoryManager() {
	const dispatch = useDispatch()
	const categories = useSelector(state => state.categories.list)
	const [name, setName] = useState('')

	const handleAdd = e => {
		e.preventDefault()
		dispatch(createCategory({ name })) // Исправлено: addCategory -> createCategory
		setName('')
	}

	return (
		<div className='max-w-md mx-auto p-4'>
			<h2 className='text-xl mb-4'>Управление категориями</h2>
			<form onSubmit={handleAdd} className='mb-4'>
				<input
					type='text'
					value={name}
					onChange={e => setName(e.target.value)}
					placeholder='Название категории'
					className='w-full p-2 border rounded mb-2'
				/>
				<button
					type='submit'
					className='w-full bg-blue-500 text-white p-2 rounded'
				>
					Добавить
				</button>
			</form>
			<ul className='space-y-2'>
				{categories.map(cat => (
					<li
						key={cat.id}
						className='flex justify-between p-2 bg-gray-100 rounded'
					>
						{cat.name}
						<button
							onClick={() => dispatch(removeCategory(cat.id))} // Исправлено: deleteCategory -> removeCategory
							className='text-red-500 hover:underline'
						>
							Удалить
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}

export default CategoryManager
