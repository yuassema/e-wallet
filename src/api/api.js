import { initializeApp } from 'firebase/app'
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth'
import {
	getFirestore,
	collection,
	addDoc,
	getDocs,
	updateDoc,
	deleteDoc,
	doc,
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCCKvdiQcltVuozxkPwHVfeAyzBEhseTEE', // Проверьте, что apiKey корректен
	authDomain: 'e-wallet-1d19a.firebaseapp.com',
	projectId: 'e-wallet-1d19a',
	storageBucket: 'e-wallet-1d19a.firebasestorage.app',
	messagingSenderId: '369762506799',
	appId: '1:369762506799:web:b54e292a8e67d2b008eda',
	measurementId: 'G-PSHJKF05GV',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

// Методы для аутентификации
const registerUser = async ({ email, password }) => {
	const userCredential = await createUserWithEmailAndPassword(
		auth,
		email,
		password
	)
	return { user: userCredential.user }
}

const loginUser = async ({ email, password }) => {
	const userCredential = await signInWithEmailAndPassword(auth, email, password)
	return { user: userCredential.user }
}

// Методы для работы с транзакциями
const transactionsRef = collection(db, 'transactions')

const getTransactions = async () => {
	const querySnapshot = await getDocs(transactionsRef)
	return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

const addTransaction = async data => {
	const docRef = await addDoc(transactionsRef, data)
	return { id: docRef.id, ...data }
}

const updateTransaction = async (id, data) => {
	const transactionDoc = doc(db, 'transactions', id)
	await updateDoc(transactionDoc, data)
	return { id, ...data }
}

const deleteTransaction = async id => {
	const transactionDoc = doc(db, 'transactions', id)
	await deleteDoc(transactionDoc)
	return id
}

// Методы для работы с категориями
const categoriesRef = collection(db, 'categories')

const getCategories = async () => {
	const querySnapshot = await getDocs(categoriesRef)
	return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

const addCategory = async data => {
	const docRef = await addDoc(categoriesRef, data)
	return { id: docRef.id, ...data }
}

const deleteCategory = async id => {
	const categoryDoc = doc(db, 'categories', id)
	await deleteDoc(categoryDoc)
	return id
}

// Экспортируем методы
export {
	auth,
	db,
	registerUser,
	loginUser,
	getTransactions,
	addTransaction,
	updateTransaction,
	deleteTransaction,
	getCategories,
	addCategory,
	deleteCategory,
}
