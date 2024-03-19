import Navigation from '../Components/Navigation';
import OrderPage from '../Components/OrderPage';

const RealOrderPage = () => {
  return (
    <div className="container">
      <div className="navigation">
        <Navigation />
      </div>
      <div className="content">
        <OrderPage />
      </div>
    </div>
  );
};

export default RealOrderPage;