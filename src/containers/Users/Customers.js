// import Sort from '../../components/Sort/Sort';
// import Paging from '../../components/Paging/Paging';
import useHttp from '../../hooks/useHttp';
import PropTypes from 'prop-types';
import { BASE_URL } from '../../common/constants';
import CustomerCard from '../../components/Customers/CustomerCard';
import Loading from '../../components/UI/Loading';

const Customers = ({ registerCustomerMode, setRegisterCustomerMode, allCurrencies, customersQuery }) => {
  const {
    data,
    // setLocalData,
    loading
    // error
  } = useHttp(`${BASE_URL}/users${customersQuery}`, 'GET', [], [customersQuery]);

  if (loading) {
    return <Loading />;
  }

  // if (error === '404') {
  //   history.push('*');
  // } else if (error) {
  //   history.push('/serviceUnavailable');
  // }

  const customersListToShow = (
    <div className="customer-list">
      {data.map((customer) => {
        return (
          <CustomerCard
            className="customer-card"
            key={customer.userId}
            customer={customer}
            registerCustomerMode={registerCustomerMode}
            setRegisterCustomerMode={setRegisterCustomerMode}
            allCurrencies={allCurrencies}
          />
        );
      })}
    </div>
  );

  const emptyCustomer = {
    firstName: '',
    lastName: '',
    companyName: '',
    phone: '',
    email: '',
    reenteredEmail: '',
    country: '',
    city: '',
    postalCode: '',
    streetAddress: ''
  };
  return (
    <main>
      <div className="container-inner">
        <div className="customers-container-header">
          {/* <Form className="sorting">
            <div>Sorting Options</div>
            <Sort resource="/customers" />
          </Form> */}
          {/* {user.role === 'employee' && (
            <Button
              className="create-customer-btn btn-success"
              onClick={() => history.push('/users/create')}
            >
              Create customer
            </Button>
          )} */}
        </div>
        {registerCustomerMode && (
          <CustomerCard
            className="customer-card"
            customer={emptyCustomer}
            registerCustomerMode={registerCustomerMode}
            setRegisterCustomerMode={setRegisterCustomerMode}
            allCurrencies={allCurrencies}
          />
        )}
        {!registerCustomerMode && (data.length ? <ul>{customersListToShow}</ul> : <h2> No customers are found... </h2>)}
        {/* <div id="paging-customers">
          <Paging resource="/customers" />
        </div> */}
      </div>
    </main>
  );
};

Customers.defaultProps = {
  registerCustomerMode: false
};

Customers.propTypes = {
  registerCustomerMode: PropTypes.bool.isRequired,
  setRegisterCustomerMode: PropTypes.func.isRequired,
  allCurrencies: PropTypes.array.isRequired,
  customersQuery: PropTypes.string
};

export default Customers;