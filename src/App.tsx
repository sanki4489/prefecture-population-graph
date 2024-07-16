import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Header />
      <main className='mainContainer'>
        <Home />
      </main>
      <Footer />
    </>
  );
}

export default App;
