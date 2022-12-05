# cse110-fa22-group5

## Short description of project:

Personal note taking app that enables users to share their notes with other users while maintaining of their own notes.

<br>

## View our deployed project!

[https://cse110-fa22-group5.github.io/cse110-fa22-group5/source](https://cse110-fa22-group5.github.io/cse110-fa22-group5/source)

## Meet our team!

[team.md](admin/team.md)

## Application Demo and Tutorial

Video and tutorial on how our project works.

## Documentation

All documentation generated via JSDocs [here](https://cse110-fa22-group5.github.io/cse110-fa22-group5/jsdocs).

## Running and Scripts

To install the CI/CD dependencies for this project, run

```
npm install
```

To run unit and end-to-end tests, run

```
npm run test
```

To check code for linting and formatting using ESLint and Prettier, run

```
npm run lint:fix
```

## Testing

List how to test our code (unit and E2E) and what we use to test.

We use [Jest](https://jestjs.io/) for our backend unit testing (tests located in [./jestTesting](./jestTesting/)).

Additionally, we use [Puppeteer](https://pptr.dev/) for end-to-end testing (tests located in [./puppeteerTesting](./puppeteerTesting/))

To run unit and end-to-end tests, run

```
npm run test
```

## Linting and Validation

Validate our CSS, HTML, and Javascript files with linting and validation tools listed here.

We use [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) to automatically check and fix code formatting and quality.

To check and automatically fix code for linting and formatting, run

```
npm run lint:fix
```

To only check the code for linting and formatting errors, run
```
npm run lint:check
```

Finally, we validate our HTML using [HTML5 Validator](https://github.com/marketplace/actions/html5-validator) in our CI/CD pipeline.