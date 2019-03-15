/* eslint-disable  no-restricted-syntax */
import { readFileSync } from 'fs';
import { transform } from '@babel/core';
import plugin from '../src/babel';

const source = readFileSync('fixtures/index.js', 'utf8');

describe('babel-plugin-remixx', () => {

});
