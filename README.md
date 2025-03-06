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
    console.log(error, info);
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
In the current application, I wanted to use ContextProvider to store user_id and passcode, but I managed to do it using just parameters from react-router-dom. If I had more time, I would definitely rewrite it using Context API.

## Question 4
Imagine you need to upgrade a legacy React project to the latest version. How
   would you approach this task?

#### Answer 4
Check all changes in new libraries, and search for potentially issues.
Refactor code to get rid of all deprecated functions before bumping versions.
Keep test coverage high so we can catch mistakes right away 

## Question 5
You have a React application that has become slow and unresponsive. How would
you identify and fix performance bottlenecks? (This is

#### Answer 5
* Remove all inline styling and functions. 
* React Developer Tools: Analyze component re-renders and identify unnecessary renders using Profiler.
* Check for Large or Unnecessary Re-renders: We can use React.memo or PureComponents for prevent unnecesary renders
* Lazy Loading: Implement React.lazy for large components to reduce load time.
* Optimize State Management: use useCallback or useMemo to memoize functions and values. Also remove all inline styling and functions.
* Code Splitting: Break app into smaller chunks with dynamic imports