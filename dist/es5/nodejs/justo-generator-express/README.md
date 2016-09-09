[![NPM version](http://img.shields.io/npm/v/justo-generator-express.svg)](https://www.npmjs.org/package/justo-generator-express)
[![Build Status](https://travis-ci.org/justojsg/justo-generator-express.svg?branch=master)](https://travis-ci.org/justojsg/justo-generator-express)
[![Dependency Status](https://david-dm.org/justojsg/justo-generator-express.svg)](https://david-dm.org/justojsg/justo-generator-express)
[![devDependency Status](https://david-dm.org/justojsg/justo-generator-express/dev-status.svg)](https://david-dm.org/justojsg/justo-generator-express#info=devDependencies)

Generator for *Express* applications.

*Proudly made with ♥ in Valencia, Spain, EU.*

Features:

- Allow to configure several *middlewares*: `Helmet`, `Morgan`, `serve-static`, `serve-favicon`,
  `bodyParser`, `express-session`...
- Allow to add new router files to the `app/routes` directory.
- Allow to add new routes to a router files.
- Allow to add new *Handlebars* views.
- Allow to add new *Handlebars* partials.

**Note**. You can learn *Express* and this generator, in Spanish, on [nodemy.com](http://nodemy.com).

## Install

```
npm install -g justo-cli justo-generator-express
```

## Creating a project scaffolding

```
justo -g express
```

## Adding routers

To add a router file to the `app/routes` directory:

```
justo -g express router
```

## Adding routes

To add a route to a router file:

```
justo -g express route
```

## Adding Handlebars views/templates

To add a *Handlebars* view/template to the `app/views` directory:

```
justo -g express hbs view
```

## Adding Handlebars partials

To add a *Handlebars* partial to the `app/views/partials` directory:

```
justo -g express hbs partial
```
