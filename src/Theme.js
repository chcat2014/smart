import {indigo700, indigo200, red600} from 'material-ui/styles/colors';

const muiTheme = {
  fontFamily: 'Helvetica, sans-serif',
  palette: {
      primary1Color: indigo700,
      accent1Color: red600,
  },
  raisedButton: {
      primaryColor: indigo700
  },
  floatingActionButton: {
      color: indigo700,
      secondaryColor: indigo700,
  },
  toggle: {
      thumbOnColor: indigo700,
      trackOnColor: indigo200
  },
  checkbox: {
      checkedColor: indigo700
  },
  radioButton: {
      checkedColor: indigo700
  },
  textField: {
      floatingLabelColor: indigo700,
      focusColor: indigo700
  }
};

export default muiTheme;
