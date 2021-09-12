export const EndPoints = {
  AUTHENTICATION: {
    login: '/auth/login/',
    logout: '/auth/logout',
    token: '/auth/token/',
  },
  HEALTH: {
    health_check_authenticated: 'api/v1/users/info',
  },
  USER: {
    general_user_endpoint: 'api/v1/users',
    check_user_exist: 'api/v1/users/info',
  },
};
