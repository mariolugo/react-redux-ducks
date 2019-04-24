import { HomePage } from '../views/pages';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    exact: true,
  },
//   {
//     path: '*',
//     name: '404',
//     component: NotFoundPage,
//   },
];

export default routes;