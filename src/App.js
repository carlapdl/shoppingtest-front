import logo from './logo.svg';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <h1 className="category-title">Women</h1>
        <ProductGrid />
      </main>
    </div>

  );
}

export default App;
