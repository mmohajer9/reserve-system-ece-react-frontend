import React from "react";
import Signin from "../../Components/Signin/Signin";
import { withRouter } from "react-router";
import { connect } from "react-redux";

class SigninPage extends React.Component {
  componentDidMount() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      if (userInfo.login_status) {
        if (userInfo.user.is_superuser || userInfo.user.is_staff) {
          this.props.history.push("/panel/admin/");
        }
        else
        {
          this.props.history.push("/panel/user/");
        }
      }
    }
  }

  render() {
    return (
      <div className="signin-page">
        <Signin />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(withRouter(SigninPage));
