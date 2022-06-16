# React libraries

![](https://github.com/sergiogc9/react/workflows/Github%20Pipeline/badge.svg?branch=master)

This repository contains some packages that exports different kind of React resources. The repository is based on `React`, `lerna`, `typescript` and more.

ℹ️ These libraries is still in a beta stage as I am still migrating many items here.

ℹ️ These libraries has been implemented by me and for me, hence they are highly opinionated.

Packages:

- [`@sergiogc9/react`](/packages/components):

  A set of components ready to be used.

  ![](https://badgen.net/npm/v/@sergiogc9/react?icon=npm&label)
  ![](https://badgen.net//bundlephobia/minzip/@sergiogc9/react)

- [`@sergiogc9/react-hooks`](/packages/hooks):

  Different re-usable custom hooks.

  ![](https://badgen.net/npm/v/@sergiogc9/react-hooks?icon=npm&label)
  ![](https://badgen.net//bundlephobia/minzip/@sergiogc9/react-hooks)

- [`@sergiogc9/react-utils`](/packages/utils):

  Some utilities, personal libs, redux helpers, etc.

  ![](https://badgen.net/npm/v/@sergiogc9/react-utils?icon=npm&label)
  ![](https://badgen.net//bundlephobia/minzip/@sergiogc9/react-utils)

## Usage

#### Installation

Simply install the wanted package, import the component, hook or utility and use it.

For example, install the hooks package:

```
yarn add -S @sergiogc9/react-hooks
```

Then import the wanted custom hook and use it:

```tsx
import { useUpdateEffect } from '@sergiogc9/react-hooks';

const AwesomeComponent = () => {
	useUpdateEffect(() => {
		console.log('I am not executed at mount :)');
	}, []);

	return <div>Awesome content</div>;
};
```

## Development

As this repository contains React resources, they can't be tested directly using the repo. You can simply create tests or link the packages using NPM links.

If using the second option, you can start a process which will build the resources in watch mode:

1. First, install the suggested NodeJS version. You can check the version in `.nvmrc` file.

2. Install the necessary packages and dependencies:

   `yarn install`

3. Start the server that builds the libraries in watch mode:

   `yarn start`

#### Using the packages locally in other projects

If you need to test the changes outside this project (e.g. inside an application which uses a package), you can follow these steps:

1. Uninstall peer dependencies if installed:

   `yarn install`

2. Create links to the packages:

   `yarn link:all`

   ℹ️ This should only be done once. You can remove the links executing `yarn unlink:all`

3. Go to the other project and execute:

   `yarn link @sergiogc9/react @sergiogc9/react-hooks @sergiogc9/react-utils`

4. To stop using the link and use the remote package again, unlink them and reinstall the dependencies:

   `yarn unlink @sergiogc9/react @sergiogc9/react-hooks @sergiogc9/react-utils && yarn install --force`

#### Publishing a new version

New final versions are published automatically by the pipeline, never manually! To create and publish a new version, follow these steps:

1. Create a new branch from `master`.
2. Perform your changes.

3. Execute the script to add a new version (see script info below) or use the `lerna version`:

   `yarn bump:version:[patch | minor | major]`

   Once version is confirmed, this script creates a new commit and adds a tag with the selected version.

4. Create a PR to merge changes including the version upgrade.
5. Once PR is merged, the pipeline will handle the new version publishing the new version.

#### Available scripts

##### `yarn start`

Runs the server that builds the packages in watch mode (i.e. while editing).

##### `yarn link:all`

Creates a link inside yarn to use this project packages in other projects locally without needing to publish anything.

This only has to be done once.

##### `yarn unlink:all`

Removes the links created using the previous script.

##### `yarn test`

Runs all unitary tests from components. It also checks the coverage of the code.<br>

It can be executed only for desired tests, using a pattern: `yarn test user.test.ts`

##### `yarn test:local`

Runs all unitary tests from components in watch mode. It does not check the code coverage.<br>

It can be executed only for desired tests, using a pattern: `yarn test:local user.test.ts`

##### `yarn test:local:file $file`

Runs `yarn test:local` including all tests in the repo that matches `$file` pattern.

The goal of this script is to only run tests you are modifying or developing.

Example to only execute tests for Focus component:<br/>
`yarn test:local:file Button.test.tsx` <br/>

🛈 You can force doing the coverage check by adding `--coverage` at the end of the command.

##### `yarn bump:version:[patch | minor | major]`

In order to bump the package's version. previously to push the latests change, it is necessary to run one of this commands

`yarn bump:version:patch` increases the patch version based on semantic versioning x.x.1
`yarn bump:version:minor` increases the minor version based on semantic versioning x.1.x
`yarn bump:version:major` increases the major version based on semantic versioning 1.x.x.

The script will always ask for a confirmation before performing the changes.

🚫 **REMEMBER THAT PUBLISHING LOCALLY IS FORBIDDEN, IT MUST BE DONE BY THE PIPELINE** 🚫
