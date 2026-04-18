import { createRoot } from 'react-dom/client'
import './index.css'
import EditorUI from './pages/edit/works.tsx'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Journal from './pages/edit/journal.tsx'
import TestUI from './pages/TestUI.tsx'
import SelectPage from './pages/SelectPage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import UnauthorizedPage from './pages/UnauthorizedPage.tsx'
import AuthCallback from './pages/AuthCallback.tsx'
import { AuthGuard } from './components/AuthGuard.tsx'

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<Routes>
			<Route path='/login' element={<LoginPage />} />
			<Route path='/unauthorized' element={<UnauthorizedPage />} />
			<Route path='/auth/callback' element={<AuthCallback />} />
			<Route path='/' element={<AuthGuard><SelectPage /></AuthGuard>} />
			<Route path='/edit/:journal_name/works' element={<AuthGuard><EditorUI /></AuthGuard>} />
			<Route path='/edit/:journal_name/journal' element={<AuthGuard><Journal /></AuthGuard>} />
			<Route path='/export/:journal_name' element={<AuthGuard><TestUI /></AuthGuard>} />
			<Route path='*' element={<Navigate to='/' replace />} />
		</Routes>
	</BrowserRouter>
)
