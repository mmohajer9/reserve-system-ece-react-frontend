import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./ChooseUniversity.css";
import { API_URL } from "../../../Commons";
import Axios from "axios";
import { setUniversity, setDepartment } from "../../../Actions";
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

class ChooseUniversity extends React.Component {
  state = {
    options: []
  };

  async componentDidMount() {
    const url = API_URL + "api/reserve-system/universities/";
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
            id="combo-box-demo"
            dir="rtl"
            options={this.state.options}
            getOptionLabel={option => option.name}
            style={{ width: "100%" }}
            renderInput={params => (
              <TextField
                {...params}
                label="دانشگاه خود را انتخاب کنید "
                variant="outlined"
                fullWidth
              />
            )}
            onChange={(event, value) => {
              if (value) {
                this.props.dispatch(setUniversity(value.id, value.name));
                this.props.dispatch(setDepartment("", ""));
              } else {
                this.props.dispatch(setUniversity("", ""));
                this.props.dispatch(setDepartment("", ""));
              }
            }}
            defaultValue={{
              id: this.props.university_id,
              name: this.props.university_name
            }}
          />
        </ThemeProvider>
      </StylesProvider>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(ChooseUniversity);
