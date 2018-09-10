import React, { Component } from "react";

import SurveyForm from "./SurveyForm";
import SurveyReview from "./SurveyFormReview";

class SurveyNew extends Component {
  state = { showFormReview: false };

  renderComponent() {
    if (this.state.showFormReview) {
      return (
        <SurveyReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }
    return (
      <SurveyForm
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }

  render() {
    return <div>{this.renderComponent()}</div>;
  }
}

export default SurveyNew;
