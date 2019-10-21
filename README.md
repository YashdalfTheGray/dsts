[![Build Status](https://travis-ci.com/YashdalfTheGray/dsts.svg?branch=master)](https://travis-ci.com/YashdalfTheGray/dsts)
[![Coverage Status](https://coveralls.io/repos/github/YashdalfTheGray/dsts/badge.svg?branch=master)](https://coveralls.io/github/YashdalfTheGray/dsts?branch=master)
[![npm version](https://badge.fury.io/js/%40yashdalfthegray%2Fdsts.svg)](https://badge.fury.io/js/%40yashdalfthegray%2Fdsts)

# @yashdalfthegray/dsts

Data structures, but in Typescript

## Usage

This package can be pulled from NPM by running `npm install @yashdalfthegray/dsts` and it comes with the following data structures.

- HashTable
- LinkedList
- Queue
- Stack
- Tree
- Binary Search Tree

They are all ES6 classes with included typings and are parameterized to take a type.

```typescript
import { HashTable } from '@yashdalfthegray/dsts';

const ht = new HashTable<string, number>(aHashFunc, optionalBucketSize);

ht.put('test', 15);
```

```javascript
import { HashTable } from '@yashdalfthegray/dsts';

const ht = new HashTable(aHashFunc, optionalBucketSize);

ht.put('test', 15);
```

## Development

This project uses `prettier` and `tslint` to maintain the code stylistically and `ava` to maintain the tests. All of the code written for this project is written in Typescript.

Git hooks will automatically format for each commit but it's highly recommended that you use a prettier and tslint plugin for your IDE.

### Installation

Running an `npm install` will pull down all the dependencies that are necessary to get this working.

### Running

There isn't much of "running" this repository in the traditional sense. Running an `npm test` will run the tests and generate a coverage report. The coverage report can be looked at using `npm run open-coverage-report`.

### Debugging

If you use VSCode, there are presets that are included for debugging the tests if it should become necessary. The plain "Debug tests" target will still run the tests will `ava`'s built-in parallelism so a "Debug tests serially" also exists.
