import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { alertType } from '../../../appTypes';

const Alert = (props: any) => {

  return (
    props.alerts !== null &&
    props.alerts.map((alert: any) => {
      return (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
          {alert.msg}
        </div>
      );
    })
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state: any) => ({
  alerts: state.alert,
});
export default connect(mapStateToProps)(Alert);
