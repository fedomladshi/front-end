import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AlertType } from "../../../appTypes&Interfaces";
import { AppStateType } from "../../store";

interface Props {
  alerts: Array<AlertType>;
}
const Alert: React.FC<Props> = ({ alerts }) => {
  return (
    <section className="alert-container">
      {alerts !== null &&
        alerts.map((alert: AlertType) => {
          return (
            <div key={alert.id} className={`alert alert-${alert.alertType}`}>
              {alert.msg}
            </div>
          );
        })}
    </section>
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state: AppStateType) => ({
  alerts: state.alert,
});
export default connect(mapStateToProps)(Alert);
