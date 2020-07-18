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

## 4. Introduction to Authentication

- Amazon Cognito is a fully managed identity service
- Cognito has two main pieces:
  1. **User Pools**: provides a user directory that stores all your users
  2. **Identity Pools**: allows you to authorize users that are signed in to your application to access AWS services. The source of _identities_ could be a Cognito User Pool or Facebook or Google
- You can create and configure Amazon Cognito services directly from the Amplify CLI
- Amplify has pre-configured UI components that allow you to scaffold out entire authentication flows
- There are two main ways to implement authentication on the client using Amplify
  1. **Auth class**: Amplify `Auth` class has methods that allow you to handle everything associated with user management
  2. **Framework-specific authentication components**: These components will render an entire (customizable) authenication flow
- Use the `withAuthenticator` HOC to quickly get up and running with a pre-configured authentication flow
- Use the `Auth` class for more fine grained control over authentication and to get data about the currently signed in user
- Ant Design helps you get started with pre-configured design without having to write any style-specific code

## 5. Custom Authentication Strategies

- Use the `Auth` class for handling direct API calls to the Amazon Cognito authentication service
- Handling custom form state can be verbose, analyze the tradeoffs between rolling your own authentication service flow vs using something like `withAuthenticator` HOC
- Authentication is complex. By using a managed identity service like Amazon Cognito, we've abstracted away all of the back end code and logic. Now we just need to interact with the authentication APIs and manage the local state.

## 6. Serverless Functions in Depth Part 1

- Lambda functions can be invoked from many different event types including API calls, image uploads, database operations, and authentication events
- The `event` data structure differs based on the type of event invoking the Lambda function
- When a Lambda trigger is enabled by the Amplify CLI, additional IAM permissisons are given to the function allowing it to directly interact with other services

## 7. Serverless Functions in Depth Part 2

- With Amplify, there are two manin ways to create APIs: GraphQL and REST
- Running an express server in a Lambda function is a great way to extend the functionality of a single function
- The `API` category requires two arguments when working with REST APIs: the api name and the path. The third argument is optional, it's an object that can contain any arguments you may want to send in a post request
- Use the DynamoDB Document client when interacting with DynamoDB from a Node.js Lambda functions

## 8. AWS AppSync in Depth

- The GraphQL transform is a library of directives that allows use to "decorate" a GraphQL schema and add additional functionality
- `@auth`: allows us to pass in an array of authorization rules
- `@key`: Enables us to add Global Secondary Indexes and sort keys to a DynamoDB table for custom data access patterns
- `@connection`: Allows us to model relationships between types
- When creating an API with multiple authorization types, you will have a **primary** authorization type. You can override the primary authorization type with the `authMode` parameter to the API class defining the authorization type

## 9. Building Offline Apps with Amplify DataStore

- Amplify DataStore introduces a client-side SDK that allows you to write and read from a local store and persists data locally using the locat engine of the platform (i.e., IndexDB for web and SQLite for native iOS and Android)
- DataStore syncs your data to the cloud when you have an internet connection
- DataStore handles conflict detection and resolution
  1. AutoMerge: GraphQL type informatino on an object is inspected at runtime to perform merge operations
  2. Optimistic concurrency: Latest written item to your database will be used
  3. Custom: Use a Lambda function and write custom business logic

## 10. Working with Images and Storage

- Amplify uses S3 as the Storage category for handling the storage of files
- Working with S3 there are three types of file access available:
  1. **Public**: Items accessible by all users of your app. In the `public/ path`. In order to viewed, Amplify SDK retrieves a temporarily signed URL of the resource. This is the default.
  2. **Private**: Items are readable by all, but writable only by the creating user. Stored in the `private/{user_identity_id}` path. `user_identity_id` corresponds to the Amazon Cognito ID for that user.
  3. **Protected**: Files are only accessible for an individual user. Stored in the `private/{user_identity_id}` path.
- When working with images, images cannot be referenced directly by their URL; they must be signed using a `Storage.get` call.
- The signed URL is valid for 15 minutes by default. The `expires` option configure the duration a signed URL is valid.
- When working with an array of images, you can map over the array and use `Promise.all` to get a signed URL for each item in the array

## 11. Hosting: Deploying Your Application to the Amplify Console with CI and CD

- Amplify Console is a fully managed hosting service that provides a simple workflow for deploying static sites and full stack serverless applications
- You can deploy a project to Amplify Console hosting directly from the CLI with `amplify publish`. This deploys both the frontend and backend.
- To enable a custom domain, we need to do three things:
  1. Add the domain in Amazon Route 53
  2. Set the nameservers in the DNS settings of the domain provider for the domain you are using
  3. Configure the Amplify Console app to use the domain added in Route 53
- Amplify Console hosts both backend and frontend deployments
- You can deploy the front via the Amplify CLI or a Git repository
- Once the app is hosted, you can set up things like password protection, custom domains, and branch deployments

## Acknowledgments

Full Stack Serverless by Nader Dabit, O'Reilly Media, 2020
