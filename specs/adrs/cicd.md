# Continuous integration and Continuous Delivery

## Context and Problem Statement

We want to comprehensively test our code after each change to the main branch, but it would be inefficient and arduous to manually test our code after each change, thus we must find a way to automate the testing of our code with tests that account for the code formatting, getting logical results, and avoiding syntactical errors.

## Considered Options

- CI/CD pipeline though github actions
  - CSS linting
  - Jest tests for javascript unit testing
  - Javascript linting
- Have local unit testing and format checking as well

## Decision Outcome

- We discussed which options we wanted with the larger group- i.e. what they would want to validate their code, and what we would want implemented by the end of this week and the above _considered options_ represent what the larger group decided upon.

- We (Akanksha, Kevin, and Aaryan) implemented CSS linting, HTML5 validation, jest test features for CI/CD so that code in each merge request can be checked automatically to see if the product still builds/works as intended if we successfully merge.
- CSS and HTML checkers help ensure that each file contains correct syntax and formatting.
- We checked this by adding bad syntax/errors and the linters caught them!

- We used GitHub actions in our main.yml file to download the packages required and continuously run the tests on each push.
- We also locally added a VSCode extension called Prettier (to assist in code formatting while writing) and suggested this extension to the larger group.
- We locally downloaded packages required for jest tests as well so we can run tests without having to push.

- We also added ESLint and Prettier to our GitHub actions to automatically check for linting and formatting