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
        className="vertical-timeline-element"
        contentStyle={{ background: '#42414094', color: '#fff', border: '1px solid #fff' }}
        contentArrowStyle={{ borderRight: '7px solid  #fff' }}
        iconStyle={{ background: '#466d61', color: '#fff' }}
        icon={<MDBIcon icon="galactic-republic" />}
      >
        <span className="date-top">{new Date(e.visitStart).toLocaleDateString('ca-ES')}</span>
        {e.visitStatus === 'ready' && (
          <span className="date-bottom">{new Date(e.visitEnd).toLocaleDateString('ca-ES')}</span>
        )}
        {/* <Link to={`/books/${bookId}`}>
          <img className="book-cover" src={`${BASE_URL}/${e.front_cover}`} alt="front cover" />
        </Link> */}
        <div className="timeline-element-info">
          <div className="left">
            <h4 className="vertical-timeline-element-vehicle">{`${e.licensePlate}  ${e.manufacturer} ${e.modelName}`}</h4>
            <h5 className="vertical-timeline-element-notes">{e.notes}</h5>
          </div>
          <div className="right">
            <MDBBtn type="button">details</MDBBtn>
            <h5 className="vertical-timeline-element-status">{e.visitStatus}</h5>
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
      {visits.length > 0
        ? visits.map(e => createTimelineElement(e))
        : <VerticalTimelineElement
          className="vertical-timeline-element"
          contentStyle={{ background: '#42414094', color: '#fff', border: '1px solid #fff' }}
          contentArrowStyle={{ borderRight: '7px solid  #fff' }}
          iconStyle={{ background: '#466d61', color: '#fff' }}
          icon={<MDBIcon icon="galactic-republic" />}
        >
          <div>
            <h2 style={{ color: '#ffffff' }}>NO VISITS FOUND</h2>
          </div>
        </VerticalTimelineElement>}
    </VerticalTimeline>
  );
};

ServiceHistory.propTypes = {
  visits: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ServiceHistory;
