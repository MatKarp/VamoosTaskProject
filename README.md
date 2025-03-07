# Vamoos Frontend Assessment Task

## Author: Mateusz Karpisiewicz

Before running the application, ensure you have the following installed:
- **Node.js** (Latest LTS version recommended) but can be 18+ or 22+ (vite recomended)
- **npm** or **yarn** (Package manager)  ```

## Installation Steps
1. Clone the repository:
   ```sh
   git clone git@github.com:MatKarp/VamoosTaskProject.git
   cd VamoosTaskProject
2. Install packages
    ```sh
    yarn 
3. Run vite app:
    ```sh
    yarn dev

## Tests
1. Run vitest
    ```sh
    yarn test

# Technical Questions
## Question: 1
   Explain how you can perform data fetching using fetch during a components
   lifecycle (inside a useEffect ) and immediately after a user interaction (such as
   onClick ) within your component. Please explain your reasoning.
   
#### Answer 1: 
You can use effect with empty array data to make sure that fetch will happen only one first render.
```jsx
  useEffect(() => {
   fetch(url)
           .then((response) => response.json())
           .catch((error) => {
              console.error('Error fetching data:', error);
           });
}, []);
```

If there is variable in useEffect dependency array rendering will happen on every change of that variable

```jsx
  useEffect(() => {
   fetch(url)
           .then((response) => response.json())
           .catch((error) => {
              console.error('Error fetching data:', error);
           });
}, [some_variable]);
```

Here is example of useCallback and fetch done on click event.
setData will be done on successful fetch and setData will be used.
After that component with new data will be re-rendered.

```jsx
    const [data,setData] = useState()
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
       setLoading(true);
       fetch(url)
         .then((response) => response.json())
         .then((result) => {
           setData(result);
           setLoading(false);
         })
         .catch((error) => {
           console.error('Error fetching data:', error);
           setLoading(false);
         });
     };

     return (
       <div>
         <button onClick={handleClick}>Fetch Data</button>
         {loading ? (
           <p>Loading...</p>
         ) : (
           <pre>{JSON.stringify(data, null, 2)}</pre>
         )}
       </div>
     );
```

## Question 2

How do you handle errors in React? Can you provide an example of error
   boundaries?
#### Answer 2
An Error Boundary  in React is a component that catches JavaScript errors anywhere in its child component tree, logs those errors, and displays a fallback UI instead of crashing the entire app.
It’s implemented using componentDidCatch or the static getDerivedStateFromError lifecycle methods.
Error boundaries only catch errors in the  components below them in the tree.
I used react-error-boundary library witch do exactly the same as code below.

```jsx
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
     console.error("Error caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
```

Below is usage of this Component

```jsx
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

## Question 3
What is the Context API, and how do you use it to manage state in a React
#### Answer
The Context API in React is a way to share state or values globally across the component tree without passing props manually at every level.
It provides a more efficient way of managing and accessing state for deeply nested components.
You can create a context, provide the value at a higher level, and consume it in any component that needs it.
In apllication i want to create.

Example of Context(AuthContext) implementation from current project
```jsx
import React, { createContext, useState, useContext, useMemo } from "react";

const defaultData = {
   user_id: '',
   passcode: '',
}
const AuthContext = createContext(undefined);

type CredentialsType = {
   user_id: string;
   passcode: string;
};
export const AuthProvider = ({ children }) => {
   const [loginData, setLoginData] = useState<CredentialsType>(defaultData);

   const isAuthorized = useMemo(
           () => loginData.user_id === "VMD" && loginData.passcode == "VL1234",
           [loginData],
   );

   const login = ({ user_id, passcode }) => {
      if (user_id === "VMD" && passcode == "VL1234") {
         setLoginData({ user_id, passcode });
         return true;
      } else {
         return false;
      }
   };

   const logout = () => {
      setLoginData(defaultData);
   };

   return (
       <AuthContext.Provider value={{ loginData, isAuthorized, login, logout }}>
          {children}
       </AuthContext.Provider>
   );
};

export const useAuth = () => useContext(AuthContext);
```

Example of usage of ContextProvider(AuthProvider)

```jsx
createRoot(document.getElementById("root")!).render(
    <AuthProvider>
       <App />
    </AuthProvider>,
);
```

Example of use context hook

```jsx
const { loginData, logout, login, isAuthenticated } = useAuth();
```

## Question 4
Imagine you need to upgrade a legacy React project to the latest version. How
   would you approach this task?

#### Answer 4
Upgrade dependencies step by step
* Instead of upgrading everything at once, incrementally update React and other packages.
* Test after each update to ensure that everything works as expected.

Use feature flags or a staging environment
* Deploy the upgraded version to a staging environment before rolling it out to production.
* Use feature flags to control the rollout if necessary.
  Check all changes in new libraries, and search for potentially issues.
Refactor code to get rid of all deprecated functions before bumping versions.
Keep test coverage high so we can catch mistakes right away 

## Question 5
You have a React application that has become slow and unresponsive. How would
you identify and fix performance bottlenecks?

#### Answer 5
* Remove all inline styling and functions. 
* React Developer Tools: Analyze component re-renders and identify unnecessary renders using Profiler.
* Check for Large or Unnecessary Re-renders: We can use React.memo or PureComponents for prevent unnecesary renders
* Lazy Loading: Implement React.lazy for large components to reduce load time.

Example of React.Lazy   
```jsx
import { lazy } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent.js'));
```

Example of useMemo. Variable squaredNumber will only be re-calculated when {num} will change. Otherwise, old value will be return by useMemo.

```jsx
const ExpensiveCalculation = ({ num }) => {

  const squaredNumber = useMemo(() => {

    return num * num;
  }, [num]);

  return <p>Squared Value: {squaredNumber}</p>;
}
```
Example of useCallback, same as for useMemo, but we use it for functions

```jsx
function App() {
  const [number, setNumber] = useState(5);
  const [count, setCount] = useState(0);
  
  const getSquare = useCallback(() => {
    return number * number;
  }, [number]);

  return (
    <div>
      <h2>useCallback Example</h2>
      <SquareCalculator getSquare={getSquare} />
      <button onClick={() => setNumber(number + 1)}>Increase Number</button>
      <button onClick={() => setCount(count + 1)}>Increase Count ({count})</button>
    </div>
  );
}
```

* Optimize State Management: use useCallback or useMemo to memoize functions and values. Also remove all inline styling and functions.
* Code Splitting: Break app into smaller chunks with dynamic imports