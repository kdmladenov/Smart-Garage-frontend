import useHttp from '../../hooks/useHttp';
import PropTypes from 'prop-types';
import { BASE_URL, defaultPageQuery } from '../../common/constants';
import PartCard from '../../components/Parts/PartCard';
import CreatePartCard from '../../components/Parts/CreatePartCard';
import Loading from '../../components/UI/Loading';
import { useState } from 'react';
import Paging from '../../components/Paging/Paging';

const Parts = ({ createPartMode, setCreatePartMode, partsQuery }) => {
  const [pagingQuery, setPagingQuery] = useState(defaultPageQuery);
  const updatePagingQuery = (prop, value) => setPagingQuery({ ...pagingQuery, [prop]: value });

  const { data, loading } = useHttp(`${BASE_URL}/parts${partsQuery}&page=${pagingQuery.page}&pageSize=${pagingQuery.pageSize}`, 'GET', [], [partsQuery, pagingQuery]);

  if (loading) {
    return <Loading />;
  }

  // if (error === '404') {
  //   history.push('*');
  // } else if (error) {
  //   history.push('/serviceUnavailable');
  // }

  const partsListToShow = (
    <div className="parts-list">
      {data.map((parts) => {
        return <PartCard className="part-card" key={parts.partId} part={parts} />;
      })}
    </div>
  );

  return (
    <main>
      <div className="container-inner">
        <div className="parts-container-header">
        </div>
        {createPartMode && <CreatePartCard setCreatePartMode={setCreatePartMode} />}
        {data.length ? <ul>{partsListToShow}</ul> : <h2> No parts are found... </h2>}
        <div id="paging-parts">
          <Paging
            updatePagingQuery={updatePagingQuery}
            resource={'parts'}
            pagingQuery={pagingQuery}
          />
        </div>
      </div>
    </main>
  );
};

Parts.defaultProps = {
  createPartMode: false
};

Parts.propTypes = {
  createPartMode: PropTypes.bool.isRequired,
  setCreatePartMode: PropTypes.func.isRequired,
  partsQuery: PropTypes.string.isRequired
};

export default Parts;
