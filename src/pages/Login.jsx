import AuthForm from '../components/AuthForm'

function Login() {
	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-100'>
			<AuthForm isRegister={false} />
		</div>
	)
}

export default Login
