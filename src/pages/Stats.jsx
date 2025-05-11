import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis } from 'recharts'
import { useSelector } from 'react-redux'

function Stats() {
	const transactions = useSelector(state => state.transactions.list)
	const data = transactions.reduce((acc, tx) => {
		const cat = acc.find(item => item.name === tx.category) || {
			name: tx.category,
			value: 0,
		}
		cat.value += tx.amount
		if (!acc.includes(cat)) acc.push(cat)
		return acc
	}, [])

	return (
		<div className='p-4'>
			<h2 className='text-xl mb-4'>Статистика</h2>
			<PieChart width={400} height={400}>
				<Pie
					data={data}
					dataKey='value'
					nameKey='name'
					cx='50%'
					cy='50%'
					outerRadius={100}
				>
					{data.map((entry, index) => (
						<Cell
							key={`cell-${index}`}
							fill={['#ff4444', '#00C49F', '#FFBB28'][index % 3]}
						/>
					))}
				</Pie>
			</PieChart>
		</div>
	)
}

export default Stats
