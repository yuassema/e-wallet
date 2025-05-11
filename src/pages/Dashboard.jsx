import Balance from '../components/Balance'
import TransactionForm from '../components/TransactionForm'
import TransactionList from '../components/TransactionList'

function Dashboard() {
	return (
		<div className='min-h-screen bg-gray-100 p-4'>
			<div className='max-w-4xl mx-auto'>
				<Balance />
				<TransactionForm />
				<TransactionList />
			</div>
		</div>
	)
}

export default Dashboard
