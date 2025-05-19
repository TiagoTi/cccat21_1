
export function invalidPassword (password: string) {
    if (password.length < 8) return true;
    if (!password.match(/\d+/)) return true;
    if (!password.match(/[a-z]+/)) return true;
    if (!password.match(/[A-Z]+/)) return true;
    return false;
}
