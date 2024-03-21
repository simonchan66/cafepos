import Navigation from '../Components/Navigation';
import AccountManagementPage from '../Components/AccountPage';

const AllStatsPage = () => {
  return (
    <div className="container">
      <div className="navigation">
        <Navigation />
      </div>
      <div className="content">
        <AccountManagementPage />
      </div>
    </div>
  );
};

export default AllStatsPage;