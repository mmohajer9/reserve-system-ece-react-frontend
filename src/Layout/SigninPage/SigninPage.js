import React from "react";
import Signin from "../../Components/Signin/Signin";
import { withRouter } from "react-router";

class SigninPage extends React.Component {
  render() {
    return (
      <div className="signin-page">
        <Signin />
      </div>
    );
  }
}

export default withRouter(SigninPage);
