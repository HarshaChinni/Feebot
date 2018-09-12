import React from "react";

import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import formFields from "./formFields";
import _ from "lodash";

import * as actions from "../../actions";

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  console.log(formValues);
  const displayFormFields = _.map(formFields, ({ label, name }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <h5>{formValues[name]}</h5>
      </div>
    );
  });
  console.log("Mapped array ", displayFormFields);
  return (
    <div>
      <h5>Survey Form Review component</h5>
      {displayFormFields}
      <button className="btn-flat darken-3 yellow" onClick={onCancel}>
        Back
      </button>
      <button
        className="btn-flat green right"
        onClick={() => submitSurvey(formValues, history)}
      >
        Submit Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStatesToProps(state) {
  //   console.log(state);
  return {
    formValues: state.form.surveyForm.values
  };
}

export default connect(
  mapStatesToProps,
  actions
)(withRouter(SurveyFormReview));
