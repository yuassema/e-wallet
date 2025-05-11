import { useSelector } from 'react-redux'

function Balance() {
	const transactions = useSelector(state => state.transactions.list)

	const balance = transactions.reduce((acc, tx) => {
		return tx.type === 'income'
			? acc + Number(tx.amount)
			: acc - Number(tx.amount)
	}, 0)

	return (
		<div className='max-w-md mx-auto p-4 mb-4 bg-white shadow-md rounded'>
			<h2 className='text-xl font-bold'>Текущий баланс</h2>
			<p
				className={`text-2xl ${
					balance >= 0 ? 'text-green-500' : 'text-red-500'
				}`}
			>
				{balance.toFixed(2)} ₽
			</p>
		</div>
	)
}

export default Balance
