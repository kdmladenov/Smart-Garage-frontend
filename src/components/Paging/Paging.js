import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { BASE_URL } from '../../common/constants';
import { getToken } from '../../providers/AuthContext';
import { Form } from 'react-bootstrap';
import './Paging.css';

const Paging = ({ resource, updatePagingQuery, pagingQuery }) => {
  const [rangePageNumber, setRangePageNumber] = useState([1]);

  useEffect(() => {
    fetch(`${BASE_URL}/${resource}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        console.log(pagingQuery);
        setRangePageNumber([...Array(Math.ceil(res[0].totalDBItems / pagingQuery.pageSize))].map((_, i) => i + 1));
      });
  }, []);

  const addStyle = (page, number) => {
    let style = {};

    if (page === number) {
      style = {
        ...style,
        backgroundColor: '#2bbbad',
        color: '#fff',
        borderRadius: '0.25rem'
      };
    }
    if (page <= 3 && number > 5) {
      style = { display: 'none ' };
    }

    if (page > 3 && ((page < number - 2) || (number < page - 2))) {
      style = { display: 'none ' };
    }
    return style;
  };

  console.log(rangePageNumber);
  const PageButtonsList = rangePageNumber.map((number) => {
    return (
      <li key={number} className="page-item">
        <button
          // style={pagingQuery.page === number ? activeStyle : { backgroundColor: 'transparent' }}
          style={addStyle(pagingQuery.page, number)}
          type="button"
          className="page-link"
          onClick={() => {
            updatePagingQuery('page', number);
          }}
        >
          {number}
        </button>
      </li>
    );
  });

  const FirstPageBtn = () => {
    return (
      <button
        type="button"
        className="page-link"
        onClick={() => {
          // updatePagingQuery('page', Math.max(pagingQuery.page - 1, 1));
          updatePagingQuery('page', 1);
        }}
        aria-label="Previous"
      >
        <span aria-hidden="true">&laquo;</span>
        <span className="sr-only">Previous</span>
      </button>
    );
  };

  const LastPageBtn = () => {
    return (
      <button
        type="button"
        className="page-link"
        onClick={() => {
          // updatePagingQuery('page', Math.min(pagingQuery.page + 1, rangePageNumber.length));
          updatePagingQuery('page', rangePageNumber.length);
        }}
        aria-label="Next"
      >
        <span aria-hidden="true">&raquo;</span>
        <span className="sr-only">Next</span>
      </button>
    );
  };

  return (
    <div className="paging">
      <Form.Control
        className="page-size-drop-down"
        as="select"
        value={pagingQuery.pageSize}
        onChange={(e) => updatePagingQuery('pageSize', e.target.value) }
      >
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
      </Form.Control>
      <nav aria-label="Page navigation example" className="page-buttons">
        <ul className="pagination">
          <li className="page-item">
            <FirstPageBtn />
          </li>
          {PageButtonsList}
          <li className="page-item">
            <LastPageBtn />
          </li>
        </ul>
      </nav>

    </div>
  );
};

Paging.propTypes = {
  resource: PropTypes.string.isRequired,
  updatePagingQuery: PropTypes.func.isRequired,
  pagingQuery: PropTypes.object.isRequired
};
export default Paging;
