/* -------------------------------------------------------------------------- */
/*         This state method is no longer used but kept for reference         */
/* -------------------------------------------------------------------------- */
export const initState = values => {
  document.state = values;
  console.log(document.state);
};

export const setState = values => {
  document.state = {
    ...document.state,
    ...values,
  };
  console.log(document.state);
};
