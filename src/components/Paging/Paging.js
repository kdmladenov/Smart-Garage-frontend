import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';
import DropDown from '../UI/DropDown';
// import DropDown from "../UI/DropDown";

const rangePageSize = [...Array(11)].map((_, i) => {
  return {
    label: i + 10,
    value: i + 10
  };
});

const Paging = ({ itemCount, setQuery }) => {
  const [pageSize, setPageSize] = useState(rangePageSize[0]);

  const rangePageNumber = [...Array(Math.ceil(itemCount / pageSize.value))].map(
    (_, i) => i + 1
  );

  const [pageNumber, setPageNumber] = useState(rangePageNumber[0]);

  // const history = useHistory();

  useEffect(() => {
    setQuery((`?page=${pageNumber}&pageSize=${pageSize.value}`));
    // history.push(`/${resource}?page=${pageNumber}&pageSize=${pageSize.value}`);
  }, [pageNumber, pageSize]);

  const PageButtonsList = rangePageNumber.map((number) => {
    return (
      <li key={number} className="page-item">
        <button
          type="button"
          className="page-link"
          onClick={() => {
            // history.push(`/${resource}?page=${number}&pageSize=${pageSize.value}`);
            setPageNumber(number);
          }}
        >
          {number}
        </button>
      </li>
    );
  });
  const PreviousButton = () => {
    return (
      <button
        type="button"
        className="page-link"
        onClick={() => {
          // history.push(
          //   pageNumber > 1
          //     ? `/${resource}?page=${pageNumber - 1}&pageSize=${
          //         rangePageSize[0].value
          //       }`
          //     : `/${resource}?page=1&pageSize=${pageSize.value}`
          // );
          setPageNumber(Math.max(pageNumber - 1, 1));
        }}
        aria-label="Previous"
      >
        <span aria-hidden="true">&laquo;</span>
        <span className="sr-only">Previous</span>
      </button>
    );
  };

  const NextButton = () => {
    return (
      <button
        type="button"
        className="page-link"
        onClick={() => {
          // history.push(
          //   pageNumber < rangePageNumber.length
          //     ? `/${resource}?page=${pageNumber + 1}&pageSize=${
          //         rangePageSize[0].value
          //       }`
          //     : `/${resource}?page=${rangePageNumber.length}&pageSize=${pageSize.value}`
          // );
          setPageNumber(Math.min(pageNumber + 1, rangePageNumber.length));
        }}
        aria-label="Next"
      >
        <span aria-hidden="true">&raquo;</span>
        <span className="sr-only">Next</span>
      </button>
    );
  };
  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <PreviousButton />
          </li>
          {PageButtonsList}
          <li className="page-item">
            <NextButton />
          </li>
        </ul>
      </nav>
      <DropDown
        id="pagesize-dropdown"
        selected={pageSize}
        onSelectedChange={setPageSize}
        options={rangePageSize}
        dropDownToggleId="dropdown-basic-page-size-options"
      />
    </div>
  );
};

Paging.propTypes = {
  // resource: PropTypes.string.isRequired,
  itemCount: PropTypes.number.isRequired,
  setQuery: PropTypes.func.isRequired
};
export default Paging;
