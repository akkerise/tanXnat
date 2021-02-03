'use strict';
const { deduplicate, unique } = require('../src/lib/core')
const { to } = require('../src/lib/common')
const { spacePhone, friendly, random, vn } = to

test('TEST->vn: Vào đây => Vao day', () => {
  expect(vn('Vào đây')).toBe('Vao day');
});

test(`TEST->vn: null => ''`, () => {
  expect(vn(null)).toBe('');
});

test('TEST->spacePhone: 0988888888 => 0988 888 888', () => {
  expect(spacePhone('0988888888')).toBe('0988 888 888');
});

test('TEST->unique: [1, 3, 4, 5, 7, 4, 3, 3, 2, 2, 2, 12, 2, 2, 3] => [1, 3, 4, 5, 7, 2, 12]', () => {
  expect(unique([1, 3, 4, 5, 7, 4, 3, 3, 2, 2, 2, 12, 2, 2, 3])).toStrictEqual([1, 3, 4, 5, 7, 2, 12])
})

test('TEST->deduplicate: [1, 3, 4, 5, 7, 4, 3, 3, 2, 2, 2, 12, 2, 2, 3] => [1, 3, 4, 5, 7, 2, 12]', () => {
  expect(deduplicate([1, 3, 4, 5, 7, 4, 3, 3, 2, 2, 2, 12, 2, 2, 3])).toStrictEqual([1, 3, 4, 5, 7, 2, 12])
})