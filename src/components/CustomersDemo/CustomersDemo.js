import PropTypes from 'prop-types';

const CustomersDemo = ({ mainContainerStyle }) => {
  return (
    <main style={mainContainerStyle}>
      <div>Customers</div>
    </main>
  );
};

export default CustomersDemo;

CustomersDemo.propTypes = {
  mainContainerStyle: PropTypes.object.isRequired
};