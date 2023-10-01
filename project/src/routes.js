const routes = {
  main: '/', // 메인페이지
  upload: '/upload/:category',
  login: '/login',
  signUp: '/signUp',
  myPage: '/myPage',
  category: '/:category',
  detail: '/:category/:id',
  secretDetail: '/secret/:category/:id',
  passwordSearch: '/password_search',
  newPassword: '/new_password',
  edit: '/edit/:id',
  editSecret: '/edit/secret/:id',
  kakao: '/kakao_callback',
};
export default routes;
