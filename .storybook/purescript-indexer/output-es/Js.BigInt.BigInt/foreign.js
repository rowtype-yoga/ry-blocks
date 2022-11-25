export const fromStringImpl = (just) => (nothing) => (s) => {
  try {
    var x = BigInt(s);
    return just(x);
  } catch (err) {
    return nothing;
  }
};
export const fromNumberImpl = (just) => (nothing) => (n) => {
  try {
    var x = BigInt(n);
    return just(x);
  } catch (err) {
    return nothing;
  }
};

export const fromInt = (n) => BigInt(n);

export const fromTypeLevelInt = (str) => BigInt(str);

export const biAdd = (x) => (y) => x + y;

export const biMul = (x) => (y) => x * y;

export const biSub = (x) => (y) => x - y;

export const biMod = (x) => (y) => x % y;

export const biZero = 0n;

export const biOne = 1n;

export const pow = (x) => (y) => y >= 0 ?  x ** y : 0;

export const not = (x) => ~x;

export const or = (x) => (y) => x | y;

export const xor = (x) => (y) => x ^ y;

export const and = (x) => (y) => x & y;

export const shl = (x) => (n) => x << n;

export const shr = (x) => (n) => x >> n;

export const biEquals = (x) => (y) => x == y;

export const biCompare = (x) => (y) => {
  if (x === y) return 0;
  else if (x > y) return 1;
  else return -1;
};

export const toString = (x) => x.toString();

export const asIntN = (bits) => (n) => BigInt.asIntN(bits, n);
export const asUintN = (bits) => (n) => BigInt.asUintN(bits, n);
