import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';

function App() {
  return (
     <BrowserRouter>
         <Nav />
       <Routes>
         <Route path="/" element={<Home />} />
       </Routes>
       <Footer />
     </BrowserRouter>
  );
 }
 
 export default App;
