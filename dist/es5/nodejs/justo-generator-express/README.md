[![NPM version](http://img.shields.io/npm/v/justo-generator-express.svg)](https://www.npmjs.org/package/justo-generator-express)
[![Build Status](https://travis-ci.org/justojsg/justo-generator-express.svg?branch=master)](https://travis-ci.org/justojsg/justo-generator-express)
[![Dependency Status](https://david-dm.org/justojsg/justo-generator-express.svg)](https://david-dm.org/justojsg/justo-generator-express)
[![devDependency Status](https://david-dm.org/justojsg/justo-generator-express/dev-status.svg)](https://david-dm.org/justojsg/justo-generator-express#info=devDependencies)

Generator for *Express* applications.

*Proudly made with ♥ in Valencia, Spain, EU.*

Features:

- Allow to configure several *middlewares*: `Helmet`, `Morgan`, `serve-static`, `serve-favicon`,
  `bodyParser`, `express-session`...
- Allow to add new router files to the `routes` directory.
- Allow to add new routes to a router files.
- Allow to add new *Handlebars* views.
- Allow to add new *Handlebars* partials.
- Allow to configure the *Express* app for serving a *React* app.

## Install

```
npm install -g justo-cli justo-generator-express
```

## Creating a project scaffolding

```
justo -g express
```

## Adding routers

To add a router file to the `routes` directory:

```
justo -g express router
```

## Adding routes

To add a route to a router file:

```
justo -g express route
```

## Adding Handlebars views/templates

To add a *Handlebars* view/template to the `views` directory:

```
justo -g express hbs view
```

## Adding Handlebars partials

To add a *Handlebars* partial to the `views/partials` directory:

```
justo -g express hbs partial
```

## Working with React apps

If your *Express* app serves a *React* app, when the generator inquires
*React app?*, you can answer *Y* and then:

- The *Express* app must be developed as one project and the *React* app as other one.
- The *Express* app will be configured for serving a *React* app.
- Generally, the *React* app adds its code to the `public` folder.
