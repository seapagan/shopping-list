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
