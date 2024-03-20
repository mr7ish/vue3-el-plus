interface Test {
    title: string
    value: string
}

/**
 * usage: 将给定类型的所有属性设置为 可选的，返回给定类型的子类型。
 * 
 * explanation: <映射类型>: `keyof T` 拿到目标类型的所有键名，
 * 然后通过 `in` 操作符循环遍历所有键名并通过 `?` 标记创建可选属性，通过 `T[P]` 映射目标属性的类型。
 */
type _Partial<T> = {
    [P in keyof T]?: T[P];
}
type OptionalTest = _Partial<Test>;

/**
 * usage: 将给定类型的所有属性设置为**必需的**，与 `Partial`相反。

 * explanation: `-` 前缀将 `?` 修饰符删除，将可选属性变为必需属性，其余同 `Partial`.

 * tips: `-` 前缀概念见 [映射类型](https://ts.yayujs.com/handbook/MappedTypes.html#%E6%98%A0%E5%B0%84%E4%BF%AE%E9%A5%B0%E7%AC%A6-mapping-modifiers)
 */
type _Required<T> = {
    [P in keyof T]-?: T[P];
}
type RequiredTest = _Required<OptionalTest>;

/**
 * usage: 将给定类型的所有属性设置为**只读的**，意味着所有属性都不可以重新赋值。

 * explanation: `readonly` 修饰符将属性设置为只读，其余同 `Partial`.
 */
type _Readonly<T> = {
    readonly [P in keyof T]: T[P];
}
type ReadonlyTest = _Readonly<Test>;

/**
 * usage: 用于构建目标类型中的某些属性的类型，即目标类型的子集。

 * explanation: `keyof T` 拿到类型 `T` 的字符串字面量或其联合类型，`extends` 约束了类型 `K` 只能是类型 `T` 的字符串字面量或其联合类型的子类型，然后循环遍历 `K` 类型，创建类型 `T` 里的某些属性，并映射属性类型。
 */
type _Pick<T, K extends keyof T> = {
    [P in K]: T[P];
}
type PickTest = _Pick<Test, 'title'>;

/**
 * usage: 用于构建对象类型，**所有**属性都为类型 `K` ，值为类型 `T`.

 * explanation: 将类型 `K` 约束为 `keyof any` ，即 `string | number | symbol` ，如果 `K` 为 `number` ，表示每一项都为类型 `T` 的数组或属性名为数字且值为类型 `T` 的对象类型；如果 `K` 为 `string` ，表示属性名为数字或字符串且值为类型 `T` 的对象类型；如果 `K` 是联合类型，则会循环遍历创建对应的属性且值为类型 `T` 的对象类型。
 */
type _Record<K extends keyof any, T> = {
    [P in K]: T;
}

interface Book {
    title: string;
    price: number;
}

type ArrayBook = Record<number, Book>;
const arrBook: ArrayBook = [{ title: 'ts', price: 49 }]
const arrBook2: ArrayBook = {
    1: { title: 'ts', price: 49 }
}

type ObjectBook = Record<string, Book>;
const objBook: ObjectBook = {
    ts: { title: 'ts', price: 49 }
};

type BookCategory = 'computer' | 'philosophy' | 'math';
type BookTypes = Record<BookCategory, Book>;
const bookTypes: BookTypes = {
    computer: { title: 'ts', price: 49 },
    philosophy: { title: 'marks', price: 49 },
    math: { title: 'line', price: 49 },
}

/**
 * usage: 用于排除联合类型中的某些类型。

 * explanation: 如果类型 `U` 是联合类型 `T` 的子类型，那么将会从联合类型 `T` 中排除子类型 `U`. 
 * (从联合类型 `T` 中排除所有可以赋给类型 `U` 的类型。) 
 */
type _Exclude<T, U> = T extends U ? never : T;

type ExcludeBook = _Exclude<BookCategory, 'computer' | 'philosophy'>;

type BookList = number | string | undefined;
type ExcludeBook2 = _Exclude<BookList, number | undefined>;

/**
 * usage: 用于提取联合类型中的某些类型。

 * explanation: 从联合类型 `T` 中提取所有与类型 `U` 交叉的类型。
 * (从联合类型 `T` 中提取所有可以赋给类型 `U` 的类型。)
 */
type _Extract<T, U> = T extends U ? T : never;

type MathBook = 'math';
type ExtractBookCategory = Extract<BookCategory, MathBook>;

type ExtractNumber = _Extract<1 | 2 | 3, 3 | 4>;

/**
 * usage: 从目标类型中过滤某些属性。

 * explanation: `extends keyof any` 约束了类型 `K` 为 `string | number | symbol` ，即类型 `K` 为数字或字符串字面量，数字或字符串字面量的联合类型，`keyof T` 拿到类型 `T` 的属性联合类型，然后通过 `Exclude` 排除可以赋给类型 `K` 的属性字面量，再通过 `Pick` 构建类型 `T` 中已经被排除属性的部分类型。

 * tips: Omit 和 Pick 最终达到的效果类似。
 */
type _Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

type NumberObj = {
    1: string;
    2: string;
    3: string;
}

type OmitNumber = _Omit<NumberObj, string | number>;

type OmitBook = _Omit<Book, 'price' | 'author'>;

/**
 * usage: 从目标类型中排除所有 `null` 和 `undefined` 类型。
 */
type _NonNullable<T> = T & {};

type NonNullableTypes = NonNullable<string | null | undefined>;

/**
 * usage: 用于根据目标函数类型的参数构建一个元组类型。

 * explanation: `extends (...args: any) => any` 将类型 `T` 约束为函数类型，通过 `infer` 将函数参数推断为传入时的具体类型 `P`.
 */
type _Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

type ParametersTest = _Parameters<(arg1: { a: number }, arg2: string) => void>;

/**
 * usage: 用于根据目标构造函数类型的参数构建一个元组类型。
 */
type _ConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (...args: infer P) => any ? P : never;

type ConstructorParameters1 = _ConstructorParameters<ErrorConstructor>;

/**
 * usage: 用于根据目标函数的返回值类型构建一个类型。

 * explanation: 通过 `infer` 推断函数的返回值类型为 `R` ，如果 `T` 是一个函数类型(除了 `never` 类型)则返回其返回值的类型 `R`，否则返回 `any` 类型。
 */
type _ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

type ReturnType1 = _ReturnType<() => string>;
type ReturnType2 = ReturnType<<T extends U, U extends number[]>() => T>;

/**
 * usage: 用于根据目标构造函数返回的实例类型构建一个类型。
 */
type _InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;

class Book {
    title = 'ts';
    price = 49;
} 

type InstanceTypeBook = _InstanceType<typeof Book>;

const book: InstanceTypeBook = new Book();
const book2: InstanceTypeBook = {
    title: "",
    price: 0
}