import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Product from './pages/Product'
import MailClub from './pages/MailClub'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Admin from './pages/Admin'
import Payment from './pages/Payment'
import Confidentialite from './pages/Confidentialite'
import Expedition from './pages/Expedition'
import Cookies from './pages/Cookies'
import Remboursement from './pages/Remboursement'
import CGV from './pages/CGV'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/"          element={<Home />} />
          <Route path="/catalogue" element={<Catalog />} />
          <Route path="/produit/:id" element={<Product />} />
          <Route path="/mail-club" element={<MailClub />} />
          <Route path="/a-propos"  element={<About />} />
          <Route path="/contact"   element={<Contact />} />
          <Route path="/connexion" element={<Login />} />
          <Route path="/inscription" element={<Signup />} />
          <Route path="/mon-espace" element={<Profile />} />
          <Route path="/admin"     element={<Admin />} />
          <Route path="/paiement"  element={<Payment />} />
          <Route path="/confidentialite" element={<Confidentialite />} />
          <Route path="/expedition" element={<Expedition />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/remboursement" element={<Remboursement />} />
          <Route path="/cgv" element={<CGV />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App