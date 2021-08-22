import Router from 'next/router';

const navigateTo = ({ url, as, options }) => {
  Router.push(url, as, options);
};

const goBack = () => Router.back();

export const navigationService = {
  navigateTo,
  goBack,
};
