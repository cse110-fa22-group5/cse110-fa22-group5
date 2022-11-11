# Continuous integration and continuous delivery

## Context and Problem Statement

We want to have working code in each push to main, but it will take too much time/effort to write custom tests for each iteration

## Considered Options
- CI/CD pipeline though github actions
  - CSS linting
  - HTML5 validation
  - jest test

## Decision Outcome

- decided to implement these 3 features for CI/CD so that code in each merge request can be checked automatically to see if the product still builds/works as intended if we successfully merge
- CSS and HTML checkers help ensure that each file contains correct syntax and formatting