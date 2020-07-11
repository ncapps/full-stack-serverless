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

## 2. Creating Your First App

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

# Acknowledgments

Full Stack Serverless by Nader Dabit, O'Reilly Media, 2020
