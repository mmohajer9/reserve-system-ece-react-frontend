import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./ChoosePlace.css";
import { API_URL } from "../../../Commons";
import Axios from "axios";
import {
  setSelectedPlace,
  // setSelectedDate,
  setDateTimeSlots
} from "../../../Actions";
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

class ChoosePlace extends React.Component {
  state = {
    options: []
  };

  async componentDidMount() {
    const url =
      API_URL + `api/reserve-system/places/${this.props.department_id}`;
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
            style={{ width: "50%" }}
            renderInput={params => (
              <TextField
                {...params}
                label="مکان خود را انتخاب کنید"
                variant="outlined"
                fullWidth
              />
            )}
            onChange={(event, value) => {
              if (value) {
                this.props.dispatch(setSelectedPlace(value));
              } else {
                this.props.dispatch(setSelectedPlace(""));
                this.props.dispatch(setDateTimeSlots([]));
              }
            }}
          />
        </ThemeProvider>
      </StylesProvider>
    );
  }
}

const mapStateToProps = state => {
  //   console.log(state);

  return state;
};

export default connect(mapStateToProps)(ChoosePlace);
