import {
  HomePage,
  PokemonsPage,
  ItemsPage,
  PokemonDetailPage,
  ItemDetailPage
} from "../views/pages";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
    exact: true
  },
  {
    path: "/pokemons",
    name: "Pokemons",
    component: PokemonsPage,
    exact: true
  },
  {
    path: "/items",
    name: "Items",
    component: ItemsPage,
    exact: true
  },
  {
    path: "/pokemon/:name",
    name: "Pokemon detail page",
    component: PokemonDetailPage,
    exact: true
  },
  {
    path: "/item/:name",
    name: "Item detail page",
    component: ItemDetailPage,
    exact: true
  }
  //   {
  //     path: '*',
  //     name: '404',
  //     component: NotFoundPage,
  //   },
];

export default routes;
