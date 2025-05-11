import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Stats from './pages/Stats'
import Settings from './pages/Settings'

function App() {
	const { isAuthenticated } = useSelector(state => state.auth)

	return (
		<Routes>
			<Route
				path='/login'
				element={isAuthenticated ? <Navigate to='/dashboard' /> : <Login />}
			/>
			<Route
				path='/register'
				element={isAuthenticated ? <Navigate to='/dashboard' /> : <Register />}
			/>
			<Route
				path='/dashboard'
				element={isAuthenticated ? <Dashboard /> : <Navigate to='/login' />}
			/>
			<Route
				path='/stats'
				element={isAuthenticated ? <Stats /> : <Navigate to='/login' />}
			/>
			<Route
				path='/settings'
				element={isAuthenticated ? <Settings /> : <Navigate to='/login' />}
			/>
			<Route
				path='*'
				element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} />}
			/>
		</Routes>
	)
}

export default App
