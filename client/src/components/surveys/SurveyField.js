import React, { Component } from "react";

class SurveyField extends Component {
  renderFields() {
    let {
      input,
      label,
      meta: { touched, error }
    } = this.props;
    return (
      <div>
        <div>
          <label>{label}</label>
          <input {...input} style={{ marginBottom: "5px" }} />
        </div>
        <div className="red-text" style={{ marginBottom: "20px" }}>
          {touched && error}
        </div>
      </div>
    );
  }

  render() {
    // console.log(this.props);
    return <div>{this.renderFields()}</div>;
  }
}

export default SurveyField;
