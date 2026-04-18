import { createRoot } from 'react-dom/client'
import './index.css'
import EditorUI from './pages/edit/works.tsx'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Journal from './pages/edit/journal.tsx'
import TestUI from './pages/TestUI.tsx'
import SelectPage from './pages/SelectPage.tsx'

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<Routes>
			<Route path='/' element={<SelectPage />} />
			<Route path='/edit/:journal_name/works' element={<EditorUI />} />
			<Route path='/edit/:journal_name/journal' element={<Journal />} />
			<Route path='/export/:journal_name' element={<TestUI />} />
			<Route path='*' element={<Navigate to='/' replace />} />
		</Routes>
	</BrowserRouter>
)
