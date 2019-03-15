/* eslint-disable  no-restricted-syntax */
import { readFileSync } from 'fs';
import { transform } from '@babel/core';
import plugin from '../src/babel';

const source = readFileSync('fixtures/index.js', 'utf8');

describe('babel-plugin-banner', () => {
  it('requires banner to be a valid comment', () => {
    const banners = [
      null,
      undefined,
      1,
      {},
      [],
    ];

    for (const banner of banners) {
      const fn = () => {
        transform(source, {
          plugins: [
            [plugin, {
              banner,
            }],
          ],
        });
      };

      expect(fn).to.throw(TypeError, 'Banner must be a valid comment.');
    }

    const fn = () => {
      transform(source, {
        plugins: [
          [plugin, {
            banner: '/**/',
          }],
        ],
      });
    };

    expect(fn).not.to.throw(TypeError, 'Banner must be a valid comment.');
  });

  it('adds banner to the beginning of the code', () => {
    const expected = readFileSync('fixtures/index.expected.js', 'utf8').trim();

    const result = transform(source, {
      plugins: [
        [plugin, {
          banner: '/* hubla bubla */',
        }],
      ],
    });

    expect(result.code).to.equal(expected);
  });
});
