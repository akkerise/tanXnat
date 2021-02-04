'use strict';
const { deduplicate, unique } = require('../src/lib/core')
const { email, phone } = require('../src/lib/validator')
const { to } = require('../src/lib/common')
const { spacePhone, friendly, vn } = to

test('TEST->vn: Vào đây => Vao day', () => {
  expect(vn('Vào đây')).toBe('Vao day');
});

test(`TEST->vn: null => ''`, () => {
  expect(vn(null)).toBe('');
});

test(`TEST->email: akkerise@gmail.com => true`, () => {
  expect(email('akkerise@gmail.com')).toBe(true);
});

test(`TEST->email: tanXnat => false`, () => {
  expect(email('tanXnat')).toBe(false);
});

test(`TEST->email: tanXnat@xxx => false`, () => {
  expect(email('tanXnat@xxx')).toBe(false);
});

test(`TEST->phone: 0968381829 => true`, () => {
  expect(phone('0968381829')).toBe(true);
});

test(`TEST->phone: 096838182 => false`, () => {
  expect(phone('096838182')).toBe(false);
});

test(`TEST->phone: 096838182 => false`, () => {
  expect(phone('096838182')).toBe(false);
});

test('TEST->spacePhone: 0988888888 => 0988 888 888', () => {
  expect(spacePhone('0988888888')).toBe('0988 888 888');
});

test('TEST->friendly: đây là url nhé => day-la-url-nhe', () => {
  expect(friendly('đây là url nhé')).toBe('day-la-url-nhe');
});

test('TEST->unique: [1, 3, 4, 5, 7, 4, 3, 3, 2, 2, 2, 12, 2, 2, 3] => [1, 3, 4, 5, 7, 2, 12]', () => {
  expect(unique([1, 3, 4, 5, 7, 4, 3, 3, 2, 2, 2, 12, 2, 2, 3])).toStrictEqual([1, 3, 4, 5, 7, 2, 12])
})

test('TEST->deduplicate: [1, 3, 4, 5, 7, 4, 3, 3, 2, 2, 2, 12, 2, 2, 3] => [1, 3, 4, 5, 7, 2, 12]', () => {
  expect(deduplicate([1, 3, 4, 5, 7, 4, 3, 3, 2, 2, 2, 12, 2, 2, 3])).toStrictEqual([1, 3, 4, 5, 7, 2, 12])
})