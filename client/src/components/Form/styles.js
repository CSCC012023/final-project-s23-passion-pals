/**
 * formStyles.js
 *
 * This file defines the makeStyles function for creating CSS styles for a form component.
 */

import { makeStyles } from "@material-ui/core/styles";

/**
 * makeStyles - A function from Material-UI for creating CSS styles.
 * It accepts a theme object and returns an object containing the defined styles.
 */
const useStyles = makeStyles((theme) => ({
  paper: {
    /**
     * Styles for a container element that displays its contents in a column,
     * aligns items at the center, and adds padding and top margin.
     */
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(4),
    marginTop: theme.spacing(8),
  },
  heading: {
    /**
     * Styles for a heading element with a larger font size and bottom margin.
     */
    fontSize: "2.5rem",
    marginBottom: theme.spacing(4),
  },
  form: {
    /**
     * Styles for a form element that spans the entire width,
     * has top margin, and displays its contents in a column.
     */
    width: "100%",
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formControl: {
    /**
     * Styles for a form control element that spans the entire width
     * and adds a bottom margin.
     */
    width: "100%",
    marginBottom: theme.spacing(3),
  },
  fileInput: {
    /**
     * Styles for a file input element that spans the entire width
     * and adds a bottom margin.
     */
    width: "100%",
    marginBottom: theme.spacing(3),
  },
  buttonSubmit: {
    /**
     * Styles for a submit button element that adds a top margin.
     */
    marginTop: theme.spacing(2),
  },
}));

export default useStyles;

