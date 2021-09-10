export const EndPoints = {
  AUTHENTICATION: {
    login: '/auth/login/',
    logout: '/auth/logout',
    token: '/auth/token/',
  },
  HEALTH:{
    health_check_authenticated:'/api/check-health/health'
  },
  USER:{
    save_info_user:'api/v1/users',
    check_user_exist:'api/v1/users/info'
  }
};
