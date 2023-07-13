import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Cover = ({ name, login, coverImg }) => {
  if ((name, login, coverImg)) {
    return (
      <div
        className="d-flex justify-content-center flex-column text-center "
        style={{
          minHeight: '100vh',
          background: '#000',
          // backgroundRepeat: 'no-repeat',
          // backgroundSize: '100% 100%',
        }}>
        <Row className="  d-flex flex-direction-row align-items-right">
          <div className="mt-auto text-light mb-0">
            <h1 style={{ color: 'orange' }}>{name}</h1>
            <p style={{ color: 'orange' }}>
              Buying and selling of books made easy{' '}
            </p>

            <p>Please connect your wallet to continue.</p>

            <Button
              onClick={login}
              variant="outline-light"
              className="rounded-pill px-3 mt-3">
              Connect Wallet
            </Button>
          </div>
        </Row>
      </div>
    );
  }

  return null;
};

Cover.propTypes = {
  name: PropTypes.string,
};

Cover.defaultProps = {
  name: '',
};

export default Cover;
