import CategoryManager from '../components/CategoryManager'

function Settings() {
	return (
		<div className='min-h-screen bg-gray-100 p-4'>
			<div className='max-w-4xl mx-auto'>
				<h1 className='text-2xl font-bold mb-4'>Настройки</h1>
				<CategoryManager />
			</div>
		</div>
	)
}

export default Settings
