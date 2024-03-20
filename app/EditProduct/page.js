import Navigation from '../Components/Navigation';
import EditProductPage from '../Components/EditProduct';

const EditProduct = () => {
  return (
    <div className="container">
      <div className="navigation">
        <Navigation />
      </div>
      <div className="content">
        <EditProductPage />
      </div>
    </div>
  );
};

export default EditProduct;