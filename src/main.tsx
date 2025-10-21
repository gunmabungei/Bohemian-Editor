import { createRoot } from 'react-dom/client'
import './index.css'
import EditorUI from './editor/EditorUI.tsx'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import JournalUI from "./JournalUI.tsx";
import TestUI from "./TestUI.tsx";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route path="/edit/:journal_name/works" element={<EditorUI />} />
            <Route path="/edit/:journal_name/journal" element={<JournalUI />} />
            <Route path="/export/:journal_name" element={<TestUI />} />
        </Routes>
    </BrowserRouter>
)
