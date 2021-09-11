export const styles = (theme) => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover,&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
  cardStyle: {
    backgroundColor: 'transparent',
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
  textFieldStyle: {
    backgroundColor: 'black',
    borderRadius: '7px',
  },
});
