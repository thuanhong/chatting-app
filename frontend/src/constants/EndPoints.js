export const EndPoints = {
  AUTHENTICATION: {
    login: '/auth/login/',
    logout: '/auth/logout',
    sign_up: '/auth/sign-up/',
  },
  HEALTH: {
    health_check_authenticated: 'api/v1/users/info',
  },
  USER: {
    general_user_endpoint: 'api/v1/users',
    check_user_exist: 'api/v1/users/info',
    get_user_contact: 'api/v1/users/contact',
    search_user_with_email: 'api/v1/users/search',
  },
  GROUP: {
    general_group_chat_endpoint: '/api/v1/group-chat',
  },
};
