// import Sort from '../../components/Sort/Sort';
import useHttp from '../../hooks/useHttp';
import PropTypes from 'prop-types';
import { BASE_URL, defaultPageQuery, emptyCustomer } from '../../common/constants';
import CustomerCard from '../../components/Customers/CustomerCard';
import Loading from '../../components/UI/Loading';
import { useState } from 'react';
import Paging from '../../components/Paging/Paging';

const Customers = ({ registerCustomerMode, setRegisterCustomerMode, allCurrencies, customersQuery }) => {
  const [pagingQuery, setPagingQuery] = useState(defaultPageQuery);
  const updatePagingQuery = (prop, value) => setPagingQuery({ ...pagingQuery, [prop]: value });

  const [created, setCreated] = useState(false);
  const { data, loading } = useHttp(`${BASE_URL}/users${customersQuery}&page=${pagingQuery.page}&pageSize=${pagingQuery.pageSize}`, 'GET', [], [customersQuery, created, pagingQuery]);

  if (loading) {
    return <Loading />;
  }

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
            setCreated={setCreated}
          />
        );
      })}
    </div>
  );

  return (
    <main>
      <div className="container-inner">
        <div className="customers-container-header">
        </div>
        {registerCustomerMode && (
          <CustomerCard
            className="customer-card"
            customer={emptyCustomer}
            registerCustomerMode={registerCustomerMode}
            setRegisterCustomerMode={setRegisterCustomerMode}
            allCurrencies={allCurrencies}
            setCreated={setCreated}
          />
        )}
        {!registerCustomerMode && (data.length ? <ul>{customersListToShow}</ul> : <h2> No customers are found... </h2>)}
        <div id="paging-customers">
        <Paging
            updatePagingQuery={updatePagingQuery}
            resource={'users'}
            pagingQuery={pagingQuery}
            query={customersQuery}
          />
        </div>
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