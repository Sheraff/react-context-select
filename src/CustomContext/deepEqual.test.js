import deepEqual from './deepEqual'

it('supports primitive equality', () => {
	expect(deepEqual(1, 1)).toBe(true)
	expect(deepEqual(1, 2)).toBe(false)
})