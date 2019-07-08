# workflow

React component to navigate through pre-configured items

## getting started

After cloning the repository, install the project dependencies. This process will set up some git hooks using [husky](https://github.com/typicode/husky#readme).

```
$ npm install
```

To view the workflow component, start up the development server and navigate to [localhost:3000](localhost:3000).

```
npm run start:dev
```

## contributing

Everyone is welcome to contribute. Please keep in mind the following developer guidelines:

1. Every commit should compile successfully and pass all tests. A pre-commit hook has been configured to help in this regard. You are encouraged to run the tests continously during development.
   ```
   npm run test:watch
   ```
1. We are using [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) to run tests. Test files should live in the same directory as the file of the component under test, and post-fixed with `.test`.
   ```
   ./src/workflow.tsx
   ./src/workflow.test.tsx
   ```
