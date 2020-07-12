# Notes from Full Stack Serverless by Nader Dabit

## 1. Full Stack Development in the Era of Serverless Computing

**Characteristics of a Serverless Application**

1. Decreased operational responsibilities
2. Heavy use of managed services

**Benefits of a Serverless Architecture**

1. Scalability
2. Cost
3. Developer velocity
4. Experimentation
5. Security and stability
6. Less code

- AWS AppSync is a managed API layer that uses GraphQL to make it easy for applications to interact with any data source
- One good approach to working with a microservices architecture is to provide a consistent API gateway that then takes all of the requests and forwards them to the backend services
- GraphQL introduces a defined and consistent specification for interacting with APIs in the form of three operations: Queries (reads), Mutations (writes / updates), and Subscriptions (real-time data)
- These operations are defined as part of a main Schema that also provides a contract between the client and the server in the form of GraphQL Types

## 2. Getting Started with AWS Amplify

- With Amplify, there are 2 main way of creating APIs
  1. Amazon API Gatway and Lambda function
  2. GraphQL API connected to a data source (database, Lambda function, or HTTP endpoint)
- Serverless functions are essentially just encapsulated applications running on their own
  - In `src/index.js`, the `exports.handler` function is the entry point for the function invocation
- The **serverless express** framework provides an easy way to support multiple routes and multiple HTTP request methods with a single function
- Amazon API Gateway is a fully managed service that enables developers to create REST and WebSocket APIs
- Run `amplify status` to list out all of the configured services in the project. The **Operation** field tells you what will happen the next time `amplify push` is run in the project
- The Amplify client library has various API categories for various functionality
  - `Auth`: authentication
  - `Storage`: storing items in S3
  - `API`: interacting with REST and GraphQL APIs
- The API category returns a promise
- Lambda functions can be created from the Amplify CLI with `amplify add function`
- APIs can can be created with `amplify add api`
- A single API Gateway endpoint can be configured to work with multiple Lambda functions
- Lambda functions are essentially self-contained node.js applications. In this example, we ran an express application in order to handle REST methods

## 3. Creating Your First App

- GraphQL is an API specification. It is a query language for APIs and a runtime for fulfulling those queries with your data
- A GraphQL API consists of three main parts:
  1. Schema: Defines the data model and operations that can be executed against the API
  2. Resolvers: Tell the GraphQL operations what to do when being executed, and will typically interact with a data source or another API
  3. Data sources
- AWS AppSync is a managed service that allows us to deploy a GraphQL API, resolvers, and data sources quickly using the Amplify CLI
- The AWS Amplify GraphQL Transform library allows you to annotate a GraphQL schema with different directives like `@model, @connection, @auth`
- `useEffect` is similar to `componentDidMount`. It will run after the initial render of the componet is committed to the screen. The second argument is an array of values that the effect depends on to know whether it should be called again during a render. If the array is empty, it will not be called on additional renders.
- Updating the local state before the API call is successful is known as an **optimistic response**. It is done because we want the UI to be fast and update as soon as the user adds a new note. If the API call fails, you can implement functionality in the `catch` block to notify the user of the error
- With GraphQL subscriptions, you can subscribe to different events. When one of these events happens, the data from the event gets sent to the client that initialized the subscription.
- The `useReducer` hook allows you to manage application state and is preferable to `useState` when having more complex application logic
- GraphQL **queries** are used for fetching data
- GraphQL **mutations** are used for creating, updating, or deleting data
- You can subscribe to API real-time events with GraphQL **subscriptions**

# Acknowledgments

Full Stack Serverless by Nader Dabit, O'Reilly Media, 2020
