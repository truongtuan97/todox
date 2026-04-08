import { Toaster } from 'sonner'
import { BrowserRouter, Routes, Route } from 'react-router';
import HomePage from './pages/home.page';
import NotFoundPage from './pages/notfound.page';

function App() {

  return (
    <>
      <Toaster richColors />

      <BrowserRouter>

        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
