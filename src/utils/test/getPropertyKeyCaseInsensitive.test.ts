import { getPropertyKeyCaseInsensitive } from '~/utils/getPropertyKeyCaseInsensitive';

test('it should pass', async () => {
    const users = {
        name: 'jan',
        Age: 30,
    };
    const result = getPropertyKeyCaseInsensitive(users, 'age');
    expect(result).toBe(30);
});
