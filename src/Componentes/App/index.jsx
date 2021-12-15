import { BrowserRouter, Routes, Route } from 'react-router-dom'

import '../../css/reset.css'
import '../../css/style.css'

import Inicial from '../Inicial'
import Assentos from '../Assento'
import Sessoes from '../Sessao'

export default function App() {
    return (
        <BrowserRouter >
            <Routes>
                <Route path='/' element={<Inicial />} />
                <Route path='/sessoes' element={<Sessoes />} />
                <Route path='/assentos' element={<Assentos />} />
            </Routes>
        </BrowserRouter>
    )
}