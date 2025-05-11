import AuthForm from '../components/AuthForm'

function Register() {
	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-100'>
			<AuthForm isRegister={true} />
		</div>
	)
}

export default Register
