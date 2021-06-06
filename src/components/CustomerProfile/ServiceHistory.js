import { MDBBtn, MDBIcon } from 'mdbreact';
import PropTypes from 'prop-types';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import VisitCardDetailed from '../Visits/VisitCardDetailed';
import './ServiceHistory.css';

const ServiceHistory = ({ visits, toggleModal, num, setDetailedVisitReport, allCurrencies }) => {
  const modalNumber = `modal${num}`;

  const showDetailedVisitReport = (visit) => {
    setDetailedVisitReport(
            <div style={{ width: '800px' }}>
              <div className="report-header">
                <div className="customer-vehicle-info">
                  <div>First Name: {visit.firstName}</div>
                  <div>Last Name: {visit.lastName}</div>
                  <div>Company Name: {visit.companyName}</div>
                  <div>Country: {visit.country}</div>
                  <div>City: {visit.city}</div>
                  <div>Address: {visit.streetAddress}</div>
                  <div>Phone: {visit.phone}</div>
                  <div>Email: {visit.email}</div>
                </div>
                <div className="customer-vehicle-info">
                  <div>License Plate: {visit.licensePlate}</div>
                  <div>VIN: {visit.vin}</div>
                  <div>Model: {visit.modelName}</div>
                  <div>Make: {visit.manufacturer}</div>
                  <div>Production Year: {visit.city}</div>
                  <div>Car-segment: {visit.carSegment}</div>
                </div>
              </div>
              <VisitCardDetailed visitId={visit.visitId} carSegment={visit.carSegment} allCurrencies={allCurrencies} />
            </div>
    );
    toggleModal(modalNumber);
  };
  // const detailedVisitReport = (visitId) => {

  //   return (
  //   );
  // };

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
        <div className="timeline-element-info">
          <div className="left">
            <h4 className="vertical-timeline-element-vehicle">{`${e.licensePlate}  ${e.manufacturer} ${e.modelName}`}</h4>
            <h5 className="vertical-timeline-element-notes">{e.notes}</h5>
          </div>
          <div className="right">
            <MDBBtn
              type="button"
              onClick={() => showDetailedVisitReport(e)}
            >details</MDBBtn>
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
  visits: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleModal: PropTypes.func.isRequired,
  num: PropTypes.number.isRequired,
  setDetailedVisitReport: PropTypes.func.isRequired,
  allCurrencies: PropTypes.array.isRequired
};

export default ServiceHistory;
