import { useSelector, useDispatch } from 'react-redux'
import { removeTransaction } from '../redux/slices/transactionSlice'

function TransactionList() {
	const dispatch = useDispatch()
	const transactions = useSelector(state => state.transactions.list)

	return (
		<div className='max-w-2xl mx-auto p-4'>
			<h2 className='text-xl mb-4'>Последние транзакции</h2>
			<ul className='space-y-2'>
				{transactions.map(tx => (
					<li
						key={tx.id}
						className='flex justify-between p-2 bg-gray-100 rounded'
					>
						<div>
							<span>{tx.type === 'income' ? 'Доход' : 'Расход'}</span> -{' '}
							{tx.amount} ₽
							<span className='ml-2 text-gray-600'>({tx.category})</span>
						</div>
						<button
							onClick={() => dispatch(removeTransaction(tx.id))}
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

export default TransactionList
