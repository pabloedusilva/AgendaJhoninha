import { Route, Routes } from 'react-router-dom'
import { BookingProvider } from './context/BookingContext'
import { MyBookingsProvider } from './context/MyBookingsContext'
import Layout from './components/Layout'
import BookingPage from './pages/BookingPage'
import HomePage from './pages/HomePage'
import BookingModal from './pages/BookingModal'
import MyBookingsModal from './pages/MyBookingsModal'
import { ProfileProvider } from './context/ProfileContext'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <ProfileProvider>
      <BookingProvider>
        <MyBookingsProvider>
          <Routes>
            <Route path="/*" element={
              <Layout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/agendar" element={<BookingModal><BookingPage /></BookingModal>} />
                  <Route path="/agendamentos" element={<MyBookingsModal />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Layout>
            } />
          </Routes>
        </MyBookingsProvider>
      </BookingProvider>
    </ProfileProvider>
  )
}
