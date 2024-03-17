import Navigation from '../Components/Navigation';
import OrderPage from '../Components/OrderPage';

const Home = () => {
  return (
    <div className="container">
      <div className="navigation">
        <Navigation />
      </div>
      <div className="order-page">
        <OrderPage />
      </div>
    </div>
  );
};

export default Home;