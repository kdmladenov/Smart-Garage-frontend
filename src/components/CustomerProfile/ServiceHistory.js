import { MDBBtn, MDBIcon } from 'mdbreact';
import PropTypes from 'prop-types';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import './ServiceHistory.css';

const ServiceHistory = ({ visits }) => {
  const createTimelineElement = (e) => {
    return (
      <VerticalTimelineElement
        key={e.visitId}
        className="vertical-timeline-element--review"
        contentStyle={{ background: '#42414094', color: '#fff', border: '1px solid #fff' }}
        contentArrowStyle={{ borderRight: '7px solid  #fff' }}
        iconStyle={{ background: '#466d61', color: '#fff' }}
        icon={<MDBIcon icon="galactic-republic" />}
      >
        <span className="date-top">{new Date(e.visitStart).toLocaleDateString('ca-ES')}</span>
        {e.status === 'ready' && <span className="date-bottom">{new Date(e.visitEnd).toLocaleDateString('ca-ES')}</span>}
        {/* <Link to={`/books/${bookId}`}>
          <img className="book-cover" src={`${BASE_URL}/${e.front_cover}`} alt="front cover" />
        </Link> */}
        <div className="timeline-element-info">
          <h4 className="vertical-timeline-element-vehicle">{`${e.licensePlate}  ${e.manufacturerName} ${e.modelName}`}</h4>
          <h5 className="vertical-timeline-element-notes">{e.notes}</h5>
          <div>
            <MDBBtn type="button">details</MDBBtn>
            <h5 className="vertical-timeline-element-status">{e.status}</h5>
          </div>
        </div>
      </VerticalTimelineElement>
    );
  };

  return (
    <VerticalTimeline
      // layout="2-columns"
      layout="1-column-left"
    >
      {visits.map(e => createTimelineElement(e))}
    </VerticalTimeline>
  );
};

ServiceHistory.propTypes = {
  visits: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ServiceHistory;
