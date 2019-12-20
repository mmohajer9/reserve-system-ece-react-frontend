import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./ChooseDepartment.css";
import { API_URL } from "../../../Commons";
import Axios from "axios";
import { setDepartment } from "../../../Actions";
import { connect } from "react-redux";
import {
  createMuiTheme,
  ThemeProvider,
  jssPreset,
  StylesProvider
} from "@material-ui/core/styles";
import rtl from "jss-rtl";
import { create } from "jss";

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const theme = createMuiTheme({
  direction: "rtl" // Both here and <body dir="rtl">
});

class ChooseDepartment extends React.Component {
  state = {
    options: []
  };

  async componentDidMount() {
    const url =
      API_URL + "api/reserve-system/departments/" + this.props.university_id;
    await Axios.get(url)
      .then(res => {
        this.setState({
          options: res.data
        });
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  render() {
    return (
      <StylesProvider jss={jss}>
        <ThemeProvider theme={theme}>
          <Autocomplete
            disabled={this.props.university_id === ""}
            id="combo-box-demo"
            dir="rtl"
            options={this.state.options}
            getOptionLabel={option => option.name}
            style={{ width: "100%" }}
            renderInput={params => (
              <TextField
                {...params}
                label={
                  this.props.university_id === ""
                    ? "لطفا ابتدا دانشگاه خود را انتخاب کنید"
                    : "دانشکده خود را انتخاب کنید "
                }
                variant="outlined"
                fullWidth
              />
            )}
            onChange={(event, value) => {
              if (value) {
                this.props.dispatch(setDepartment(value.id, value.name));
              } else {
                this.props.dispatch(setDepartment("", ""));
              }
            }}
            defaultValue={
              this.props.department_id === ""
                ? null
                : {
                    id: this.props.department_id,
                    name: this.props.department_name
                  }
            }
          />
        </ThemeProvider>
      </StylesProvider>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(ChooseDepartment);
