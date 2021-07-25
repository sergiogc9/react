# React Utils

![](https://github.com/sergiogc9/react/workflows/Github%20Pipeline/badge.svg?branch=master)
![](https://badgen.net/npm/v/@sergiogc9/react-utils?icon=npm&label)
![](https://badgen.net//bundlephobia/minzip/@sergiogc9/react-utils)

This package exports some utilities, personal libraries or helpers.

ℹ️ The library is still in a beta stage as I am still migrating many components here.

ℹ️ This library has been implemented by me and for me, hence it is highly opinionated.

## Usage

#### Installation

Install the package from npm or github packages:

```
yarn add -S @sergiogc9/react-utils
```

Then import and use the wanted resource.

#### Documentation

The package exports different kind of resources:

##### Component utils

- `createNameSpacedComponent`: Creates a namespaced component using other components. This is useful when using a children based approach when implementing components.

  For example, to be able to define a Button component using a composable children approach:

  ```tsx
  return (
  	<Button>
  		<Button.Icon icon="check" />
  		<Button.Text>Click me</Button.Text>
  	</Button>
  );
  ```

  You can use this utility:

  ```tsx
  import { Button, ButtonIcon, ButtonText } from 'somewhere';

  return createNameSpacedComponent(Button, {
  	Icon: ButtonIcon,
  	Text: ButtonText
  });
  ```

- `lazyLoadComponent`: A function that basically uses `React.lazy` to asynchronously fetch some resources after 1 second.

##### Redux utils

Exports some functions to easily create reducers of different types:

- `getReducer`: Creates a basic reducer.
- `getApiReducers`: Creates three api related reducers handling the fetch start, success and fail status.
- `getEntityFetchReducers`: Same as `getApiReducers` but including predefined reducer implementations with a `loading` status.

##### Storage utils

Exports an object as default export with many functionalities to work with the localStorage. You can get, set and remove values from it, check if a key exists into it or subscribe to changes to a key.

##### Image utils

Exports some functions to work with base64 images. See docs in the [code](src/image/image.ts).

##### Keyboard utils

Exports an object as default export with functions to identify keyboard keys.

##### Validation utils

Exports some functions useful to validate values (e.g. phone numbers).
