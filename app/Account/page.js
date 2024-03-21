import Navigation from '../Components/Navigation';
import AccountPage from '../Components/AccountPage';

const AllStatsPage = () => {
  return (
    <div className="container">
      <div className="navigation">
        <Navigation />
      </div>
      <div className="content">
        <AccountPage />
      </div>
    </div>
  );
};

export default AllStatsPage;