import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
  return (
    <main className="d-flex justify-content-center align-content-center">
      <Spinner
        animation="border"
        role="status"
        style={{
          marginTop: '35vh',
          width: '5rem',
          height: '5rem',
          color: '#00695a'
        }}
      >
        <span className="sr-only">Loading...</span>
      </Spinner>
    </main>
  );
};

export default Loading;
