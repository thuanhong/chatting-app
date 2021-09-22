export const styles = (theme) => ({
  textFieldStyle: {
    backgroundColor: 'black',
    borderRadius: '7px',
  },
  colorTextWhite: {
    color: theme.palette.common.white,
  },
  input: {
    '&::placeholder': {
      color: theme.palette.common.white,
    },
    color: theme.palette.common.white,
  },
});
