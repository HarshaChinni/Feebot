import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
// import { getFormMeta, getFormSyncErrors } from "redux-form";
import validateEmails from "../../utils/validateEmails";

import _ from "lodash";

import SurveyField from "./SurveyField";
import formFields from "./formFields";

class SurveyForm extends Component {
  renderFields() {
    return _.map(formFields, ({ name, label }) => {
      return (
        <Field
          key={name}
          name={name}
          component={SurveyField}
          type="text"
          label={label}
        />
      );
    });
  }

  render() {
    // console.log(this.props);
    return (
      <div style={{ padding: "20px", margin: "20px" }}>
        <form
          style={{ padding: "10px" }}
          onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}
        >
          {this.renderFields()}
          <div>
            <Link className="red btn-flat white-text" to={"/surveys"}>
              Cancel
            </Link>
            <button type="submit" className="green btn-flat right white-text">
              Review
              <i className="material-icons right">done</i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

function validate(values) {
  //   console.log("validate method: ", values);
  const error = {};

  error.recipients = validateEmails(values.recipients || "");

  _.each(formFields, ({ name, label }) => {
    if (!values[name]) {
      error[name] = `You must provide ${label} value`;
    }
  });

  return error;
}

export default reduxForm({
  form: "surveyForm",
  validate,
  destroyOnUnmount: false
})(SurveyForm);
