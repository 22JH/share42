interface LType {
  range: any;
  map: any;
  filter: any;
  flatten: any;
  deepFlat: any;
  flatMap: any;
}

interface CType {
  reduce: any;
  take: any;
  map: any;
  filter: any;
}

const L: Partial<LType> = {};
const C: Partial<CType> = {};

// go1
const go1 = (a: any, f: any) => (a instanceof Promise ? a.then(f) : f(a));

// nop
const nop = Symbol("nop");

// curry
export const curry =
  (f: any) =>
  (a: any, ..._: any[]) =>
    _.length ? f(a, ..._) : (..._: any[]) => f(a, ..._);

// map
export const map = curry(
  (f: (...a: any) => any, iter: IterableIterator<any>) => {
    let res = [];
    iter = iter[Symbol.iterator]();
    let cur;
    while (!(cur = iter.next()).done) {
      const a = cur.value;
      res.push(f(a));
    }
    return res;
  }
);

// filter
export const filter = curry(
  (f: (...a: any) => any, iter: IterableIterator<any>) => {
    let res = [];
    iter = iter[Symbol.iterator]();
    let cur;
    while (!(cur = iter.next()).done) {
      const a = cur.value;
      if (f(a)) res.push(a);
    }

    return res;
  }
);

// head
const head = (iter: IterableIterator<any>) =>
  go1(take(1, iter), ([h]: any) => h);

// reduceF
const reduceF = (f: any, acc: any, a: any) =>
  a instanceof Promise
    ? a.then(
        (a) => f(acc, a),
        (e) => (e === nop ? acc : Promise.reject(e))
      )
    : f(acc, a);

// reduce
export const reduce = curry(
  (f: any, acc: any = 0, iter: IterableIterator<any>) => {
    if (!iter) return reduce(f, head((iter = acc[Symbol.iterator]())), iter);

    iter = iter[Symbol.iterator]();
    return go1(acc, function recur(acc: any): any {
      let cur;
      while (!(cur = iter.next()).done) {
        acc = reduceF(f, acc, cur.value);
        if (acc instanceof Promise) return acc.then(recur);
      }
      return acc;
    });
  }
);

// go
export const go = (...args: any[]) =>
  reduce((a: any, f: (a: any) => any) => f(a), args);

// pipe
export const pipe =
  (f: (...a: any) => any, ...fs: any[]) =>
  (...as: any[]) =>
    go(f(...as), ...fs);

// range
export const range = curry((length: number) => {
  let res = [];
  let i = -1;
  while (++i < length) res.push(i);
  return res;
});

// L.range
L.range = function* (length: number) {
  let i = -1;
  while (++i < length) yield i;
};

// take
export const take = curry((limit: number, iter: IterableIterator<any>) => {
  let res: any[] = [];
  iter = iter[Symbol.iterator]();
  return (function recur(): any {
    let cur;
    while (!(cur = iter.next()).done) {
      const a = cur.value;
      if (a instanceof Promise) {
        return a
          .then((a): any => {
            res.push(a);
            return res.length === limit ? res : recur();
          })
          .catch((e) => (e === nop ? recur() : Promise.reject(e)));
      }
      res.push(a);
      if (res.length === limit) return res;
    }
    return res;
  })();
});

// L.map
L.map = curry(function* (f: any, iter: IterableIterator<any>) {
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    yield go1(a, f);
  }
});

// L.filter
L.filter = curry(function* (f: any, iter: IterableIterator<any>) {
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    const b = go1(a, f);
    if (b instanceof Promise)
      yield b.then((b) => (b ? a : Promise.reject(nop)));
    else if (b) yield a;
  }
});

// takeAll
export const takeAll = take(Infinity);

// find
export const find = curry((f: any, iter: IterableIterator<any>) =>
  go(iter, L.filter(f), take(1), ([a]: any) => a)
);

// isIterable
const isIterable = (a: any) => a && a[Symbol.iterator];

// L.flatten
L.flatten = function* (iter: IterableIterator<any>) {
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    if (isIterable(a)) yield* a;
    else yield a;
  }
};

// L.deepFlat
L.deepFlat = function* f(iter: IterableIterator<any>): any {
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    if (isIterable(a)) yield* f(a);
  }
};

// flatten
export const flatten = curry(pipe(L.flatten, takeAll));

// L.flatMap
// L.flatMap = curry(pipe(L.map, L.flatMap));
L.flatMap = curry((f: any, iter: IterableIterator<any>) =>
  go(iter, L.deepFlat, L.map(f), take(Infinity))
);
export const flatMap = curry(pipe(L.map, L.flatten, takeAll));

function noop() {}

const catchNoop = ([...arr]: any[]) => {
  arr.forEach((a: any) => (a instanceof Promise ? a.catch(noop) : a));
  return arr;
};

// C.reduce
C.reduce = curry((f: any, acc: any, iter: any) =>
  iter ? reduce(f, acc, catchNoop(iter)) : reduce(f, catchNoop(acc))
);

// C.take
C.take = curry((limit: number, iter: IterableIterator<any>) =>
  take(limit, catchNoop([...iter]))
);

// C.map
C.map = curry(pipe(L.map, C.take(Infinity)));

// C.filter
C.filter = curry(pipe(L.filter, C.take(Infinity)));
