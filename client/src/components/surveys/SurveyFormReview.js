import React from "react";

import { connect } from "react-redux";
import formFields from "./formFields";
import _ from "lodash";

const SurveyFormReview = ({ onCancel, formValues }) => {
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
    </div>
  );
};

function mapStatesToProps(state) {
  //   console.log(state);
  return {
    formValues: state.form.surveyForm.values
  };
}

export default connect(mapStatesToProps)(SurveyFormReview);
