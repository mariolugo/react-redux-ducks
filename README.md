# Reducks Pokedex

Redux pokedex is an application that is based on [Ducks Modular Redux](https://github.com/erikras/ducks-modular-redux), using the [Poke Api](https://pokeapi.co/docs/v2.html)

## Installation

This project was developed using node version `10.15.3`

To install this project run:

```bash
yarn
```

## Usage

Run:
```bash
yarn start
```

Go to:
```bash
http://localhost:3000
```

## Project structure
```bash
├── public
├── src
│   ├── components # pure fuctions components
│   ├── routes # application routes
│   ├── state
│   │   ├── ducks
│   │   │   ├── pokemons #pokemon redux logic (pokemons list and pokemon)
│   │   │   │   ├── actions.js #actions used to handle requests
│   │   │   │   ├── epics.js #redux observable epic used to make api calls
│   │   │   │   ├── index.js # export operations and reducer
│   │   │   │   ├── operations.js #import and export actions
│   │   │   │   ├── reducers.js # all the reducers
│   │   │   │   └── types.js # types used for actions and reducers
│   │   │   └── items #items redux logic (items list and item)
│   │   ├── middlewares # logger middleware for prettify actions
│   │   ├── utils # create reducer logic
│   │   └── store.js #set up the application store for the provider
│   ├── utils 
│   └── views 
│       ├── layouts #global layout 
│       └── pages #all pages
├── package.json
└── README.md
```
