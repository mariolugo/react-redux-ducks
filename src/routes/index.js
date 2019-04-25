import { HomePage, PokemonsPage } from '../views/pages';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    exact: true,
  },
  {
    path: '/pokemons',
    name: 'Pokemons',
    component: PokemonsPage,
    exact: true,
  },
  // {
  //   path: '/',
  //   name: 'List',
  //   component: HomePage,
  //   exact: true,
  // },
  // {
  //   path: '/',
  //   name: 'Items',
  //   component: HomePage,
  //   exact: true,
  // }
//   {
//     path: '*',
//     name: '404',
//     component: NotFoundPage,
//   },
];

export default routes;