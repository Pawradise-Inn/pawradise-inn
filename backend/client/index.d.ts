
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Staff
 * 
 */
export type Staff = $Result.DefaultSelection<Prisma.$StaffPayload>
/**
 * Model Customer
 * 
 */
export type Customer = $Result.DefaultSelection<Prisma.$CustomerPayload>
/**
 * Model ChatLog
 * 
 */
export type ChatLog = $Result.DefaultSelection<Prisma.$ChatLogPayload>
/**
 * Model Pet
 * 
 */
export type Pet = $Result.DefaultSelection<Prisma.$PetPayload>
/**
 * Model Room
 * 
 */
export type Room = $Result.DefaultSelection<Prisma.$RoomPayload>
/**
 * Model BookedRoom
 * 
 */
export type BookedRoom = $Result.DefaultSelection<Prisma.$BookedRoomPayload>
/**
 * Model Service
 * 
 */
export type Service = $Result.DefaultSelection<Prisma.$ServicePayload>
/**
 * Model BookedService
 * 
 */
export type BookedService = $Result.DefaultSelection<Prisma.$BookedServicePayload>
/**
 * Model Booking
 * 
 */
export type Booking = $Result.DefaultSelection<Prisma.$BookingPayload>
/**
 * Model Payment
 * 
 */
export type Payment = $Result.DefaultSelection<Prisma.$PaymentPayload>
/**
 * Model Care
 * 
 */
export type Care = $Result.DefaultSelection<Prisma.$CarePayload>
/**
 * Model StaffOnService
 * 
 */
export type StaffOnService = $Result.DefaultSelection<Prisma.$StaffOnServicePayload>
/**
 * Model RoomStaff
 * 
 */
export type RoomStaff = $Result.DefaultSelection<Prisma.$RoomStaffPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  STAFF: 'STAFF',
  CUSTOMER: 'CUSTOMER'
};

export type Role = (typeof Role)[keyof typeof Role]


export const Bank: {
  KASIKORN: 'KASIKORN',
  SCB: 'SCB',
  KRUNGTHAI: 'KRUNGTHAI'
};

export type Bank = (typeof Bank)[keyof typeof Bank]


export const PetType: {
  DOG: 'DOG',
  CAT: 'CAT',
  MOUSE: 'MOUSE',
  RABBIT: 'RABBIT',
  BIRD: 'BIRD'
};

export type PetType = (typeof PetType)[keyof typeof PetType]


export const Sex: {
  MALE: 'MALE',
  FEMALE: 'FEMALE'
};

export type Sex = (typeof Sex)[keyof typeof Sex]


export const PaymentStatus: {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
};

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus]


export const BookingStatus: {
  PENDING: 'PENDING',
  BOOKED: 'BOOKED',
  CHECKED_IN: 'CHECKED_IN',
  CHECKED_OUT: 'CHECKED_OUT',
  CANCELLED: 'CANCELLED'
};

export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus]


export const PetStatus: {
  IDLE: 'IDLE',
  QUEUE: 'QUEUE',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED'
};

export type PetStatus = (typeof PetStatus)[keyof typeof PetStatus]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type Bank = $Enums.Bank

export const Bank: typeof $Enums.Bank

export type PetType = $Enums.PetType

export const PetType: typeof $Enums.PetType

export type Sex = $Enums.Sex

export const Sex: typeof $Enums.Sex

export type PaymentStatus = $Enums.PaymentStatus

export const PaymentStatus: typeof $Enums.PaymentStatus

export type BookingStatus = $Enums.BookingStatus

export const BookingStatus: typeof $Enums.BookingStatus

export type PetStatus = $Enums.PetStatus

export const PetStatus: typeof $Enums.PetStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.staff`: Exposes CRUD operations for the **Staff** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Staff
    * const staff = await prisma.staff.findMany()
    * ```
    */
  get staff(): Prisma.StaffDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.customer`: Exposes CRUD operations for the **Customer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Customers
    * const customers = await prisma.customer.findMany()
    * ```
    */
  get customer(): Prisma.CustomerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chatLog`: Exposes CRUD operations for the **ChatLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChatLogs
    * const chatLogs = await prisma.chatLog.findMany()
    * ```
    */
  get chatLog(): Prisma.ChatLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pet`: Exposes CRUD operations for the **Pet** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pets
    * const pets = await prisma.pet.findMany()
    * ```
    */
  get pet(): Prisma.PetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.room`: Exposes CRUD operations for the **Room** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Rooms
    * const rooms = await prisma.room.findMany()
    * ```
    */
  get room(): Prisma.RoomDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bookedRoom`: Exposes CRUD operations for the **BookedRoom** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BookedRooms
    * const bookedRooms = await prisma.bookedRoom.findMany()
    * ```
    */
  get bookedRoom(): Prisma.BookedRoomDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.service`: Exposes CRUD operations for the **Service** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Services
    * const services = await prisma.service.findMany()
    * ```
    */
  get service(): Prisma.ServiceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bookedService`: Exposes CRUD operations for the **BookedService** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BookedServices
    * const bookedServices = await prisma.bookedService.findMany()
    * ```
    */
  get bookedService(): Prisma.BookedServiceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.booking`: Exposes CRUD operations for the **Booking** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bookings
    * const bookings = await prisma.booking.findMany()
    * ```
    */
  get booking(): Prisma.BookingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payment.findMany()
    * ```
    */
  get payment(): Prisma.PaymentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.care`: Exposes CRUD operations for the **Care** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Cares
    * const cares = await prisma.care.findMany()
    * ```
    */
  get care(): Prisma.CareDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.staffOnService`: Exposes CRUD operations for the **StaffOnService** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StaffOnServices
    * const staffOnServices = await prisma.staffOnService.findMany()
    * ```
    */
  get staffOnService(): Prisma.StaffOnServiceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.roomStaff`: Exposes CRUD operations for the **RoomStaff** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RoomStaffs
    * const roomStaffs = await prisma.roomStaff.findMany()
    * ```
    */
  get roomStaff(): Prisma.RoomStaffDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.15.0
   * Query Engine version: 85179d7826409ee107a6ba334b5e305ae3fba9fb
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Staff: 'Staff',
    Customer: 'Customer',
    ChatLog: 'ChatLog',
    Pet: 'Pet',
    Room: 'Room',
    BookedRoom: 'BookedRoom',
    Service: 'Service',
    BookedService: 'BookedService',
    Booking: 'Booking',
    Payment: 'Payment',
    Care: 'Care',
    StaffOnService: 'StaffOnService',
    RoomStaff: 'RoomStaff'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "staff" | "customer" | "chatLog" | "pet" | "room" | "bookedRoom" | "service" | "bookedService" | "booking" | "payment" | "care" | "staffOnService" | "roomStaff"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Staff: {
        payload: Prisma.$StaffPayload<ExtArgs>
        fields: Prisma.StaffFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StaffFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StaffFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          findFirst: {
            args: Prisma.StaffFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StaffFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          findMany: {
            args: Prisma.StaffFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>[]
          }
          create: {
            args: Prisma.StaffCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          createMany: {
            args: Prisma.StaffCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StaffCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>[]
          }
          delete: {
            args: Prisma.StaffDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          update: {
            args: Prisma.StaffUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          deleteMany: {
            args: Prisma.StaffDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StaffUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StaffUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>[]
          }
          upsert: {
            args: Prisma.StaffUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          aggregate: {
            args: Prisma.StaffAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStaff>
          }
          groupBy: {
            args: Prisma.StaffGroupByArgs<ExtArgs>
            result: $Utils.Optional<StaffGroupByOutputType>[]
          }
          count: {
            args: Prisma.StaffCountArgs<ExtArgs>
            result: $Utils.Optional<StaffCountAggregateOutputType> | number
          }
        }
      }
      Customer: {
        payload: Prisma.$CustomerPayload<ExtArgs>
        fields: Prisma.CustomerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findFirst: {
            args: Prisma.CustomerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findMany: {
            args: Prisma.CustomerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          create: {
            args: Prisma.CustomerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          createMany: {
            args: Prisma.CustomerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          delete: {
            args: Prisma.CustomerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          update: {
            args: Prisma.CustomerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          deleteMany: {
            args: Prisma.CustomerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CustomerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          upsert: {
            args: Prisma.CustomerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          aggregate: {
            args: Prisma.CustomerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomer>
          }
          groupBy: {
            args: Prisma.CustomerGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomerCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerCountAggregateOutputType> | number
          }
        }
      }
      ChatLog: {
        payload: Prisma.$ChatLogPayload<ExtArgs>
        fields: Prisma.ChatLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChatLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChatLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatLogPayload>
          }
          findFirst: {
            args: Prisma.ChatLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChatLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatLogPayload>
          }
          findMany: {
            args: Prisma.ChatLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatLogPayload>[]
          }
          create: {
            args: Prisma.ChatLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatLogPayload>
          }
          createMany: {
            args: Prisma.ChatLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChatLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatLogPayload>[]
          }
          delete: {
            args: Prisma.ChatLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatLogPayload>
          }
          update: {
            args: Prisma.ChatLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatLogPayload>
          }
          deleteMany: {
            args: Prisma.ChatLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChatLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChatLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatLogPayload>[]
          }
          upsert: {
            args: Prisma.ChatLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatLogPayload>
          }
          aggregate: {
            args: Prisma.ChatLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChatLog>
          }
          groupBy: {
            args: Prisma.ChatLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChatLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChatLogCountArgs<ExtArgs>
            result: $Utils.Optional<ChatLogCountAggregateOutputType> | number
          }
        }
      }
      Pet: {
        payload: Prisma.$PetPayload<ExtArgs>
        fields: Prisma.PetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PetPayload>
          }
          findFirst: {
            args: Prisma.PetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PetPayload>
          }
          findMany: {
            args: Prisma.PetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PetPayload>[]
          }
          create: {
            args: Prisma.PetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PetPayload>
          }
          createMany: {
            args: Prisma.PetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PetPayload>[]
          }
          delete: {
            args: Prisma.PetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PetPayload>
          }
          update: {
            args: Prisma.PetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PetPayload>
          }
          deleteMany: {
            args: Prisma.PetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PetUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PetPayload>[]
          }
          upsert: {
            args: Prisma.PetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PetPayload>
          }
          aggregate: {
            args: Prisma.PetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePet>
          }
          groupBy: {
            args: Prisma.PetGroupByArgs<ExtArgs>
            result: $Utils.Optional<PetGroupByOutputType>[]
          }
          count: {
            args: Prisma.PetCountArgs<ExtArgs>
            result: $Utils.Optional<PetCountAggregateOutputType> | number
          }
        }
      }
      Room: {
        payload: Prisma.$RoomPayload<ExtArgs>
        fields: Prisma.RoomFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoomFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoomFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          findFirst: {
            args: Prisma.RoomFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoomFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          findMany: {
            args: Prisma.RoomFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[]
          }
          create: {
            args: Prisma.RoomCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          createMany: {
            args: Prisma.RoomCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoomCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[]
          }
          delete: {
            args: Prisma.RoomDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          update: {
            args: Prisma.RoomUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          deleteMany: {
            args: Prisma.RoomDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoomUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoomUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[]
          }
          upsert: {
            args: Prisma.RoomUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          aggregate: {
            args: Prisma.RoomAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoom>
          }
          groupBy: {
            args: Prisma.RoomGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoomGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoomCountArgs<ExtArgs>
            result: $Utils.Optional<RoomCountAggregateOutputType> | number
          }
        }
      }
      BookedRoom: {
        payload: Prisma.$BookedRoomPayload<ExtArgs>
        fields: Prisma.BookedRoomFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BookedRoomFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookedRoomPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BookedRoomFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookedRoomPayload>
          }
          findFirst: {
            args: Prisma.BookedRoomFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookedRoomPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BookedRoomFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookedRoomPayload>
          }
          findMany: {
            args: Prisma.BookedRoomFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookedRoomPayload>[]
          }
          create: {
            args: Prisma.BookedRoomCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookedRoomPayload>
          }
          createMany: {
            args: Prisma.BookedRoomCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BookedRoomCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookedRoomPayload>[]
          }
          delete: {
            args: Prisma.BookedRoomDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookedRoomPayload>
          }
          update: {
            args: Prisma.BookedRoomUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookedRoomPayload>
          }
          deleteMany: {
            args: Prisma.BookedRoomDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BookedRoomUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BookedRoomUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookedRoomPayload>[]
          }
          upsert: {
            args: Prisma.BookedRoomUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookedRoomPayload>
          }
          aggregate: {
            args: Prisma.BookedRoomAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBookedRoom>
          }
          groupBy: {
            args: Prisma.BookedRoomGroupByArgs<ExtArgs>
            result: $Utils.Optional<BookedRoomGroupByOutputType>[]
          }
          count: {
            args: Prisma.BookedRoomCountArgs<ExtArgs>
            result: $Utils.Optional<BookedRoomCountAggregateOutputType> | number
          }
        }
      }
      Service: {
        payload: Prisma.$ServicePayload<ExtArgs>
        fields: Prisma.ServiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findFirst: {
            args: Prisma.ServiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findMany: {
            args: Prisma.ServiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          create: {
            args: Prisma.ServiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          createMany: {
            args: Prisma.ServiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          delete: {
            args: Prisma.ServiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          update: {
            args: Prisma.ServiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          deleteMany: {
            args: Prisma.ServiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServiceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          upsert: {
            args: Prisma.ServiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          aggregate: {
            args: Prisma.ServiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateService>
          }
          groupBy: {
            args: Prisma.ServiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceCountAggregateOutputType> | number
          }
        }
      }
      BookedService: {
        payload: Prisma.$BookedServicePayload<ExtArgs>
        fields: Prisma.BookedServiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BookedServiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookedServicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BookedServiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookedServicePayload>
          }
          findFirst: {
            args: Prisma.BookedServiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookedServicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BookedServiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookedServicePayload>
          }
          findMany: {
            args: Prisma.BookedServiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookedServicePayload>[]
          }
          create: {
            args: Prisma.BookedServiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookedServicePayload>
          }
          createMany: {
            args: Prisma.BookedServiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BookedServiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookedServicePayload>[]
          }
          delete: {
            args: Prisma.BookedServiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookedServicePayload>
          }
          update: {
            args: Prisma.BookedServiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookedServicePayload>
          }
          deleteMany: {
            args: Prisma.BookedServiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BookedServiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BookedServiceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookedServicePayload>[]
          }
          upsert: {
            args: Prisma.BookedServiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookedServicePayload>
          }
          aggregate: {
            args: Prisma.BookedServiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBookedService>
          }
          groupBy: {
            args: Prisma.BookedServiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<BookedServiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.BookedServiceCountArgs<ExtArgs>
            result: $Utils.Optional<BookedServiceCountAggregateOutputType> | number
          }
        }
      }
      Booking: {
        payload: Prisma.$BookingPayload<ExtArgs>
        fields: Prisma.BookingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BookingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BookingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          findFirst: {
            args: Prisma.BookingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BookingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          findMany: {
            args: Prisma.BookingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>[]
          }
          create: {
            args: Prisma.BookingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          createMany: {
            args: Prisma.BookingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BookingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>[]
          }
          delete: {
            args: Prisma.BookingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          update: {
            args: Prisma.BookingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          deleteMany: {
            args: Prisma.BookingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BookingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BookingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>[]
          }
          upsert: {
            args: Prisma.BookingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          aggregate: {
            args: Prisma.BookingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBooking>
          }
          groupBy: {
            args: Prisma.BookingGroupByArgs<ExtArgs>
            result: $Utils.Optional<BookingGroupByOutputType>[]
          }
          count: {
            args: Prisma.BookingCountArgs<ExtArgs>
            result: $Utils.Optional<BookingCountAggregateOutputType> | number
          }
        }
      }
      Payment: {
        payload: Prisma.$PaymentPayload<ExtArgs>
        fields: Prisma.PaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findFirst: {
            args: Prisma.PaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findMany: {
            args: Prisma.PaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          create: {
            args: Prisma.PaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          createMany: {
            args: Prisma.PaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          delete: {
            args: Prisma.PaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          update: {
            args: Prisma.PaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          deleteMany: {
            args: Prisma.PaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PaymentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          upsert: {
            args: Prisma.PaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          aggregate: {
            args: Prisma.PaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayment>
          }
          groupBy: {
            args: Prisma.PaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentCountAggregateOutputType> | number
          }
        }
      }
      Care: {
        payload: Prisma.$CarePayload<ExtArgs>
        fields: Prisma.CareFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CareFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CareFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarePayload>
          }
          findFirst: {
            args: Prisma.CareFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CareFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarePayload>
          }
          findMany: {
            args: Prisma.CareFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarePayload>[]
          }
          create: {
            args: Prisma.CareCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarePayload>
          }
          createMany: {
            args: Prisma.CareCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CareCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarePayload>[]
          }
          delete: {
            args: Prisma.CareDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarePayload>
          }
          update: {
            args: Prisma.CareUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarePayload>
          }
          deleteMany: {
            args: Prisma.CareDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CareUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CareUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarePayload>[]
          }
          upsert: {
            args: Prisma.CareUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarePayload>
          }
          aggregate: {
            args: Prisma.CareAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCare>
          }
          groupBy: {
            args: Prisma.CareGroupByArgs<ExtArgs>
            result: $Utils.Optional<CareGroupByOutputType>[]
          }
          count: {
            args: Prisma.CareCountArgs<ExtArgs>
            result: $Utils.Optional<CareCountAggregateOutputType> | number
          }
        }
      }
      StaffOnService: {
        payload: Prisma.$StaffOnServicePayload<ExtArgs>
        fields: Prisma.StaffOnServiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StaffOnServiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffOnServicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StaffOnServiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffOnServicePayload>
          }
          findFirst: {
            args: Prisma.StaffOnServiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffOnServicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StaffOnServiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffOnServicePayload>
          }
          findMany: {
            args: Prisma.StaffOnServiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffOnServicePayload>[]
          }
          create: {
            args: Prisma.StaffOnServiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffOnServicePayload>
          }
          createMany: {
            args: Prisma.StaffOnServiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StaffOnServiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffOnServicePayload>[]
          }
          delete: {
            args: Prisma.StaffOnServiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffOnServicePayload>
          }
          update: {
            args: Prisma.StaffOnServiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffOnServicePayload>
          }
          deleteMany: {
            args: Prisma.StaffOnServiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StaffOnServiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StaffOnServiceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffOnServicePayload>[]
          }
          upsert: {
            args: Prisma.StaffOnServiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffOnServicePayload>
          }
          aggregate: {
            args: Prisma.StaffOnServiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStaffOnService>
          }
          groupBy: {
            args: Prisma.StaffOnServiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<StaffOnServiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.StaffOnServiceCountArgs<ExtArgs>
            result: $Utils.Optional<StaffOnServiceCountAggregateOutputType> | number
          }
        }
      }
      RoomStaff: {
        payload: Prisma.$RoomStaffPayload<ExtArgs>
        fields: Prisma.RoomStaffFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoomStaffFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStaffPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoomStaffFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStaffPayload>
          }
          findFirst: {
            args: Prisma.RoomStaffFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStaffPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoomStaffFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStaffPayload>
          }
          findMany: {
            args: Prisma.RoomStaffFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStaffPayload>[]
          }
          create: {
            args: Prisma.RoomStaffCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStaffPayload>
          }
          createMany: {
            args: Prisma.RoomStaffCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoomStaffCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStaffPayload>[]
          }
          delete: {
            args: Prisma.RoomStaffDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStaffPayload>
          }
          update: {
            args: Prisma.RoomStaffUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStaffPayload>
          }
          deleteMany: {
            args: Prisma.RoomStaffDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoomStaffUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoomStaffUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStaffPayload>[]
          }
          upsert: {
            args: Prisma.RoomStaffUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStaffPayload>
          }
          aggregate: {
            args: Prisma.RoomStaffAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoomStaff>
          }
          groupBy: {
            args: Prisma.RoomStaffGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoomStaffGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoomStaffCountArgs<ExtArgs>
            result: $Utils.Optional<RoomStaffCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    staff?: StaffOmit
    customer?: CustomerOmit
    chatLog?: ChatLogOmit
    pet?: PetOmit
    room?: RoomOmit
    bookedRoom?: BookedRoomOmit
    service?: ServiceOmit
    bookedService?: BookedServiceOmit
    booking?: BookingOmit
    payment?: PaymentOmit
    care?: CareOmit
    staffOnService?: StaffOnServiceOmit
    roomStaff?: RoomStaffOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type StaffCountOutputType
   */

  export type StaffCountOutputType = {
    replies: number
    cares: number
    staffOnServices: number
    roomStaff: number
  }

  export type StaffCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    replies?: boolean | StaffCountOutputTypeCountRepliesArgs
    cares?: boolean | StaffCountOutputTypeCountCaresArgs
    staffOnServices?: boolean | StaffCountOutputTypeCountStaffOnServicesArgs
    roomStaff?: boolean | StaffCountOutputTypeCountRoomStaffArgs
  }

  // Custom InputTypes
  /**
   * StaffCountOutputType without action
   */
  export type StaffCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffCountOutputType
     */
    select?: StaffCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StaffCountOutputType without action
   */
  export type StaffCountOutputTypeCountRepliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatLogWhereInput
  }

  /**
   * StaffCountOutputType without action
   */
  export type StaffCountOutputTypeCountCaresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CareWhereInput
  }

  /**
   * StaffCountOutputType without action
   */
  export type StaffCountOutputTypeCountStaffOnServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StaffOnServiceWhereInput
  }

  /**
   * StaffCountOutputType without action
   */
  export type StaffCountOutputTypeCountRoomStaffArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomStaffWhereInput
  }


  /**
   * Count Type CustomerCountOutputType
   */

  export type CustomerCountOutputType = {
    chats: number
    pets: number
    bookings: number
    payments: number
  }

  export type CustomerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chats?: boolean | CustomerCountOutputTypeCountChatsArgs
    pets?: boolean | CustomerCountOutputTypeCountPetsArgs
    bookings?: boolean | CustomerCountOutputTypeCountBookingsArgs
    payments?: boolean | CustomerCountOutputTypeCountPaymentsArgs
  }

  // Custom InputTypes
  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerCountOutputType
     */
    select?: CustomerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountChatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatLogWhereInput
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountPetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PetWhereInput
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
  }


  /**
   * Count Type PetCountOutputType
   */

  export type PetCountOutputType = {
    scheduled: number
    stayed: number
    cares: number
  }

  export type PetCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    scheduled?: boolean | PetCountOutputTypeCountScheduledArgs
    stayed?: boolean | PetCountOutputTypeCountStayedArgs
    cares?: boolean | PetCountOutputTypeCountCaresArgs
  }

  // Custom InputTypes
  /**
   * PetCountOutputType without action
   */
  export type PetCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PetCountOutputType
     */
    select?: PetCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PetCountOutputType without action
   */
  export type PetCountOutputTypeCountScheduledArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookedServiceWhereInput
  }

  /**
   * PetCountOutputType without action
   */
  export type PetCountOutputTypeCountStayedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookedRoomWhereInput
  }

  /**
   * PetCountOutputType without action
   */
  export type PetCountOutputTypeCountCaresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CareWhereInput
  }


  /**
   * Count Type RoomCountOutputType
   */

  export type RoomCountOutputType = {
    bookings: number
    staffOnRooms: number
  }

  export type RoomCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookings?: boolean | RoomCountOutputTypeCountBookingsArgs
    staffOnRooms?: boolean | RoomCountOutputTypeCountStaffOnRoomsArgs
  }

  // Custom InputTypes
  /**
   * RoomCountOutputType without action
   */
  export type RoomCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomCountOutputType
     */
    select?: RoomCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RoomCountOutputType without action
   */
  export type RoomCountOutputTypeCountBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookedRoomWhereInput
  }

  /**
   * RoomCountOutputType without action
   */
  export type RoomCountOutputTypeCountStaffOnRoomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomStaffWhereInput
  }


  /**
   * Count Type ServiceCountOutputType
   */

  export type ServiceCountOutputType = {
    reviews: number
    staffOnServices: number
    bookedServices: number
  }

  export type ServiceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reviews?: boolean | ServiceCountOutputTypeCountReviewsArgs
    staffOnServices?: boolean | ServiceCountOutputTypeCountStaffOnServicesArgs
    bookedServices?: boolean | ServiceCountOutputTypeCountBookedServicesArgs
  }

  // Custom InputTypes
  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCountOutputType
     */
    select?: ServiceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatLogWhereInput
  }

  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeCountStaffOnServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StaffOnServiceWhereInput
  }

  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeCountBookedServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookedServiceWhereInput
  }


  /**
   * Count Type BookingCountOutputType
   */

  export type BookingCountOutputType = {
    booked_service: number
    booked_room: number
  }

  export type BookingCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booked_service?: boolean | BookingCountOutputTypeCountBooked_serviceArgs
    booked_room?: boolean | BookingCountOutputTypeCountBooked_roomArgs
  }

  // Custom InputTypes
  /**
   * BookingCountOutputType without action
   */
  export type BookingCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingCountOutputType
     */
    select?: BookingCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BookingCountOutputType without action
   */
  export type BookingCountOutputTypeCountBooked_serviceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookedServiceWhereInput
  }

  /**
   * BookingCountOutputType without action
   */
  export type BookingCountOutputTypeCountBooked_roomArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookedRoomWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    firstname: string | null
    lastname: string | null
    email: string | null
    phone_number: string | null
    user_name: string | null
    password: string | null
    role: $Enums.Role | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    firstname: string | null
    lastname: string | null
    email: string | null
    phone_number: string | null
    user_name: string | null
    password: string | null
    role: $Enums.Role | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    firstname: number
    lastname: number
    email: number
    phone_number: number
    user_name: number
    password: number
    role: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    firstname?: true
    lastname?: true
    email?: true
    phone_number?: true
    user_name?: true
    password?: true
    role?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    firstname?: true
    lastname?: true
    email?: true
    phone_number?: true
    user_name?: true
    password?: true
    role?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    firstname?: true
    lastname?: true
    email?: true
    phone_number?: true
    user_name?: true
    password?: true
    role?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    firstname: string
    lastname: string
    email: string
    phone_number: string
    user_name: string
    password: string
    role: $Enums.Role
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstname?: boolean
    lastname?: boolean
    email?: boolean
    phone_number?: boolean
    user_name?: boolean
    password?: boolean
    role?: boolean
    staff?: boolean | User$staffArgs<ExtArgs>
    customer?: boolean | User$customerArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstname?: boolean
    lastname?: boolean
    email?: boolean
    phone_number?: boolean
    user_name?: boolean
    password?: boolean
    role?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstname?: boolean
    lastname?: boolean
    email?: boolean
    phone_number?: boolean
    user_name?: boolean
    password?: boolean
    role?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    firstname?: boolean
    lastname?: boolean
    email?: boolean
    phone_number?: boolean
    user_name?: boolean
    password?: boolean
    role?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firstname" | "lastname" | "email" | "phone_number" | "user_name" | "password" | "role", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    staff?: boolean | User$staffArgs<ExtArgs>
    customer?: boolean | User$customerArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      staff: Prisma.$StaffPayload<ExtArgs> | null
      customer: Prisma.$CustomerPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      firstname: string
      lastname: string
      email: string
      phone_number: string
      user_name: string
      password: string
      role: $Enums.Role
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    staff<T extends User$staffArgs<ExtArgs> = {}>(args?: Subset<T, User$staffArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    customer<T extends User$customerArgs<ExtArgs> = {}>(args?: Subset<T, User$customerArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly firstname: FieldRef<"User", 'String'>
    readonly lastname: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly phone_number: FieldRef<"User", 'String'>
    readonly user_name: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.staff
   */
  export type User$staffArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    where?: StaffWhereInput
  }

  /**
   * User.customer
   */
  export type User$customerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    where?: CustomerWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Staff
   */

  export type AggregateStaff = {
    _count: StaffCountAggregateOutputType | null
    _avg: StaffAvgAggregateOutputType | null
    _sum: StaffSumAggregateOutputType | null
    _min: StaffMinAggregateOutputType | null
    _max: StaffMaxAggregateOutputType | null
  }

  export type StaffAvgAggregateOutputType = {
    id: number | null
    wages: number | null
    userId: number | null
  }

  export type StaffSumAggregateOutputType = {
    id: number | null
    wages: number | null
    userId: number | null
  }

  export type StaffMinAggregateOutputType = {
    id: number | null
    wages: number | null
    bank_company: $Enums.Bank | null
    bank_account: string | null
    userId: number | null
  }

  export type StaffMaxAggregateOutputType = {
    id: number | null
    wages: number | null
    bank_company: $Enums.Bank | null
    bank_account: string | null
    userId: number | null
  }

  export type StaffCountAggregateOutputType = {
    id: number
    wages: number
    bank_company: number
    bank_account: number
    userId: number
    _all: number
  }


  export type StaffAvgAggregateInputType = {
    id?: true
    wages?: true
    userId?: true
  }

  export type StaffSumAggregateInputType = {
    id?: true
    wages?: true
    userId?: true
  }

  export type StaffMinAggregateInputType = {
    id?: true
    wages?: true
    bank_company?: true
    bank_account?: true
    userId?: true
  }

  export type StaffMaxAggregateInputType = {
    id?: true
    wages?: true
    bank_company?: true
    bank_account?: true
    userId?: true
  }

  export type StaffCountAggregateInputType = {
    id?: true
    wages?: true
    bank_company?: true
    bank_account?: true
    userId?: true
    _all?: true
  }

  export type StaffAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Staff to aggregate.
     */
    where?: StaffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Staff to fetch.
     */
    orderBy?: StaffOrderByWithRelationInput | StaffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StaffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Staff from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Staff.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Staff
    **/
    _count?: true | StaffCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StaffAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StaffSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StaffMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StaffMaxAggregateInputType
  }

  export type GetStaffAggregateType<T extends StaffAggregateArgs> = {
        [P in keyof T & keyof AggregateStaff]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStaff[P]>
      : GetScalarType<T[P], AggregateStaff[P]>
  }




  export type StaffGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StaffWhereInput
    orderBy?: StaffOrderByWithAggregationInput | StaffOrderByWithAggregationInput[]
    by: StaffScalarFieldEnum[] | StaffScalarFieldEnum
    having?: StaffScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StaffCountAggregateInputType | true
    _avg?: StaffAvgAggregateInputType
    _sum?: StaffSumAggregateInputType
    _min?: StaffMinAggregateInputType
    _max?: StaffMaxAggregateInputType
  }

  export type StaffGroupByOutputType = {
    id: number
    wages: number
    bank_company: $Enums.Bank
    bank_account: string
    userId: number
    _count: StaffCountAggregateOutputType | null
    _avg: StaffAvgAggregateOutputType | null
    _sum: StaffSumAggregateOutputType | null
    _min: StaffMinAggregateOutputType | null
    _max: StaffMaxAggregateOutputType | null
  }

  type GetStaffGroupByPayload<T extends StaffGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StaffGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StaffGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StaffGroupByOutputType[P]>
            : GetScalarType<T[P], StaffGroupByOutputType[P]>
        }
      >
    >


  export type StaffSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    wages?: boolean
    bank_company?: boolean
    bank_account?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    replies?: boolean | Staff$repliesArgs<ExtArgs>
    cares?: boolean | Staff$caresArgs<ExtArgs>
    staffOnServices?: boolean | Staff$staffOnServicesArgs<ExtArgs>
    roomStaff?: boolean | Staff$roomStaffArgs<ExtArgs>
    _count?: boolean | StaffCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["staff"]>

  export type StaffSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    wages?: boolean
    bank_company?: boolean
    bank_account?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["staff"]>

  export type StaffSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    wages?: boolean
    bank_company?: boolean
    bank_account?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["staff"]>

  export type StaffSelectScalar = {
    id?: boolean
    wages?: boolean
    bank_company?: boolean
    bank_account?: boolean
    userId?: boolean
  }

  export type StaffOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "wages" | "bank_company" | "bank_account" | "userId", ExtArgs["result"]["staff"]>
  export type StaffInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    replies?: boolean | Staff$repliesArgs<ExtArgs>
    cares?: boolean | Staff$caresArgs<ExtArgs>
    staffOnServices?: boolean | Staff$staffOnServicesArgs<ExtArgs>
    roomStaff?: boolean | Staff$roomStaffArgs<ExtArgs>
    _count?: boolean | StaffCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StaffIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type StaffIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $StaffPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Staff"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      replies: Prisma.$ChatLogPayload<ExtArgs>[]
      cares: Prisma.$CarePayload<ExtArgs>[]
      staffOnServices: Prisma.$StaffOnServicePayload<ExtArgs>[]
      roomStaff: Prisma.$RoomStaffPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      wages: number
      bank_company: $Enums.Bank
      bank_account: string
      userId: number
    }, ExtArgs["result"]["staff"]>
    composites: {}
  }

  type StaffGetPayload<S extends boolean | null | undefined | StaffDefaultArgs> = $Result.GetResult<Prisma.$StaffPayload, S>

  type StaffCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StaffFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StaffCountAggregateInputType | true
    }

  export interface StaffDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Staff'], meta: { name: 'Staff' } }
    /**
     * Find zero or one Staff that matches the filter.
     * @param {StaffFindUniqueArgs} args - Arguments to find a Staff
     * @example
     * // Get one Staff
     * const staff = await prisma.staff.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StaffFindUniqueArgs>(args: SelectSubset<T, StaffFindUniqueArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Staff that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StaffFindUniqueOrThrowArgs} args - Arguments to find a Staff
     * @example
     * // Get one Staff
     * const staff = await prisma.staff.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StaffFindUniqueOrThrowArgs>(args: SelectSubset<T, StaffFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Staff that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffFindFirstArgs} args - Arguments to find a Staff
     * @example
     * // Get one Staff
     * const staff = await prisma.staff.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StaffFindFirstArgs>(args?: SelectSubset<T, StaffFindFirstArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Staff that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffFindFirstOrThrowArgs} args - Arguments to find a Staff
     * @example
     * // Get one Staff
     * const staff = await prisma.staff.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StaffFindFirstOrThrowArgs>(args?: SelectSubset<T, StaffFindFirstOrThrowArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Staff that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Staff
     * const staff = await prisma.staff.findMany()
     * 
     * // Get first 10 Staff
     * const staff = await prisma.staff.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const staffWithIdOnly = await prisma.staff.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StaffFindManyArgs>(args?: SelectSubset<T, StaffFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Staff.
     * @param {StaffCreateArgs} args - Arguments to create a Staff.
     * @example
     * // Create one Staff
     * const Staff = await prisma.staff.create({
     *   data: {
     *     // ... data to create a Staff
     *   }
     * })
     * 
     */
    create<T extends StaffCreateArgs>(args: SelectSubset<T, StaffCreateArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Staff.
     * @param {StaffCreateManyArgs} args - Arguments to create many Staff.
     * @example
     * // Create many Staff
     * const staff = await prisma.staff.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StaffCreateManyArgs>(args?: SelectSubset<T, StaffCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Staff and returns the data saved in the database.
     * @param {StaffCreateManyAndReturnArgs} args - Arguments to create many Staff.
     * @example
     * // Create many Staff
     * const staff = await prisma.staff.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Staff and only return the `id`
     * const staffWithIdOnly = await prisma.staff.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StaffCreateManyAndReturnArgs>(args?: SelectSubset<T, StaffCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Staff.
     * @param {StaffDeleteArgs} args - Arguments to delete one Staff.
     * @example
     * // Delete one Staff
     * const Staff = await prisma.staff.delete({
     *   where: {
     *     // ... filter to delete one Staff
     *   }
     * })
     * 
     */
    delete<T extends StaffDeleteArgs>(args: SelectSubset<T, StaffDeleteArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Staff.
     * @param {StaffUpdateArgs} args - Arguments to update one Staff.
     * @example
     * // Update one Staff
     * const staff = await prisma.staff.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StaffUpdateArgs>(args: SelectSubset<T, StaffUpdateArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Staff.
     * @param {StaffDeleteManyArgs} args - Arguments to filter Staff to delete.
     * @example
     * // Delete a few Staff
     * const { count } = await prisma.staff.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StaffDeleteManyArgs>(args?: SelectSubset<T, StaffDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Staff.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Staff
     * const staff = await prisma.staff.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StaffUpdateManyArgs>(args: SelectSubset<T, StaffUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Staff and returns the data updated in the database.
     * @param {StaffUpdateManyAndReturnArgs} args - Arguments to update many Staff.
     * @example
     * // Update many Staff
     * const staff = await prisma.staff.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Staff and only return the `id`
     * const staffWithIdOnly = await prisma.staff.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StaffUpdateManyAndReturnArgs>(args: SelectSubset<T, StaffUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Staff.
     * @param {StaffUpsertArgs} args - Arguments to update or create a Staff.
     * @example
     * // Update or create a Staff
     * const staff = await prisma.staff.upsert({
     *   create: {
     *     // ... data to create a Staff
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Staff we want to update
     *   }
     * })
     */
    upsert<T extends StaffUpsertArgs>(args: SelectSubset<T, StaffUpsertArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Staff.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffCountArgs} args - Arguments to filter Staff to count.
     * @example
     * // Count the number of Staff
     * const count = await prisma.staff.count({
     *   where: {
     *     // ... the filter for the Staff we want to count
     *   }
     * })
    **/
    count<T extends StaffCountArgs>(
      args?: Subset<T, StaffCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StaffCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Staff.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StaffAggregateArgs>(args: Subset<T, StaffAggregateArgs>): Prisma.PrismaPromise<GetStaffAggregateType<T>>

    /**
     * Group by Staff.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StaffGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StaffGroupByArgs['orderBy'] }
        : { orderBy?: StaffGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StaffGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStaffGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Staff model
   */
  readonly fields: StaffFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Staff.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StaffClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    replies<T extends Staff$repliesArgs<ExtArgs> = {}>(args?: Subset<T, Staff$repliesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    cares<T extends Staff$caresArgs<ExtArgs> = {}>(args?: Subset<T, Staff$caresArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CarePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    staffOnServices<T extends Staff$staffOnServicesArgs<ExtArgs> = {}>(args?: Subset<T, Staff$staffOnServicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffOnServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    roomStaff<T extends Staff$roomStaffArgs<ExtArgs> = {}>(args?: Subset<T, Staff$roomStaffArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomStaffPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Staff model
   */
  interface StaffFieldRefs {
    readonly id: FieldRef<"Staff", 'Int'>
    readonly wages: FieldRef<"Staff", 'Float'>
    readonly bank_company: FieldRef<"Staff", 'Bank'>
    readonly bank_account: FieldRef<"Staff", 'String'>
    readonly userId: FieldRef<"Staff", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Staff findUnique
   */
  export type StaffFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * Filter, which Staff to fetch.
     */
    where: StaffWhereUniqueInput
  }

  /**
   * Staff findUniqueOrThrow
   */
  export type StaffFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * Filter, which Staff to fetch.
     */
    where: StaffWhereUniqueInput
  }

  /**
   * Staff findFirst
   */
  export type StaffFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * Filter, which Staff to fetch.
     */
    where?: StaffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Staff to fetch.
     */
    orderBy?: StaffOrderByWithRelationInput | StaffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Staff.
     */
    cursor?: StaffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Staff from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Staff.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Staff.
     */
    distinct?: StaffScalarFieldEnum | StaffScalarFieldEnum[]
  }

  /**
   * Staff findFirstOrThrow
   */
  export type StaffFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * Filter, which Staff to fetch.
     */
    where?: StaffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Staff to fetch.
     */
    orderBy?: StaffOrderByWithRelationInput | StaffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Staff.
     */
    cursor?: StaffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Staff from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Staff.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Staff.
     */
    distinct?: StaffScalarFieldEnum | StaffScalarFieldEnum[]
  }

  /**
   * Staff findMany
   */
  export type StaffFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * Filter, which Staff to fetch.
     */
    where?: StaffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Staff to fetch.
     */
    orderBy?: StaffOrderByWithRelationInput | StaffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Staff.
     */
    cursor?: StaffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Staff from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Staff.
     */
    skip?: number
    distinct?: StaffScalarFieldEnum | StaffScalarFieldEnum[]
  }

  /**
   * Staff create
   */
  export type StaffCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * The data needed to create a Staff.
     */
    data: XOR<StaffCreateInput, StaffUncheckedCreateInput>
  }

  /**
   * Staff createMany
   */
  export type StaffCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Staff.
     */
    data: StaffCreateManyInput | StaffCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Staff createManyAndReturn
   */
  export type StaffCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * The data used to create many Staff.
     */
    data: StaffCreateManyInput | StaffCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Staff update
   */
  export type StaffUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * The data needed to update a Staff.
     */
    data: XOR<StaffUpdateInput, StaffUncheckedUpdateInput>
    /**
     * Choose, which Staff to update.
     */
    where: StaffWhereUniqueInput
  }

  /**
   * Staff updateMany
   */
  export type StaffUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Staff.
     */
    data: XOR<StaffUpdateManyMutationInput, StaffUncheckedUpdateManyInput>
    /**
     * Filter which Staff to update
     */
    where?: StaffWhereInput
    /**
     * Limit how many Staff to update.
     */
    limit?: number
  }

  /**
   * Staff updateManyAndReturn
   */
  export type StaffUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * The data used to update Staff.
     */
    data: XOR<StaffUpdateManyMutationInput, StaffUncheckedUpdateManyInput>
    /**
     * Filter which Staff to update
     */
    where?: StaffWhereInput
    /**
     * Limit how many Staff to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Staff upsert
   */
  export type StaffUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * The filter to search for the Staff to update in case it exists.
     */
    where: StaffWhereUniqueInput
    /**
     * In case the Staff found by the `where` argument doesn't exist, create a new Staff with this data.
     */
    create: XOR<StaffCreateInput, StaffUncheckedCreateInput>
    /**
     * In case the Staff was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StaffUpdateInput, StaffUncheckedUpdateInput>
  }

  /**
   * Staff delete
   */
  export type StaffDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * Filter which Staff to delete.
     */
    where: StaffWhereUniqueInput
  }

  /**
   * Staff deleteMany
   */
  export type StaffDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Staff to delete
     */
    where?: StaffWhereInput
    /**
     * Limit how many Staff to delete.
     */
    limit?: number
  }

  /**
   * Staff.replies
   */
  export type Staff$repliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatLog
     */
    select?: ChatLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatLog
     */
    omit?: ChatLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatLogInclude<ExtArgs> | null
    where?: ChatLogWhereInput
    orderBy?: ChatLogOrderByWithRelationInput | ChatLogOrderByWithRelationInput[]
    cursor?: ChatLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChatLogScalarFieldEnum | ChatLogScalarFieldEnum[]
  }

  /**
   * Staff.cares
   */
  export type Staff$caresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Care
     */
    select?: CareSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Care
     */
    omit?: CareOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareInclude<ExtArgs> | null
    where?: CareWhereInput
    orderBy?: CareOrderByWithRelationInput | CareOrderByWithRelationInput[]
    cursor?: CareWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CareScalarFieldEnum | CareScalarFieldEnum[]
  }

  /**
   * Staff.staffOnServices
   */
  export type Staff$staffOnServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffOnService
     */
    select?: StaffOnServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffOnService
     */
    omit?: StaffOnServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffOnServiceInclude<ExtArgs> | null
    where?: StaffOnServiceWhereInput
    orderBy?: StaffOnServiceOrderByWithRelationInput | StaffOnServiceOrderByWithRelationInput[]
    cursor?: StaffOnServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StaffOnServiceScalarFieldEnum | StaffOnServiceScalarFieldEnum[]
  }

  /**
   * Staff.roomStaff
   */
  export type Staff$roomStaffArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStaff
     */
    select?: RoomStaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStaff
     */
    omit?: RoomStaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStaffInclude<ExtArgs> | null
    where?: RoomStaffWhereInput
    orderBy?: RoomStaffOrderByWithRelationInput | RoomStaffOrderByWithRelationInput[]
    cursor?: RoomStaffWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomStaffScalarFieldEnum | RoomStaffScalarFieldEnum[]
  }

  /**
   * Staff without action
   */
  export type StaffDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
  }


  /**
   * Model Customer
   */

  export type AggregateCustomer = {
    _count: CustomerCountAggregateOutputType | null
    _avg: CustomerAvgAggregateOutputType | null
    _sum: CustomerSumAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  export type CustomerAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type CustomerSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type CustomerMinAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type CustomerMaxAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type CustomerCountAggregateOutputType = {
    id: number
    userId: number
    _all: number
  }


  export type CustomerAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type CustomerSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type CustomerMinAggregateInputType = {
    id?: true
    userId?: true
  }

  export type CustomerMaxAggregateInputType = {
    id?: true
    userId?: true
  }

  export type CustomerCountAggregateInputType = {
    id?: true
    userId?: true
    _all?: true
  }

  export type CustomerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customer to aggregate.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Customers
    **/
    _count?: true | CustomerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CustomerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CustomerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerMaxAggregateInputType
  }

  export type GetCustomerAggregateType<T extends CustomerAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomer[P]>
      : GetScalarType<T[P], AggregateCustomer[P]>
  }




  export type CustomerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerWhereInput
    orderBy?: CustomerOrderByWithAggregationInput | CustomerOrderByWithAggregationInput[]
    by: CustomerScalarFieldEnum[] | CustomerScalarFieldEnum
    having?: CustomerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerCountAggregateInputType | true
    _avg?: CustomerAvgAggregateInputType
    _sum?: CustomerSumAggregateInputType
    _min?: CustomerMinAggregateInputType
    _max?: CustomerMaxAggregateInputType
  }

  export type CustomerGroupByOutputType = {
    id: number
    userId: number
    _count: CustomerCountAggregateOutputType | null
    _avg: CustomerAvgAggregateOutputType | null
    _sum: CustomerSumAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  type GetCustomerGroupByPayload<T extends CustomerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerGroupByOutputType[P]>
        }
      >
    >


  export type CustomerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    chats?: boolean | Customer$chatsArgs<ExtArgs>
    pets?: boolean | Customer$petsArgs<ExtArgs>
    bookings?: boolean | Customer$bookingsArgs<ExtArgs>
    payments?: boolean | Customer$paymentsArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectScalar = {
    id?: boolean
    userId?: boolean
  }

  export type CustomerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId", ExtArgs["result"]["customer"]>
  export type CustomerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    chats?: boolean | Customer$chatsArgs<ExtArgs>
    pets?: boolean | Customer$petsArgs<ExtArgs>
    bookings?: boolean | Customer$bookingsArgs<ExtArgs>
    payments?: boolean | Customer$paymentsArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CustomerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CustomerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CustomerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Customer"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      chats: Prisma.$ChatLogPayload<ExtArgs>[]
      pets: Prisma.$PetPayload<ExtArgs>[]
      bookings: Prisma.$BookingPayload<ExtArgs>[]
      payments: Prisma.$PaymentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
    }, ExtArgs["result"]["customer"]>
    composites: {}
  }

  type CustomerGetPayload<S extends boolean | null | undefined | CustomerDefaultArgs> = $Result.GetResult<Prisma.$CustomerPayload, S>

  type CustomerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CustomerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CustomerCountAggregateInputType | true
    }

  export interface CustomerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Customer'], meta: { name: 'Customer' } }
    /**
     * Find zero or one Customer that matches the filter.
     * @param {CustomerFindUniqueArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerFindUniqueArgs>(args: SelectSubset<T, CustomerFindUniqueArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Customer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CustomerFindUniqueOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerFindFirstArgs>(args?: SelectSubset<T, CustomerFindFirstArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Customers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Customers
     * const customers = await prisma.customer.findMany()
     * 
     * // Get first 10 Customers
     * const customers = await prisma.customer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customerWithIdOnly = await prisma.customer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomerFindManyArgs>(args?: SelectSubset<T, CustomerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Customer.
     * @param {CustomerCreateArgs} args - Arguments to create a Customer.
     * @example
     * // Create one Customer
     * const Customer = await prisma.customer.create({
     *   data: {
     *     // ... data to create a Customer
     *   }
     * })
     * 
     */
    create<T extends CustomerCreateArgs>(args: SelectSubset<T, CustomerCreateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Customers.
     * @param {CustomerCreateManyArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerCreateManyArgs>(args?: SelectSubset<T, CustomerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Customers and returns the data saved in the database.
     * @param {CustomerCreateManyAndReturnArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomerCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Customer.
     * @param {CustomerDeleteArgs} args - Arguments to delete one Customer.
     * @example
     * // Delete one Customer
     * const Customer = await prisma.customer.delete({
     *   where: {
     *     // ... filter to delete one Customer
     *   }
     * })
     * 
     */
    delete<T extends CustomerDeleteArgs>(args: SelectSubset<T, CustomerDeleteArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Customer.
     * @param {CustomerUpdateArgs} args - Arguments to update one Customer.
     * @example
     * // Update one Customer
     * const customer = await prisma.customer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerUpdateArgs>(args: SelectSubset<T, CustomerUpdateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Customers.
     * @param {CustomerDeleteManyArgs} args - Arguments to filter Customers to delete.
     * @example
     * // Delete a few Customers
     * const { count } = await prisma.customer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerDeleteManyArgs>(args?: SelectSubset<T, CustomerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerUpdateManyArgs>(args: SelectSubset<T, CustomerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers and returns the data updated in the database.
     * @param {CustomerUpdateManyAndReturnArgs} args - Arguments to update many Customers.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CustomerUpdateManyAndReturnArgs>(args: SelectSubset<T, CustomerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Customer.
     * @param {CustomerUpsertArgs} args - Arguments to update or create a Customer.
     * @example
     * // Update or create a Customer
     * const customer = await prisma.customer.upsert({
     *   create: {
     *     // ... data to create a Customer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Customer we want to update
     *   }
     * })
     */
    upsert<T extends CustomerUpsertArgs>(args: SelectSubset<T, CustomerUpsertArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerCountArgs} args - Arguments to filter Customers to count.
     * @example
     * // Count the number of Customers
     * const count = await prisma.customer.count({
     *   where: {
     *     // ... the filter for the Customers we want to count
     *   }
     * })
    **/
    count<T extends CustomerCountArgs>(
      args?: Subset<T, CustomerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CustomerAggregateArgs>(args: Subset<T, CustomerAggregateArgs>): Prisma.PrismaPromise<GetCustomerAggregateType<T>>

    /**
     * Group by Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CustomerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerGroupByArgs['orderBy'] }
        : { orderBy?: CustomerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CustomerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Customer model
   */
  readonly fields: CustomerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Customer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    chats<T extends Customer$chatsArgs<ExtArgs> = {}>(args?: Subset<T, Customer$chatsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pets<T extends Customer$petsArgs<ExtArgs> = {}>(args?: Subset<T, Customer$petsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    bookings<T extends Customer$bookingsArgs<ExtArgs> = {}>(args?: Subset<T, Customer$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    payments<T extends Customer$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, Customer$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Customer model
   */
  interface CustomerFieldRefs {
    readonly id: FieldRef<"Customer", 'Int'>
    readonly userId: FieldRef<"Customer", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Customer findUnique
   */
  export type CustomerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findUniqueOrThrow
   */
  export type CustomerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findFirst
   */
  export type CustomerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findFirstOrThrow
   */
  export type CustomerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findMany
   */
  export type CustomerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customers to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer create
   */
  export type CustomerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to create a Customer.
     */
    data: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
  }

  /**
   * Customer createMany
   */
  export type CustomerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Customer createManyAndReturn
   */
  export type CustomerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Customer update
   */
  export type CustomerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to update a Customer.
     */
    data: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
    /**
     * Choose, which Customer to update.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer updateMany
   */
  export type CustomerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to update.
     */
    limit?: number
  }

  /**
   * Customer updateManyAndReturn
   */
  export type CustomerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Customer upsert
   */
  export type CustomerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The filter to search for the Customer to update in case it exists.
     */
    where: CustomerWhereUniqueInput
    /**
     * In case the Customer found by the `where` argument doesn't exist, create a new Customer with this data.
     */
    create: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
    /**
     * In case the Customer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
  }

  /**
   * Customer delete
   */
  export type CustomerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter which Customer to delete.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer deleteMany
   */
  export type CustomerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customers to delete
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to delete.
     */
    limit?: number
  }

  /**
   * Customer.chats
   */
  export type Customer$chatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatLog
     */
    select?: ChatLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatLog
     */
    omit?: ChatLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatLogInclude<ExtArgs> | null
    where?: ChatLogWhereInput
    orderBy?: ChatLogOrderByWithRelationInput | ChatLogOrderByWithRelationInput[]
    cursor?: ChatLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChatLogScalarFieldEnum | ChatLogScalarFieldEnum[]
  }

  /**
   * Customer.pets
   */
  export type Customer$petsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pet
     */
    select?: PetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pet
     */
    omit?: PetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PetInclude<ExtArgs> | null
    where?: PetWhereInput
    orderBy?: PetOrderByWithRelationInput | PetOrderByWithRelationInput[]
    cursor?: PetWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PetScalarFieldEnum | PetScalarFieldEnum[]
  }

  /**
   * Customer.bookings
   */
  export type Customer$bookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    cursor?: BookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Customer.payments
   */
  export type Customer$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Customer without action
   */
  export type CustomerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
  }


  /**
   * Model ChatLog
   */

  export type AggregateChatLog = {
    _count: ChatLogCountAggregateOutputType | null
    _avg: ChatLogAvgAggregateOutputType | null
    _sum: ChatLogSumAggregateOutputType | null
    _min: ChatLogMinAggregateOutputType | null
    _max: ChatLogMaxAggregateOutputType | null
  }

  export type ChatLogAvgAggregateOutputType = {
    id: number | null
    rating: number | null
    customerId: number | null
    staffId: number | null
    serviceId: number | null
  }

  export type ChatLogSumAggregateOutputType = {
    id: number | null
    rating: number | null
    customerId: number | null
    staffId: number | null
    serviceId: number | null
  }

  export type ChatLogMinAggregateOutputType = {
    id: number | null
    review: string | null
    reply: string | null
    rating: number | null
    review_date: Date | null
    reply_date: Date | null
    customerId: number | null
    staffId: number | null
    serviceId: number | null
  }

  export type ChatLogMaxAggregateOutputType = {
    id: number | null
    review: string | null
    reply: string | null
    rating: number | null
    review_date: Date | null
    reply_date: Date | null
    customerId: number | null
    staffId: number | null
    serviceId: number | null
  }

  export type ChatLogCountAggregateOutputType = {
    id: number
    review: number
    reply: number
    rating: number
    review_date: number
    reply_date: number
    customerId: number
    staffId: number
    serviceId: number
    _all: number
  }


  export type ChatLogAvgAggregateInputType = {
    id?: true
    rating?: true
    customerId?: true
    staffId?: true
    serviceId?: true
  }

  export type ChatLogSumAggregateInputType = {
    id?: true
    rating?: true
    customerId?: true
    staffId?: true
    serviceId?: true
  }

  export type ChatLogMinAggregateInputType = {
    id?: true
    review?: true
    reply?: true
    rating?: true
    review_date?: true
    reply_date?: true
    customerId?: true
    staffId?: true
    serviceId?: true
  }

  export type ChatLogMaxAggregateInputType = {
    id?: true
    review?: true
    reply?: true
    rating?: true
    review_date?: true
    reply_date?: true
    customerId?: true
    staffId?: true
    serviceId?: true
  }

  export type ChatLogCountAggregateInputType = {
    id?: true
    review?: true
    reply?: true
    rating?: true
    review_date?: true
    reply_date?: true
    customerId?: true
    staffId?: true
    serviceId?: true
    _all?: true
  }

  export type ChatLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatLog to aggregate.
     */
    where?: ChatLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatLogs to fetch.
     */
    orderBy?: ChatLogOrderByWithRelationInput | ChatLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChatLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChatLogs
    **/
    _count?: true | ChatLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChatLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChatLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChatLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChatLogMaxAggregateInputType
  }

  export type GetChatLogAggregateType<T extends ChatLogAggregateArgs> = {
        [P in keyof T & keyof AggregateChatLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChatLog[P]>
      : GetScalarType<T[P], AggregateChatLog[P]>
  }




  export type ChatLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatLogWhereInput
    orderBy?: ChatLogOrderByWithAggregationInput | ChatLogOrderByWithAggregationInput[]
    by: ChatLogScalarFieldEnum[] | ChatLogScalarFieldEnum
    having?: ChatLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChatLogCountAggregateInputType | true
    _avg?: ChatLogAvgAggregateInputType
    _sum?: ChatLogSumAggregateInputType
    _min?: ChatLogMinAggregateInputType
    _max?: ChatLogMaxAggregateInputType
  }

  export type ChatLogGroupByOutputType = {
    id: number
    review: string | null
    reply: string | null
    rating: number | null
    review_date: Date
    reply_date: Date | null
    customerId: number | null
    staffId: number | null
    serviceId: number
    _count: ChatLogCountAggregateOutputType | null
    _avg: ChatLogAvgAggregateOutputType | null
    _sum: ChatLogSumAggregateOutputType | null
    _min: ChatLogMinAggregateOutputType | null
    _max: ChatLogMaxAggregateOutputType | null
  }

  type GetChatLogGroupByPayload<T extends ChatLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChatLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChatLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChatLogGroupByOutputType[P]>
            : GetScalarType<T[P], ChatLogGroupByOutputType[P]>
        }
      >
    >


  export type ChatLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    review?: boolean
    reply?: boolean
    rating?: boolean
    review_date?: boolean
    reply_date?: boolean
    customerId?: boolean
    staffId?: boolean
    serviceId?: boolean
    customer?: boolean | ChatLog$customerArgs<ExtArgs>
    staff?: boolean | ChatLog$staffArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chatLog"]>

  export type ChatLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    review?: boolean
    reply?: boolean
    rating?: boolean
    review_date?: boolean
    reply_date?: boolean
    customerId?: boolean
    staffId?: boolean
    serviceId?: boolean
    customer?: boolean | ChatLog$customerArgs<ExtArgs>
    staff?: boolean | ChatLog$staffArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chatLog"]>

  export type ChatLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    review?: boolean
    reply?: boolean
    rating?: boolean
    review_date?: boolean
    reply_date?: boolean
    customerId?: boolean
    staffId?: boolean
    serviceId?: boolean
    customer?: boolean | ChatLog$customerArgs<ExtArgs>
    staff?: boolean | ChatLog$staffArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chatLog"]>

  export type ChatLogSelectScalar = {
    id?: boolean
    review?: boolean
    reply?: boolean
    rating?: boolean
    review_date?: boolean
    reply_date?: boolean
    customerId?: boolean
    staffId?: boolean
    serviceId?: boolean
  }

  export type ChatLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "review" | "reply" | "rating" | "review_date" | "reply_date" | "customerId" | "staffId" | "serviceId", ExtArgs["result"]["chatLog"]>
  export type ChatLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | ChatLog$customerArgs<ExtArgs>
    staff?: boolean | ChatLog$staffArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }
  export type ChatLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | ChatLog$customerArgs<ExtArgs>
    staff?: boolean | ChatLog$staffArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }
  export type ChatLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | ChatLog$customerArgs<ExtArgs>
    staff?: boolean | ChatLog$staffArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }

  export type $ChatLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ChatLog"
    objects: {
      customer: Prisma.$CustomerPayload<ExtArgs> | null
      staff: Prisma.$StaffPayload<ExtArgs> | null
      service: Prisma.$ServicePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      review: string | null
      reply: string | null
      rating: number | null
      review_date: Date
      reply_date: Date | null
      customerId: number | null
      staffId: number | null
      serviceId: number
    }, ExtArgs["result"]["chatLog"]>
    composites: {}
  }

  type ChatLogGetPayload<S extends boolean | null | undefined | ChatLogDefaultArgs> = $Result.GetResult<Prisma.$ChatLogPayload, S>

  type ChatLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChatLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChatLogCountAggregateInputType | true
    }

  export interface ChatLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ChatLog'], meta: { name: 'ChatLog' } }
    /**
     * Find zero or one ChatLog that matches the filter.
     * @param {ChatLogFindUniqueArgs} args - Arguments to find a ChatLog
     * @example
     * // Get one ChatLog
     * const chatLog = await prisma.chatLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChatLogFindUniqueArgs>(args: SelectSubset<T, ChatLogFindUniqueArgs<ExtArgs>>): Prisma__ChatLogClient<$Result.GetResult<Prisma.$ChatLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ChatLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChatLogFindUniqueOrThrowArgs} args - Arguments to find a ChatLog
     * @example
     * // Get one ChatLog
     * const chatLog = await prisma.chatLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChatLogFindUniqueOrThrowArgs>(args: SelectSubset<T, ChatLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChatLogClient<$Result.GetResult<Prisma.$ChatLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatLogFindFirstArgs} args - Arguments to find a ChatLog
     * @example
     * // Get one ChatLog
     * const chatLog = await prisma.chatLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChatLogFindFirstArgs>(args?: SelectSubset<T, ChatLogFindFirstArgs<ExtArgs>>): Prisma__ChatLogClient<$Result.GetResult<Prisma.$ChatLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatLogFindFirstOrThrowArgs} args - Arguments to find a ChatLog
     * @example
     * // Get one ChatLog
     * const chatLog = await prisma.chatLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChatLogFindFirstOrThrowArgs>(args?: SelectSubset<T, ChatLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChatLogClient<$Result.GetResult<Prisma.$ChatLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ChatLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChatLogs
     * const chatLogs = await prisma.chatLog.findMany()
     * 
     * // Get first 10 ChatLogs
     * const chatLogs = await prisma.chatLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const chatLogWithIdOnly = await prisma.chatLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChatLogFindManyArgs>(args?: SelectSubset<T, ChatLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ChatLog.
     * @param {ChatLogCreateArgs} args - Arguments to create a ChatLog.
     * @example
     * // Create one ChatLog
     * const ChatLog = await prisma.chatLog.create({
     *   data: {
     *     // ... data to create a ChatLog
     *   }
     * })
     * 
     */
    create<T extends ChatLogCreateArgs>(args: SelectSubset<T, ChatLogCreateArgs<ExtArgs>>): Prisma__ChatLogClient<$Result.GetResult<Prisma.$ChatLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ChatLogs.
     * @param {ChatLogCreateManyArgs} args - Arguments to create many ChatLogs.
     * @example
     * // Create many ChatLogs
     * const chatLog = await prisma.chatLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChatLogCreateManyArgs>(args?: SelectSubset<T, ChatLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ChatLogs and returns the data saved in the database.
     * @param {ChatLogCreateManyAndReturnArgs} args - Arguments to create many ChatLogs.
     * @example
     * // Create many ChatLogs
     * const chatLog = await prisma.chatLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ChatLogs and only return the `id`
     * const chatLogWithIdOnly = await prisma.chatLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChatLogCreateManyAndReturnArgs>(args?: SelectSubset<T, ChatLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ChatLog.
     * @param {ChatLogDeleteArgs} args - Arguments to delete one ChatLog.
     * @example
     * // Delete one ChatLog
     * const ChatLog = await prisma.chatLog.delete({
     *   where: {
     *     // ... filter to delete one ChatLog
     *   }
     * })
     * 
     */
    delete<T extends ChatLogDeleteArgs>(args: SelectSubset<T, ChatLogDeleteArgs<ExtArgs>>): Prisma__ChatLogClient<$Result.GetResult<Prisma.$ChatLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ChatLog.
     * @param {ChatLogUpdateArgs} args - Arguments to update one ChatLog.
     * @example
     * // Update one ChatLog
     * const chatLog = await prisma.chatLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChatLogUpdateArgs>(args: SelectSubset<T, ChatLogUpdateArgs<ExtArgs>>): Prisma__ChatLogClient<$Result.GetResult<Prisma.$ChatLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ChatLogs.
     * @param {ChatLogDeleteManyArgs} args - Arguments to filter ChatLogs to delete.
     * @example
     * // Delete a few ChatLogs
     * const { count } = await prisma.chatLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChatLogDeleteManyArgs>(args?: SelectSubset<T, ChatLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChatLogs
     * const chatLog = await prisma.chatLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChatLogUpdateManyArgs>(args: SelectSubset<T, ChatLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatLogs and returns the data updated in the database.
     * @param {ChatLogUpdateManyAndReturnArgs} args - Arguments to update many ChatLogs.
     * @example
     * // Update many ChatLogs
     * const chatLog = await prisma.chatLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ChatLogs and only return the `id`
     * const chatLogWithIdOnly = await prisma.chatLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ChatLogUpdateManyAndReturnArgs>(args: SelectSubset<T, ChatLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ChatLog.
     * @param {ChatLogUpsertArgs} args - Arguments to update or create a ChatLog.
     * @example
     * // Update or create a ChatLog
     * const chatLog = await prisma.chatLog.upsert({
     *   create: {
     *     // ... data to create a ChatLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChatLog we want to update
     *   }
     * })
     */
    upsert<T extends ChatLogUpsertArgs>(args: SelectSubset<T, ChatLogUpsertArgs<ExtArgs>>): Prisma__ChatLogClient<$Result.GetResult<Prisma.$ChatLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ChatLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatLogCountArgs} args - Arguments to filter ChatLogs to count.
     * @example
     * // Count the number of ChatLogs
     * const count = await prisma.chatLog.count({
     *   where: {
     *     // ... the filter for the ChatLogs we want to count
     *   }
     * })
    **/
    count<T extends ChatLogCountArgs>(
      args?: Subset<T, ChatLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChatLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChatLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChatLogAggregateArgs>(args: Subset<T, ChatLogAggregateArgs>): Prisma.PrismaPromise<GetChatLogAggregateType<T>>

    /**
     * Group by ChatLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChatLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChatLogGroupByArgs['orderBy'] }
        : { orderBy?: ChatLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChatLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ChatLog model
   */
  readonly fields: ChatLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChatLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChatLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends ChatLog$customerArgs<ExtArgs> = {}>(args?: Subset<T, ChatLog$customerArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    staff<T extends ChatLog$staffArgs<ExtArgs> = {}>(args?: Subset<T, ChatLog$staffArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    service<T extends ServiceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServiceDefaultArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ChatLog model
   */
  interface ChatLogFieldRefs {
    readonly id: FieldRef<"ChatLog", 'Int'>
    readonly review: FieldRef<"ChatLog", 'String'>
    readonly reply: FieldRef<"ChatLog", 'String'>
    readonly rating: FieldRef<"ChatLog", 'Float'>
    readonly review_date: FieldRef<"ChatLog", 'DateTime'>
    readonly reply_date: FieldRef<"ChatLog", 'DateTime'>
    readonly customerId: FieldRef<"ChatLog", 'Int'>
    readonly staffId: FieldRef<"ChatLog", 'Int'>
    readonly serviceId: FieldRef<"ChatLog", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * ChatLog findUnique
   */
  export type ChatLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatLog
     */
    select?: ChatLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatLog
     */
    omit?: ChatLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatLogInclude<ExtArgs> | null
    /**
     * Filter, which ChatLog to fetch.
     */
    where: ChatLogWhereUniqueInput
  }

  /**
   * ChatLog findUniqueOrThrow
   */
  export type ChatLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatLog
     */
    select?: ChatLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatLog
     */
    omit?: ChatLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatLogInclude<ExtArgs> | null
    /**
     * Filter, which ChatLog to fetch.
     */
    where: ChatLogWhereUniqueInput
  }

  /**
   * ChatLog findFirst
   */
  export type ChatLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatLog
     */
    select?: ChatLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatLog
     */
    omit?: ChatLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatLogInclude<ExtArgs> | null
    /**
     * Filter, which ChatLog to fetch.
     */
    where?: ChatLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatLogs to fetch.
     */
    orderBy?: ChatLogOrderByWithRelationInput | ChatLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatLogs.
     */
    cursor?: ChatLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatLogs.
     */
    distinct?: ChatLogScalarFieldEnum | ChatLogScalarFieldEnum[]
  }

  /**
   * ChatLog findFirstOrThrow
   */
  export type ChatLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatLog
     */
    select?: ChatLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatLog
     */
    omit?: ChatLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatLogInclude<ExtArgs> | null
    /**
     * Filter, which ChatLog to fetch.
     */
    where?: ChatLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatLogs to fetch.
     */
    orderBy?: ChatLogOrderByWithRelationInput | ChatLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatLogs.
     */
    cursor?: ChatLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatLogs.
     */
    distinct?: ChatLogScalarFieldEnum | ChatLogScalarFieldEnum[]
  }

  /**
   * ChatLog findMany
   */
  export type ChatLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatLog
     */
    select?: ChatLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatLog
     */
    omit?: ChatLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatLogInclude<ExtArgs> | null
    /**
     * Filter, which ChatLogs to fetch.
     */
    where?: ChatLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatLogs to fetch.
     */
    orderBy?: ChatLogOrderByWithRelationInput | ChatLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChatLogs.
     */
    cursor?: ChatLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatLogs.
     */
    skip?: number
    distinct?: ChatLogScalarFieldEnum | ChatLogScalarFieldEnum[]
  }

  /**
   * ChatLog create
   */
  export type ChatLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatLog
     */
    select?: ChatLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatLog
     */
    omit?: ChatLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatLogInclude<ExtArgs> | null
    /**
     * The data needed to create a ChatLog.
     */
    data: XOR<ChatLogCreateInput, ChatLogUncheckedCreateInput>
  }

  /**
   * ChatLog createMany
   */
  export type ChatLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ChatLogs.
     */
    data: ChatLogCreateManyInput | ChatLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ChatLog createManyAndReturn
   */
  export type ChatLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatLog
     */
    select?: ChatLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChatLog
     */
    omit?: ChatLogOmit<ExtArgs> | null
    /**
     * The data used to create many ChatLogs.
     */
    data: ChatLogCreateManyInput | ChatLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ChatLog update
   */
  export type ChatLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatLog
     */
    select?: ChatLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatLog
     */
    omit?: ChatLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatLogInclude<ExtArgs> | null
    /**
     * The data needed to update a ChatLog.
     */
    data: XOR<ChatLogUpdateInput, ChatLogUncheckedUpdateInput>
    /**
     * Choose, which ChatLog to update.
     */
    where: ChatLogWhereUniqueInput
  }

  /**
   * ChatLog updateMany
   */
  export type ChatLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ChatLogs.
     */
    data: XOR<ChatLogUpdateManyMutationInput, ChatLogUncheckedUpdateManyInput>
    /**
     * Filter which ChatLogs to update
     */
    where?: ChatLogWhereInput
    /**
     * Limit how many ChatLogs to update.
     */
    limit?: number
  }

  /**
   * ChatLog updateManyAndReturn
   */
  export type ChatLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatLog
     */
    select?: ChatLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChatLog
     */
    omit?: ChatLogOmit<ExtArgs> | null
    /**
     * The data used to update ChatLogs.
     */
    data: XOR<ChatLogUpdateManyMutationInput, ChatLogUncheckedUpdateManyInput>
    /**
     * Filter which ChatLogs to update
     */
    where?: ChatLogWhereInput
    /**
     * Limit how many ChatLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ChatLog upsert
   */
  export type ChatLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatLog
     */
    select?: ChatLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatLog
     */
    omit?: ChatLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatLogInclude<ExtArgs> | null
    /**
     * The filter to search for the ChatLog to update in case it exists.
     */
    where: ChatLogWhereUniqueInput
    /**
     * In case the ChatLog found by the `where` argument doesn't exist, create a new ChatLog with this data.
     */
    create: XOR<ChatLogCreateInput, ChatLogUncheckedCreateInput>
    /**
     * In case the ChatLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChatLogUpdateInput, ChatLogUncheckedUpdateInput>
  }

  /**
   * ChatLog delete
   */
  export type ChatLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatLog
     */
    select?: ChatLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatLog
     */
    omit?: ChatLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatLogInclude<ExtArgs> | null
    /**
     * Filter which ChatLog to delete.
     */
    where: ChatLogWhereUniqueInput
  }

  /**
   * ChatLog deleteMany
   */
  export type ChatLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatLogs to delete
     */
    where?: ChatLogWhereInput
    /**
     * Limit how many ChatLogs to delete.
     */
    limit?: number
  }

  /**
   * ChatLog.customer
   */
  export type ChatLog$customerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    where?: CustomerWhereInput
  }

  /**
   * ChatLog.staff
   */
  export type ChatLog$staffArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    where?: StaffWhereInput
  }

  /**
   * ChatLog without action
   */
  export type ChatLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatLog
     */
    select?: ChatLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatLog
     */
    omit?: ChatLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatLogInclude<ExtArgs> | null
  }


  /**
   * Model Pet
   */

  export type AggregatePet = {
    _count: PetCountAggregateOutputType | null
    _avg: PetAvgAggregateOutputType | null
    _sum: PetSumAggregateOutputType | null
    _min: PetMinAggregateOutputType | null
    _max: PetMaxAggregateOutputType | null
  }

  export type PetAvgAggregateOutputType = {
    id: number | null
    age: number | null
    customerId: number | null
  }

  export type PetSumAggregateOutputType = {
    id: number | null
    age: number | null
    customerId: number | null
  }

  export type PetMinAggregateOutputType = {
    id: number | null
    name: string | null
    sex: $Enums.Sex | null
    age: number | null
    type: $Enums.PetType | null
    status: $Enums.PetStatus | null
    breed: string | null
    picture: string | null
    customerId: number | null
  }

  export type PetMaxAggregateOutputType = {
    id: number | null
    name: string | null
    sex: $Enums.Sex | null
    age: number | null
    type: $Enums.PetType | null
    status: $Enums.PetStatus | null
    breed: string | null
    picture: string | null
    customerId: number | null
  }

  export type PetCountAggregateOutputType = {
    id: number
    name: number
    sex: number
    age: number
    type: number
    status: number
    breed: number
    disease: number
    allergic: number
    picture: number
    customerId: number
    _all: number
  }


  export type PetAvgAggregateInputType = {
    id?: true
    age?: true
    customerId?: true
  }

  export type PetSumAggregateInputType = {
    id?: true
    age?: true
    customerId?: true
  }

  export type PetMinAggregateInputType = {
    id?: true
    name?: true
    sex?: true
    age?: true
    type?: true
    status?: true
    breed?: true
    picture?: true
    customerId?: true
  }

  export type PetMaxAggregateInputType = {
    id?: true
    name?: true
    sex?: true
    age?: true
    type?: true
    status?: true
    breed?: true
    picture?: true
    customerId?: true
  }

  export type PetCountAggregateInputType = {
    id?: true
    name?: true
    sex?: true
    age?: true
    type?: true
    status?: true
    breed?: true
    disease?: true
    allergic?: true
    picture?: true
    customerId?: true
    _all?: true
  }

  export type PetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pet to aggregate.
     */
    where?: PetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pets to fetch.
     */
    orderBy?: PetOrderByWithRelationInput | PetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pets
    **/
    _count?: true | PetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PetAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PetSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PetMaxAggregateInputType
  }

  export type GetPetAggregateType<T extends PetAggregateArgs> = {
        [P in keyof T & keyof AggregatePet]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePet[P]>
      : GetScalarType<T[P], AggregatePet[P]>
  }




  export type PetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PetWhereInput
    orderBy?: PetOrderByWithAggregationInput | PetOrderByWithAggregationInput[]
    by: PetScalarFieldEnum[] | PetScalarFieldEnum
    having?: PetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PetCountAggregateInputType | true
    _avg?: PetAvgAggregateInputType
    _sum?: PetSumAggregateInputType
    _min?: PetMinAggregateInputType
    _max?: PetMaxAggregateInputType
  }

  export type PetGroupByOutputType = {
    id: number
    name: string
    sex: $Enums.Sex
    age: number
    type: $Enums.PetType
    status: $Enums.PetStatus
    breed: string
    disease: string[]
    allergic: string[]
    picture: string
    customerId: number
    _count: PetCountAggregateOutputType | null
    _avg: PetAvgAggregateOutputType | null
    _sum: PetSumAggregateOutputType | null
    _min: PetMinAggregateOutputType | null
    _max: PetMaxAggregateOutputType | null
  }

  type GetPetGroupByPayload<T extends PetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PetGroupByOutputType[P]>
            : GetScalarType<T[P], PetGroupByOutputType[P]>
        }
      >
    >


  export type PetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    sex?: boolean
    age?: boolean
    type?: boolean
    status?: boolean
    breed?: boolean
    disease?: boolean
    allergic?: boolean
    picture?: boolean
    customerId?: boolean
    scheduled?: boolean | Pet$scheduledArgs<ExtArgs>
    stayed?: boolean | Pet$stayedArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    cares?: boolean | Pet$caresArgs<ExtArgs>
    _count?: boolean | PetCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pet"]>

  export type PetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    sex?: boolean
    age?: boolean
    type?: boolean
    status?: boolean
    breed?: boolean
    disease?: boolean
    allergic?: boolean
    picture?: boolean
    customerId?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pet"]>

  export type PetSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    sex?: boolean
    age?: boolean
    type?: boolean
    status?: boolean
    breed?: boolean
    disease?: boolean
    allergic?: boolean
    picture?: boolean
    customerId?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pet"]>

  export type PetSelectScalar = {
    id?: boolean
    name?: boolean
    sex?: boolean
    age?: boolean
    type?: boolean
    status?: boolean
    breed?: boolean
    disease?: boolean
    allergic?: boolean
    picture?: boolean
    customerId?: boolean
  }

  export type PetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "sex" | "age" | "type" | "status" | "breed" | "disease" | "allergic" | "picture" | "customerId", ExtArgs["result"]["pet"]>
  export type PetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    scheduled?: boolean | Pet$scheduledArgs<ExtArgs>
    stayed?: boolean | Pet$stayedArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    cares?: boolean | Pet$caresArgs<ExtArgs>
    _count?: boolean | PetCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PetIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }
  export type PetIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }

  export type $PetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pet"
    objects: {
      scheduled: Prisma.$BookedServicePayload<ExtArgs>[]
      stayed: Prisma.$BookedRoomPayload<ExtArgs>[]
      customer: Prisma.$CustomerPayload<ExtArgs>
      cares: Prisma.$CarePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      sex: $Enums.Sex
      age: number
      type: $Enums.PetType
      status: $Enums.PetStatus
      breed: string
      disease: string[]
      allergic: string[]
      picture: string
      customerId: number
    }, ExtArgs["result"]["pet"]>
    composites: {}
  }

  type PetGetPayload<S extends boolean | null | undefined | PetDefaultArgs> = $Result.GetResult<Prisma.$PetPayload, S>

  type PetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PetCountAggregateInputType | true
    }

  export interface PetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pet'], meta: { name: 'Pet' } }
    /**
     * Find zero or one Pet that matches the filter.
     * @param {PetFindUniqueArgs} args - Arguments to find a Pet
     * @example
     * // Get one Pet
     * const pet = await prisma.pet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PetFindUniqueArgs>(args: SelectSubset<T, PetFindUniqueArgs<ExtArgs>>): Prisma__PetClient<$Result.GetResult<Prisma.$PetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pet that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PetFindUniqueOrThrowArgs} args - Arguments to find a Pet
     * @example
     * // Get one Pet
     * const pet = await prisma.pet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PetFindUniqueOrThrowArgs>(args: SelectSubset<T, PetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PetClient<$Result.GetResult<Prisma.$PetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PetFindFirstArgs} args - Arguments to find a Pet
     * @example
     * // Get one Pet
     * const pet = await prisma.pet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PetFindFirstArgs>(args?: SelectSubset<T, PetFindFirstArgs<ExtArgs>>): Prisma__PetClient<$Result.GetResult<Prisma.$PetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pet that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PetFindFirstOrThrowArgs} args - Arguments to find a Pet
     * @example
     * // Get one Pet
     * const pet = await prisma.pet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PetFindFirstOrThrowArgs>(args?: SelectSubset<T, PetFindFirstOrThrowArgs<ExtArgs>>): Prisma__PetClient<$Result.GetResult<Prisma.$PetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pets
     * const pets = await prisma.pet.findMany()
     * 
     * // Get first 10 Pets
     * const pets = await prisma.pet.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const petWithIdOnly = await prisma.pet.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PetFindManyArgs>(args?: SelectSubset<T, PetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pet.
     * @param {PetCreateArgs} args - Arguments to create a Pet.
     * @example
     * // Create one Pet
     * const Pet = await prisma.pet.create({
     *   data: {
     *     // ... data to create a Pet
     *   }
     * })
     * 
     */
    create<T extends PetCreateArgs>(args: SelectSubset<T, PetCreateArgs<ExtArgs>>): Prisma__PetClient<$Result.GetResult<Prisma.$PetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pets.
     * @param {PetCreateManyArgs} args - Arguments to create many Pets.
     * @example
     * // Create many Pets
     * const pet = await prisma.pet.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PetCreateManyArgs>(args?: SelectSubset<T, PetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pets and returns the data saved in the database.
     * @param {PetCreateManyAndReturnArgs} args - Arguments to create many Pets.
     * @example
     * // Create many Pets
     * const pet = await prisma.pet.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pets and only return the `id`
     * const petWithIdOnly = await prisma.pet.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PetCreateManyAndReturnArgs>(args?: SelectSubset<T, PetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Pet.
     * @param {PetDeleteArgs} args - Arguments to delete one Pet.
     * @example
     * // Delete one Pet
     * const Pet = await prisma.pet.delete({
     *   where: {
     *     // ... filter to delete one Pet
     *   }
     * })
     * 
     */
    delete<T extends PetDeleteArgs>(args: SelectSubset<T, PetDeleteArgs<ExtArgs>>): Prisma__PetClient<$Result.GetResult<Prisma.$PetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pet.
     * @param {PetUpdateArgs} args - Arguments to update one Pet.
     * @example
     * // Update one Pet
     * const pet = await prisma.pet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PetUpdateArgs>(args: SelectSubset<T, PetUpdateArgs<ExtArgs>>): Prisma__PetClient<$Result.GetResult<Prisma.$PetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pets.
     * @param {PetDeleteManyArgs} args - Arguments to filter Pets to delete.
     * @example
     * // Delete a few Pets
     * const { count } = await prisma.pet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PetDeleteManyArgs>(args?: SelectSubset<T, PetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pets
     * const pet = await prisma.pet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PetUpdateManyArgs>(args: SelectSubset<T, PetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pets and returns the data updated in the database.
     * @param {PetUpdateManyAndReturnArgs} args - Arguments to update many Pets.
     * @example
     * // Update many Pets
     * const pet = await prisma.pet.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pets and only return the `id`
     * const petWithIdOnly = await prisma.pet.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PetUpdateManyAndReturnArgs>(args: SelectSubset<T, PetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Pet.
     * @param {PetUpsertArgs} args - Arguments to update or create a Pet.
     * @example
     * // Update or create a Pet
     * const pet = await prisma.pet.upsert({
     *   create: {
     *     // ... data to create a Pet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pet we want to update
     *   }
     * })
     */
    upsert<T extends PetUpsertArgs>(args: SelectSubset<T, PetUpsertArgs<ExtArgs>>): Prisma__PetClient<$Result.GetResult<Prisma.$PetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PetCountArgs} args - Arguments to filter Pets to count.
     * @example
     * // Count the number of Pets
     * const count = await prisma.pet.count({
     *   where: {
     *     // ... the filter for the Pets we want to count
     *   }
     * })
    **/
    count<T extends PetCountArgs>(
      args?: Subset<T, PetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PetAggregateArgs>(args: Subset<T, PetAggregateArgs>): Prisma.PrismaPromise<GetPetAggregateType<T>>

    /**
     * Group by Pet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PetGroupByArgs['orderBy'] }
        : { orderBy?: PetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pet model
   */
  readonly fields: PetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pet.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    scheduled<T extends Pet$scheduledArgs<ExtArgs> = {}>(args?: Subset<T, Pet$scheduledArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookedServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    stayed<T extends Pet$stayedArgs<ExtArgs> = {}>(args?: Subset<T, Pet$stayedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookedRoomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    customer<T extends CustomerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CustomerDefaultArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    cares<T extends Pet$caresArgs<ExtArgs> = {}>(args?: Subset<T, Pet$caresArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CarePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Pet model
   */
  interface PetFieldRefs {
    readonly id: FieldRef<"Pet", 'Int'>
    readonly name: FieldRef<"Pet", 'String'>
    readonly sex: FieldRef<"Pet", 'Sex'>
    readonly age: FieldRef<"Pet", 'Int'>
    readonly type: FieldRef<"Pet", 'PetType'>
    readonly status: FieldRef<"Pet", 'PetStatus'>
    readonly breed: FieldRef<"Pet", 'String'>
    readonly disease: FieldRef<"Pet", 'String[]'>
    readonly allergic: FieldRef<"Pet", 'String[]'>
    readonly picture: FieldRef<"Pet", 'String'>
    readonly customerId: FieldRef<"Pet", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Pet findUnique
   */
  export type PetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pet
     */
    select?: PetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pet
     */
    omit?: PetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PetInclude<ExtArgs> | null
    /**
     * Filter, which Pet to fetch.
     */
    where: PetWhereUniqueInput
  }

  /**
   * Pet findUniqueOrThrow
   */
  export type PetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pet
     */
    select?: PetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pet
     */
    omit?: PetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PetInclude<ExtArgs> | null
    /**
     * Filter, which Pet to fetch.
     */
    where: PetWhereUniqueInput
  }

  /**
   * Pet findFirst
   */
  export type PetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pet
     */
    select?: PetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pet
     */
    omit?: PetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PetInclude<ExtArgs> | null
    /**
     * Filter, which Pet to fetch.
     */
    where?: PetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pets to fetch.
     */
    orderBy?: PetOrderByWithRelationInput | PetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pets.
     */
    cursor?: PetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pets.
     */
    distinct?: PetScalarFieldEnum | PetScalarFieldEnum[]
  }

  /**
   * Pet findFirstOrThrow
   */
  export type PetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pet
     */
    select?: PetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pet
     */
    omit?: PetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PetInclude<ExtArgs> | null
    /**
     * Filter, which Pet to fetch.
     */
    where?: PetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pets to fetch.
     */
    orderBy?: PetOrderByWithRelationInput | PetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pets.
     */
    cursor?: PetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pets.
     */
    distinct?: PetScalarFieldEnum | PetScalarFieldEnum[]
  }

  /**
   * Pet findMany
   */
  export type PetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pet
     */
    select?: PetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pet
     */
    omit?: PetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PetInclude<ExtArgs> | null
    /**
     * Filter, which Pets to fetch.
     */
    where?: PetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pets to fetch.
     */
    orderBy?: PetOrderByWithRelationInput | PetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pets.
     */
    cursor?: PetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pets.
     */
    skip?: number
    distinct?: PetScalarFieldEnum | PetScalarFieldEnum[]
  }

  /**
   * Pet create
   */
  export type PetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pet
     */
    select?: PetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pet
     */
    omit?: PetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PetInclude<ExtArgs> | null
    /**
     * The data needed to create a Pet.
     */
    data: XOR<PetCreateInput, PetUncheckedCreateInput>
  }

  /**
   * Pet createMany
   */
  export type PetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pets.
     */
    data: PetCreateManyInput | PetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pet createManyAndReturn
   */
  export type PetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pet
     */
    select?: PetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pet
     */
    omit?: PetOmit<ExtArgs> | null
    /**
     * The data used to create many Pets.
     */
    data: PetCreateManyInput | PetCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PetIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pet update
   */
  export type PetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pet
     */
    select?: PetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pet
     */
    omit?: PetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PetInclude<ExtArgs> | null
    /**
     * The data needed to update a Pet.
     */
    data: XOR<PetUpdateInput, PetUncheckedUpdateInput>
    /**
     * Choose, which Pet to update.
     */
    where: PetWhereUniqueInput
  }

  /**
   * Pet updateMany
   */
  export type PetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pets.
     */
    data: XOR<PetUpdateManyMutationInput, PetUncheckedUpdateManyInput>
    /**
     * Filter which Pets to update
     */
    where?: PetWhereInput
    /**
     * Limit how many Pets to update.
     */
    limit?: number
  }

  /**
   * Pet updateManyAndReturn
   */
  export type PetUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pet
     */
    select?: PetSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pet
     */
    omit?: PetOmit<ExtArgs> | null
    /**
     * The data used to update Pets.
     */
    data: XOR<PetUpdateManyMutationInput, PetUncheckedUpdateManyInput>
    /**
     * Filter which Pets to update
     */
    where?: PetWhereInput
    /**
     * Limit how many Pets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PetIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pet upsert
   */
  export type PetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pet
     */
    select?: PetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pet
     */
    omit?: PetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PetInclude<ExtArgs> | null
    /**
     * The filter to search for the Pet to update in case it exists.
     */
    where: PetWhereUniqueInput
    /**
     * In case the Pet found by the `where` argument doesn't exist, create a new Pet with this data.
     */
    create: XOR<PetCreateInput, PetUncheckedCreateInput>
    /**
     * In case the Pet was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PetUpdateInput, PetUncheckedUpdateInput>
  }

  /**
   * Pet delete
   */
  export type PetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pet
     */
    select?: PetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pet
     */
    omit?: PetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PetInclude<ExtArgs> | null
    /**
     * Filter which Pet to delete.
     */
    where: PetWhereUniqueInput
  }

  /**
   * Pet deleteMany
   */
  export type PetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pets to delete
     */
    where?: PetWhereInput
    /**
     * Limit how many Pets to delete.
     */
    limit?: number
  }

  /**
   * Pet.scheduled
   */
  export type Pet$scheduledArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookedService
     */
    select?: BookedServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookedService
     */
    omit?: BookedServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookedServiceInclude<ExtArgs> | null
    where?: BookedServiceWhereInput
    orderBy?: BookedServiceOrderByWithRelationInput | BookedServiceOrderByWithRelationInput[]
    cursor?: BookedServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookedServiceScalarFieldEnum | BookedServiceScalarFieldEnum[]
  }

  /**
   * Pet.stayed
   */
  export type Pet$stayedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookedRoom
     */
    select?: BookedRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookedRoom
     */
    omit?: BookedRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookedRoomInclude<ExtArgs> | null
    where?: BookedRoomWhereInput
    orderBy?: BookedRoomOrderByWithRelationInput | BookedRoomOrderByWithRelationInput[]
    cursor?: BookedRoomWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookedRoomScalarFieldEnum | BookedRoomScalarFieldEnum[]
  }

  /**
   * Pet.cares
   */
  export type Pet$caresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Care
     */
    select?: CareSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Care
     */
    omit?: CareOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareInclude<ExtArgs> | null
    where?: CareWhereInput
    orderBy?: CareOrderByWithRelationInput | CareOrderByWithRelationInput[]
    cursor?: CareWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CareScalarFieldEnum | CareScalarFieldEnum[]
  }

  /**
   * Pet without action
   */
  export type PetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pet
     */
    select?: PetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pet
     */
    omit?: PetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PetInclude<ExtArgs> | null
  }


  /**
   * Model Room
   */

  export type AggregateRoom = {
    _count: RoomCountAggregateOutputType | null
    _avg: RoomAvgAggregateOutputType | null
    _sum: RoomSumAggregateOutputType | null
    _min: RoomMinAggregateOutputType | null
    _max: RoomMaxAggregateOutputType | null
  }

  export type RoomAvgAggregateOutputType = {
    id: number | null
    capacity: number | null
    price: number | null
  }

  export type RoomSumAggregateOutputType = {
    id: number | null
    capacity: number | null
    price: number | null
  }

  export type RoomMinAggregateOutputType = {
    id: number | null
    capacity: number | null
    price: number | null
    petType: $Enums.PetType | null
  }

  export type RoomMaxAggregateOutputType = {
    id: number | null
    capacity: number | null
    price: number | null
    petType: $Enums.PetType | null
  }

  export type RoomCountAggregateOutputType = {
    id: number
    capacity: number
    price: number
    picture: number
    petType: number
    _all: number
  }


  export type RoomAvgAggregateInputType = {
    id?: true
    capacity?: true
    price?: true
  }

  export type RoomSumAggregateInputType = {
    id?: true
    capacity?: true
    price?: true
  }

  export type RoomMinAggregateInputType = {
    id?: true
    capacity?: true
    price?: true
    petType?: true
  }

  export type RoomMaxAggregateInputType = {
    id?: true
    capacity?: true
    price?: true
    petType?: true
  }

  export type RoomCountAggregateInputType = {
    id?: true
    capacity?: true
    price?: true
    picture?: true
    petType?: true
    _all?: true
  }

  export type RoomAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Room to aggregate.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Rooms
    **/
    _count?: true | RoomCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoomAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoomSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomMaxAggregateInputType
  }

  export type GetRoomAggregateType<T extends RoomAggregateArgs> = {
        [P in keyof T & keyof AggregateRoom]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoom[P]>
      : GetScalarType<T[P], AggregateRoom[P]>
  }




  export type RoomGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomWhereInput
    orderBy?: RoomOrderByWithAggregationInput | RoomOrderByWithAggregationInput[]
    by: RoomScalarFieldEnum[] | RoomScalarFieldEnum
    having?: RoomScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomCountAggregateInputType | true
    _avg?: RoomAvgAggregateInputType
    _sum?: RoomSumAggregateInputType
    _min?: RoomMinAggregateInputType
    _max?: RoomMaxAggregateInputType
  }

  export type RoomGroupByOutputType = {
    id: number
    capacity: number
    price: number
    picture: string[]
    petType: $Enums.PetType
    _count: RoomCountAggregateOutputType | null
    _avg: RoomAvgAggregateOutputType | null
    _sum: RoomSumAggregateOutputType | null
    _min: RoomMinAggregateOutputType | null
    _max: RoomMaxAggregateOutputType | null
  }

  type GetRoomGroupByPayload<T extends RoomGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomGroupByOutputType[P]>
            : GetScalarType<T[P], RoomGroupByOutputType[P]>
        }
      >
    >


  export type RoomSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    capacity?: boolean
    price?: boolean
    picture?: boolean
    petType?: boolean
    bookings?: boolean | Room$bookingsArgs<ExtArgs>
    staffOnRooms?: boolean | Room$staffOnRoomsArgs<ExtArgs>
    _count?: boolean | RoomCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["room"]>

  export type RoomSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    capacity?: boolean
    price?: boolean
    picture?: boolean
    petType?: boolean
  }, ExtArgs["result"]["room"]>

  export type RoomSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    capacity?: boolean
    price?: boolean
    picture?: boolean
    petType?: boolean
  }, ExtArgs["result"]["room"]>

  export type RoomSelectScalar = {
    id?: boolean
    capacity?: boolean
    price?: boolean
    picture?: boolean
    petType?: boolean
  }

  export type RoomOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "capacity" | "price" | "picture" | "petType", ExtArgs["result"]["room"]>
  export type RoomInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookings?: boolean | Room$bookingsArgs<ExtArgs>
    staffOnRooms?: boolean | Room$staffOnRoomsArgs<ExtArgs>
    _count?: boolean | RoomCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RoomIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type RoomIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RoomPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Room"
    objects: {
      bookings: Prisma.$BookedRoomPayload<ExtArgs>[]
      staffOnRooms: Prisma.$RoomStaffPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      capacity: number
      price: number
      picture: string[]
      petType: $Enums.PetType
    }, ExtArgs["result"]["room"]>
    composites: {}
  }

  type RoomGetPayload<S extends boolean | null | undefined | RoomDefaultArgs> = $Result.GetResult<Prisma.$RoomPayload, S>

  type RoomCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoomFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoomCountAggregateInputType | true
    }

  export interface RoomDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Room'], meta: { name: 'Room' } }
    /**
     * Find zero or one Room that matches the filter.
     * @param {RoomFindUniqueArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomFindUniqueArgs>(args: SelectSubset<T, RoomFindUniqueArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Room that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoomFindUniqueOrThrowArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomFindUniqueOrThrowArgs>(args: SelectSubset<T, RoomFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Room that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindFirstArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomFindFirstArgs>(args?: SelectSubset<T, RoomFindFirstArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Room that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindFirstOrThrowArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomFindFirstOrThrowArgs>(args?: SelectSubset<T, RoomFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Rooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Rooms
     * const rooms = await prisma.room.findMany()
     * 
     * // Get first 10 Rooms
     * const rooms = await prisma.room.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roomWithIdOnly = await prisma.room.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoomFindManyArgs>(args?: SelectSubset<T, RoomFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Room.
     * @param {RoomCreateArgs} args - Arguments to create a Room.
     * @example
     * // Create one Room
     * const Room = await prisma.room.create({
     *   data: {
     *     // ... data to create a Room
     *   }
     * })
     * 
     */
    create<T extends RoomCreateArgs>(args: SelectSubset<T, RoomCreateArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Rooms.
     * @param {RoomCreateManyArgs} args - Arguments to create many Rooms.
     * @example
     * // Create many Rooms
     * const room = await prisma.room.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoomCreateManyArgs>(args?: SelectSubset<T, RoomCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Rooms and returns the data saved in the database.
     * @param {RoomCreateManyAndReturnArgs} args - Arguments to create many Rooms.
     * @example
     * // Create many Rooms
     * const room = await prisma.room.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Rooms and only return the `id`
     * const roomWithIdOnly = await prisma.room.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoomCreateManyAndReturnArgs>(args?: SelectSubset<T, RoomCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Room.
     * @param {RoomDeleteArgs} args - Arguments to delete one Room.
     * @example
     * // Delete one Room
     * const Room = await prisma.room.delete({
     *   where: {
     *     // ... filter to delete one Room
     *   }
     * })
     * 
     */
    delete<T extends RoomDeleteArgs>(args: SelectSubset<T, RoomDeleteArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Room.
     * @param {RoomUpdateArgs} args - Arguments to update one Room.
     * @example
     * // Update one Room
     * const room = await prisma.room.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoomUpdateArgs>(args: SelectSubset<T, RoomUpdateArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Rooms.
     * @param {RoomDeleteManyArgs} args - Arguments to filter Rooms to delete.
     * @example
     * // Delete a few Rooms
     * const { count } = await prisma.room.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoomDeleteManyArgs>(args?: SelectSubset<T, RoomDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Rooms
     * const room = await prisma.room.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoomUpdateManyArgs>(args: SelectSubset<T, RoomUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rooms and returns the data updated in the database.
     * @param {RoomUpdateManyAndReturnArgs} args - Arguments to update many Rooms.
     * @example
     * // Update many Rooms
     * const room = await prisma.room.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Rooms and only return the `id`
     * const roomWithIdOnly = await prisma.room.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RoomUpdateManyAndReturnArgs>(args: SelectSubset<T, RoomUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Room.
     * @param {RoomUpsertArgs} args - Arguments to update or create a Room.
     * @example
     * // Update or create a Room
     * const room = await prisma.room.upsert({
     *   create: {
     *     // ... data to create a Room
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Room we want to update
     *   }
     * })
     */
    upsert<T extends RoomUpsertArgs>(args: SelectSubset<T, RoomUpsertArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomCountArgs} args - Arguments to filter Rooms to count.
     * @example
     * // Count the number of Rooms
     * const count = await prisma.room.count({
     *   where: {
     *     // ... the filter for the Rooms we want to count
     *   }
     * })
    **/
    count<T extends RoomCountArgs>(
      args?: Subset<T, RoomCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Room.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoomAggregateArgs>(args: Subset<T, RoomAggregateArgs>): Prisma.PrismaPromise<GetRoomAggregateType<T>>

    /**
     * Group by Room.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoomGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomGroupByArgs['orderBy'] }
        : { orderBy?: RoomGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoomGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Room model
   */
  readonly fields: RoomFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Room.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bookings<T extends Room$bookingsArgs<ExtArgs> = {}>(args?: Subset<T, Room$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookedRoomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    staffOnRooms<T extends Room$staffOnRoomsArgs<ExtArgs> = {}>(args?: Subset<T, Room$staffOnRoomsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomStaffPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Room model
   */
  interface RoomFieldRefs {
    readonly id: FieldRef<"Room", 'Int'>
    readonly capacity: FieldRef<"Room", 'Int'>
    readonly price: FieldRef<"Room", 'Float'>
    readonly picture: FieldRef<"Room", 'String[]'>
    readonly petType: FieldRef<"Room", 'PetType'>
  }
    

  // Custom InputTypes
  /**
   * Room findUnique
   */
  export type RoomFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room findUniqueOrThrow
   */
  export type RoomFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room findFirst
   */
  export type RoomFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rooms.
     */
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room findFirstOrThrow
   */
  export type RoomFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rooms.
     */
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room findMany
   */
  export type RoomFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Rooms to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room create
   */
  export type RoomCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The data needed to create a Room.
     */
    data?: XOR<RoomCreateInput, RoomUncheckedCreateInput>
  }

  /**
   * Room createMany
   */
  export type RoomCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Rooms.
     */
    data: RoomCreateManyInput | RoomCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Room createManyAndReturn
   */
  export type RoomCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * The data used to create many Rooms.
     */
    data: RoomCreateManyInput | RoomCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Room update
   */
  export type RoomUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The data needed to update a Room.
     */
    data: XOR<RoomUpdateInput, RoomUncheckedUpdateInput>
    /**
     * Choose, which Room to update.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room updateMany
   */
  export type RoomUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Rooms.
     */
    data: XOR<RoomUpdateManyMutationInput, RoomUncheckedUpdateManyInput>
    /**
     * Filter which Rooms to update
     */
    where?: RoomWhereInput
    /**
     * Limit how many Rooms to update.
     */
    limit?: number
  }

  /**
   * Room updateManyAndReturn
   */
  export type RoomUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * The data used to update Rooms.
     */
    data: XOR<RoomUpdateManyMutationInput, RoomUncheckedUpdateManyInput>
    /**
     * Filter which Rooms to update
     */
    where?: RoomWhereInput
    /**
     * Limit how many Rooms to update.
     */
    limit?: number
  }

  /**
   * Room upsert
   */
  export type RoomUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The filter to search for the Room to update in case it exists.
     */
    where: RoomWhereUniqueInput
    /**
     * In case the Room found by the `where` argument doesn't exist, create a new Room with this data.
     */
    create: XOR<RoomCreateInput, RoomUncheckedCreateInput>
    /**
     * In case the Room was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomUpdateInput, RoomUncheckedUpdateInput>
  }

  /**
   * Room delete
   */
  export type RoomDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter which Room to delete.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room deleteMany
   */
  export type RoomDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Rooms to delete
     */
    where?: RoomWhereInput
    /**
     * Limit how many Rooms to delete.
     */
    limit?: number
  }

  /**
   * Room.bookings
   */
  export type Room$bookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookedRoom
     */
    select?: BookedRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookedRoom
     */
    omit?: BookedRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookedRoomInclude<ExtArgs> | null
    where?: BookedRoomWhereInput
    orderBy?: BookedRoomOrderByWithRelationInput | BookedRoomOrderByWithRelationInput[]
    cursor?: BookedRoomWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookedRoomScalarFieldEnum | BookedRoomScalarFieldEnum[]
  }

  /**
   * Room.staffOnRooms
   */
  export type Room$staffOnRoomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStaff
     */
    select?: RoomStaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStaff
     */
    omit?: RoomStaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStaffInclude<ExtArgs> | null
    where?: RoomStaffWhereInput
    orderBy?: RoomStaffOrderByWithRelationInput | RoomStaffOrderByWithRelationInput[]
    cursor?: RoomStaffWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomStaffScalarFieldEnum | RoomStaffScalarFieldEnum[]
  }

  /**
   * Room without action
   */
  export type RoomDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
  }


  /**
   * Model BookedRoom
   */

  export type AggregateBookedRoom = {
    _count: BookedRoomCountAggregateOutputType | null
    _avg: BookedRoomAvgAggregateOutputType | null
    _sum: BookedRoomSumAggregateOutputType | null
    _min: BookedRoomMinAggregateOutputType | null
    _max: BookedRoomMaxAggregateOutputType | null
  }

  export type BookedRoomAvgAggregateOutputType = {
    id: number | null
    roomId: number | null
    petId: number | null
    bookingId: number | null
  }

  export type BookedRoomSumAggregateOutputType = {
    id: number | null
    roomId: number | null
    petId: number | null
    bookingId: number | null
  }

  export type BookedRoomMinAggregateOutputType = {
    id: number | null
    checkIn: Date | null
    checkOut: Date | null
    roomId: number | null
    petId: number | null
    bookingId: number | null
  }

  export type BookedRoomMaxAggregateOutputType = {
    id: number | null
    checkIn: Date | null
    checkOut: Date | null
    roomId: number | null
    petId: number | null
    bookingId: number | null
  }

  export type BookedRoomCountAggregateOutputType = {
    id: number
    checkIn: number
    checkOut: number
    roomId: number
    petId: number
    bookingId: number
    _all: number
  }


  export type BookedRoomAvgAggregateInputType = {
    id?: true
    roomId?: true
    petId?: true
    bookingId?: true
  }

  export type BookedRoomSumAggregateInputType = {
    id?: true
    roomId?: true
    petId?: true
    bookingId?: true
  }

  export type BookedRoomMinAggregateInputType = {
    id?: true
    checkIn?: true
    checkOut?: true
    roomId?: true
    petId?: true
    bookingId?: true
  }

  export type BookedRoomMaxAggregateInputType = {
    id?: true
    checkIn?: true
    checkOut?: true
    roomId?: true
    petId?: true
    bookingId?: true
  }

  export type BookedRoomCountAggregateInputType = {
    id?: true
    checkIn?: true
    checkOut?: true
    roomId?: true
    petId?: true
    bookingId?: true
    _all?: true
  }

  export type BookedRoomAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BookedRoom to aggregate.
     */
    where?: BookedRoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookedRooms to fetch.
     */
    orderBy?: BookedRoomOrderByWithRelationInput | BookedRoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BookedRoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookedRooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookedRooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BookedRooms
    **/
    _count?: true | BookedRoomCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BookedRoomAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BookedRoomSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookedRoomMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookedRoomMaxAggregateInputType
  }

  export type GetBookedRoomAggregateType<T extends BookedRoomAggregateArgs> = {
        [P in keyof T & keyof AggregateBookedRoom]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBookedRoom[P]>
      : GetScalarType<T[P], AggregateBookedRoom[P]>
  }




  export type BookedRoomGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookedRoomWhereInput
    orderBy?: BookedRoomOrderByWithAggregationInput | BookedRoomOrderByWithAggregationInput[]
    by: BookedRoomScalarFieldEnum[] | BookedRoomScalarFieldEnum
    having?: BookedRoomScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookedRoomCountAggregateInputType | true
    _avg?: BookedRoomAvgAggregateInputType
    _sum?: BookedRoomSumAggregateInputType
    _min?: BookedRoomMinAggregateInputType
    _max?: BookedRoomMaxAggregateInputType
  }

  export type BookedRoomGroupByOutputType = {
    id: number
    checkIn: Date
    checkOut: Date
    roomId: number
    petId: number | null
    bookingId: number
    _count: BookedRoomCountAggregateOutputType | null
    _avg: BookedRoomAvgAggregateOutputType | null
    _sum: BookedRoomSumAggregateOutputType | null
    _min: BookedRoomMinAggregateOutputType | null
    _max: BookedRoomMaxAggregateOutputType | null
  }

  type GetBookedRoomGroupByPayload<T extends BookedRoomGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookedRoomGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookedRoomGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookedRoomGroupByOutputType[P]>
            : GetScalarType<T[P], BookedRoomGroupByOutputType[P]>
        }
      >
    >


  export type BookedRoomSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    checkIn?: boolean
    checkOut?: boolean
    roomId?: boolean
    petId?: boolean
    bookingId?: boolean
    room?: boolean | RoomDefaultArgs<ExtArgs>
    pet?: boolean | BookedRoom$petArgs<ExtArgs>
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookedRoom"]>

  export type BookedRoomSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    checkIn?: boolean
    checkOut?: boolean
    roomId?: boolean
    petId?: boolean
    bookingId?: boolean
    room?: boolean | RoomDefaultArgs<ExtArgs>
    pet?: boolean | BookedRoom$petArgs<ExtArgs>
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookedRoom"]>

  export type BookedRoomSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    checkIn?: boolean
    checkOut?: boolean
    roomId?: boolean
    petId?: boolean
    bookingId?: boolean
    room?: boolean | RoomDefaultArgs<ExtArgs>
    pet?: boolean | BookedRoom$petArgs<ExtArgs>
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookedRoom"]>

  export type BookedRoomSelectScalar = {
    id?: boolean
    checkIn?: boolean
    checkOut?: boolean
    roomId?: boolean
    petId?: boolean
    bookingId?: boolean
  }

  export type BookedRoomOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "checkIn" | "checkOut" | "roomId" | "petId" | "bookingId", ExtArgs["result"]["bookedRoom"]>
  export type BookedRoomInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | RoomDefaultArgs<ExtArgs>
    pet?: boolean | BookedRoom$petArgs<ExtArgs>
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }
  export type BookedRoomIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | RoomDefaultArgs<ExtArgs>
    pet?: boolean | BookedRoom$petArgs<ExtArgs>
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }
  export type BookedRoomIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | RoomDefaultArgs<ExtArgs>
    pet?: boolean | BookedRoom$petArgs<ExtArgs>
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }

  export type $BookedRoomPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BookedRoom"
    objects: {
      room: Prisma.$RoomPayload<ExtArgs>
      pet: Prisma.$PetPayload<ExtArgs> | null
      booking: Prisma.$BookingPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      checkIn: Date
      checkOut: Date
      roomId: number
      petId: number | null
      bookingId: number
    }, ExtArgs["result"]["bookedRoom"]>
    composites: {}
  }

  type BookedRoomGetPayload<S extends boolean | null | undefined | BookedRoomDefaultArgs> = $Result.GetResult<Prisma.$BookedRoomPayload, S>

  type BookedRoomCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BookedRoomFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BookedRoomCountAggregateInputType | true
    }

  export interface BookedRoomDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BookedRoom'], meta: { name: 'BookedRoom' } }
    /**
     * Find zero or one BookedRoom that matches the filter.
     * @param {BookedRoomFindUniqueArgs} args - Arguments to find a BookedRoom
     * @example
     * // Get one BookedRoom
     * const bookedRoom = await prisma.bookedRoom.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BookedRoomFindUniqueArgs>(args: SelectSubset<T, BookedRoomFindUniqueArgs<ExtArgs>>): Prisma__BookedRoomClient<$Result.GetResult<Prisma.$BookedRoomPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BookedRoom that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BookedRoomFindUniqueOrThrowArgs} args - Arguments to find a BookedRoom
     * @example
     * // Get one BookedRoom
     * const bookedRoom = await prisma.bookedRoom.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BookedRoomFindUniqueOrThrowArgs>(args: SelectSubset<T, BookedRoomFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BookedRoomClient<$Result.GetResult<Prisma.$BookedRoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BookedRoom that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookedRoomFindFirstArgs} args - Arguments to find a BookedRoom
     * @example
     * // Get one BookedRoom
     * const bookedRoom = await prisma.bookedRoom.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BookedRoomFindFirstArgs>(args?: SelectSubset<T, BookedRoomFindFirstArgs<ExtArgs>>): Prisma__BookedRoomClient<$Result.GetResult<Prisma.$BookedRoomPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BookedRoom that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookedRoomFindFirstOrThrowArgs} args - Arguments to find a BookedRoom
     * @example
     * // Get one BookedRoom
     * const bookedRoom = await prisma.bookedRoom.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BookedRoomFindFirstOrThrowArgs>(args?: SelectSubset<T, BookedRoomFindFirstOrThrowArgs<ExtArgs>>): Prisma__BookedRoomClient<$Result.GetResult<Prisma.$BookedRoomPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BookedRooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookedRoomFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BookedRooms
     * const bookedRooms = await prisma.bookedRoom.findMany()
     * 
     * // Get first 10 BookedRooms
     * const bookedRooms = await prisma.bookedRoom.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookedRoomWithIdOnly = await prisma.bookedRoom.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BookedRoomFindManyArgs>(args?: SelectSubset<T, BookedRoomFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookedRoomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BookedRoom.
     * @param {BookedRoomCreateArgs} args - Arguments to create a BookedRoom.
     * @example
     * // Create one BookedRoom
     * const BookedRoom = await prisma.bookedRoom.create({
     *   data: {
     *     // ... data to create a BookedRoom
     *   }
     * })
     * 
     */
    create<T extends BookedRoomCreateArgs>(args: SelectSubset<T, BookedRoomCreateArgs<ExtArgs>>): Prisma__BookedRoomClient<$Result.GetResult<Prisma.$BookedRoomPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BookedRooms.
     * @param {BookedRoomCreateManyArgs} args - Arguments to create many BookedRooms.
     * @example
     * // Create many BookedRooms
     * const bookedRoom = await prisma.bookedRoom.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BookedRoomCreateManyArgs>(args?: SelectSubset<T, BookedRoomCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BookedRooms and returns the data saved in the database.
     * @param {BookedRoomCreateManyAndReturnArgs} args - Arguments to create many BookedRooms.
     * @example
     * // Create many BookedRooms
     * const bookedRoom = await prisma.bookedRoom.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BookedRooms and only return the `id`
     * const bookedRoomWithIdOnly = await prisma.bookedRoom.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BookedRoomCreateManyAndReturnArgs>(args?: SelectSubset<T, BookedRoomCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookedRoomPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BookedRoom.
     * @param {BookedRoomDeleteArgs} args - Arguments to delete one BookedRoom.
     * @example
     * // Delete one BookedRoom
     * const BookedRoom = await prisma.bookedRoom.delete({
     *   where: {
     *     // ... filter to delete one BookedRoom
     *   }
     * })
     * 
     */
    delete<T extends BookedRoomDeleteArgs>(args: SelectSubset<T, BookedRoomDeleteArgs<ExtArgs>>): Prisma__BookedRoomClient<$Result.GetResult<Prisma.$BookedRoomPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BookedRoom.
     * @param {BookedRoomUpdateArgs} args - Arguments to update one BookedRoom.
     * @example
     * // Update one BookedRoom
     * const bookedRoom = await prisma.bookedRoom.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BookedRoomUpdateArgs>(args: SelectSubset<T, BookedRoomUpdateArgs<ExtArgs>>): Prisma__BookedRoomClient<$Result.GetResult<Prisma.$BookedRoomPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BookedRooms.
     * @param {BookedRoomDeleteManyArgs} args - Arguments to filter BookedRooms to delete.
     * @example
     * // Delete a few BookedRooms
     * const { count } = await prisma.bookedRoom.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BookedRoomDeleteManyArgs>(args?: SelectSubset<T, BookedRoomDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BookedRooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookedRoomUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BookedRooms
     * const bookedRoom = await prisma.bookedRoom.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BookedRoomUpdateManyArgs>(args: SelectSubset<T, BookedRoomUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BookedRooms and returns the data updated in the database.
     * @param {BookedRoomUpdateManyAndReturnArgs} args - Arguments to update many BookedRooms.
     * @example
     * // Update many BookedRooms
     * const bookedRoom = await prisma.bookedRoom.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BookedRooms and only return the `id`
     * const bookedRoomWithIdOnly = await prisma.bookedRoom.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BookedRoomUpdateManyAndReturnArgs>(args: SelectSubset<T, BookedRoomUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookedRoomPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BookedRoom.
     * @param {BookedRoomUpsertArgs} args - Arguments to update or create a BookedRoom.
     * @example
     * // Update or create a BookedRoom
     * const bookedRoom = await prisma.bookedRoom.upsert({
     *   create: {
     *     // ... data to create a BookedRoom
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BookedRoom we want to update
     *   }
     * })
     */
    upsert<T extends BookedRoomUpsertArgs>(args: SelectSubset<T, BookedRoomUpsertArgs<ExtArgs>>): Prisma__BookedRoomClient<$Result.GetResult<Prisma.$BookedRoomPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BookedRooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookedRoomCountArgs} args - Arguments to filter BookedRooms to count.
     * @example
     * // Count the number of BookedRooms
     * const count = await prisma.bookedRoom.count({
     *   where: {
     *     // ... the filter for the BookedRooms we want to count
     *   }
     * })
    **/
    count<T extends BookedRoomCountArgs>(
      args?: Subset<T, BookedRoomCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookedRoomCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BookedRoom.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookedRoomAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BookedRoomAggregateArgs>(args: Subset<T, BookedRoomAggregateArgs>): Prisma.PrismaPromise<GetBookedRoomAggregateType<T>>

    /**
     * Group by BookedRoom.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookedRoomGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BookedRoomGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookedRoomGroupByArgs['orderBy'] }
        : { orderBy?: BookedRoomGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BookedRoomGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookedRoomGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BookedRoom model
   */
  readonly fields: BookedRoomFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BookedRoom.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BookedRoomClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    room<T extends RoomDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoomDefaultArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    pet<T extends BookedRoom$petArgs<ExtArgs> = {}>(args?: Subset<T, BookedRoom$petArgs<ExtArgs>>): Prisma__PetClient<$Result.GetResult<Prisma.$PetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    booking<T extends BookingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BookingDefaultArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BookedRoom model
   */
  interface BookedRoomFieldRefs {
    readonly id: FieldRef<"BookedRoom", 'Int'>
    readonly checkIn: FieldRef<"BookedRoom", 'DateTime'>
    readonly checkOut: FieldRef<"BookedRoom", 'DateTime'>
    readonly roomId: FieldRef<"BookedRoom", 'Int'>
    readonly petId: FieldRef<"BookedRoom", 'Int'>
    readonly bookingId: FieldRef<"BookedRoom", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * BookedRoom findUnique
   */
  export type BookedRoomFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookedRoom
     */
    select?: BookedRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookedRoom
     */
    omit?: BookedRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookedRoomInclude<ExtArgs> | null
    /**
     * Filter, which BookedRoom to fetch.
     */
    where: BookedRoomWhereUniqueInput
  }

  /**
   * BookedRoom findUniqueOrThrow
   */
  export type BookedRoomFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookedRoom
     */
    select?: BookedRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookedRoom
     */
    omit?: BookedRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookedRoomInclude<ExtArgs> | null
    /**
     * Filter, which BookedRoom to fetch.
     */
    where: BookedRoomWhereUniqueInput
  }

  /**
   * BookedRoom findFirst
   */
  export type BookedRoomFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookedRoom
     */
    select?: BookedRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookedRoom
     */
    omit?: BookedRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookedRoomInclude<ExtArgs> | null
    /**
     * Filter, which BookedRoom to fetch.
     */
    where?: BookedRoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookedRooms to fetch.
     */
    orderBy?: BookedRoomOrderByWithRelationInput | BookedRoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BookedRooms.
     */
    cursor?: BookedRoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookedRooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookedRooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BookedRooms.
     */
    distinct?: BookedRoomScalarFieldEnum | BookedRoomScalarFieldEnum[]
  }

  /**
   * BookedRoom findFirstOrThrow
   */
  export type BookedRoomFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookedRoom
     */
    select?: BookedRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookedRoom
     */
    omit?: BookedRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookedRoomInclude<ExtArgs> | null
    /**
     * Filter, which BookedRoom to fetch.
     */
    where?: BookedRoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookedRooms to fetch.
     */
    orderBy?: BookedRoomOrderByWithRelationInput | BookedRoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BookedRooms.
     */
    cursor?: BookedRoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookedRooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookedRooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BookedRooms.
     */
    distinct?: BookedRoomScalarFieldEnum | BookedRoomScalarFieldEnum[]
  }

  /**
   * BookedRoom findMany
   */
  export type BookedRoomFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookedRoom
     */
    select?: BookedRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookedRoom
     */
    omit?: BookedRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookedRoomInclude<ExtArgs> | null
    /**
     * Filter, which BookedRooms to fetch.
     */
    where?: BookedRoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookedRooms to fetch.
     */
    orderBy?: BookedRoomOrderByWithRelationInput | BookedRoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BookedRooms.
     */
    cursor?: BookedRoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookedRooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookedRooms.
     */
    skip?: number
    distinct?: BookedRoomScalarFieldEnum | BookedRoomScalarFieldEnum[]
  }

  /**
   * BookedRoom create
   */
  export type BookedRoomCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookedRoom
     */
    select?: BookedRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookedRoom
     */
    omit?: BookedRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookedRoomInclude<ExtArgs> | null
    /**
     * The data needed to create a BookedRoom.
     */
    data: XOR<BookedRoomCreateInput, BookedRoomUncheckedCreateInput>
  }

  /**
   * BookedRoom createMany
   */
  export type BookedRoomCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BookedRooms.
     */
    data: BookedRoomCreateManyInput | BookedRoomCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BookedRoom createManyAndReturn
   */
  export type BookedRoomCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookedRoom
     */
    select?: BookedRoomSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BookedRoom
     */
    omit?: BookedRoomOmit<ExtArgs> | null
    /**
     * The data used to create many BookedRooms.
     */
    data: BookedRoomCreateManyInput | BookedRoomCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookedRoomIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BookedRoom update
   */
  export type BookedRoomUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookedRoom
     */
    select?: BookedRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookedRoom
     */
    omit?: BookedRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookedRoomInclude<ExtArgs> | null
    /**
     * The data needed to update a BookedRoom.
     */
    data: XOR<BookedRoomUpdateInput, BookedRoomUncheckedUpdateInput>
    /**
     * Choose, which BookedRoom to update.
     */
    where: BookedRoomWhereUniqueInput
  }

  /**
   * BookedRoom updateMany
   */
  export type BookedRoomUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BookedRooms.
     */
    data: XOR<BookedRoomUpdateManyMutationInput, BookedRoomUncheckedUpdateManyInput>
    /**
     * Filter which BookedRooms to update
     */
    where?: BookedRoomWhereInput
    /**
     * Limit how many BookedRooms to update.
     */
    limit?: number
  }

  /**
   * BookedRoom updateManyAndReturn
   */
  export type BookedRoomUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookedRoom
     */
    select?: BookedRoomSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BookedRoom
     */
    omit?: BookedRoomOmit<ExtArgs> | null
    /**
     * The data used to update BookedRooms.
     */
    data: XOR<BookedRoomUpdateManyMutationInput, BookedRoomUncheckedUpdateManyInput>
    /**
     * Filter which BookedRooms to update
     */
    where?: BookedRoomWhereInput
    /**
     * Limit how many BookedRooms to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookedRoomIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BookedRoom upsert
   */
  export type BookedRoomUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookedRoom
     */
    select?: BookedRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookedRoom
     */
    omit?: BookedRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookedRoomInclude<ExtArgs> | null
    /**
     * The filter to search for the BookedRoom to update in case it exists.
     */
    where: BookedRoomWhereUniqueInput
    /**
     * In case the BookedRoom found by the `where` argument doesn't exist, create a new BookedRoom with this data.
     */
    create: XOR<BookedRoomCreateInput, BookedRoomUncheckedCreateInput>
    /**
     * In case the BookedRoom was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BookedRoomUpdateInput, BookedRoomUncheckedUpdateInput>
  }

  /**
   * BookedRoom delete
   */
  export type BookedRoomDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookedRoom
     */
    select?: BookedRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookedRoom
     */
    omit?: BookedRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookedRoomInclude<ExtArgs> | null
    /**
     * Filter which BookedRoom to delete.
     */
    where: BookedRoomWhereUniqueInput
  }

  /**
   * BookedRoom deleteMany
   */
  export type BookedRoomDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BookedRooms to delete
     */
    where?: BookedRoomWhereInput
    /**
     * Limit how many BookedRooms to delete.
     */
    limit?: number
  }

  /**
   * BookedRoom.pet
   */
  export type BookedRoom$petArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pet
     */
    select?: PetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pet
     */
    omit?: PetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PetInclude<ExtArgs> | null
    where?: PetWhereInput
  }

  /**
   * BookedRoom without action
   */
  export type BookedRoomDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookedRoom
     */
    select?: BookedRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookedRoom
     */
    omit?: BookedRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookedRoomInclude<ExtArgs> | null
  }


  /**
   * Model Service
   */

  export type AggregateService = {
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  export type ServiceAvgAggregateOutputType = {
    id: number | null
    price: number | null
  }

  export type ServiceSumAggregateOutputType = {
    id: number | null
    price: number | null
  }

  export type ServiceMinAggregateOutputType = {
    id: number | null
    name: string | null
    price: number | null
    picture: string | null
  }

  export type ServiceMaxAggregateOutputType = {
    id: number | null
    name: string | null
    price: number | null
    picture: string | null
  }

  export type ServiceCountAggregateOutputType = {
    id: number
    name: number
    price: number
    petType: number
    picture: number
    _all: number
  }


  export type ServiceAvgAggregateInputType = {
    id?: true
    price?: true
  }

  export type ServiceSumAggregateInputType = {
    id?: true
    price?: true
  }

  export type ServiceMinAggregateInputType = {
    id?: true
    name?: true
    price?: true
    picture?: true
  }

  export type ServiceMaxAggregateInputType = {
    id?: true
    name?: true
    price?: true
    picture?: true
  }

  export type ServiceCountAggregateInputType = {
    id?: true
    name?: true
    price?: true
    petType?: true
    picture?: true
    _all?: true
  }

  export type ServiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Service to aggregate.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Services
    **/
    _count?: true | ServiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceMaxAggregateInputType
  }

  export type GetServiceAggregateType<T extends ServiceAggregateArgs> = {
        [P in keyof T & keyof AggregateService]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateService[P]>
      : GetScalarType<T[P], AggregateService[P]>
  }




  export type ServiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithAggregationInput | ServiceOrderByWithAggregationInput[]
    by: ServiceScalarFieldEnum[] | ServiceScalarFieldEnum
    having?: ServiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceCountAggregateInputType | true
    _avg?: ServiceAvgAggregateInputType
    _sum?: ServiceSumAggregateInputType
    _min?: ServiceMinAggregateInputType
    _max?: ServiceMaxAggregateInputType
  }

  export type ServiceGroupByOutputType = {
    id: number
    name: string
    price: number
    petType: $Enums.PetType[]
    picture: string
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  type GetServiceGroupByPayload<T extends ServiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceGroupByOutputType[P]>
        }
      >
    >


  export type ServiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    price?: boolean
    petType?: boolean
    picture?: boolean
    reviews?: boolean | Service$reviewsArgs<ExtArgs>
    staffOnServices?: boolean | Service$staffOnServicesArgs<ExtArgs>
    bookedServices?: boolean | Service$bookedServicesArgs<ExtArgs>
    _count?: boolean | ServiceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    price?: boolean
    petType?: boolean
    picture?: boolean
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    price?: boolean
    petType?: boolean
    picture?: boolean
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectScalar = {
    id?: boolean
    name?: boolean
    price?: boolean
    petType?: boolean
    picture?: boolean
  }

  export type ServiceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "price" | "petType" | "picture", ExtArgs["result"]["service"]>
  export type ServiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reviews?: boolean | Service$reviewsArgs<ExtArgs>
    staffOnServices?: boolean | Service$staffOnServicesArgs<ExtArgs>
    bookedServices?: boolean | Service$bookedServicesArgs<ExtArgs>
    _count?: boolean | ServiceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ServiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ServiceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ServicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Service"
    objects: {
      reviews: Prisma.$ChatLogPayload<ExtArgs>[]
      staffOnServices: Prisma.$StaffOnServicePayload<ExtArgs>[]
      bookedServices: Prisma.$BookedServicePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      price: number
      petType: $Enums.PetType[]
      picture: string
    }, ExtArgs["result"]["service"]>
    composites: {}
  }

  type ServiceGetPayload<S extends boolean | null | undefined | ServiceDefaultArgs> = $Result.GetResult<Prisma.$ServicePayload, S>

  type ServiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServiceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServiceCountAggregateInputType | true
    }

  export interface ServiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Service'], meta: { name: 'Service' } }
    /**
     * Find zero or one Service that matches the filter.
     * @param {ServiceFindUniqueArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceFindUniqueArgs>(args: SelectSubset<T, ServiceFindUniqueArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Service that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServiceFindUniqueOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Service that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceFindFirstArgs>(args?: SelectSubset<T, ServiceFindFirstArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Service that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Services that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Services
     * const services = await prisma.service.findMany()
     * 
     * // Get first 10 Services
     * const services = await prisma.service.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceWithIdOnly = await prisma.service.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServiceFindManyArgs>(args?: SelectSubset<T, ServiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Service.
     * @param {ServiceCreateArgs} args - Arguments to create a Service.
     * @example
     * // Create one Service
     * const Service = await prisma.service.create({
     *   data: {
     *     // ... data to create a Service
     *   }
     * })
     * 
     */
    create<T extends ServiceCreateArgs>(args: SelectSubset<T, ServiceCreateArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Services.
     * @param {ServiceCreateManyArgs} args - Arguments to create many Services.
     * @example
     * // Create many Services
     * const service = await prisma.service.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceCreateManyArgs>(args?: SelectSubset<T, ServiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Services and returns the data saved in the database.
     * @param {ServiceCreateManyAndReturnArgs} args - Arguments to create many Services.
     * @example
     * // Create many Services
     * const service = await prisma.service.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Services and only return the `id`
     * const serviceWithIdOnly = await prisma.service.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServiceCreateManyAndReturnArgs>(args?: SelectSubset<T, ServiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Service.
     * @param {ServiceDeleteArgs} args - Arguments to delete one Service.
     * @example
     * // Delete one Service
     * const Service = await prisma.service.delete({
     *   where: {
     *     // ... filter to delete one Service
     *   }
     * })
     * 
     */
    delete<T extends ServiceDeleteArgs>(args: SelectSubset<T, ServiceDeleteArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Service.
     * @param {ServiceUpdateArgs} args - Arguments to update one Service.
     * @example
     * // Update one Service
     * const service = await prisma.service.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceUpdateArgs>(args: SelectSubset<T, ServiceUpdateArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Services.
     * @param {ServiceDeleteManyArgs} args - Arguments to filter Services to delete.
     * @example
     * // Delete a few Services
     * const { count } = await prisma.service.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceDeleteManyArgs>(args?: SelectSubset<T, ServiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Services
     * const service = await prisma.service.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceUpdateManyArgs>(args: SelectSubset<T, ServiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Services and returns the data updated in the database.
     * @param {ServiceUpdateManyAndReturnArgs} args - Arguments to update many Services.
     * @example
     * // Update many Services
     * const service = await prisma.service.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Services and only return the `id`
     * const serviceWithIdOnly = await prisma.service.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ServiceUpdateManyAndReturnArgs>(args: SelectSubset<T, ServiceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Service.
     * @param {ServiceUpsertArgs} args - Arguments to update or create a Service.
     * @example
     * // Update or create a Service
     * const service = await prisma.service.upsert({
     *   create: {
     *     // ... data to create a Service
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Service we want to update
     *   }
     * })
     */
    upsert<T extends ServiceUpsertArgs>(args: SelectSubset<T, ServiceUpsertArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCountArgs} args - Arguments to filter Services to count.
     * @example
     * // Count the number of Services
     * const count = await prisma.service.count({
     *   where: {
     *     // ... the filter for the Services we want to count
     *   }
     * })
    **/
    count<T extends ServiceCountArgs>(
      args?: Subset<T, ServiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServiceAggregateArgs>(args: Subset<T, ServiceAggregateArgs>): Prisma.PrismaPromise<GetServiceAggregateType<T>>

    /**
     * Group by Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceGroupByArgs['orderBy'] }
        : { orderBy?: ServiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Service model
   */
  readonly fields: ServiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Service.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    reviews<T extends Service$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, Service$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    staffOnServices<T extends Service$staffOnServicesArgs<ExtArgs> = {}>(args?: Subset<T, Service$staffOnServicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffOnServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    bookedServices<T extends Service$bookedServicesArgs<ExtArgs> = {}>(args?: Subset<T, Service$bookedServicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookedServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Service model
   */
  interface ServiceFieldRefs {
    readonly id: FieldRef<"Service", 'Int'>
    readonly name: FieldRef<"Service", 'String'>
    readonly price: FieldRef<"Service", 'Float'>
    readonly petType: FieldRef<"Service", 'PetType[]'>
    readonly picture: FieldRef<"Service", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Service findUnique
   */
  export type ServiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service findUniqueOrThrow
   */
  export type ServiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service findFirst
   */
  export type ServiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service findFirstOrThrow
   */
  export type ServiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service findMany
   */
  export type ServiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Services to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service create
   */
  export type ServiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to create a Service.
     */
    data: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
  }

  /**
   * Service createMany
   */
  export type ServiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Services.
     */
    data: ServiceCreateManyInput | ServiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Service createManyAndReturn
   */
  export type ServiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * The data used to create many Services.
     */
    data: ServiceCreateManyInput | ServiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Service update
   */
  export type ServiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to update a Service.
     */
    data: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
    /**
     * Choose, which Service to update.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service updateMany
   */
  export type ServiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Services.
     */
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyInput>
    /**
     * Filter which Services to update
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to update.
     */
    limit?: number
  }

  /**
   * Service updateManyAndReturn
   */
  export type ServiceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * The data used to update Services.
     */
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyInput>
    /**
     * Filter which Services to update
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to update.
     */
    limit?: number
  }

  /**
   * Service upsert
   */
  export type ServiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The filter to search for the Service to update in case it exists.
     */
    where: ServiceWhereUniqueInput
    /**
     * In case the Service found by the `where` argument doesn't exist, create a new Service with this data.
     */
    create: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
    /**
     * In case the Service was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
  }

  /**
   * Service delete
   */
  export type ServiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter which Service to delete.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service deleteMany
   */
  export type ServiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Services to delete
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to delete.
     */
    limit?: number
  }

  /**
   * Service.reviews
   */
  export type Service$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatLog
     */
    select?: ChatLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatLog
     */
    omit?: ChatLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatLogInclude<ExtArgs> | null
    where?: ChatLogWhereInput
    orderBy?: ChatLogOrderByWithRelationInput | ChatLogOrderByWithRelationInput[]
    cursor?: ChatLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChatLogScalarFieldEnum | ChatLogScalarFieldEnum[]
  }

  /**
   * Service.staffOnServices
   */
  export type Service$staffOnServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffOnService
     */
    select?: StaffOnServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffOnService
     */
    omit?: StaffOnServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffOnServiceInclude<ExtArgs> | null
    where?: StaffOnServiceWhereInput
    orderBy?: StaffOnServiceOrderByWithRelationInput | StaffOnServiceOrderByWithRelationInput[]
    cursor?: StaffOnServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StaffOnServiceScalarFieldEnum | StaffOnServiceScalarFieldEnum[]
  }

  /**
   * Service.bookedServices
   */
  export type Service$bookedServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookedService
     */
    select?: BookedServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookedService
     */
    omit?: BookedServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookedServiceInclude<ExtArgs> | null
    where?: BookedServiceWhereInput
    orderBy?: BookedServiceOrderByWithRelationInput | BookedServiceOrderByWithRelationInput[]
    cursor?: BookedServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookedServiceScalarFieldEnum | BookedServiceScalarFieldEnum[]
  }

  /**
   * Service without action
   */
  export type ServiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
  }


  /**
   * Model BookedService
   */

  export type AggregateBookedService = {
    _count: BookedServiceCountAggregateOutputType | null
    _avg: BookedServiceAvgAggregateOutputType | null
    _sum: BookedServiceSumAggregateOutputType | null
    _min: BookedServiceMinAggregateOutputType | null
    _max: BookedServiceMaxAggregateOutputType | null
  }

  export type BookedServiceAvgAggregateOutputType = {
    id: number | null
    serviceId: number | null
    petId: number | null
    booking_id: number | null
  }

  export type BookedServiceSumAggregateOutputType = {
    id: number | null
    serviceId: number | null
    petId: number | null
    booking_id: number | null
  }

  export type BookedServiceMinAggregateOutputType = {
    id: number | null
    serviceId: number | null
    petId: number | null
    scheduled: Date | null
    booking_id: number | null
  }

  export type BookedServiceMaxAggregateOutputType = {
    id: number | null
    serviceId: number | null
    petId: number | null
    scheduled: Date | null
    booking_id: number | null
  }

  export type BookedServiceCountAggregateOutputType = {
    id: number
    serviceId: number
    petId: number
    scheduled: number
    booking_id: number
    _all: number
  }


  export type BookedServiceAvgAggregateInputType = {
    id?: true
    serviceId?: true
    petId?: true
    booking_id?: true
  }

  export type BookedServiceSumAggregateInputType = {
    id?: true
    serviceId?: true
    petId?: true
    booking_id?: true
  }

  export type BookedServiceMinAggregateInputType = {
    id?: true
    serviceId?: true
    petId?: true
    scheduled?: true
    booking_id?: true
  }

  export type BookedServiceMaxAggregateInputType = {
    id?: true
    serviceId?: true
    petId?: true
    scheduled?: true
    booking_id?: true
  }

  export type BookedServiceCountAggregateInputType = {
    id?: true
    serviceId?: true
    petId?: true
    scheduled?: true
    booking_id?: true
    _all?: true
  }

  export type BookedServiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BookedService to aggregate.
     */
    where?: BookedServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookedServices to fetch.
     */
    orderBy?: BookedServiceOrderByWithRelationInput | BookedServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BookedServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookedServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookedServices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BookedServices
    **/
    _count?: true | BookedServiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BookedServiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BookedServiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookedServiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookedServiceMaxAggregateInputType
  }

  export type GetBookedServiceAggregateType<T extends BookedServiceAggregateArgs> = {
        [P in keyof T & keyof AggregateBookedService]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBookedService[P]>
      : GetScalarType<T[P], AggregateBookedService[P]>
  }




  export type BookedServiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookedServiceWhereInput
    orderBy?: BookedServiceOrderByWithAggregationInput | BookedServiceOrderByWithAggregationInput[]
    by: BookedServiceScalarFieldEnum[] | BookedServiceScalarFieldEnum
    having?: BookedServiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookedServiceCountAggregateInputType | true
    _avg?: BookedServiceAvgAggregateInputType
    _sum?: BookedServiceSumAggregateInputType
    _min?: BookedServiceMinAggregateInputType
    _max?: BookedServiceMaxAggregateInputType
  }

  export type BookedServiceGroupByOutputType = {
    id: number
    serviceId: number
    petId: number | null
    scheduled: Date
    booking_id: number
    _count: BookedServiceCountAggregateOutputType | null
    _avg: BookedServiceAvgAggregateOutputType | null
    _sum: BookedServiceSumAggregateOutputType | null
    _min: BookedServiceMinAggregateOutputType | null
    _max: BookedServiceMaxAggregateOutputType | null
  }

  type GetBookedServiceGroupByPayload<T extends BookedServiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookedServiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookedServiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookedServiceGroupByOutputType[P]>
            : GetScalarType<T[P], BookedServiceGroupByOutputType[P]>
        }
      >
    >


  export type BookedServiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serviceId?: boolean
    petId?: boolean
    scheduled?: boolean
    booking_id?: boolean
    service?: boolean | ServiceDefaultArgs<ExtArgs>
    pet?: boolean | BookedService$petArgs<ExtArgs>
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookedService"]>

  export type BookedServiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serviceId?: boolean
    petId?: boolean
    scheduled?: boolean
    booking_id?: boolean
    service?: boolean | ServiceDefaultArgs<ExtArgs>
    pet?: boolean | BookedService$petArgs<ExtArgs>
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookedService"]>

  export type BookedServiceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serviceId?: boolean
    petId?: boolean
    scheduled?: boolean
    booking_id?: boolean
    service?: boolean | ServiceDefaultArgs<ExtArgs>
    pet?: boolean | BookedService$petArgs<ExtArgs>
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookedService"]>

  export type BookedServiceSelectScalar = {
    id?: boolean
    serviceId?: boolean
    petId?: boolean
    scheduled?: boolean
    booking_id?: boolean
  }

  export type BookedServiceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "serviceId" | "petId" | "scheduled" | "booking_id", ExtArgs["result"]["bookedService"]>
  export type BookedServiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service?: boolean | ServiceDefaultArgs<ExtArgs>
    pet?: boolean | BookedService$petArgs<ExtArgs>
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }
  export type BookedServiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service?: boolean | ServiceDefaultArgs<ExtArgs>
    pet?: boolean | BookedService$petArgs<ExtArgs>
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }
  export type BookedServiceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service?: boolean | ServiceDefaultArgs<ExtArgs>
    pet?: boolean | BookedService$petArgs<ExtArgs>
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }

  export type $BookedServicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BookedService"
    objects: {
      service: Prisma.$ServicePayload<ExtArgs>
      pet: Prisma.$PetPayload<ExtArgs> | null
      booking: Prisma.$BookingPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      serviceId: number
      petId: number | null
      scheduled: Date
      booking_id: number
    }, ExtArgs["result"]["bookedService"]>
    composites: {}
  }

  type BookedServiceGetPayload<S extends boolean | null | undefined | BookedServiceDefaultArgs> = $Result.GetResult<Prisma.$BookedServicePayload, S>

  type BookedServiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BookedServiceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BookedServiceCountAggregateInputType | true
    }

  export interface BookedServiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BookedService'], meta: { name: 'BookedService' } }
    /**
     * Find zero or one BookedService that matches the filter.
     * @param {BookedServiceFindUniqueArgs} args - Arguments to find a BookedService
     * @example
     * // Get one BookedService
     * const bookedService = await prisma.bookedService.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BookedServiceFindUniqueArgs>(args: SelectSubset<T, BookedServiceFindUniqueArgs<ExtArgs>>): Prisma__BookedServiceClient<$Result.GetResult<Prisma.$BookedServicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BookedService that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BookedServiceFindUniqueOrThrowArgs} args - Arguments to find a BookedService
     * @example
     * // Get one BookedService
     * const bookedService = await prisma.bookedService.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BookedServiceFindUniqueOrThrowArgs>(args: SelectSubset<T, BookedServiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BookedServiceClient<$Result.GetResult<Prisma.$BookedServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BookedService that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookedServiceFindFirstArgs} args - Arguments to find a BookedService
     * @example
     * // Get one BookedService
     * const bookedService = await prisma.bookedService.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BookedServiceFindFirstArgs>(args?: SelectSubset<T, BookedServiceFindFirstArgs<ExtArgs>>): Prisma__BookedServiceClient<$Result.GetResult<Prisma.$BookedServicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BookedService that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookedServiceFindFirstOrThrowArgs} args - Arguments to find a BookedService
     * @example
     * // Get one BookedService
     * const bookedService = await prisma.bookedService.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BookedServiceFindFirstOrThrowArgs>(args?: SelectSubset<T, BookedServiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__BookedServiceClient<$Result.GetResult<Prisma.$BookedServicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BookedServices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookedServiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BookedServices
     * const bookedServices = await prisma.bookedService.findMany()
     * 
     * // Get first 10 BookedServices
     * const bookedServices = await prisma.bookedService.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookedServiceWithIdOnly = await prisma.bookedService.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BookedServiceFindManyArgs>(args?: SelectSubset<T, BookedServiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookedServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BookedService.
     * @param {BookedServiceCreateArgs} args - Arguments to create a BookedService.
     * @example
     * // Create one BookedService
     * const BookedService = await prisma.bookedService.create({
     *   data: {
     *     // ... data to create a BookedService
     *   }
     * })
     * 
     */
    create<T extends BookedServiceCreateArgs>(args: SelectSubset<T, BookedServiceCreateArgs<ExtArgs>>): Prisma__BookedServiceClient<$Result.GetResult<Prisma.$BookedServicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BookedServices.
     * @param {BookedServiceCreateManyArgs} args - Arguments to create many BookedServices.
     * @example
     * // Create many BookedServices
     * const bookedService = await prisma.bookedService.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BookedServiceCreateManyArgs>(args?: SelectSubset<T, BookedServiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BookedServices and returns the data saved in the database.
     * @param {BookedServiceCreateManyAndReturnArgs} args - Arguments to create many BookedServices.
     * @example
     * // Create many BookedServices
     * const bookedService = await prisma.bookedService.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BookedServices and only return the `id`
     * const bookedServiceWithIdOnly = await prisma.bookedService.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BookedServiceCreateManyAndReturnArgs>(args?: SelectSubset<T, BookedServiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookedServicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BookedService.
     * @param {BookedServiceDeleteArgs} args - Arguments to delete one BookedService.
     * @example
     * // Delete one BookedService
     * const BookedService = await prisma.bookedService.delete({
     *   where: {
     *     // ... filter to delete one BookedService
     *   }
     * })
     * 
     */
    delete<T extends BookedServiceDeleteArgs>(args: SelectSubset<T, BookedServiceDeleteArgs<ExtArgs>>): Prisma__BookedServiceClient<$Result.GetResult<Prisma.$BookedServicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BookedService.
     * @param {BookedServiceUpdateArgs} args - Arguments to update one BookedService.
     * @example
     * // Update one BookedService
     * const bookedService = await prisma.bookedService.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BookedServiceUpdateArgs>(args: SelectSubset<T, BookedServiceUpdateArgs<ExtArgs>>): Prisma__BookedServiceClient<$Result.GetResult<Prisma.$BookedServicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BookedServices.
     * @param {BookedServiceDeleteManyArgs} args - Arguments to filter BookedServices to delete.
     * @example
     * // Delete a few BookedServices
     * const { count } = await prisma.bookedService.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BookedServiceDeleteManyArgs>(args?: SelectSubset<T, BookedServiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BookedServices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookedServiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BookedServices
     * const bookedService = await prisma.bookedService.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BookedServiceUpdateManyArgs>(args: SelectSubset<T, BookedServiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BookedServices and returns the data updated in the database.
     * @param {BookedServiceUpdateManyAndReturnArgs} args - Arguments to update many BookedServices.
     * @example
     * // Update many BookedServices
     * const bookedService = await prisma.bookedService.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BookedServices and only return the `id`
     * const bookedServiceWithIdOnly = await prisma.bookedService.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BookedServiceUpdateManyAndReturnArgs>(args: SelectSubset<T, BookedServiceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookedServicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BookedService.
     * @param {BookedServiceUpsertArgs} args - Arguments to update or create a BookedService.
     * @example
     * // Update or create a BookedService
     * const bookedService = await prisma.bookedService.upsert({
     *   create: {
     *     // ... data to create a BookedService
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BookedService we want to update
     *   }
     * })
     */
    upsert<T extends BookedServiceUpsertArgs>(args: SelectSubset<T, BookedServiceUpsertArgs<ExtArgs>>): Prisma__BookedServiceClient<$Result.GetResult<Prisma.$BookedServicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BookedServices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookedServiceCountArgs} args - Arguments to filter BookedServices to count.
     * @example
     * // Count the number of BookedServices
     * const count = await prisma.bookedService.count({
     *   where: {
     *     // ... the filter for the BookedServices we want to count
     *   }
     * })
    **/
    count<T extends BookedServiceCountArgs>(
      args?: Subset<T, BookedServiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookedServiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BookedService.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookedServiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BookedServiceAggregateArgs>(args: Subset<T, BookedServiceAggregateArgs>): Prisma.PrismaPromise<GetBookedServiceAggregateType<T>>

    /**
     * Group by BookedService.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookedServiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BookedServiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookedServiceGroupByArgs['orderBy'] }
        : { orderBy?: BookedServiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BookedServiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookedServiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BookedService model
   */
  readonly fields: BookedServiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BookedService.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BookedServiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    service<T extends ServiceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServiceDefaultArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    pet<T extends BookedService$petArgs<ExtArgs> = {}>(args?: Subset<T, BookedService$petArgs<ExtArgs>>): Prisma__PetClient<$Result.GetResult<Prisma.$PetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    booking<T extends BookingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BookingDefaultArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BookedService model
   */
  interface BookedServiceFieldRefs {
    readonly id: FieldRef<"BookedService", 'Int'>
    readonly serviceId: FieldRef<"BookedService", 'Int'>
    readonly petId: FieldRef<"BookedService", 'Int'>
    readonly scheduled: FieldRef<"BookedService", 'DateTime'>
    readonly booking_id: FieldRef<"BookedService", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * BookedService findUnique
   */
  export type BookedServiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookedService
     */
    select?: BookedServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookedService
     */
    omit?: BookedServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookedServiceInclude<ExtArgs> | null
    /**
     * Filter, which BookedService to fetch.
     */
    where: BookedServiceWhereUniqueInput
  }

  /**
   * BookedService findUniqueOrThrow
   */
  export type BookedServiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookedService
     */
    select?: BookedServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookedService
     */
    omit?: BookedServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookedServiceInclude<ExtArgs> | null
    /**
     * Filter, which BookedService to fetch.
     */
    where: BookedServiceWhereUniqueInput
  }

  /**
   * BookedService findFirst
   */
  export type BookedServiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookedService
     */
    select?: BookedServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookedService
     */
    omit?: BookedServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookedServiceInclude<ExtArgs> | null
    /**
     * Filter, which BookedService to fetch.
     */
    where?: BookedServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookedServices to fetch.
     */
    orderBy?: BookedServiceOrderByWithRelationInput | BookedServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BookedServices.
     */
    cursor?: BookedServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookedServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookedServices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BookedServices.
     */
    distinct?: BookedServiceScalarFieldEnum | BookedServiceScalarFieldEnum[]
  }

  /**
   * BookedService findFirstOrThrow
   */
  export type BookedServiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookedService
     */
    select?: BookedServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookedService
     */
    omit?: BookedServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookedServiceInclude<ExtArgs> | null
    /**
     * Filter, which BookedService to fetch.
     */
    where?: BookedServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookedServices to fetch.
     */
    orderBy?: BookedServiceOrderByWithRelationInput | BookedServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BookedServices.
     */
    cursor?: BookedServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookedServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookedServices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BookedServices.
     */
    distinct?: BookedServiceScalarFieldEnum | BookedServiceScalarFieldEnum[]
  }

  /**
   * BookedService findMany
   */
  export type BookedServiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookedService
     */
    select?: BookedServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookedService
     */
    omit?: BookedServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookedServiceInclude<ExtArgs> | null
    /**
     * Filter, which BookedServices to fetch.
     */
    where?: BookedServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookedServices to fetch.
     */
    orderBy?: BookedServiceOrderByWithRelationInput | BookedServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BookedServices.
     */
    cursor?: BookedServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookedServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookedServices.
     */
    skip?: number
    distinct?: BookedServiceScalarFieldEnum | BookedServiceScalarFieldEnum[]
  }

  /**
   * BookedService create
   */
  export type BookedServiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookedService
     */
    select?: BookedServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookedService
     */
    omit?: BookedServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookedServiceInclude<ExtArgs> | null
    /**
     * The data needed to create a BookedService.
     */
    data: XOR<BookedServiceCreateInput, BookedServiceUncheckedCreateInput>
  }

  /**
   * BookedService createMany
   */
  export type BookedServiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BookedServices.
     */
    data: BookedServiceCreateManyInput | BookedServiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BookedService createManyAndReturn
   */
  export type BookedServiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookedService
     */
    select?: BookedServiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BookedService
     */
    omit?: BookedServiceOmit<ExtArgs> | null
    /**
     * The data used to create many BookedServices.
     */
    data: BookedServiceCreateManyInput | BookedServiceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookedServiceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BookedService update
   */
  export type BookedServiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookedService
     */
    select?: BookedServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookedService
     */
    omit?: BookedServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookedServiceInclude<ExtArgs> | null
    /**
     * The data needed to update a BookedService.
     */
    data: XOR<BookedServiceUpdateInput, BookedServiceUncheckedUpdateInput>
    /**
     * Choose, which BookedService to update.
     */
    where: BookedServiceWhereUniqueInput
  }

  /**
   * BookedService updateMany
   */
  export type BookedServiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BookedServices.
     */
    data: XOR<BookedServiceUpdateManyMutationInput, BookedServiceUncheckedUpdateManyInput>
    /**
     * Filter which BookedServices to update
     */
    where?: BookedServiceWhereInput
    /**
     * Limit how many BookedServices to update.
     */
    limit?: number
  }

  /**
   * BookedService updateManyAndReturn
   */
  export type BookedServiceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookedService
     */
    select?: BookedServiceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BookedService
     */
    omit?: BookedServiceOmit<ExtArgs> | null
    /**
     * The data used to update BookedServices.
     */
    data: XOR<BookedServiceUpdateManyMutationInput, BookedServiceUncheckedUpdateManyInput>
    /**
     * Filter which BookedServices to update
     */
    where?: BookedServiceWhereInput
    /**
     * Limit how many BookedServices to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookedServiceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BookedService upsert
   */
  export type BookedServiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookedService
     */
    select?: BookedServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookedService
     */
    omit?: BookedServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookedServiceInclude<ExtArgs> | null
    /**
     * The filter to search for the BookedService to update in case it exists.
     */
    where: BookedServiceWhereUniqueInput
    /**
     * In case the BookedService found by the `where` argument doesn't exist, create a new BookedService with this data.
     */
    create: XOR<BookedServiceCreateInput, BookedServiceUncheckedCreateInput>
    /**
     * In case the BookedService was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BookedServiceUpdateInput, BookedServiceUncheckedUpdateInput>
  }

  /**
   * BookedService delete
   */
  export type BookedServiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookedService
     */
    select?: BookedServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookedService
     */
    omit?: BookedServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookedServiceInclude<ExtArgs> | null
    /**
     * Filter which BookedService to delete.
     */
    where: BookedServiceWhereUniqueInput
  }

  /**
   * BookedService deleteMany
   */
  export type BookedServiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BookedServices to delete
     */
    where?: BookedServiceWhereInput
    /**
     * Limit how many BookedServices to delete.
     */
    limit?: number
  }

  /**
   * BookedService.pet
   */
  export type BookedService$petArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pet
     */
    select?: PetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pet
     */
    omit?: PetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PetInclude<ExtArgs> | null
    where?: PetWhereInput
  }

  /**
   * BookedService without action
   */
  export type BookedServiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookedService
     */
    select?: BookedServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookedService
     */
    omit?: BookedServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookedServiceInclude<ExtArgs> | null
  }


  /**
   * Model Booking
   */

  export type AggregateBooking = {
    _count: BookingCountAggregateOutputType | null
    _avg: BookingAvgAggregateOutputType | null
    _sum: BookingSumAggregateOutputType | null
    _min: BookingMinAggregateOutputType | null
    _max: BookingMaxAggregateOutputType | null
  }

  export type BookingAvgAggregateOutputType = {
    id: number | null
    customerId: number | null
  }

  export type BookingSumAggregateOutputType = {
    id: number | null
    customerId: number | null
  }

  export type BookingMinAggregateOutputType = {
    id: number | null
    date: Date | null
    status: $Enums.BookingStatus | null
    customerId: number | null
    customerName: string | null
    customerEmail: string | null
    customerNumber: string | null
  }

  export type BookingMaxAggregateOutputType = {
    id: number | null
    date: Date | null
    status: $Enums.BookingStatus | null
    customerId: number | null
    customerName: string | null
    customerEmail: string | null
    customerNumber: string | null
  }

  export type BookingCountAggregateOutputType = {
    id: number
    date: number
    status: number
    customerId: number
    customerName: number
    customerEmail: number
    customerNumber: number
    _all: number
  }


  export type BookingAvgAggregateInputType = {
    id?: true
    customerId?: true
  }

  export type BookingSumAggregateInputType = {
    id?: true
    customerId?: true
  }

  export type BookingMinAggregateInputType = {
    id?: true
    date?: true
    status?: true
    customerId?: true
    customerName?: true
    customerEmail?: true
    customerNumber?: true
  }

  export type BookingMaxAggregateInputType = {
    id?: true
    date?: true
    status?: true
    customerId?: true
    customerName?: true
    customerEmail?: true
    customerNumber?: true
  }

  export type BookingCountAggregateInputType = {
    id?: true
    date?: true
    status?: true
    customerId?: true
    customerName?: true
    customerEmail?: true
    customerNumber?: true
    _all?: true
  }

  export type BookingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Booking to aggregate.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Bookings
    **/
    _count?: true | BookingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BookingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BookingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookingMaxAggregateInputType
  }

  export type GetBookingAggregateType<T extends BookingAggregateArgs> = {
        [P in keyof T & keyof AggregateBooking]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBooking[P]>
      : GetScalarType<T[P], AggregateBooking[P]>
  }




  export type BookingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithAggregationInput | BookingOrderByWithAggregationInput[]
    by: BookingScalarFieldEnum[] | BookingScalarFieldEnum
    having?: BookingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookingCountAggregateInputType | true
    _avg?: BookingAvgAggregateInputType
    _sum?: BookingSumAggregateInputType
    _min?: BookingMinAggregateInputType
    _max?: BookingMaxAggregateInputType
  }

  export type BookingGroupByOutputType = {
    id: number
    date: Date
    status: $Enums.BookingStatus
    customerId: number | null
    customerName: string
    customerEmail: string
    customerNumber: string
    _count: BookingCountAggregateOutputType | null
    _avg: BookingAvgAggregateOutputType | null
    _sum: BookingSumAggregateOutputType | null
    _min: BookingMinAggregateOutputType | null
    _max: BookingMaxAggregateOutputType | null
  }

  type GetBookingGroupByPayload<T extends BookingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookingGroupByOutputType[P]>
            : GetScalarType<T[P], BookingGroupByOutputType[P]>
        }
      >
    >


  export type BookingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    status?: boolean
    customerId?: boolean
    customerName?: boolean
    customerEmail?: boolean
    customerNumber?: boolean
    booked_service?: boolean | Booking$booked_serviceArgs<ExtArgs>
    booked_room?: boolean | Booking$booked_roomArgs<ExtArgs>
    customer?: boolean | Booking$customerArgs<ExtArgs>
    payment?: boolean | Booking$paymentArgs<ExtArgs>
    _count?: boolean | BookingCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    status?: boolean
    customerId?: boolean
    customerName?: boolean
    customerEmail?: boolean
    customerNumber?: boolean
    customer?: boolean | Booking$customerArgs<ExtArgs>
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    status?: boolean
    customerId?: boolean
    customerName?: boolean
    customerEmail?: boolean
    customerNumber?: boolean
    customer?: boolean | Booking$customerArgs<ExtArgs>
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectScalar = {
    id?: boolean
    date?: boolean
    status?: boolean
    customerId?: boolean
    customerName?: boolean
    customerEmail?: boolean
    customerNumber?: boolean
  }

  export type BookingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "date" | "status" | "customerId" | "customerName" | "customerEmail" | "customerNumber", ExtArgs["result"]["booking"]>
  export type BookingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booked_service?: boolean | Booking$booked_serviceArgs<ExtArgs>
    booked_room?: boolean | Booking$booked_roomArgs<ExtArgs>
    customer?: boolean | Booking$customerArgs<ExtArgs>
    payment?: boolean | Booking$paymentArgs<ExtArgs>
    _count?: boolean | BookingCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BookingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | Booking$customerArgs<ExtArgs>
  }
  export type BookingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | Booking$customerArgs<ExtArgs>
  }

  export type $BookingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Booking"
    objects: {
      booked_service: Prisma.$BookedServicePayload<ExtArgs>[]
      booked_room: Prisma.$BookedRoomPayload<ExtArgs>[]
      customer: Prisma.$CustomerPayload<ExtArgs> | null
      payment: Prisma.$PaymentPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      date: Date
      status: $Enums.BookingStatus
      customerId: number | null
      customerName: string
      customerEmail: string
      customerNumber: string
    }, ExtArgs["result"]["booking"]>
    composites: {}
  }

  type BookingGetPayload<S extends boolean | null | undefined | BookingDefaultArgs> = $Result.GetResult<Prisma.$BookingPayload, S>

  type BookingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BookingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BookingCountAggregateInputType | true
    }

  export interface BookingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Booking'], meta: { name: 'Booking' } }
    /**
     * Find zero or one Booking that matches the filter.
     * @param {BookingFindUniqueArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BookingFindUniqueArgs>(args: SelectSubset<T, BookingFindUniqueArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Booking that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BookingFindUniqueOrThrowArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BookingFindUniqueOrThrowArgs>(args: SelectSubset<T, BookingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Booking that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindFirstArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BookingFindFirstArgs>(args?: SelectSubset<T, BookingFindFirstArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Booking that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindFirstOrThrowArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BookingFindFirstOrThrowArgs>(args?: SelectSubset<T, BookingFindFirstOrThrowArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Bookings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bookings
     * const bookings = await prisma.booking.findMany()
     * 
     * // Get first 10 Bookings
     * const bookings = await prisma.booking.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookingWithIdOnly = await prisma.booking.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BookingFindManyArgs>(args?: SelectSubset<T, BookingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Booking.
     * @param {BookingCreateArgs} args - Arguments to create a Booking.
     * @example
     * // Create one Booking
     * const Booking = await prisma.booking.create({
     *   data: {
     *     // ... data to create a Booking
     *   }
     * })
     * 
     */
    create<T extends BookingCreateArgs>(args: SelectSubset<T, BookingCreateArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Bookings.
     * @param {BookingCreateManyArgs} args - Arguments to create many Bookings.
     * @example
     * // Create many Bookings
     * const booking = await prisma.booking.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BookingCreateManyArgs>(args?: SelectSubset<T, BookingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bookings and returns the data saved in the database.
     * @param {BookingCreateManyAndReturnArgs} args - Arguments to create many Bookings.
     * @example
     * // Create many Bookings
     * const booking = await prisma.booking.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bookings and only return the `id`
     * const bookingWithIdOnly = await prisma.booking.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BookingCreateManyAndReturnArgs>(args?: SelectSubset<T, BookingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Booking.
     * @param {BookingDeleteArgs} args - Arguments to delete one Booking.
     * @example
     * // Delete one Booking
     * const Booking = await prisma.booking.delete({
     *   where: {
     *     // ... filter to delete one Booking
     *   }
     * })
     * 
     */
    delete<T extends BookingDeleteArgs>(args: SelectSubset<T, BookingDeleteArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Booking.
     * @param {BookingUpdateArgs} args - Arguments to update one Booking.
     * @example
     * // Update one Booking
     * const booking = await prisma.booking.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BookingUpdateArgs>(args: SelectSubset<T, BookingUpdateArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Bookings.
     * @param {BookingDeleteManyArgs} args - Arguments to filter Bookings to delete.
     * @example
     * // Delete a few Bookings
     * const { count } = await prisma.booking.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BookingDeleteManyArgs>(args?: SelectSubset<T, BookingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bookings
     * const booking = await prisma.booking.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BookingUpdateManyArgs>(args: SelectSubset<T, BookingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookings and returns the data updated in the database.
     * @param {BookingUpdateManyAndReturnArgs} args - Arguments to update many Bookings.
     * @example
     * // Update many Bookings
     * const booking = await prisma.booking.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Bookings and only return the `id`
     * const bookingWithIdOnly = await prisma.booking.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BookingUpdateManyAndReturnArgs>(args: SelectSubset<T, BookingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Booking.
     * @param {BookingUpsertArgs} args - Arguments to update or create a Booking.
     * @example
     * // Update or create a Booking
     * const booking = await prisma.booking.upsert({
     *   create: {
     *     // ... data to create a Booking
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Booking we want to update
     *   }
     * })
     */
    upsert<T extends BookingUpsertArgs>(args: SelectSubset<T, BookingUpsertArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingCountArgs} args - Arguments to filter Bookings to count.
     * @example
     * // Count the number of Bookings
     * const count = await prisma.booking.count({
     *   where: {
     *     // ... the filter for the Bookings we want to count
     *   }
     * })
    **/
    count<T extends BookingCountArgs>(
      args?: Subset<T, BookingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Booking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BookingAggregateArgs>(args: Subset<T, BookingAggregateArgs>): Prisma.PrismaPromise<GetBookingAggregateType<T>>

    /**
     * Group by Booking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BookingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookingGroupByArgs['orderBy'] }
        : { orderBy?: BookingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BookingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Booking model
   */
  readonly fields: BookingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Booking.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BookingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    booked_service<T extends Booking$booked_serviceArgs<ExtArgs> = {}>(args?: Subset<T, Booking$booked_serviceArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookedServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    booked_room<T extends Booking$booked_roomArgs<ExtArgs> = {}>(args?: Subset<T, Booking$booked_roomArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookedRoomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    customer<T extends Booking$customerArgs<ExtArgs> = {}>(args?: Subset<T, Booking$customerArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    payment<T extends Booking$paymentArgs<ExtArgs> = {}>(args?: Subset<T, Booking$paymentArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Booking model
   */
  interface BookingFieldRefs {
    readonly id: FieldRef<"Booking", 'Int'>
    readonly date: FieldRef<"Booking", 'DateTime'>
    readonly status: FieldRef<"Booking", 'BookingStatus'>
    readonly customerId: FieldRef<"Booking", 'Int'>
    readonly customerName: FieldRef<"Booking", 'String'>
    readonly customerEmail: FieldRef<"Booking", 'String'>
    readonly customerNumber: FieldRef<"Booking", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Booking findUnique
   */
  export type BookingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking findUniqueOrThrow
   */
  export type BookingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking findFirst
   */
  export type BookingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookings.
     */
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking findFirstOrThrow
   */
  export type BookingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookings.
     */
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking findMany
   */
  export type BookingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Bookings to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking create
   */
  export type BookingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The data needed to create a Booking.
     */
    data: XOR<BookingCreateInput, BookingUncheckedCreateInput>
  }

  /**
   * Booking createMany
   */
  export type BookingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Bookings.
     */
    data: BookingCreateManyInput | BookingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Booking createManyAndReturn
   */
  export type BookingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * The data used to create many Bookings.
     */
    data: BookingCreateManyInput | BookingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Booking update
   */
  export type BookingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The data needed to update a Booking.
     */
    data: XOR<BookingUpdateInput, BookingUncheckedUpdateInput>
    /**
     * Choose, which Booking to update.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking updateMany
   */
  export type BookingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Bookings.
     */
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyInput>
    /**
     * Filter which Bookings to update
     */
    where?: BookingWhereInput
    /**
     * Limit how many Bookings to update.
     */
    limit?: number
  }

  /**
   * Booking updateManyAndReturn
   */
  export type BookingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * The data used to update Bookings.
     */
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyInput>
    /**
     * Filter which Bookings to update
     */
    where?: BookingWhereInput
    /**
     * Limit how many Bookings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Booking upsert
   */
  export type BookingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The filter to search for the Booking to update in case it exists.
     */
    where: BookingWhereUniqueInput
    /**
     * In case the Booking found by the `where` argument doesn't exist, create a new Booking with this data.
     */
    create: XOR<BookingCreateInput, BookingUncheckedCreateInput>
    /**
     * In case the Booking was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BookingUpdateInput, BookingUncheckedUpdateInput>
  }

  /**
   * Booking delete
   */
  export type BookingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter which Booking to delete.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking deleteMany
   */
  export type BookingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bookings to delete
     */
    where?: BookingWhereInput
    /**
     * Limit how many Bookings to delete.
     */
    limit?: number
  }

  /**
   * Booking.booked_service
   */
  export type Booking$booked_serviceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookedService
     */
    select?: BookedServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookedService
     */
    omit?: BookedServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookedServiceInclude<ExtArgs> | null
    where?: BookedServiceWhereInput
    orderBy?: BookedServiceOrderByWithRelationInput | BookedServiceOrderByWithRelationInput[]
    cursor?: BookedServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookedServiceScalarFieldEnum | BookedServiceScalarFieldEnum[]
  }

  /**
   * Booking.booked_room
   */
  export type Booking$booked_roomArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookedRoom
     */
    select?: BookedRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookedRoom
     */
    omit?: BookedRoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookedRoomInclude<ExtArgs> | null
    where?: BookedRoomWhereInput
    orderBy?: BookedRoomOrderByWithRelationInput | BookedRoomOrderByWithRelationInput[]
    cursor?: BookedRoomWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookedRoomScalarFieldEnum | BookedRoomScalarFieldEnum[]
  }

  /**
   * Booking.customer
   */
  export type Booking$customerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    where?: CustomerWhereInput
  }

  /**
   * Booking.payment
   */
  export type Booking$paymentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
  }

  /**
   * Booking without action
   */
  export type BookingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
  }


  /**
   * Model Payment
   */

  export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  export type PaymentAvgAggregateOutputType = {
    id: number | null
    cost: number | null
    bookingId: number | null
    customerId: number | null
  }

  export type PaymentSumAggregateOutputType = {
    id: number | null
    cost: number | null
    bookingId: number | null
    customerId: number | null
  }

  export type PaymentMinAggregateOutputType = {
    id: number | null
    cost: number | null
    date: Date | null
    status: $Enums.PaymentStatus | null
    bookingId: number | null
    customerId: number | null
    customerName: string | null
    customerEmail: string | null
    customerNumber: string | null
  }

  export type PaymentMaxAggregateOutputType = {
    id: number | null
    cost: number | null
    date: Date | null
    status: $Enums.PaymentStatus | null
    bookingId: number | null
    customerId: number | null
    customerName: string | null
    customerEmail: string | null
    customerNumber: string | null
  }

  export type PaymentCountAggregateOutputType = {
    id: number
    cost: number
    date: number
    status: number
    bookingId: number
    customerId: number
    customerName: number
    customerEmail: number
    customerNumber: number
    _all: number
  }


  export type PaymentAvgAggregateInputType = {
    id?: true
    cost?: true
    bookingId?: true
    customerId?: true
  }

  export type PaymentSumAggregateInputType = {
    id?: true
    cost?: true
    bookingId?: true
    customerId?: true
  }

  export type PaymentMinAggregateInputType = {
    id?: true
    cost?: true
    date?: true
    status?: true
    bookingId?: true
    customerId?: true
    customerName?: true
    customerEmail?: true
    customerNumber?: true
  }

  export type PaymentMaxAggregateInputType = {
    id?: true
    cost?: true
    date?: true
    status?: true
    bookingId?: true
    customerId?: true
    customerName?: true
    customerEmail?: true
    customerNumber?: true
  }

  export type PaymentCountAggregateInputType = {
    id?: true
    cost?: true
    date?: true
    status?: true
    bookingId?: true
    customerId?: true
    customerName?: true
    customerEmail?: true
    customerNumber?: true
    _all?: true
  }

  export type PaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payment to aggregate.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payments
    **/
    _count?: true | PaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentMaxAggregateInputType
  }

  export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
        [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayment[P]>
      : GetScalarType<T[P], AggregatePayment[P]>
  }




  export type PaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithAggregationInput | PaymentOrderByWithAggregationInput[]
    by: PaymentScalarFieldEnum[] | PaymentScalarFieldEnum
    having?: PaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentCountAggregateInputType | true
    _avg?: PaymentAvgAggregateInputType
    _sum?: PaymentSumAggregateInputType
    _min?: PaymentMinAggregateInputType
    _max?: PaymentMaxAggregateInputType
  }

  export type PaymentGroupByOutputType = {
    id: number
    cost: number
    date: Date
    status: $Enums.PaymentStatus
    bookingId: number | null
    customerId: number | null
    customerName: string
    customerEmail: string
    customerNumber: string
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
        }
      >
    >


  export type PaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cost?: boolean
    date?: boolean
    status?: boolean
    bookingId?: boolean
    customerId?: boolean
    customerName?: boolean
    customerEmail?: boolean
    customerNumber?: boolean
    booking?: boolean | Payment$bookingArgs<ExtArgs>
    customer?: boolean | Payment$customerArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cost?: boolean
    date?: boolean
    status?: boolean
    bookingId?: boolean
    customerId?: boolean
    customerName?: boolean
    customerEmail?: boolean
    customerNumber?: boolean
    booking?: boolean | Payment$bookingArgs<ExtArgs>
    customer?: boolean | Payment$customerArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cost?: boolean
    date?: boolean
    status?: boolean
    bookingId?: boolean
    customerId?: boolean
    customerName?: boolean
    customerEmail?: boolean
    customerNumber?: boolean
    booking?: boolean | Payment$bookingArgs<ExtArgs>
    customer?: boolean | Payment$customerArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectScalar = {
    id?: boolean
    cost?: boolean
    date?: boolean
    status?: boolean
    bookingId?: boolean
    customerId?: boolean
    customerName?: boolean
    customerEmail?: boolean
    customerNumber?: boolean
  }

  export type PaymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "cost" | "date" | "status" | "bookingId" | "customerId" | "customerName" | "customerEmail" | "customerNumber", ExtArgs["result"]["payment"]>
  export type PaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | Payment$bookingArgs<ExtArgs>
    customer?: boolean | Payment$customerArgs<ExtArgs>
  }
  export type PaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | Payment$bookingArgs<ExtArgs>
    customer?: boolean | Payment$customerArgs<ExtArgs>
  }
  export type PaymentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | Payment$bookingArgs<ExtArgs>
    customer?: boolean | Payment$customerArgs<ExtArgs>
  }

  export type $PaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payment"
    objects: {
      booking: Prisma.$BookingPayload<ExtArgs> | null
      customer: Prisma.$CustomerPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      cost: number
      date: Date
      status: $Enums.PaymentStatus
      bookingId: number | null
      customerId: number | null
      customerName: string
      customerEmail: string
      customerNumber: string
    }, ExtArgs["result"]["payment"]>
    composites: {}
  }

  type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = $Result.GetResult<Prisma.$PaymentPayload, S>

  type PaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentCountAggregateInputType | true
    }

  export interface PaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payment'], meta: { name: 'Payment' } }
    /**
     * Find zero or one Payment that matches the filter.
     * @param {PaymentFindUniqueArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentFindUniqueArgs>(args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Payment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentFindUniqueOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentFindFirstArgs>(args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payment.findMany()
     * 
     * // Get first 10 Payments
     * const payments = await prisma.payment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentWithIdOnly = await prisma.payment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentFindManyArgs>(args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Payment.
     * @param {PaymentCreateArgs} args - Arguments to create a Payment.
     * @example
     * // Create one Payment
     * const Payment = await prisma.payment.create({
     *   data: {
     *     // ... data to create a Payment
     *   }
     * })
     * 
     */
    create<T extends PaymentCreateArgs>(args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Payments.
     * @param {PaymentCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentCreateManyArgs>(args?: SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Payments and returns the data saved in the database.
     * @param {PaymentCreateManyAndReturnArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Payment.
     * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
     * @example
     * // Delete one Payment
     * const Payment = await prisma.payment.delete({
     *   where: {
     *     // ... filter to delete one Payment
     *   }
     * })
     * 
     */
    delete<T extends PaymentDeleteArgs>(args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Payment.
     * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
     * @example
     * // Update one Payment
     * const payment = await prisma.payment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentUpdateArgs>(args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Payments.
     * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentDeleteManyArgs>(args?: SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentUpdateManyArgs>(args: SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments and returns the data updated in the database.
     * @param {PaymentUpdateManyAndReturnArgs} args - Arguments to update many Payments.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PaymentUpdateManyAndReturnArgs>(args: SelectSubset<T, PaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Payment.
     * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
     * @example
     * // Update or create a Payment
     * const payment = await prisma.payment.upsert({
     *   create: {
     *     // ... data to create a Payment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payment we want to update
     *   }
     * })
     */
    upsert<T extends PaymentUpsertArgs>(args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payment.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
    **/
    count<T extends PaymentCountArgs>(
      args?: Subset<T, PaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentAggregateArgs>(args: Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>

    /**
     * Group by Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payment model
   */
  readonly fields: PaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    booking<T extends Payment$bookingArgs<ExtArgs> = {}>(args?: Subset<T, Payment$bookingArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    customer<T extends Payment$customerArgs<ExtArgs> = {}>(args?: Subset<T, Payment$customerArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Payment model
   */
  interface PaymentFieldRefs {
    readonly id: FieldRef<"Payment", 'Int'>
    readonly cost: FieldRef<"Payment", 'Float'>
    readonly date: FieldRef<"Payment", 'DateTime'>
    readonly status: FieldRef<"Payment", 'PaymentStatus'>
    readonly bookingId: FieldRef<"Payment", 'Int'>
    readonly customerId: FieldRef<"Payment", 'Int'>
    readonly customerName: FieldRef<"Payment", 'String'>
    readonly customerEmail: FieldRef<"Payment", 'String'>
    readonly customerNumber: FieldRef<"Payment", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Payment findUnique
   */
  export type PaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findFirst
   */
  export type PaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment create
   */
  export type PaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a Payment.
     */
    data: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
  }

  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payment createManyAndReturn
   */
  export type PaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment update
   */
  export type PaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a Payment.
     */
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
    /**
     * Choose, which Payment to update.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
  }

  /**
   * Payment updateManyAndReturn
   */
  export type PaymentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the Payment to update in case it exists.
     */
    where: PaymentWhereUniqueInput
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     */
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
  }

  /**
   * Payment delete
   */
  export type PaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter which Payment to delete.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to delete.
     */
    limit?: number
  }

  /**
   * Payment.booking
   */
  export type Payment$bookingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    where?: BookingWhereInput
  }

  /**
   * Payment.customer
   */
  export type Payment$customerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    where?: CustomerWhereInput
  }

  /**
   * Payment without action
   */
  export type PaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
  }


  /**
   * Model Care
   */

  export type AggregateCare = {
    _count: CareCountAggregateOutputType | null
    _avg: CareAvgAggregateOutputType | null
    _sum: CareSumAggregateOutputType | null
    _min: CareMinAggregateOutputType | null
    _max: CareMaxAggregateOutputType | null
  }

  export type CareAvgAggregateOutputType = {
    staff_id: number | null
    pet_id: number | null
  }

  export type CareSumAggregateOutputType = {
    staff_id: number | null
    pet_id: number | null
  }

  export type CareMinAggregateOutputType = {
    start_period: Date | null
    end_period: Date | null
    staff_id: number | null
    pet_id: number | null
  }

  export type CareMaxAggregateOutputType = {
    start_period: Date | null
    end_period: Date | null
    staff_id: number | null
    pet_id: number | null
  }

  export type CareCountAggregateOutputType = {
    start_period: number
    end_period: number
    staff_id: number
    pet_id: number
    _all: number
  }


  export type CareAvgAggregateInputType = {
    staff_id?: true
    pet_id?: true
  }

  export type CareSumAggregateInputType = {
    staff_id?: true
    pet_id?: true
  }

  export type CareMinAggregateInputType = {
    start_period?: true
    end_period?: true
    staff_id?: true
    pet_id?: true
  }

  export type CareMaxAggregateInputType = {
    start_period?: true
    end_period?: true
    staff_id?: true
    pet_id?: true
  }

  export type CareCountAggregateInputType = {
    start_period?: true
    end_period?: true
    staff_id?: true
    pet_id?: true
    _all?: true
  }

  export type CareAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Care to aggregate.
     */
    where?: CareWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cares to fetch.
     */
    orderBy?: CareOrderByWithRelationInput | CareOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CareWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cares from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cares.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Cares
    **/
    _count?: true | CareCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CareAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CareSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CareMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CareMaxAggregateInputType
  }

  export type GetCareAggregateType<T extends CareAggregateArgs> = {
        [P in keyof T & keyof AggregateCare]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCare[P]>
      : GetScalarType<T[P], AggregateCare[P]>
  }




  export type CareGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CareWhereInput
    orderBy?: CareOrderByWithAggregationInput | CareOrderByWithAggregationInput[]
    by: CareScalarFieldEnum[] | CareScalarFieldEnum
    having?: CareScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CareCountAggregateInputType | true
    _avg?: CareAvgAggregateInputType
    _sum?: CareSumAggregateInputType
    _min?: CareMinAggregateInputType
    _max?: CareMaxAggregateInputType
  }

  export type CareGroupByOutputType = {
    start_period: Date
    end_period: Date
    staff_id: number
    pet_id: number
    _count: CareCountAggregateOutputType | null
    _avg: CareAvgAggregateOutputType | null
    _sum: CareSumAggregateOutputType | null
    _min: CareMinAggregateOutputType | null
    _max: CareMaxAggregateOutputType | null
  }

  type GetCareGroupByPayload<T extends CareGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CareGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CareGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CareGroupByOutputType[P]>
            : GetScalarType<T[P], CareGroupByOutputType[P]>
        }
      >
    >


  export type CareSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    start_period?: boolean
    end_period?: boolean
    staff_id?: boolean
    pet_id?: boolean
    staff?: boolean | StaffDefaultArgs<ExtArgs>
    pet?: boolean | PetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["care"]>

  export type CareSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    start_period?: boolean
    end_period?: boolean
    staff_id?: boolean
    pet_id?: boolean
    staff?: boolean | StaffDefaultArgs<ExtArgs>
    pet?: boolean | PetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["care"]>

  export type CareSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    start_period?: boolean
    end_period?: boolean
    staff_id?: boolean
    pet_id?: boolean
    staff?: boolean | StaffDefaultArgs<ExtArgs>
    pet?: boolean | PetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["care"]>

  export type CareSelectScalar = {
    start_period?: boolean
    end_period?: boolean
    staff_id?: boolean
    pet_id?: boolean
  }

  export type CareOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"start_period" | "end_period" | "staff_id" | "pet_id", ExtArgs["result"]["care"]>
  export type CareInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    staff?: boolean | StaffDefaultArgs<ExtArgs>
    pet?: boolean | PetDefaultArgs<ExtArgs>
  }
  export type CareIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    staff?: boolean | StaffDefaultArgs<ExtArgs>
    pet?: boolean | PetDefaultArgs<ExtArgs>
  }
  export type CareIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    staff?: boolean | StaffDefaultArgs<ExtArgs>
    pet?: boolean | PetDefaultArgs<ExtArgs>
  }

  export type $CarePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Care"
    objects: {
      staff: Prisma.$StaffPayload<ExtArgs>
      pet: Prisma.$PetPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      start_period: Date
      end_period: Date
      staff_id: number
      pet_id: number
    }, ExtArgs["result"]["care"]>
    composites: {}
  }

  type CareGetPayload<S extends boolean | null | undefined | CareDefaultArgs> = $Result.GetResult<Prisma.$CarePayload, S>

  type CareCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CareFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CareCountAggregateInputType | true
    }

  export interface CareDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Care'], meta: { name: 'Care' } }
    /**
     * Find zero or one Care that matches the filter.
     * @param {CareFindUniqueArgs} args - Arguments to find a Care
     * @example
     * // Get one Care
     * const care = await prisma.care.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CareFindUniqueArgs>(args: SelectSubset<T, CareFindUniqueArgs<ExtArgs>>): Prisma__CareClient<$Result.GetResult<Prisma.$CarePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Care that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CareFindUniqueOrThrowArgs} args - Arguments to find a Care
     * @example
     * // Get one Care
     * const care = await prisma.care.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CareFindUniqueOrThrowArgs>(args: SelectSubset<T, CareFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CareClient<$Result.GetResult<Prisma.$CarePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Care that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareFindFirstArgs} args - Arguments to find a Care
     * @example
     * // Get one Care
     * const care = await prisma.care.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CareFindFirstArgs>(args?: SelectSubset<T, CareFindFirstArgs<ExtArgs>>): Prisma__CareClient<$Result.GetResult<Prisma.$CarePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Care that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareFindFirstOrThrowArgs} args - Arguments to find a Care
     * @example
     * // Get one Care
     * const care = await prisma.care.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CareFindFirstOrThrowArgs>(args?: SelectSubset<T, CareFindFirstOrThrowArgs<ExtArgs>>): Prisma__CareClient<$Result.GetResult<Prisma.$CarePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Cares that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Cares
     * const cares = await prisma.care.findMany()
     * 
     * // Get first 10 Cares
     * const cares = await prisma.care.findMany({ take: 10 })
     * 
     * // Only select the `start_period`
     * const careWithStart_periodOnly = await prisma.care.findMany({ select: { start_period: true } })
     * 
     */
    findMany<T extends CareFindManyArgs>(args?: SelectSubset<T, CareFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CarePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Care.
     * @param {CareCreateArgs} args - Arguments to create a Care.
     * @example
     * // Create one Care
     * const Care = await prisma.care.create({
     *   data: {
     *     // ... data to create a Care
     *   }
     * })
     * 
     */
    create<T extends CareCreateArgs>(args: SelectSubset<T, CareCreateArgs<ExtArgs>>): Prisma__CareClient<$Result.GetResult<Prisma.$CarePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Cares.
     * @param {CareCreateManyArgs} args - Arguments to create many Cares.
     * @example
     * // Create many Cares
     * const care = await prisma.care.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CareCreateManyArgs>(args?: SelectSubset<T, CareCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Cares and returns the data saved in the database.
     * @param {CareCreateManyAndReturnArgs} args - Arguments to create many Cares.
     * @example
     * // Create many Cares
     * const care = await prisma.care.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Cares and only return the `start_period`
     * const careWithStart_periodOnly = await prisma.care.createManyAndReturn({
     *   select: { start_period: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CareCreateManyAndReturnArgs>(args?: SelectSubset<T, CareCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CarePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Care.
     * @param {CareDeleteArgs} args - Arguments to delete one Care.
     * @example
     * // Delete one Care
     * const Care = await prisma.care.delete({
     *   where: {
     *     // ... filter to delete one Care
     *   }
     * })
     * 
     */
    delete<T extends CareDeleteArgs>(args: SelectSubset<T, CareDeleteArgs<ExtArgs>>): Prisma__CareClient<$Result.GetResult<Prisma.$CarePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Care.
     * @param {CareUpdateArgs} args - Arguments to update one Care.
     * @example
     * // Update one Care
     * const care = await prisma.care.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CareUpdateArgs>(args: SelectSubset<T, CareUpdateArgs<ExtArgs>>): Prisma__CareClient<$Result.GetResult<Prisma.$CarePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Cares.
     * @param {CareDeleteManyArgs} args - Arguments to filter Cares to delete.
     * @example
     * // Delete a few Cares
     * const { count } = await prisma.care.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CareDeleteManyArgs>(args?: SelectSubset<T, CareDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cares.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Cares
     * const care = await prisma.care.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CareUpdateManyArgs>(args: SelectSubset<T, CareUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cares and returns the data updated in the database.
     * @param {CareUpdateManyAndReturnArgs} args - Arguments to update many Cares.
     * @example
     * // Update many Cares
     * const care = await prisma.care.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Cares and only return the `start_period`
     * const careWithStart_periodOnly = await prisma.care.updateManyAndReturn({
     *   select: { start_period: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CareUpdateManyAndReturnArgs>(args: SelectSubset<T, CareUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CarePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Care.
     * @param {CareUpsertArgs} args - Arguments to update or create a Care.
     * @example
     * // Update or create a Care
     * const care = await prisma.care.upsert({
     *   create: {
     *     // ... data to create a Care
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Care we want to update
     *   }
     * })
     */
    upsert<T extends CareUpsertArgs>(args: SelectSubset<T, CareUpsertArgs<ExtArgs>>): Prisma__CareClient<$Result.GetResult<Prisma.$CarePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Cares.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareCountArgs} args - Arguments to filter Cares to count.
     * @example
     * // Count the number of Cares
     * const count = await prisma.care.count({
     *   where: {
     *     // ... the filter for the Cares we want to count
     *   }
     * })
    **/
    count<T extends CareCountArgs>(
      args?: Subset<T, CareCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CareCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Care.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CareAggregateArgs>(args: Subset<T, CareAggregateArgs>): Prisma.PrismaPromise<GetCareAggregateType<T>>

    /**
     * Group by Care.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CareGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CareGroupByArgs['orderBy'] }
        : { orderBy?: CareGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CareGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCareGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Care model
   */
  readonly fields: CareFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Care.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CareClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    staff<T extends StaffDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StaffDefaultArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    pet<T extends PetDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PetDefaultArgs<ExtArgs>>): Prisma__PetClient<$Result.GetResult<Prisma.$PetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Care model
   */
  interface CareFieldRefs {
    readonly start_period: FieldRef<"Care", 'DateTime'>
    readonly end_period: FieldRef<"Care", 'DateTime'>
    readonly staff_id: FieldRef<"Care", 'Int'>
    readonly pet_id: FieldRef<"Care", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Care findUnique
   */
  export type CareFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Care
     */
    select?: CareSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Care
     */
    omit?: CareOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareInclude<ExtArgs> | null
    /**
     * Filter, which Care to fetch.
     */
    where: CareWhereUniqueInput
  }

  /**
   * Care findUniqueOrThrow
   */
  export type CareFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Care
     */
    select?: CareSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Care
     */
    omit?: CareOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareInclude<ExtArgs> | null
    /**
     * Filter, which Care to fetch.
     */
    where: CareWhereUniqueInput
  }

  /**
   * Care findFirst
   */
  export type CareFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Care
     */
    select?: CareSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Care
     */
    omit?: CareOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareInclude<ExtArgs> | null
    /**
     * Filter, which Care to fetch.
     */
    where?: CareWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cares to fetch.
     */
    orderBy?: CareOrderByWithRelationInput | CareOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cares.
     */
    cursor?: CareWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cares from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cares.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cares.
     */
    distinct?: CareScalarFieldEnum | CareScalarFieldEnum[]
  }

  /**
   * Care findFirstOrThrow
   */
  export type CareFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Care
     */
    select?: CareSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Care
     */
    omit?: CareOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareInclude<ExtArgs> | null
    /**
     * Filter, which Care to fetch.
     */
    where?: CareWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cares to fetch.
     */
    orderBy?: CareOrderByWithRelationInput | CareOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cares.
     */
    cursor?: CareWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cares from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cares.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cares.
     */
    distinct?: CareScalarFieldEnum | CareScalarFieldEnum[]
  }

  /**
   * Care findMany
   */
  export type CareFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Care
     */
    select?: CareSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Care
     */
    omit?: CareOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareInclude<ExtArgs> | null
    /**
     * Filter, which Cares to fetch.
     */
    where?: CareWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cares to fetch.
     */
    orderBy?: CareOrderByWithRelationInput | CareOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Cares.
     */
    cursor?: CareWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cares from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cares.
     */
    skip?: number
    distinct?: CareScalarFieldEnum | CareScalarFieldEnum[]
  }

  /**
   * Care create
   */
  export type CareCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Care
     */
    select?: CareSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Care
     */
    omit?: CareOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareInclude<ExtArgs> | null
    /**
     * The data needed to create a Care.
     */
    data: XOR<CareCreateInput, CareUncheckedCreateInput>
  }

  /**
   * Care createMany
   */
  export type CareCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Cares.
     */
    data: CareCreateManyInput | CareCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Care createManyAndReturn
   */
  export type CareCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Care
     */
    select?: CareSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Care
     */
    omit?: CareOmit<ExtArgs> | null
    /**
     * The data used to create many Cares.
     */
    data: CareCreateManyInput | CareCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Care update
   */
  export type CareUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Care
     */
    select?: CareSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Care
     */
    omit?: CareOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareInclude<ExtArgs> | null
    /**
     * The data needed to update a Care.
     */
    data: XOR<CareUpdateInput, CareUncheckedUpdateInput>
    /**
     * Choose, which Care to update.
     */
    where: CareWhereUniqueInput
  }

  /**
   * Care updateMany
   */
  export type CareUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Cares.
     */
    data: XOR<CareUpdateManyMutationInput, CareUncheckedUpdateManyInput>
    /**
     * Filter which Cares to update
     */
    where?: CareWhereInput
    /**
     * Limit how many Cares to update.
     */
    limit?: number
  }

  /**
   * Care updateManyAndReturn
   */
  export type CareUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Care
     */
    select?: CareSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Care
     */
    omit?: CareOmit<ExtArgs> | null
    /**
     * The data used to update Cares.
     */
    data: XOR<CareUpdateManyMutationInput, CareUncheckedUpdateManyInput>
    /**
     * Filter which Cares to update
     */
    where?: CareWhereInput
    /**
     * Limit how many Cares to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Care upsert
   */
  export type CareUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Care
     */
    select?: CareSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Care
     */
    omit?: CareOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareInclude<ExtArgs> | null
    /**
     * The filter to search for the Care to update in case it exists.
     */
    where: CareWhereUniqueInput
    /**
     * In case the Care found by the `where` argument doesn't exist, create a new Care with this data.
     */
    create: XOR<CareCreateInput, CareUncheckedCreateInput>
    /**
     * In case the Care was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CareUpdateInput, CareUncheckedUpdateInput>
  }

  /**
   * Care delete
   */
  export type CareDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Care
     */
    select?: CareSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Care
     */
    omit?: CareOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareInclude<ExtArgs> | null
    /**
     * Filter which Care to delete.
     */
    where: CareWhereUniqueInput
  }

  /**
   * Care deleteMany
   */
  export type CareDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cares to delete
     */
    where?: CareWhereInput
    /**
     * Limit how many Cares to delete.
     */
    limit?: number
  }

  /**
   * Care without action
   */
  export type CareDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Care
     */
    select?: CareSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Care
     */
    omit?: CareOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareInclude<ExtArgs> | null
  }


  /**
   * Model StaffOnService
   */

  export type AggregateStaffOnService = {
    _count: StaffOnServiceCountAggregateOutputType | null
    _avg: StaffOnServiceAvgAggregateOutputType | null
    _sum: StaffOnServiceSumAggregateOutputType | null
    _min: StaffOnServiceMinAggregateOutputType | null
    _max: StaffOnServiceMaxAggregateOutputType | null
  }

  export type StaffOnServiceAvgAggregateOutputType = {
    staffId: number | null
    serviceId: number | null
  }

  export type StaffOnServiceSumAggregateOutputType = {
    staffId: number | null
    serviceId: number | null
  }

  export type StaffOnServiceMinAggregateOutputType = {
    staffId: number | null
    serviceId: number | null
  }

  export type StaffOnServiceMaxAggregateOutputType = {
    staffId: number | null
    serviceId: number | null
  }

  export type StaffOnServiceCountAggregateOutputType = {
    staffId: number
    serviceId: number
    _all: number
  }


  export type StaffOnServiceAvgAggregateInputType = {
    staffId?: true
    serviceId?: true
  }

  export type StaffOnServiceSumAggregateInputType = {
    staffId?: true
    serviceId?: true
  }

  export type StaffOnServiceMinAggregateInputType = {
    staffId?: true
    serviceId?: true
  }

  export type StaffOnServiceMaxAggregateInputType = {
    staffId?: true
    serviceId?: true
  }

  export type StaffOnServiceCountAggregateInputType = {
    staffId?: true
    serviceId?: true
    _all?: true
  }

  export type StaffOnServiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StaffOnService to aggregate.
     */
    where?: StaffOnServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StaffOnServices to fetch.
     */
    orderBy?: StaffOnServiceOrderByWithRelationInput | StaffOnServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StaffOnServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StaffOnServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StaffOnServices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StaffOnServices
    **/
    _count?: true | StaffOnServiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StaffOnServiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StaffOnServiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StaffOnServiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StaffOnServiceMaxAggregateInputType
  }

  export type GetStaffOnServiceAggregateType<T extends StaffOnServiceAggregateArgs> = {
        [P in keyof T & keyof AggregateStaffOnService]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStaffOnService[P]>
      : GetScalarType<T[P], AggregateStaffOnService[P]>
  }




  export type StaffOnServiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StaffOnServiceWhereInput
    orderBy?: StaffOnServiceOrderByWithAggregationInput | StaffOnServiceOrderByWithAggregationInput[]
    by: StaffOnServiceScalarFieldEnum[] | StaffOnServiceScalarFieldEnum
    having?: StaffOnServiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StaffOnServiceCountAggregateInputType | true
    _avg?: StaffOnServiceAvgAggregateInputType
    _sum?: StaffOnServiceSumAggregateInputType
    _min?: StaffOnServiceMinAggregateInputType
    _max?: StaffOnServiceMaxAggregateInputType
  }

  export type StaffOnServiceGroupByOutputType = {
    staffId: number
    serviceId: number
    _count: StaffOnServiceCountAggregateOutputType | null
    _avg: StaffOnServiceAvgAggregateOutputType | null
    _sum: StaffOnServiceSumAggregateOutputType | null
    _min: StaffOnServiceMinAggregateOutputType | null
    _max: StaffOnServiceMaxAggregateOutputType | null
  }

  type GetStaffOnServiceGroupByPayload<T extends StaffOnServiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StaffOnServiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StaffOnServiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StaffOnServiceGroupByOutputType[P]>
            : GetScalarType<T[P], StaffOnServiceGroupByOutputType[P]>
        }
      >
    >


  export type StaffOnServiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    staffId?: boolean
    serviceId?: boolean
    staff?: boolean | StaffDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["staffOnService"]>

  export type StaffOnServiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    staffId?: boolean
    serviceId?: boolean
    staff?: boolean | StaffDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["staffOnService"]>

  export type StaffOnServiceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    staffId?: boolean
    serviceId?: boolean
    staff?: boolean | StaffDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["staffOnService"]>

  export type StaffOnServiceSelectScalar = {
    staffId?: boolean
    serviceId?: boolean
  }

  export type StaffOnServiceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"staffId" | "serviceId", ExtArgs["result"]["staffOnService"]>
  export type StaffOnServiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    staff?: boolean | StaffDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }
  export type StaffOnServiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    staff?: boolean | StaffDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }
  export type StaffOnServiceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    staff?: boolean | StaffDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }

  export type $StaffOnServicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StaffOnService"
    objects: {
      staff: Prisma.$StaffPayload<ExtArgs>
      service: Prisma.$ServicePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      staffId: number
      serviceId: number
    }, ExtArgs["result"]["staffOnService"]>
    composites: {}
  }

  type StaffOnServiceGetPayload<S extends boolean | null | undefined | StaffOnServiceDefaultArgs> = $Result.GetResult<Prisma.$StaffOnServicePayload, S>

  type StaffOnServiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StaffOnServiceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StaffOnServiceCountAggregateInputType | true
    }

  export interface StaffOnServiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StaffOnService'], meta: { name: 'StaffOnService' } }
    /**
     * Find zero or one StaffOnService that matches the filter.
     * @param {StaffOnServiceFindUniqueArgs} args - Arguments to find a StaffOnService
     * @example
     * // Get one StaffOnService
     * const staffOnService = await prisma.staffOnService.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StaffOnServiceFindUniqueArgs>(args: SelectSubset<T, StaffOnServiceFindUniqueArgs<ExtArgs>>): Prisma__StaffOnServiceClient<$Result.GetResult<Prisma.$StaffOnServicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StaffOnService that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StaffOnServiceFindUniqueOrThrowArgs} args - Arguments to find a StaffOnService
     * @example
     * // Get one StaffOnService
     * const staffOnService = await prisma.staffOnService.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StaffOnServiceFindUniqueOrThrowArgs>(args: SelectSubset<T, StaffOnServiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StaffOnServiceClient<$Result.GetResult<Prisma.$StaffOnServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StaffOnService that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffOnServiceFindFirstArgs} args - Arguments to find a StaffOnService
     * @example
     * // Get one StaffOnService
     * const staffOnService = await prisma.staffOnService.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StaffOnServiceFindFirstArgs>(args?: SelectSubset<T, StaffOnServiceFindFirstArgs<ExtArgs>>): Prisma__StaffOnServiceClient<$Result.GetResult<Prisma.$StaffOnServicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StaffOnService that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffOnServiceFindFirstOrThrowArgs} args - Arguments to find a StaffOnService
     * @example
     * // Get one StaffOnService
     * const staffOnService = await prisma.staffOnService.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StaffOnServiceFindFirstOrThrowArgs>(args?: SelectSubset<T, StaffOnServiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__StaffOnServiceClient<$Result.GetResult<Prisma.$StaffOnServicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StaffOnServices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffOnServiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StaffOnServices
     * const staffOnServices = await prisma.staffOnService.findMany()
     * 
     * // Get first 10 StaffOnServices
     * const staffOnServices = await prisma.staffOnService.findMany({ take: 10 })
     * 
     * // Only select the `staffId`
     * const staffOnServiceWithStaffIdOnly = await prisma.staffOnService.findMany({ select: { staffId: true } })
     * 
     */
    findMany<T extends StaffOnServiceFindManyArgs>(args?: SelectSubset<T, StaffOnServiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffOnServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StaffOnService.
     * @param {StaffOnServiceCreateArgs} args - Arguments to create a StaffOnService.
     * @example
     * // Create one StaffOnService
     * const StaffOnService = await prisma.staffOnService.create({
     *   data: {
     *     // ... data to create a StaffOnService
     *   }
     * })
     * 
     */
    create<T extends StaffOnServiceCreateArgs>(args: SelectSubset<T, StaffOnServiceCreateArgs<ExtArgs>>): Prisma__StaffOnServiceClient<$Result.GetResult<Prisma.$StaffOnServicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StaffOnServices.
     * @param {StaffOnServiceCreateManyArgs} args - Arguments to create many StaffOnServices.
     * @example
     * // Create many StaffOnServices
     * const staffOnService = await prisma.staffOnService.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StaffOnServiceCreateManyArgs>(args?: SelectSubset<T, StaffOnServiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StaffOnServices and returns the data saved in the database.
     * @param {StaffOnServiceCreateManyAndReturnArgs} args - Arguments to create many StaffOnServices.
     * @example
     * // Create many StaffOnServices
     * const staffOnService = await prisma.staffOnService.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StaffOnServices and only return the `staffId`
     * const staffOnServiceWithStaffIdOnly = await prisma.staffOnService.createManyAndReturn({
     *   select: { staffId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StaffOnServiceCreateManyAndReturnArgs>(args?: SelectSubset<T, StaffOnServiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffOnServicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StaffOnService.
     * @param {StaffOnServiceDeleteArgs} args - Arguments to delete one StaffOnService.
     * @example
     * // Delete one StaffOnService
     * const StaffOnService = await prisma.staffOnService.delete({
     *   where: {
     *     // ... filter to delete one StaffOnService
     *   }
     * })
     * 
     */
    delete<T extends StaffOnServiceDeleteArgs>(args: SelectSubset<T, StaffOnServiceDeleteArgs<ExtArgs>>): Prisma__StaffOnServiceClient<$Result.GetResult<Prisma.$StaffOnServicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StaffOnService.
     * @param {StaffOnServiceUpdateArgs} args - Arguments to update one StaffOnService.
     * @example
     * // Update one StaffOnService
     * const staffOnService = await prisma.staffOnService.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StaffOnServiceUpdateArgs>(args: SelectSubset<T, StaffOnServiceUpdateArgs<ExtArgs>>): Prisma__StaffOnServiceClient<$Result.GetResult<Prisma.$StaffOnServicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StaffOnServices.
     * @param {StaffOnServiceDeleteManyArgs} args - Arguments to filter StaffOnServices to delete.
     * @example
     * // Delete a few StaffOnServices
     * const { count } = await prisma.staffOnService.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StaffOnServiceDeleteManyArgs>(args?: SelectSubset<T, StaffOnServiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StaffOnServices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffOnServiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StaffOnServices
     * const staffOnService = await prisma.staffOnService.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StaffOnServiceUpdateManyArgs>(args: SelectSubset<T, StaffOnServiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StaffOnServices and returns the data updated in the database.
     * @param {StaffOnServiceUpdateManyAndReturnArgs} args - Arguments to update many StaffOnServices.
     * @example
     * // Update many StaffOnServices
     * const staffOnService = await prisma.staffOnService.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StaffOnServices and only return the `staffId`
     * const staffOnServiceWithStaffIdOnly = await prisma.staffOnService.updateManyAndReturn({
     *   select: { staffId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StaffOnServiceUpdateManyAndReturnArgs>(args: SelectSubset<T, StaffOnServiceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffOnServicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StaffOnService.
     * @param {StaffOnServiceUpsertArgs} args - Arguments to update or create a StaffOnService.
     * @example
     * // Update or create a StaffOnService
     * const staffOnService = await prisma.staffOnService.upsert({
     *   create: {
     *     // ... data to create a StaffOnService
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StaffOnService we want to update
     *   }
     * })
     */
    upsert<T extends StaffOnServiceUpsertArgs>(args: SelectSubset<T, StaffOnServiceUpsertArgs<ExtArgs>>): Prisma__StaffOnServiceClient<$Result.GetResult<Prisma.$StaffOnServicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StaffOnServices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffOnServiceCountArgs} args - Arguments to filter StaffOnServices to count.
     * @example
     * // Count the number of StaffOnServices
     * const count = await prisma.staffOnService.count({
     *   where: {
     *     // ... the filter for the StaffOnServices we want to count
     *   }
     * })
    **/
    count<T extends StaffOnServiceCountArgs>(
      args?: Subset<T, StaffOnServiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StaffOnServiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StaffOnService.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffOnServiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StaffOnServiceAggregateArgs>(args: Subset<T, StaffOnServiceAggregateArgs>): Prisma.PrismaPromise<GetStaffOnServiceAggregateType<T>>

    /**
     * Group by StaffOnService.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffOnServiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StaffOnServiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StaffOnServiceGroupByArgs['orderBy'] }
        : { orderBy?: StaffOnServiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StaffOnServiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStaffOnServiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StaffOnService model
   */
  readonly fields: StaffOnServiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StaffOnService.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StaffOnServiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    staff<T extends StaffDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StaffDefaultArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    service<T extends ServiceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServiceDefaultArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StaffOnService model
   */
  interface StaffOnServiceFieldRefs {
    readonly staffId: FieldRef<"StaffOnService", 'Int'>
    readonly serviceId: FieldRef<"StaffOnService", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * StaffOnService findUnique
   */
  export type StaffOnServiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffOnService
     */
    select?: StaffOnServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffOnService
     */
    omit?: StaffOnServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffOnServiceInclude<ExtArgs> | null
    /**
     * Filter, which StaffOnService to fetch.
     */
    where: StaffOnServiceWhereUniqueInput
  }

  /**
   * StaffOnService findUniqueOrThrow
   */
  export type StaffOnServiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffOnService
     */
    select?: StaffOnServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffOnService
     */
    omit?: StaffOnServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffOnServiceInclude<ExtArgs> | null
    /**
     * Filter, which StaffOnService to fetch.
     */
    where: StaffOnServiceWhereUniqueInput
  }

  /**
   * StaffOnService findFirst
   */
  export type StaffOnServiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffOnService
     */
    select?: StaffOnServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffOnService
     */
    omit?: StaffOnServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffOnServiceInclude<ExtArgs> | null
    /**
     * Filter, which StaffOnService to fetch.
     */
    where?: StaffOnServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StaffOnServices to fetch.
     */
    orderBy?: StaffOnServiceOrderByWithRelationInput | StaffOnServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StaffOnServices.
     */
    cursor?: StaffOnServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StaffOnServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StaffOnServices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StaffOnServices.
     */
    distinct?: StaffOnServiceScalarFieldEnum | StaffOnServiceScalarFieldEnum[]
  }

  /**
   * StaffOnService findFirstOrThrow
   */
  export type StaffOnServiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffOnService
     */
    select?: StaffOnServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffOnService
     */
    omit?: StaffOnServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffOnServiceInclude<ExtArgs> | null
    /**
     * Filter, which StaffOnService to fetch.
     */
    where?: StaffOnServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StaffOnServices to fetch.
     */
    orderBy?: StaffOnServiceOrderByWithRelationInput | StaffOnServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StaffOnServices.
     */
    cursor?: StaffOnServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StaffOnServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StaffOnServices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StaffOnServices.
     */
    distinct?: StaffOnServiceScalarFieldEnum | StaffOnServiceScalarFieldEnum[]
  }

  /**
   * StaffOnService findMany
   */
  export type StaffOnServiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffOnService
     */
    select?: StaffOnServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffOnService
     */
    omit?: StaffOnServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffOnServiceInclude<ExtArgs> | null
    /**
     * Filter, which StaffOnServices to fetch.
     */
    where?: StaffOnServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StaffOnServices to fetch.
     */
    orderBy?: StaffOnServiceOrderByWithRelationInput | StaffOnServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StaffOnServices.
     */
    cursor?: StaffOnServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StaffOnServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StaffOnServices.
     */
    skip?: number
    distinct?: StaffOnServiceScalarFieldEnum | StaffOnServiceScalarFieldEnum[]
  }

  /**
   * StaffOnService create
   */
  export type StaffOnServiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffOnService
     */
    select?: StaffOnServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffOnService
     */
    omit?: StaffOnServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffOnServiceInclude<ExtArgs> | null
    /**
     * The data needed to create a StaffOnService.
     */
    data: XOR<StaffOnServiceCreateInput, StaffOnServiceUncheckedCreateInput>
  }

  /**
   * StaffOnService createMany
   */
  export type StaffOnServiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StaffOnServices.
     */
    data: StaffOnServiceCreateManyInput | StaffOnServiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StaffOnService createManyAndReturn
   */
  export type StaffOnServiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffOnService
     */
    select?: StaffOnServiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StaffOnService
     */
    omit?: StaffOnServiceOmit<ExtArgs> | null
    /**
     * The data used to create many StaffOnServices.
     */
    data: StaffOnServiceCreateManyInput | StaffOnServiceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffOnServiceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StaffOnService update
   */
  export type StaffOnServiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffOnService
     */
    select?: StaffOnServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffOnService
     */
    omit?: StaffOnServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffOnServiceInclude<ExtArgs> | null
    /**
     * The data needed to update a StaffOnService.
     */
    data: XOR<StaffOnServiceUpdateInput, StaffOnServiceUncheckedUpdateInput>
    /**
     * Choose, which StaffOnService to update.
     */
    where: StaffOnServiceWhereUniqueInput
  }

  /**
   * StaffOnService updateMany
   */
  export type StaffOnServiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StaffOnServices.
     */
    data: XOR<StaffOnServiceUpdateManyMutationInput, StaffOnServiceUncheckedUpdateManyInput>
    /**
     * Filter which StaffOnServices to update
     */
    where?: StaffOnServiceWhereInput
    /**
     * Limit how many StaffOnServices to update.
     */
    limit?: number
  }

  /**
   * StaffOnService updateManyAndReturn
   */
  export type StaffOnServiceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffOnService
     */
    select?: StaffOnServiceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StaffOnService
     */
    omit?: StaffOnServiceOmit<ExtArgs> | null
    /**
     * The data used to update StaffOnServices.
     */
    data: XOR<StaffOnServiceUpdateManyMutationInput, StaffOnServiceUncheckedUpdateManyInput>
    /**
     * Filter which StaffOnServices to update
     */
    where?: StaffOnServiceWhereInput
    /**
     * Limit how many StaffOnServices to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffOnServiceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * StaffOnService upsert
   */
  export type StaffOnServiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffOnService
     */
    select?: StaffOnServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffOnService
     */
    omit?: StaffOnServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffOnServiceInclude<ExtArgs> | null
    /**
     * The filter to search for the StaffOnService to update in case it exists.
     */
    where: StaffOnServiceWhereUniqueInput
    /**
     * In case the StaffOnService found by the `where` argument doesn't exist, create a new StaffOnService with this data.
     */
    create: XOR<StaffOnServiceCreateInput, StaffOnServiceUncheckedCreateInput>
    /**
     * In case the StaffOnService was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StaffOnServiceUpdateInput, StaffOnServiceUncheckedUpdateInput>
  }

  /**
   * StaffOnService delete
   */
  export type StaffOnServiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffOnService
     */
    select?: StaffOnServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffOnService
     */
    omit?: StaffOnServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffOnServiceInclude<ExtArgs> | null
    /**
     * Filter which StaffOnService to delete.
     */
    where: StaffOnServiceWhereUniqueInput
  }

  /**
   * StaffOnService deleteMany
   */
  export type StaffOnServiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StaffOnServices to delete
     */
    where?: StaffOnServiceWhereInput
    /**
     * Limit how many StaffOnServices to delete.
     */
    limit?: number
  }

  /**
   * StaffOnService without action
   */
  export type StaffOnServiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffOnService
     */
    select?: StaffOnServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffOnService
     */
    omit?: StaffOnServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffOnServiceInclude<ExtArgs> | null
  }


  /**
   * Model RoomStaff
   */

  export type AggregateRoomStaff = {
    _count: RoomStaffCountAggregateOutputType | null
    _avg: RoomStaffAvgAggregateOutputType | null
    _sum: RoomStaffSumAggregateOutputType | null
    _min: RoomStaffMinAggregateOutputType | null
    _max: RoomStaffMaxAggregateOutputType | null
  }

  export type RoomStaffAvgAggregateOutputType = {
    roomId: number | null
    staffId: number | null
  }

  export type RoomStaffSumAggregateOutputType = {
    roomId: number | null
    staffId: number | null
  }

  export type RoomStaffMinAggregateOutputType = {
    roomId: number | null
    staffId: number | null
  }

  export type RoomStaffMaxAggregateOutputType = {
    roomId: number | null
    staffId: number | null
  }

  export type RoomStaffCountAggregateOutputType = {
    roomId: number
    staffId: number
    _all: number
  }


  export type RoomStaffAvgAggregateInputType = {
    roomId?: true
    staffId?: true
  }

  export type RoomStaffSumAggregateInputType = {
    roomId?: true
    staffId?: true
  }

  export type RoomStaffMinAggregateInputType = {
    roomId?: true
    staffId?: true
  }

  export type RoomStaffMaxAggregateInputType = {
    roomId?: true
    staffId?: true
  }

  export type RoomStaffCountAggregateInputType = {
    roomId?: true
    staffId?: true
    _all?: true
  }

  export type RoomStaffAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomStaff to aggregate.
     */
    where?: RoomStaffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomStaffs to fetch.
     */
    orderBy?: RoomStaffOrderByWithRelationInput | RoomStaffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoomStaffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomStaffs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomStaffs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RoomStaffs
    **/
    _count?: true | RoomStaffCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoomStaffAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoomStaffSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomStaffMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomStaffMaxAggregateInputType
  }

  export type GetRoomStaffAggregateType<T extends RoomStaffAggregateArgs> = {
        [P in keyof T & keyof AggregateRoomStaff]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoomStaff[P]>
      : GetScalarType<T[P], AggregateRoomStaff[P]>
  }




  export type RoomStaffGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomStaffWhereInput
    orderBy?: RoomStaffOrderByWithAggregationInput | RoomStaffOrderByWithAggregationInput[]
    by: RoomStaffScalarFieldEnum[] | RoomStaffScalarFieldEnum
    having?: RoomStaffScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomStaffCountAggregateInputType | true
    _avg?: RoomStaffAvgAggregateInputType
    _sum?: RoomStaffSumAggregateInputType
    _min?: RoomStaffMinAggregateInputType
    _max?: RoomStaffMaxAggregateInputType
  }

  export type RoomStaffGroupByOutputType = {
    roomId: number
    staffId: number
    _count: RoomStaffCountAggregateOutputType | null
    _avg: RoomStaffAvgAggregateOutputType | null
    _sum: RoomStaffSumAggregateOutputType | null
    _min: RoomStaffMinAggregateOutputType | null
    _max: RoomStaffMaxAggregateOutputType | null
  }

  type GetRoomStaffGroupByPayload<T extends RoomStaffGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomStaffGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomStaffGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomStaffGroupByOutputType[P]>
            : GetScalarType<T[P], RoomStaffGroupByOutputType[P]>
        }
      >
    >


  export type RoomStaffSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    roomId?: boolean
    staffId?: boolean
    room?: boolean | RoomDefaultArgs<ExtArgs>
    staff?: boolean | StaffDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomStaff"]>

  export type RoomStaffSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    roomId?: boolean
    staffId?: boolean
    room?: boolean | RoomDefaultArgs<ExtArgs>
    staff?: boolean | StaffDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomStaff"]>

  export type RoomStaffSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    roomId?: boolean
    staffId?: boolean
    room?: boolean | RoomDefaultArgs<ExtArgs>
    staff?: boolean | StaffDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomStaff"]>

  export type RoomStaffSelectScalar = {
    roomId?: boolean
    staffId?: boolean
  }

  export type RoomStaffOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"roomId" | "staffId", ExtArgs["result"]["roomStaff"]>
  export type RoomStaffInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | RoomDefaultArgs<ExtArgs>
    staff?: boolean | StaffDefaultArgs<ExtArgs>
  }
  export type RoomStaffIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | RoomDefaultArgs<ExtArgs>
    staff?: boolean | StaffDefaultArgs<ExtArgs>
  }
  export type RoomStaffIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | RoomDefaultArgs<ExtArgs>
    staff?: boolean | StaffDefaultArgs<ExtArgs>
  }

  export type $RoomStaffPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RoomStaff"
    objects: {
      room: Prisma.$RoomPayload<ExtArgs>
      staff: Prisma.$StaffPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      roomId: number
      staffId: number
    }, ExtArgs["result"]["roomStaff"]>
    composites: {}
  }

  type RoomStaffGetPayload<S extends boolean | null | undefined | RoomStaffDefaultArgs> = $Result.GetResult<Prisma.$RoomStaffPayload, S>

  type RoomStaffCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoomStaffFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoomStaffCountAggregateInputType | true
    }

  export interface RoomStaffDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RoomStaff'], meta: { name: 'RoomStaff' } }
    /**
     * Find zero or one RoomStaff that matches the filter.
     * @param {RoomStaffFindUniqueArgs} args - Arguments to find a RoomStaff
     * @example
     * // Get one RoomStaff
     * const roomStaff = await prisma.roomStaff.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomStaffFindUniqueArgs>(args: SelectSubset<T, RoomStaffFindUniqueArgs<ExtArgs>>): Prisma__RoomStaffClient<$Result.GetResult<Prisma.$RoomStaffPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RoomStaff that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoomStaffFindUniqueOrThrowArgs} args - Arguments to find a RoomStaff
     * @example
     * // Get one RoomStaff
     * const roomStaff = await prisma.roomStaff.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomStaffFindUniqueOrThrowArgs>(args: SelectSubset<T, RoomStaffFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoomStaffClient<$Result.GetResult<Prisma.$RoomStaffPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoomStaff that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStaffFindFirstArgs} args - Arguments to find a RoomStaff
     * @example
     * // Get one RoomStaff
     * const roomStaff = await prisma.roomStaff.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomStaffFindFirstArgs>(args?: SelectSubset<T, RoomStaffFindFirstArgs<ExtArgs>>): Prisma__RoomStaffClient<$Result.GetResult<Prisma.$RoomStaffPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoomStaff that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStaffFindFirstOrThrowArgs} args - Arguments to find a RoomStaff
     * @example
     * // Get one RoomStaff
     * const roomStaff = await prisma.roomStaff.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomStaffFindFirstOrThrowArgs>(args?: SelectSubset<T, RoomStaffFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoomStaffClient<$Result.GetResult<Prisma.$RoomStaffPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RoomStaffs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStaffFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RoomStaffs
     * const roomStaffs = await prisma.roomStaff.findMany()
     * 
     * // Get first 10 RoomStaffs
     * const roomStaffs = await prisma.roomStaff.findMany({ take: 10 })
     * 
     * // Only select the `roomId`
     * const roomStaffWithRoomIdOnly = await prisma.roomStaff.findMany({ select: { roomId: true } })
     * 
     */
    findMany<T extends RoomStaffFindManyArgs>(args?: SelectSubset<T, RoomStaffFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomStaffPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RoomStaff.
     * @param {RoomStaffCreateArgs} args - Arguments to create a RoomStaff.
     * @example
     * // Create one RoomStaff
     * const RoomStaff = await prisma.roomStaff.create({
     *   data: {
     *     // ... data to create a RoomStaff
     *   }
     * })
     * 
     */
    create<T extends RoomStaffCreateArgs>(args: SelectSubset<T, RoomStaffCreateArgs<ExtArgs>>): Prisma__RoomStaffClient<$Result.GetResult<Prisma.$RoomStaffPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RoomStaffs.
     * @param {RoomStaffCreateManyArgs} args - Arguments to create many RoomStaffs.
     * @example
     * // Create many RoomStaffs
     * const roomStaff = await prisma.roomStaff.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoomStaffCreateManyArgs>(args?: SelectSubset<T, RoomStaffCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RoomStaffs and returns the data saved in the database.
     * @param {RoomStaffCreateManyAndReturnArgs} args - Arguments to create many RoomStaffs.
     * @example
     * // Create many RoomStaffs
     * const roomStaff = await prisma.roomStaff.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RoomStaffs and only return the `roomId`
     * const roomStaffWithRoomIdOnly = await prisma.roomStaff.createManyAndReturn({
     *   select: { roomId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoomStaffCreateManyAndReturnArgs>(args?: SelectSubset<T, RoomStaffCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomStaffPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RoomStaff.
     * @param {RoomStaffDeleteArgs} args - Arguments to delete one RoomStaff.
     * @example
     * // Delete one RoomStaff
     * const RoomStaff = await prisma.roomStaff.delete({
     *   where: {
     *     // ... filter to delete one RoomStaff
     *   }
     * })
     * 
     */
    delete<T extends RoomStaffDeleteArgs>(args: SelectSubset<T, RoomStaffDeleteArgs<ExtArgs>>): Prisma__RoomStaffClient<$Result.GetResult<Prisma.$RoomStaffPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RoomStaff.
     * @param {RoomStaffUpdateArgs} args - Arguments to update one RoomStaff.
     * @example
     * // Update one RoomStaff
     * const roomStaff = await prisma.roomStaff.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoomStaffUpdateArgs>(args: SelectSubset<T, RoomStaffUpdateArgs<ExtArgs>>): Prisma__RoomStaffClient<$Result.GetResult<Prisma.$RoomStaffPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RoomStaffs.
     * @param {RoomStaffDeleteManyArgs} args - Arguments to filter RoomStaffs to delete.
     * @example
     * // Delete a few RoomStaffs
     * const { count } = await prisma.roomStaff.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoomStaffDeleteManyArgs>(args?: SelectSubset<T, RoomStaffDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoomStaffs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStaffUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RoomStaffs
     * const roomStaff = await prisma.roomStaff.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoomStaffUpdateManyArgs>(args: SelectSubset<T, RoomStaffUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoomStaffs and returns the data updated in the database.
     * @param {RoomStaffUpdateManyAndReturnArgs} args - Arguments to update many RoomStaffs.
     * @example
     * // Update many RoomStaffs
     * const roomStaff = await prisma.roomStaff.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RoomStaffs and only return the `roomId`
     * const roomStaffWithRoomIdOnly = await prisma.roomStaff.updateManyAndReturn({
     *   select: { roomId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RoomStaffUpdateManyAndReturnArgs>(args: SelectSubset<T, RoomStaffUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomStaffPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RoomStaff.
     * @param {RoomStaffUpsertArgs} args - Arguments to update or create a RoomStaff.
     * @example
     * // Update or create a RoomStaff
     * const roomStaff = await prisma.roomStaff.upsert({
     *   create: {
     *     // ... data to create a RoomStaff
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RoomStaff we want to update
     *   }
     * })
     */
    upsert<T extends RoomStaffUpsertArgs>(args: SelectSubset<T, RoomStaffUpsertArgs<ExtArgs>>): Prisma__RoomStaffClient<$Result.GetResult<Prisma.$RoomStaffPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RoomStaffs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStaffCountArgs} args - Arguments to filter RoomStaffs to count.
     * @example
     * // Count the number of RoomStaffs
     * const count = await prisma.roomStaff.count({
     *   where: {
     *     // ... the filter for the RoomStaffs we want to count
     *   }
     * })
    **/
    count<T extends RoomStaffCountArgs>(
      args?: Subset<T, RoomStaffCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomStaffCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RoomStaff.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStaffAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoomStaffAggregateArgs>(args: Subset<T, RoomStaffAggregateArgs>): Prisma.PrismaPromise<GetRoomStaffAggregateType<T>>

    /**
     * Group by RoomStaff.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStaffGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoomStaffGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomStaffGroupByArgs['orderBy'] }
        : { orderBy?: RoomStaffGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoomStaffGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomStaffGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RoomStaff model
   */
  readonly fields: RoomStaffFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RoomStaff.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomStaffClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    room<T extends RoomDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoomDefaultArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    staff<T extends StaffDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StaffDefaultArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RoomStaff model
   */
  interface RoomStaffFieldRefs {
    readonly roomId: FieldRef<"RoomStaff", 'Int'>
    readonly staffId: FieldRef<"RoomStaff", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * RoomStaff findUnique
   */
  export type RoomStaffFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStaff
     */
    select?: RoomStaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStaff
     */
    omit?: RoomStaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStaffInclude<ExtArgs> | null
    /**
     * Filter, which RoomStaff to fetch.
     */
    where: RoomStaffWhereUniqueInput
  }

  /**
   * RoomStaff findUniqueOrThrow
   */
  export type RoomStaffFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStaff
     */
    select?: RoomStaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStaff
     */
    omit?: RoomStaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStaffInclude<ExtArgs> | null
    /**
     * Filter, which RoomStaff to fetch.
     */
    where: RoomStaffWhereUniqueInput
  }

  /**
   * RoomStaff findFirst
   */
  export type RoomStaffFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStaff
     */
    select?: RoomStaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStaff
     */
    omit?: RoomStaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStaffInclude<ExtArgs> | null
    /**
     * Filter, which RoomStaff to fetch.
     */
    where?: RoomStaffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomStaffs to fetch.
     */
    orderBy?: RoomStaffOrderByWithRelationInput | RoomStaffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomStaffs.
     */
    cursor?: RoomStaffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomStaffs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomStaffs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomStaffs.
     */
    distinct?: RoomStaffScalarFieldEnum | RoomStaffScalarFieldEnum[]
  }

  /**
   * RoomStaff findFirstOrThrow
   */
  export type RoomStaffFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStaff
     */
    select?: RoomStaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStaff
     */
    omit?: RoomStaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStaffInclude<ExtArgs> | null
    /**
     * Filter, which RoomStaff to fetch.
     */
    where?: RoomStaffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomStaffs to fetch.
     */
    orderBy?: RoomStaffOrderByWithRelationInput | RoomStaffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomStaffs.
     */
    cursor?: RoomStaffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomStaffs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomStaffs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomStaffs.
     */
    distinct?: RoomStaffScalarFieldEnum | RoomStaffScalarFieldEnum[]
  }

  /**
   * RoomStaff findMany
   */
  export type RoomStaffFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStaff
     */
    select?: RoomStaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStaff
     */
    omit?: RoomStaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStaffInclude<ExtArgs> | null
    /**
     * Filter, which RoomStaffs to fetch.
     */
    where?: RoomStaffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomStaffs to fetch.
     */
    orderBy?: RoomStaffOrderByWithRelationInput | RoomStaffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RoomStaffs.
     */
    cursor?: RoomStaffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomStaffs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomStaffs.
     */
    skip?: number
    distinct?: RoomStaffScalarFieldEnum | RoomStaffScalarFieldEnum[]
  }

  /**
   * RoomStaff create
   */
  export type RoomStaffCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStaff
     */
    select?: RoomStaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStaff
     */
    omit?: RoomStaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStaffInclude<ExtArgs> | null
    /**
     * The data needed to create a RoomStaff.
     */
    data: XOR<RoomStaffCreateInput, RoomStaffUncheckedCreateInput>
  }

  /**
   * RoomStaff createMany
   */
  export type RoomStaffCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoomStaffs.
     */
    data: RoomStaffCreateManyInput | RoomStaffCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoomStaff createManyAndReturn
   */
  export type RoomStaffCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStaff
     */
    select?: RoomStaffSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStaff
     */
    omit?: RoomStaffOmit<ExtArgs> | null
    /**
     * The data used to create many RoomStaffs.
     */
    data: RoomStaffCreateManyInput | RoomStaffCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStaffIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoomStaff update
   */
  export type RoomStaffUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStaff
     */
    select?: RoomStaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStaff
     */
    omit?: RoomStaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStaffInclude<ExtArgs> | null
    /**
     * The data needed to update a RoomStaff.
     */
    data: XOR<RoomStaffUpdateInput, RoomStaffUncheckedUpdateInput>
    /**
     * Choose, which RoomStaff to update.
     */
    where: RoomStaffWhereUniqueInput
  }

  /**
   * RoomStaff updateMany
   */
  export type RoomStaffUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RoomStaffs.
     */
    data: XOR<RoomStaffUpdateManyMutationInput, RoomStaffUncheckedUpdateManyInput>
    /**
     * Filter which RoomStaffs to update
     */
    where?: RoomStaffWhereInput
    /**
     * Limit how many RoomStaffs to update.
     */
    limit?: number
  }

  /**
   * RoomStaff updateManyAndReturn
   */
  export type RoomStaffUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStaff
     */
    select?: RoomStaffSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStaff
     */
    omit?: RoomStaffOmit<ExtArgs> | null
    /**
     * The data used to update RoomStaffs.
     */
    data: XOR<RoomStaffUpdateManyMutationInput, RoomStaffUncheckedUpdateManyInput>
    /**
     * Filter which RoomStaffs to update
     */
    where?: RoomStaffWhereInput
    /**
     * Limit how many RoomStaffs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStaffIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoomStaff upsert
   */
  export type RoomStaffUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStaff
     */
    select?: RoomStaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStaff
     */
    omit?: RoomStaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStaffInclude<ExtArgs> | null
    /**
     * The filter to search for the RoomStaff to update in case it exists.
     */
    where: RoomStaffWhereUniqueInput
    /**
     * In case the RoomStaff found by the `where` argument doesn't exist, create a new RoomStaff with this data.
     */
    create: XOR<RoomStaffCreateInput, RoomStaffUncheckedCreateInput>
    /**
     * In case the RoomStaff was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomStaffUpdateInput, RoomStaffUncheckedUpdateInput>
  }

  /**
   * RoomStaff delete
   */
  export type RoomStaffDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStaff
     */
    select?: RoomStaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStaff
     */
    omit?: RoomStaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStaffInclude<ExtArgs> | null
    /**
     * Filter which RoomStaff to delete.
     */
    where: RoomStaffWhereUniqueInput
  }

  /**
   * RoomStaff deleteMany
   */
  export type RoomStaffDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomStaffs to delete
     */
    where?: RoomStaffWhereInput
    /**
     * Limit how many RoomStaffs to delete.
     */
    limit?: number
  }

  /**
   * RoomStaff without action
   */
  export type RoomStaffDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStaff
     */
    select?: RoomStaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStaff
     */
    omit?: RoomStaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStaffInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    firstname: 'firstname',
    lastname: 'lastname',
    email: 'email',
    phone_number: 'phone_number',
    user_name: 'user_name',
    password: 'password',
    role: 'role'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const StaffScalarFieldEnum: {
    id: 'id',
    wages: 'wages',
    bank_company: 'bank_company',
    bank_account: 'bank_account',
    userId: 'userId'
  };

  export type StaffScalarFieldEnum = (typeof StaffScalarFieldEnum)[keyof typeof StaffScalarFieldEnum]


  export const CustomerScalarFieldEnum: {
    id: 'id',
    userId: 'userId'
  };

  export type CustomerScalarFieldEnum = (typeof CustomerScalarFieldEnum)[keyof typeof CustomerScalarFieldEnum]


  export const ChatLogScalarFieldEnum: {
    id: 'id',
    review: 'review',
    reply: 'reply',
    rating: 'rating',
    review_date: 'review_date',
    reply_date: 'reply_date',
    customerId: 'customerId',
    staffId: 'staffId',
    serviceId: 'serviceId'
  };

  export type ChatLogScalarFieldEnum = (typeof ChatLogScalarFieldEnum)[keyof typeof ChatLogScalarFieldEnum]


  export const PetScalarFieldEnum: {
    id: 'id',
    name: 'name',
    sex: 'sex',
    age: 'age',
    type: 'type',
    status: 'status',
    breed: 'breed',
    disease: 'disease',
    allergic: 'allergic',
    picture: 'picture',
    customerId: 'customerId'
  };

  export type PetScalarFieldEnum = (typeof PetScalarFieldEnum)[keyof typeof PetScalarFieldEnum]


  export const RoomScalarFieldEnum: {
    id: 'id',
    capacity: 'capacity',
    price: 'price',
    picture: 'picture',
    petType: 'petType'
  };

  export type RoomScalarFieldEnum = (typeof RoomScalarFieldEnum)[keyof typeof RoomScalarFieldEnum]


  export const BookedRoomScalarFieldEnum: {
    id: 'id',
    checkIn: 'checkIn',
    checkOut: 'checkOut',
    roomId: 'roomId',
    petId: 'petId',
    bookingId: 'bookingId'
  };

  export type BookedRoomScalarFieldEnum = (typeof BookedRoomScalarFieldEnum)[keyof typeof BookedRoomScalarFieldEnum]


  export const ServiceScalarFieldEnum: {
    id: 'id',
    name: 'name',
    price: 'price',
    petType: 'petType',
    picture: 'picture'
  };

  export type ServiceScalarFieldEnum = (typeof ServiceScalarFieldEnum)[keyof typeof ServiceScalarFieldEnum]


  export const BookedServiceScalarFieldEnum: {
    id: 'id',
    serviceId: 'serviceId',
    petId: 'petId',
    scheduled: 'scheduled',
    booking_id: 'booking_id'
  };

  export type BookedServiceScalarFieldEnum = (typeof BookedServiceScalarFieldEnum)[keyof typeof BookedServiceScalarFieldEnum]


  export const BookingScalarFieldEnum: {
    id: 'id',
    date: 'date',
    status: 'status',
    customerId: 'customerId',
    customerName: 'customerName',
    customerEmail: 'customerEmail',
    customerNumber: 'customerNumber'
  };

  export type BookingScalarFieldEnum = (typeof BookingScalarFieldEnum)[keyof typeof BookingScalarFieldEnum]


  export const PaymentScalarFieldEnum: {
    id: 'id',
    cost: 'cost',
    date: 'date',
    status: 'status',
    bookingId: 'bookingId',
    customerId: 'customerId',
    customerName: 'customerName',
    customerEmail: 'customerEmail',
    customerNumber: 'customerNumber'
  };

  export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum]


  export const CareScalarFieldEnum: {
    start_period: 'start_period',
    end_period: 'end_period',
    staff_id: 'staff_id',
    pet_id: 'pet_id'
  };

  export type CareScalarFieldEnum = (typeof CareScalarFieldEnum)[keyof typeof CareScalarFieldEnum]


  export const StaffOnServiceScalarFieldEnum: {
    staffId: 'staffId',
    serviceId: 'serviceId'
  };

  export type StaffOnServiceScalarFieldEnum = (typeof StaffOnServiceScalarFieldEnum)[keyof typeof StaffOnServiceScalarFieldEnum]


  export const RoomStaffScalarFieldEnum: {
    roomId: 'roomId',
    staffId: 'staffId'
  };

  export type RoomStaffScalarFieldEnum = (typeof RoomStaffScalarFieldEnum)[keyof typeof RoomStaffScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Bank'
   */
  export type EnumBankFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Bank'>
    


  /**
   * Reference to a field of type 'Bank[]'
   */
  export type ListEnumBankFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Bank[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Sex'
   */
  export type EnumSexFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Sex'>
    


  /**
   * Reference to a field of type 'Sex[]'
   */
  export type ListEnumSexFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Sex[]'>
    


  /**
   * Reference to a field of type 'PetType'
   */
  export type EnumPetTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PetType'>
    


  /**
   * Reference to a field of type 'PetType[]'
   */
  export type ListEnumPetTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PetType[]'>
    


  /**
   * Reference to a field of type 'PetStatus'
   */
  export type EnumPetStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PetStatus'>
    


  /**
   * Reference to a field of type 'PetStatus[]'
   */
  export type ListEnumPetStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PetStatus[]'>
    


  /**
   * Reference to a field of type 'BookingStatus'
   */
  export type EnumBookingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingStatus'>
    


  /**
   * Reference to a field of type 'BookingStatus[]'
   */
  export type ListEnumBookingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingStatus[]'>
    


  /**
   * Reference to a field of type 'PaymentStatus'
   */
  export type EnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus'>
    


  /**
   * Reference to a field of type 'PaymentStatus[]'
   */
  export type ListEnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    firstname?: StringFilter<"User"> | string
    lastname?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    phone_number?: StringFilter<"User"> | string
    user_name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    staff?: XOR<StaffNullableScalarRelationFilter, StaffWhereInput> | null
    customer?: XOR<CustomerNullableScalarRelationFilter, CustomerWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    email?: SortOrder
    phone_number?: SortOrder
    user_name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    staff?: StaffOrderByWithRelationInput
    customer?: CustomerOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    phone_number?: string
    user_name?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    firstname?: StringFilter<"User"> | string
    lastname?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    staff?: XOR<StaffNullableScalarRelationFilter, StaffWhereInput> | null
    customer?: XOR<CustomerNullableScalarRelationFilter, CustomerWhereInput> | null
  }, "id" | "email" | "phone_number" | "user_name">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    email?: SortOrder
    phone_number?: SortOrder
    user_name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    firstname?: StringWithAggregatesFilter<"User"> | string
    lastname?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    phone_number?: StringWithAggregatesFilter<"User"> | string
    user_name?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
  }

  export type StaffWhereInput = {
    AND?: StaffWhereInput | StaffWhereInput[]
    OR?: StaffWhereInput[]
    NOT?: StaffWhereInput | StaffWhereInput[]
    id?: IntFilter<"Staff"> | number
    wages?: FloatFilter<"Staff"> | number
    bank_company?: EnumBankFilter<"Staff"> | $Enums.Bank
    bank_account?: StringFilter<"Staff"> | string
    userId?: IntFilter<"Staff"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    replies?: ChatLogListRelationFilter
    cares?: CareListRelationFilter
    staffOnServices?: StaffOnServiceListRelationFilter
    roomStaff?: RoomStaffListRelationFilter
  }

  export type StaffOrderByWithRelationInput = {
    id?: SortOrder
    wages?: SortOrder
    bank_company?: SortOrder
    bank_account?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
    replies?: ChatLogOrderByRelationAggregateInput
    cares?: CareOrderByRelationAggregateInput
    staffOnServices?: StaffOnServiceOrderByRelationAggregateInput
    roomStaff?: RoomStaffOrderByRelationAggregateInput
  }

  export type StaffWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    bank_account?: string
    userId?: number
    AND?: StaffWhereInput | StaffWhereInput[]
    OR?: StaffWhereInput[]
    NOT?: StaffWhereInput | StaffWhereInput[]
    wages?: FloatFilter<"Staff"> | number
    bank_company?: EnumBankFilter<"Staff"> | $Enums.Bank
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    replies?: ChatLogListRelationFilter
    cares?: CareListRelationFilter
    staffOnServices?: StaffOnServiceListRelationFilter
    roomStaff?: RoomStaffListRelationFilter
  }, "id" | "bank_account" | "userId">

  export type StaffOrderByWithAggregationInput = {
    id?: SortOrder
    wages?: SortOrder
    bank_company?: SortOrder
    bank_account?: SortOrder
    userId?: SortOrder
    _count?: StaffCountOrderByAggregateInput
    _avg?: StaffAvgOrderByAggregateInput
    _max?: StaffMaxOrderByAggregateInput
    _min?: StaffMinOrderByAggregateInput
    _sum?: StaffSumOrderByAggregateInput
  }

  export type StaffScalarWhereWithAggregatesInput = {
    AND?: StaffScalarWhereWithAggregatesInput | StaffScalarWhereWithAggregatesInput[]
    OR?: StaffScalarWhereWithAggregatesInput[]
    NOT?: StaffScalarWhereWithAggregatesInput | StaffScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Staff"> | number
    wages?: FloatWithAggregatesFilter<"Staff"> | number
    bank_company?: EnumBankWithAggregatesFilter<"Staff"> | $Enums.Bank
    bank_account?: StringWithAggregatesFilter<"Staff"> | string
    userId?: IntWithAggregatesFilter<"Staff"> | number
  }

  export type CustomerWhereInput = {
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    id?: IntFilter<"Customer"> | number
    userId?: IntFilter<"Customer"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    chats?: ChatLogListRelationFilter
    pets?: PetListRelationFilter
    bookings?: BookingListRelationFilter
    payments?: PaymentListRelationFilter
  }

  export type CustomerOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
    chats?: ChatLogOrderByRelationAggregateInput
    pets?: PetOrderByRelationAggregateInput
    bookings?: BookingOrderByRelationAggregateInput
    payments?: PaymentOrderByRelationAggregateInput
  }

  export type CustomerWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId?: number
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    chats?: ChatLogListRelationFilter
    pets?: PetListRelationFilter
    bookings?: BookingListRelationFilter
    payments?: PaymentListRelationFilter
  }, "id" | "userId">

  export type CustomerOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    _count?: CustomerCountOrderByAggregateInput
    _avg?: CustomerAvgOrderByAggregateInput
    _max?: CustomerMaxOrderByAggregateInput
    _min?: CustomerMinOrderByAggregateInput
    _sum?: CustomerSumOrderByAggregateInput
  }

  export type CustomerScalarWhereWithAggregatesInput = {
    AND?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    OR?: CustomerScalarWhereWithAggregatesInput[]
    NOT?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Customer"> | number
    userId?: IntWithAggregatesFilter<"Customer"> | number
  }

  export type ChatLogWhereInput = {
    AND?: ChatLogWhereInput | ChatLogWhereInput[]
    OR?: ChatLogWhereInput[]
    NOT?: ChatLogWhereInput | ChatLogWhereInput[]
    id?: IntFilter<"ChatLog"> | number
    review?: StringNullableFilter<"ChatLog"> | string | null
    reply?: StringNullableFilter<"ChatLog"> | string | null
    rating?: FloatNullableFilter<"ChatLog"> | number | null
    review_date?: DateTimeFilter<"ChatLog"> | Date | string
    reply_date?: DateTimeNullableFilter<"ChatLog"> | Date | string | null
    customerId?: IntNullableFilter<"ChatLog"> | number | null
    staffId?: IntNullableFilter<"ChatLog"> | number | null
    serviceId?: IntFilter<"ChatLog"> | number
    customer?: XOR<CustomerNullableScalarRelationFilter, CustomerWhereInput> | null
    staff?: XOR<StaffNullableScalarRelationFilter, StaffWhereInput> | null
    service?: XOR<ServiceScalarRelationFilter, ServiceWhereInput>
  }

  export type ChatLogOrderByWithRelationInput = {
    id?: SortOrder
    review?: SortOrderInput | SortOrder
    reply?: SortOrderInput | SortOrder
    rating?: SortOrderInput | SortOrder
    review_date?: SortOrder
    reply_date?: SortOrderInput | SortOrder
    customerId?: SortOrderInput | SortOrder
    staffId?: SortOrderInput | SortOrder
    serviceId?: SortOrder
    customer?: CustomerOrderByWithRelationInput
    staff?: StaffOrderByWithRelationInput
    service?: ServiceOrderByWithRelationInput
  }

  export type ChatLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ChatLogWhereInput | ChatLogWhereInput[]
    OR?: ChatLogWhereInput[]
    NOT?: ChatLogWhereInput | ChatLogWhereInput[]
    review?: StringNullableFilter<"ChatLog"> | string | null
    reply?: StringNullableFilter<"ChatLog"> | string | null
    rating?: FloatNullableFilter<"ChatLog"> | number | null
    review_date?: DateTimeFilter<"ChatLog"> | Date | string
    reply_date?: DateTimeNullableFilter<"ChatLog"> | Date | string | null
    customerId?: IntNullableFilter<"ChatLog"> | number | null
    staffId?: IntNullableFilter<"ChatLog"> | number | null
    serviceId?: IntFilter<"ChatLog"> | number
    customer?: XOR<CustomerNullableScalarRelationFilter, CustomerWhereInput> | null
    staff?: XOR<StaffNullableScalarRelationFilter, StaffWhereInput> | null
    service?: XOR<ServiceScalarRelationFilter, ServiceWhereInput>
  }, "id">

  export type ChatLogOrderByWithAggregationInput = {
    id?: SortOrder
    review?: SortOrderInput | SortOrder
    reply?: SortOrderInput | SortOrder
    rating?: SortOrderInput | SortOrder
    review_date?: SortOrder
    reply_date?: SortOrderInput | SortOrder
    customerId?: SortOrderInput | SortOrder
    staffId?: SortOrderInput | SortOrder
    serviceId?: SortOrder
    _count?: ChatLogCountOrderByAggregateInput
    _avg?: ChatLogAvgOrderByAggregateInput
    _max?: ChatLogMaxOrderByAggregateInput
    _min?: ChatLogMinOrderByAggregateInput
    _sum?: ChatLogSumOrderByAggregateInput
  }

  export type ChatLogScalarWhereWithAggregatesInput = {
    AND?: ChatLogScalarWhereWithAggregatesInput | ChatLogScalarWhereWithAggregatesInput[]
    OR?: ChatLogScalarWhereWithAggregatesInput[]
    NOT?: ChatLogScalarWhereWithAggregatesInput | ChatLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ChatLog"> | number
    review?: StringNullableWithAggregatesFilter<"ChatLog"> | string | null
    reply?: StringNullableWithAggregatesFilter<"ChatLog"> | string | null
    rating?: FloatNullableWithAggregatesFilter<"ChatLog"> | number | null
    review_date?: DateTimeWithAggregatesFilter<"ChatLog"> | Date | string
    reply_date?: DateTimeNullableWithAggregatesFilter<"ChatLog"> | Date | string | null
    customerId?: IntNullableWithAggregatesFilter<"ChatLog"> | number | null
    staffId?: IntNullableWithAggregatesFilter<"ChatLog"> | number | null
    serviceId?: IntWithAggregatesFilter<"ChatLog"> | number
  }

  export type PetWhereInput = {
    AND?: PetWhereInput | PetWhereInput[]
    OR?: PetWhereInput[]
    NOT?: PetWhereInput | PetWhereInput[]
    id?: IntFilter<"Pet"> | number
    name?: StringFilter<"Pet"> | string
    sex?: EnumSexFilter<"Pet"> | $Enums.Sex
    age?: IntFilter<"Pet"> | number
    type?: EnumPetTypeFilter<"Pet"> | $Enums.PetType
    status?: EnumPetStatusFilter<"Pet"> | $Enums.PetStatus
    breed?: StringFilter<"Pet"> | string
    disease?: StringNullableListFilter<"Pet">
    allergic?: StringNullableListFilter<"Pet">
    picture?: StringFilter<"Pet"> | string
    customerId?: IntFilter<"Pet"> | number
    scheduled?: BookedServiceListRelationFilter
    stayed?: BookedRoomListRelationFilter
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    cares?: CareListRelationFilter
  }

  export type PetOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    sex?: SortOrder
    age?: SortOrder
    type?: SortOrder
    status?: SortOrder
    breed?: SortOrder
    disease?: SortOrder
    allergic?: SortOrder
    picture?: SortOrder
    customerId?: SortOrder
    scheduled?: BookedServiceOrderByRelationAggregateInput
    stayed?: BookedRoomOrderByRelationAggregateInput
    customer?: CustomerOrderByWithRelationInput
    cares?: CareOrderByRelationAggregateInput
  }

  export type PetWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PetWhereInput | PetWhereInput[]
    OR?: PetWhereInput[]
    NOT?: PetWhereInput | PetWhereInput[]
    name?: StringFilter<"Pet"> | string
    sex?: EnumSexFilter<"Pet"> | $Enums.Sex
    age?: IntFilter<"Pet"> | number
    type?: EnumPetTypeFilter<"Pet"> | $Enums.PetType
    status?: EnumPetStatusFilter<"Pet"> | $Enums.PetStatus
    breed?: StringFilter<"Pet"> | string
    disease?: StringNullableListFilter<"Pet">
    allergic?: StringNullableListFilter<"Pet">
    picture?: StringFilter<"Pet"> | string
    customerId?: IntFilter<"Pet"> | number
    scheduled?: BookedServiceListRelationFilter
    stayed?: BookedRoomListRelationFilter
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    cares?: CareListRelationFilter
  }, "id">

  export type PetOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    sex?: SortOrder
    age?: SortOrder
    type?: SortOrder
    status?: SortOrder
    breed?: SortOrder
    disease?: SortOrder
    allergic?: SortOrder
    picture?: SortOrder
    customerId?: SortOrder
    _count?: PetCountOrderByAggregateInput
    _avg?: PetAvgOrderByAggregateInput
    _max?: PetMaxOrderByAggregateInput
    _min?: PetMinOrderByAggregateInput
    _sum?: PetSumOrderByAggregateInput
  }

  export type PetScalarWhereWithAggregatesInput = {
    AND?: PetScalarWhereWithAggregatesInput | PetScalarWhereWithAggregatesInput[]
    OR?: PetScalarWhereWithAggregatesInput[]
    NOT?: PetScalarWhereWithAggregatesInput | PetScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Pet"> | number
    name?: StringWithAggregatesFilter<"Pet"> | string
    sex?: EnumSexWithAggregatesFilter<"Pet"> | $Enums.Sex
    age?: IntWithAggregatesFilter<"Pet"> | number
    type?: EnumPetTypeWithAggregatesFilter<"Pet"> | $Enums.PetType
    status?: EnumPetStatusWithAggregatesFilter<"Pet"> | $Enums.PetStatus
    breed?: StringWithAggregatesFilter<"Pet"> | string
    disease?: StringNullableListFilter<"Pet">
    allergic?: StringNullableListFilter<"Pet">
    picture?: StringWithAggregatesFilter<"Pet"> | string
    customerId?: IntWithAggregatesFilter<"Pet"> | number
  }

  export type RoomWhereInput = {
    AND?: RoomWhereInput | RoomWhereInput[]
    OR?: RoomWhereInput[]
    NOT?: RoomWhereInput | RoomWhereInput[]
    id?: IntFilter<"Room"> | number
    capacity?: IntFilter<"Room"> | number
    price?: FloatFilter<"Room"> | number
    picture?: StringNullableListFilter<"Room">
    petType?: EnumPetTypeFilter<"Room"> | $Enums.PetType
    bookings?: BookedRoomListRelationFilter
    staffOnRooms?: RoomStaffListRelationFilter
  }

  export type RoomOrderByWithRelationInput = {
    id?: SortOrder
    capacity?: SortOrder
    price?: SortOrder
    picture?: SortOrder
    petType?: SortOrder
    bookings?: BookedRoomOrderByRelationAggregateInput
    staffOnRooms?: RoomStaffOrderByRelationAggregateInput
  }

  export type RoomWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: RoomWhereInput | RoomWhereInput[]
    OR?: RoomWhereInput[]
    NOT?: RoomWhereInput | RoomWhereInput[]
    capacity?: IntFilter<"Room"> | number
    price?: FloatFilter<"Room"> | number
    picture?: StringNullableListFilter<"Room">
    petType?: EnumPetTypeFilter<"Room"> | $Enums.PetType
    bookings?: BookedRoomListRelationFilter
    staffOnRooms?: RoomStaffListRelationFilter
  }, "id">

  export type RoomOrderByWithAggregationInput = {
    id?: SortOrder
    capacity?: SortOrder
    price?: SortOrder
    picture?: SortOrder
    petType?: SortOrder
    _count?: RoomCountOrderByAggregateInput
    _avg?: RoomAvgOrderByAggregateInput
    _max?: RoomMaxOrderByAggregateInput
    _min?: RoomMinOrderByAggregateInput
    _sum?: RoomSumOrderByAggregateInput
  }

  export type RoomScalarWhereWithAggregatesInput = {
    AND?: RoomScalarWhereWithAggregatesInput | RoomScalarWhereWithAggregatesInput[]
    OR?: RoomScalarWhereWithAggregatesInput[]
    NOT?: RoomScalarWhereWithAggregatesInput | RoomScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Room"> | number
    capacity?: IntWithAggregatesFilter<"Room"> | number
    price?: FloatWithAggregatesFilter<"Room"> | number
    picture?: StringNullableListFilter<"Room">
    petType?: EnumPetTypeWithAggregatesFilter<"Room"> | $Enums.PetType
  }

  export type BookedRoomWhereInput = {
    AND?: BookedRoomWhereInput | BookedRoomWhereInput[]
    OR?: BookedRoomWhereInput[]
    NOT?: BookedRoomWhereInput | BookedRoomWhereInput[]
    id?: IntFilter<"BookedRoom"> | number
    checkIn?: DateTimeFilter<"BookedRoom"> | Date | string
    checkOut?: DateTimeFilter<"BookedRoom"> | Date | string
    roomId?: IntFilter<"BookedRoom"> | number
    petId?: IntNullableFilter<"BookedRoom"> | number | null
    bookingId?: IntFilter<"BookedRoom"> | number
    room?: XOR<RoomScalarRelationFilter, RoomWhereInput>
    pet?: XOR<PetNullableScalarRelationFilter, PetWhereInput> | null
    booking?: XOR<BookingScalarRelationFilter, BookingWhereInput>
  }

  export type BookedRoomOrderByWithRelationInput = {
    id?: SortOrder
    checkIn?: SortOrder
    checkOut?: SortOrder
    roomId?: SortOrder
    petId?: SortOrderInput | SortOrder
    bookingId?: SortOrder
    room?: RoomOrderByWithRelationInput
    pet?: PetOrderByWithRelationInput
    booking?: BookingOrderByWithRelationInput
  }

  export type BookedRoomWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: BookedRoomWhereInput | BookedRoomWhereInput[]
    OR?: BookedRoomWhereInput[]
    NOT?: BookedRoomWhereInput | BookedRoomWhereInput[]
    checkIn?: DateTimeFilter<"BookedRoom"> | Date | string
    checkOut?: DateTimeFilter<"BookedRoom"> | Date | string
    roomId?: IntFilter<"BookedRoom"> | number
    petId?: IntNullableFilter<"BookedRoom"> | number | null
    bookingId?: IntFilter<"BookedRoom"> | number
    room?: XOR<RoomScalarRelationFilter, RoomWhereInput>
    pet?: XOR<PetNullableScalarRelationFilter, PetWhereInput> | null
    booking?: XOR<BookingScalarRelationFilter, BookingWhereInput>
  }, "id">

  export type BookedRoomOrderByWithAggregationInput = {
    id?: SortOrder
    checkIn?: SortOrder
    checkOut?: SortOrder
    roomId?: SortOrder
    petId?: SortOrderInput | SortOrder
    bookingId?: SortOrder
    _count?: BookedRoomCountOrderByAggregateInput
    _avg?: BookedRoomAvgOrderByAggregateInput
    _max?: BookedRoomMaxOrderByAggregateInput
    _min?: BookedRoomMinOrderByAggregateInput
    _sum?: BookedRoomSumOrderByAggregateInput
  }

  export type BookedRoomScalarWhereWithAggregatesInput = {
    AND?: BookedRoomScalarWhereWithAggregatesInput | BookedRoomScalarWhereWithAggregatesInput[]
    OR?: BookedRoomScalarWhereWithAggregatesInput[]
    NOT?: BookedRoomScalarWhereWithAggregatesInput | BookedRoomScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"BookedRoom"> | number
    checkIn?: DateTimeWithAggregatesFilter<"BookedRoom"> | Date | string
    checkOut?: DateTimeWithAggregatesFilter<"BookedRoom"> | Date | string
    roomId?: IntWithAggregatesFilter<"BookedRoom"> | number
    petId?: IntNullableWithAggregatesFilter<"BookedRoom"> | number | null
    bookingId?: IntWithAggregatesFilter<"BookedRoom"> | number
  }

  export type ServiceWhereInput = {
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    id?: IntFilter<"Service"> | number
    name?: StringFilter<"Service"> | string
    price?: FloatFilter<"Service"> | number
    petType?: EnumPetTypeNullableListFilter<"Service">
    picture?: StringFilter<"Service"> | string
    reviews?: ChatLogListRelationFilter
    staffOnServices?: StaffOnServiceListRelationFilter
    bookedServices?: BookedServiceListRelationFilter
  }

  export type ServiceOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    petType?: SortOrder
    picture?: SortOrder
    reviews?: ChatLogOrderByRelationAggregateInput
    staffOnServices?: StaffOnServiceOrderByRelationAggregateInput
    bookedServices?: BookedServiceOrderByRelationAggregateInput
  }

  export type ServiceWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    name?: StringFilter<"Service"> | string
    price?: FloatFilter<"Service"> | number
    petType?: EnumPetTypeNullableListFilter<"Service">
    picture?: StringFilter<"Service"> | string
    reviews?: ChatLogListRelationFilter
    staffOnServices?: StaffOnServiceListRelationFilter
    bookedServices?: BookedServiceListRelationFilter
  }, "id">

  export type ServiceOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    petType?: SortOrder
    picture?: SortOrder
    _count?: ServiceCountOrderByAggregateInput
    _avg?: ServiceAvgOrderByAggregateInput
    _max?: ServiceMaxOrderByAggregateInput
    _min?: ServiceMinOrderByAggregateInput
    _sum?: ServiceSumOrderByAggregateInput
  }

  export type ServiceScalarWhereWithAggregatesInput = {
    AND?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    OR?: ServiceScalarWhereWithAggregatesInput[]
    NOT?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Service"> | number
    name?: StringWithAggregatesFilter<"Service"> | string
    price?: FloatWithAggregatesFilter<"Service"> | number
    petType?: EnumPetTypeNullableListFilter<"Service">
    picture?: StringWithAggregatesFilter<"Service"> | string
  }

  export type BookedServiceWhereInput = {
    AND?: BookedServiceWhereInput | BookedServiceWhereInput[]
    OR?: BookedServiceWhereInput[]
    NOT?: BookedServiceWhereInput | BookedServiceWhereInput[]
    id?: IntFilter<"BookedService"> | number
    serviceId?: IntFilter<"BookedService"> | number
    petId?: IntNullableFilter<"BookedService"> | number | null
    scheduled?: DateTimeFilter<"BookedService"> | Date | string
    booking_id?: IntFilter<"BookedService"> | number
    service?: XOR<ServiceScalarRelationFilter, ServiceWhereInput>
    pet?: XOR<PetNullableScalarRelationFilter, PetWhereInput> | null
    booking?: XOR<BookingScalarRelationFilter, BookingWhereInput>
  }

  export type BookedServiceOrderByWithRelationInput = {
    id?: SortOrder
    serviceId?: SortOrder
    petId?: SortOrderInput | SortOrder
    scheduled?: SortOrder
    booking_id?: SortOrder
    service?: ServiceOrderByWithRelationInput
    pet?: PetOrderByWithRelationInput
    booking?: BookingOrderByWithRelationInput
  }

  export type BookedServiceWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: BookedServiceWhereInput | BookedServiceWhereInput[]
    OR?: BookedServiceWhereInput[]
    NOT?: BookedServiceWhereInput | BookedServiceWhereInput[]
    serviceId?: IntFilter<"BookedService"> | number
    petId?: IntNullableFilter<"BookedService"> | number | null
    scheduled?: DateTimeFilter<"BookedService"> | Date | string
    booking_id?: IntFilter<"BookedService"> | number
    service?: XOR<ServiceScalarRelationFilter, ServiceWhereInput>
    pet?: XOR<PetNullableScalarRelationFilter, PetWhereInput> | null
    booking?: XOR<BookingScalarRelationFilter, BookingWhereInput>
  }, "id">

  export type BookedServiceOrderByWithAggregationInput = {
    id?: SortOrder
    serviceId?: SortOrder
    petId?: SortOrderInput | SortOrder
    scheduled?: SortOrder
    booking_id?: SortOrder
    _count?: BookedServiceCountOrderByAggregateInput
    _avg?: BookedServiceAvgOrderByAggregateInput
    _max?: BookedServiceMaxOrderByAggregateInput
    _min?: BookedServiceMinOrderByAggregateInput
    _sum?: BookedServiceSumOrderByAggregateInput
  }

  export type BookedServiceScalarWhereWithAggregatesInput = {
    AND?: BookedServiceScalarWhereWithAggregatesInput | BookedServiceScalarWhereWithAggregatesInput[]
    OR?: BookedServiceScalarWhereWithAggregatesInput[]
    NOT?: BookedServiceScalarWhereWithAggregatesInput | BookedServiceScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"BookedService"> | number
    serviceId?: IntWithAggregatesFilter<"BookedService"> | number
    petId?: IntNullableWithAggregatesFilter<"BookedService"> | number | null
    scheduled?: DateTimeWithAggregatesFilter<"BookedService"> | Date | string
    booking_id?: IntWithAggregatesFilter<"BookedService"> | number
  }

  export type BookingWhereInput = {
    AND?: BookingWhereInput | BookingWhereInput[]
    OR?: BookingWhereInput[]
    NOT?: BookingWhereInput | BookingWhereInput[]
    id?: IntFilter<"Booking"> | number
    date?: DateTimeFilter<"Booking"> | Date | string
    status?: EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus
    customerId?: IntNullableFilter<"Booking"> | number | null
    customerName?: StringFilter<"Booking"> | string
    customerEmail?: StringFilter<"Booking"> | string
    customerNumber?: StringFilter<"Booking"> | string
    booked_service?: BookedServiceListRelationFilter
    booked_room?: BookedRoomListRelationFilter
    customer?: XOR<CustomerNullableScalarRelationFilter, CustomerWhereInput> | null
    payment?: XOR<PaymentNullableScalarRelationFilter, PaymentWhereInput> | null
  }

  export type BookingOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    status?: SortOrder
    customerId?: SortOrderInput | SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    customerNumber?: SortOrder
    booked_service?: BookedServiceOrderByRelationAggregateInput
    booked_room?: BookedRoomOrderByRelationAggregateInput
    customer?: CustomerOrderByWithRelationInput
    payment?: PaymentOrderByWithRelationInput
  }

  export type BookingWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: BookingWhereInput | BookingWhereInput[]
    OR?: BookingWhereInput[]
    NOT?: BookingWhereInput | BookingWhereInput[]
    date?: DateTimeFilter<"Booking"> | Date | string
    status?: EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus
    customerId?: IntNullableFilter<"Booking"> | number | null
    customerName?: StringFilter<"Booking"> | string
    customerEmail?: StringFilter<"Booking"> | string
    customerNumber?: StringFilter<"Booking"> | string
    booked_service?: BookedServiceListRelationFilter
    booked_room?: BookedRoomListRelationFilter
    customer?: XOR<CustomerNullableScalarRelationFilter, CustomerWhereInput> | null
    payment?: XOR<PaymentNullableScalarRelationFilter, PaymentWhereInput> | null
  }, "id">

  export type BookingOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    status?: SortOrder
    customerId?: SortOrderInput | SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    customerNumber?: SortOrder
    _count?: BookingCountOrderByAggregateInput
    _avg?: BookingAvgOrderByAggregateInput
    _max?: BookingMaxOrderByAggregateInput
    _min?: BookingMinOrderByAggregateInput
    _sum?: BookingSumOrderByAggregateInput
  }

  export type BookingScalarWhereWithAggregatesInput = {
    AND?: BookingScalarWhereWithAggregatesInput | BookingScalarWhereWithAggregatesInput[]
    OR?: BookingScalarWhereWithAggregatesInput[]
    NOT?: BookingScalarWhereWithAggregatesInput | BookingScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Booking"> | number
    date?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
    status?: EnumBookingStatusWithAggregatesFilter<"Booking"> | $Enums.BookingStatus
    customerId?: IntNullableWithAggregatesFilter<"Booking"> | number | null
    customerName?: StringWithAggregatesFilter<"Booking"> | string
    customerEmail?: StringWithAggregatesFilter<"Booking"> | string
    customerNumber?: StringWithAggregatesFilter<"Booking"> | string
  }

  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    id?: IntFilter<"Payment"> | number
    cost?: FloatFilter<"Payment"> | number
    date?: DateTimeFilter<"Payment"> | Date | string
    status?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    bookingId?: IntNullableFilter<"Payment"> | number | null
    customerId?: IntNullableFilter<"Payment"> | number | null
    customerName?: StringFilter<"Payment"> | string
    customerEmail?: StringFilter<"Payment"> | string
    customerNumber?: StringFilter<"Payment"> | string
    booking?: XOR<BookingNullableScalarRelationFilter, BookingWhereInput> | null
    customer?: XOR<CustomerNullableScalarRelationFilter, CustomerWhereInput> | null
  }

  export type PaymentOrderByWithRelationInput = {
    id?: SortOrder
    cost?: SortOrder
    date?: SortOrder
    status?: SortOrder
    bookingId?: SortOrderInput | SortOrder
    customerId?: SortOrderInput | SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    customerNumber?: SortOrder
    booking?: BookingOrderByWithRelationInput
    customer?: CustomerOrderByWithRelationInput
  }

  export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    bookingId?: number
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    cost?: FloatFilter<"Payment"> | number
    date?: DateTimeFilter<"Payment"> | Date | string
    status?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    customerId?: IntNullableFilter<"Payment"> | number | null
    customerName?: StringFilter<"Payment"> | string
    customerEmail?: StringFilter<"Payment"> | string
    customerNumber?: StringFilter<"Payment"> | string
    booking?: XOR<BookingNullableScalarRelationFilter, BookingWhereInput> | null
    customer?: XOR<CustomerNullableScalarRelationFilter, CustomerWhereInput> | null
  }, "id" | "bookingId">

  export type PaymentOrderByWithAggregationInput = {
    id?: SortOrder
    cost?: SortOrder
    date?: SortOrder
    status?: SortOrder
    bookingId?: SortOrderInput | SortOrder
    customerId?: SortOrderInput | SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    customerNumber?: SortOrder
    _count?: PaymentCountOrderByAggregateInput
    _avg?: PaymentAvgOrderByAggregateInput
    _max?: PaymentMaxOrderByAggregateInput
    _min?: PaymentMinOrderByAggregateInput
    _sum?: PaymentSumOrderByAggregateInput
  }

  export type PaymentScalarWhereWithAggregatesInput = {
    AND?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    OR?: PaymentScalarWhereWithAggregatesInput[]
    NOT?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Payment"> | number
    cost?: FloatWithAggregatesFilter<"Payment"> | number
    date?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    status?: EnumPaymentStatusWithAggregatesFilter<"Payment"> | $Enums.PaymentStatus
    bookingId?: IntNullableWithAggregatesFilter<"Payment"> | number | null
    customerId?: IntNullableWithAggregatesFilter<"Payment"> | number | null
    customerName?: StringWithAggregatesFilter<"Payment"> | string
    customerEmail?: StringWithAggregatesFilter<"Payment"> | string
    customerNumber?: StringWithAggregatesFilter<"Payment"> | string
  }

  export type CareWhereInput = {
    AND?: CareWhereInput | CareWhereInput[]
    OR?: CareWhereInput[]
    NOT?: CareWhereInput | CareWhereInput[]
    start_period?: DateTimeFilter<"Care"> | Date | string
    end_period?: DateTimeFilter<"Care"> | Date | string
    staff_id?: IntFilter<"Care"> | number
    pet_id?: IntFilter<"Care"> | number
    staff?: XOR<StaffScalarRelationFilter, StaffWhereInput>
    pet?: XOR<PetScalarRelationFilter, PetWhereInput>
  }

  export type CareOrderByWithRelationInput = {
    start_period?: SortOrder
    end_period?: SortOrder
    staff_id?: SortOrder
    pet_id?: SortOrder
    staff?: StaffOrderByWithRelationInput
    pet?: PetOrderByWithRelationInput
  }

  export type CareWhereUniqueInput = Prisma.AtLeast<{
    staff_id_pet_id?: CareStaff_idPet_idCompoundUniqueInput
    AND?: CareWhereInput | CareWhereInput[]
    OR?: CareWhereInput[]
    NOT?: CareWhereInput | CareWhereInput[]
    start_period?: DateTimeFilter<"Care"> | Date | string
    end_period?: DateTimeFilter<"Care"> | Date | string
    staff_id?: IntFilter<"Care"> | number
    pet_id?: IntFilter<"Care"> | number
    staff?: XOR<StaffScalarRelationFilter, StaffWhereInput>
    pet?: XOR<PetScalarRelationFilter, PetWhereInput>
  }, "staff_id_pet_id">

  export type CareOrderByWithAggregationInput = {
    start_period?: SortOrder
    end_period?: SortOrder
    staff_id?: SortOrder
    pet_id?: SortOrder
    _count?: CareCountOrderByAggregateInput
    _avg?: CareAvgOrderByAggregateInput
    _max?: CareMaxOrderByAggregateInput
    _min?: CareMinOrderByAggregateInput
    _sum?: CareSumOrderByAggregateInput
  }

  export type CareScalarWhereWithAggregatesInput = {
    AND?: CareScalarWhereWithAggregatesInput | CareScalarWhereWithAggregatesInput[]
    OR?: CareScalarWhereWithAggregatesInput[]
    NOT?: CareScalarWhereWithAggregatesInput | CareScalarWhereWithAggregatesInput[]
    start_period?: DateTimeWithAggregatesFilter<"Care"> | Date | string
    end_period?: DateTimeWithAggregatesFilter<"Care"> | Date | string
    staff_id?: IntWithAggregatesFilter<"Care"> | number
    pet_id?: IntWithAggregatesFilter<"Care"> | number
  }

  export type StaffOnServiceWhereInput = {
    AND?: StaffOnServiceWhereInput | StaffOnServiceWhereInput[]
    OR?: StaffOnServiceWhereInput[]
    NOT?: StaffOnServiceWhereInput | StaffOnServiceWhereInput[]
    staffId?: IntFilter<"StaffOnService"> | number
    serviceId?: IntFilter<"StaffOnService"> | number
    staff?: XOR<StaffScalarRelationFilter, StaffWhereInput>
    service?: XOR<ServiceScalarRelationFilter, ServiceWhereInput>
  }

  export type StaffOnServiceOrderByWithRelationInput = {
    staffId?: SortOrder
    serviceId?: SortOrder
    staff?: StaffOrderByWithRelationInput
    service?: ServiceOrderByWithRelationInput
  }

  export type StaffOnServiceWhereUniqueInput = Prisma.AtLeast<{
    staffId_serviceId?: StaffOnServiceStaffIdServiceIdCompoundUniqueInput
    AND?: StaffOnServiceWhereInput | StaffOnServiceWhereInput[]
    OR?: StaffOnServiceWhereInput[]
    NOT?: StaffOnServiceWhereInput | StaffOnServiceWhereInput[]
    staffId?: IntFilter<"StaffOnService"> | number
    serviceId?: IntFilter<"StaffOnService"> | number
    staff?: XOR<StaffScalarRelationFilter, StaffWhereInput>
    service?: XOR<ServiceScalarRelationFilter, ServiceWhereInput>
  }, "staffId_serviceId">

  export type StaffOnServiceOrderByWithAggregationInput = {
    staffId?: SortOrder
    serviceId?: SortOrder
    _count?: StaffOnServiceCountOrderByAggregateInput
    _avg?: StaffOnServiceAvgOrderByAggregateInput
    _max?: StaffOnServiceMaxOrderByAggregateInput
    _min?: StaffOnServiceMinOrderByAggregateInput
    _sum?: StaffOnServiceSumOrderByAggregateInput
  }

  export type StaffOnServiceScalarWhereWithAggregatesInput = {
    AND?: StaffOnServiceScalarWhereWithAggregatesInput | StaffOnServiceScalarWhereWithAggregatesInput[]
    OR?: StaffOnServiceScalarWhereWithAggregatesInput[]
    NOT?: StaffOnServiceScalarWhereWithAggregatesInput | StaffOnServiceScalarWhereWithAggregatesInput[]
    staffId?: IntWithAggregatesFilter<"StaffOnService"> | number
    serviceId?: IntWithAggregatesFilter<"StaffOnService"> | number
  }

  export type RoomStaffWhereInput = {
    AND?: RoomStaffWhereInput | RoomStaffWhereInput[]
    OR?: RoomStaffWhereInput[]
    NOT?: RoomStaffWhereInput | RoomStaffWhereInput[]
    roomId?: IntFilter<"RoomStaff"> | number
    staffId?: IntFilter<"RoomStaff"> | number
    room?: XOR<RoomScalarRelationFilter, RoomWhereInput>
    staff?: XOR<StaffScalarRelationFilter, StaffWhereInput>
  }

  export type RoomStaffOrderByWithRelationInput = {
    roomId?: SortOrder
    staffId?: SortOrder
    room?: RoomOrderByWithRelationInput
    staff?: StaffOrderByWithRelationInput
  }

  export type RoomStaffWhereUniqueInput = Prisma.AtLeast<{
    roomId_staffId?: RoomStaffRoomIdStaffIdCompoundUniqueInput
    AND?: RoomStaffWhereInput | RoomStaffWhereInput[]
    OR?: RoomStaffWhereInput[]
    NOT?: RoomStaffWhereInput | RoomStaffWhereInput[]
    roomId?: IntFilter<"RoomStaff"> | number
    staffId?: IntFilter<"RoomStaff"> | number
    room?: XOR<RoomScalarRelationFilter, RoomWhereInput>
    staff?: XOR<StaffScalarRelationFilter, StaffWhereInput>
  }, "roomId_staffId">

  export type RoomStaffOrderByWithAggregationInput = {
    roomId?: SortOrder
    staffId?: SortOrder
    _count?: RoomStaffCountOrderByAggregateInput
    _avg?: RoomStaffAvgOrderByAggregateInput
    _max?: RoomStaffMaxOrderByAggregateInput
    _min?: RoomStaffMinOrderByAggregateInput
    _sum?: RoomStaffSumOrderByAggregateInput
  }

  export type RoomStaffScalarWhereWithAggregatesInput = {
    AND?: RoomStaffScalarWhereWithAggregatesInput | RoomStaffScalarWhereWithAggregatesInput[]
    OR?: RoomStaffScalarWhereWithAggregatesInput[]
    NOT?: RoomStaffScalarWhereWithAggregatesInput | RoomStaffScalarWhereWithAggregatesInput[]
    roomId?: IntWithAggregatesFilter<"RoomStaff"> | number
    staffId?: IntWithAggregatesFilter<"RoomStaff"> | number
  }

  export type UserCreateInput = {
    firstname: string
    lastname: string
    email: string
    phone_number: string
    user_name: string
    password: string
    role?: $Enums.Role
    staff?: StaffCreateNestedOneWithoutUserInput
    customer?: CustomerCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    firstname: string
    lastname: string
    email: string
    phone_number: string
    user_name: string
    password: string
    role?: $Enums.Role
    staff?: StaffUncheckedCreateNestedOneWithoutUserInput
    customer?: CustomerUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone_number?: StringFieldUpdateOperationsInput | string
    user_name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    staff?: StaffUpdateOneWithoutUserNestedInput
    customer?: CustomerUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone_number?: StringFieldUpdateOperationsInput | string
    user_name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    staff?: StaffUncheckedUpdateOneWithoutUserNestedInput
    customer?: CustomerUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    firstname: string
    lastname: string
    email: string
    phone_number: string
    user_name: string
    password: string
    role?: $Enums.Role
  }

  export type UserUpdateManyMutationInput = {
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone_number?: StringFieldUpdateOperationsInput | string
    user_name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone_number?: StringFieldUpdateOperationsInput | string
    user_name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
  }

  export type StaffCreateInput = {
    wages: number
    bank_company?: $Enums.Bank
    bank_account: string
    user: UserCreateNestedOneWithoutStaffInput
    replies?: ChatLogCreateNestedManyWithoutStaffInput
    cares?: CareCreateNestedManyWithoutStaffInput
    staffOnServices?: StaffOnServiceCreateNestedManyWithoutStaffInput
    roomStaff?: RoomStaffCreateNestedManyWithoutStaffInput
  }

  export type StaffUncheckedCreateInput = {
    id?: number
    wages: number
    bank_company?: $Enums.Bank
    bank_account: string
    userId: number
    replies?: ChatLogUncheckedCreateNestedManyWithoutStaffInput
    cares?: CareUncheckedCreateNestedManyWithoutStaffInput
    staffOnServices?: StaffOnServiceUncheckedCreateNestedManyWithoutStaffInput
    roomStaff?: RoomStaffUncheckedCreateNestedManyWithoutStaffInput
  }

  export type StaffUpdateInput = {
    wages?: FloatFieldUpdateOperationsInput | number
    bank_company?: EnumBankFieldUpdateOperationsInput | $Enums.Bank
    bank_account?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutStaffNestedInput
    replies?: ChatLogUpdateManyWithoutStaffNestedInput
    cares?: CareUpdateManyWithoutStaffNestedInput
    staffOnServices?: StaffOnServiceUpdateManyWithoutStaffNestedInput
    roomStaff?: RoomStaffUpdateManyWithoutStaffNestedInput
  }

  export type StaffUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    wages?: FloatFieldUpdateOperationsInput | number
    bank_company?: EnumBankFieldUpdateOperationsInput | $Enums.Bank
    bank_account?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    replies?: ChatLogUncheckedUpdateManyWithoutStaffNestedInput
    cares?: CareUncheckedUpdateManyWithoutStaffNestedInput
    staffOnServices?: StaffOnServiceUncheckedUpdateManyWithoutStaffNestedInput
    roomStaff?: RoomStaffUncheckedUpdateManyWithoutStaffNestedInput
  }

  export type StaffCreateManyInput = {
    id?: number
    wages: number
    bank_company?: $Enums.Bank
    bank_account: string
    userId: number
  }

  export type StaffUpdateManyMutationInput = {
    wages?: FloatFieldUpdateOperationsInput | number
    bank_company?: EnumBankFieldUpdateOperationsInput | $Enums.Bank
    bank_account?: StringFieldUpdateOperationsInput | string
  }

  export type StaffUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    wages?: FloatFieldUpdateOperationsInput | number
    bank_company?: EnumBankFieldUpdateOperationsInput | $Enums.Bank
    bank_account?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type CustomerCreateInput = {
    user: UserCreateNestedOneWithoutCustomerInput
    chats?: ChatLogCreateNestedManyWithoutCustomerInput
    pets?: PetCreateNestedManyWithoutCustomerInput
    bookings?: BookingCreateNestedManyWithoutCustomerInput
    payments?: PaymentCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateInput = {
    id?: number
    userId: number
    chats?: ChatLogUncheckedCreateNestedManyWithoutCustomerInput
    pets?: PetUncheckedCreateNestedManyWithoutCustomerInput
    bookings?: BookingUncheckedCreateNestedManyWithoutCustomerInput
    payments?: PaymentUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUpdateInput = {
    user?: UserUpdateOneRequiredWithoutCustomerNestedInput
    chats?: ChatLogUpdateManyWithoutCustomerNestedInput
    pets?: PetUpdateManyWithoutCustomerNestedInput
    bookings?: BookingUpdateManyWithoutCustomerNestedInput
    payments?: PaymentUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    chats?: ChatLogUncheckedUpdateManyWithoutCustomerNestedInput
    pets?: PetUncheckedUpdateManyWithoutCustomerNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutCustomerNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerCreateManyInput = {
    id?: number
    userId: number
  }

  export type CustomerUpdateManyMutationInput = {

  }

  export type CustomerUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type ChatLogCreateInput = {
    review?: string | null
    reply?: string | null
    rating?: number | null
    review_date?: Date | string
    reply_date?: Date | string | null
    customer?: CustomerCreateNestedOneWithoutChatsInput
    staff?: StaffCreateNestedOneWithoutRepliesInput
    service: ServiceCreateNestedOneWithoutReviewsInput
  }

  export type ChatLogUncheckedCreateInput = {
    id?: number
    review?: string | null
    reply?: string | null
    rating?: number | null
    review_date?: Date | string
    reply_date?: Date | string | null
    customerId?: number | null
    staffId?: number | null
    serviceId: number
  }

  export type ChatLogUpdateInput = {
    review?: NullableStringFieldUpdateOperationsInput | string | null
    reply?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    review_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reply_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customer?: CustomerUpdateOneWithoutChatsNestedInput
    staff?: StaffUpdateOneWithoutRepliesNestedInput
    service?: ServiceUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ChatLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    reply?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    review_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reply_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customerId?: NullableIntFieldUpdateOperationsInput | number | null
    staffId?: NullableIntFieldUpdateOperationsInput | number | null
    serviceId?: IntFieldUpdateOperationsInput | number
  }

  export type ChatLogCreateManyInput = {
    id?: number
    review?: string | null
    reply?: string | null
    rating?: number | null
    review_date?: Date | string
    reply_date?: Date | string | null
    customerId?: number | null
    staffId?: number | null
    serviceId: number
  }

  export type ChatLogUpdateManyMutationInput = {
    review?: NullableStringFieldUpdateOperationsInput | string | null
    reply?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    review_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reply_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ChatLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    reply?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    review_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reply_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customerId?: NullableIntFieldUpdateOperationsInput | number | null
    staffId?: NullableIntFieldUpdateOperationsInput | number | null
    serviceId?: IntFieldUpdateOperationsInput | number
  }

  export type PetCreateInput = {
    name: string
    sex?: $Enums.Sex
    age: number
    type?: $Enums.PetType
    status?: $Enums.PetStatus
    breed: string
    disease?: PetCreatediseaseInput | string[]
    allergic?: PetCreateallergicInput | string[]
    picture: string
    scheduled?: BookedServiceCreateNestedManyWithoutPetInput
    stayed?: BookedRoomCreateNestedManyWithoutPetInput
    customer: CustomerCreateNestedOneWithoutPetsInput
    cares?: CareCreateNestedManyWithoutPetInput
  }

  export type PetUncheckedCreateInput = {
    id?: number
    name: string
    sex?: $Enums.Sex
    age: number
    type?: $Enums.PetType
    status?: $Enums.PetStatus
    breed: string
    disease?: PetCreatediseaseInput | string[]
    allergic?: PetCreateallergicInput | string[]
    picture: string
    customerId: number
    scheduled?: BookedServiceUncheckedCreateNestedManyWithoutPetInput
    stayed?: BookedRoomUncheckedCreateNestedManyWithoutPetInput
    cares?: CareUncheckedCreateNestedManyWithoutPetInput
  }

  export type PetUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    sex?: EnumSexFieldUpdateOperationsInput | $Enums.Sex
    age?: IntFieldUpdateOperationsInput | number
    type?: EnumPetTypeFieldUpdateOperationsInput | $Enums.PetType
    status?: EnumPetStatusFieldUpdateOperationsInput | $Enums.PetStatus
    breed?: StringFieldUpdateOperationsInput | string
    disease?: PetUpdatediseaseInput | string[]
    allergic?: PetUpdateallergicInput | string[]
    picture?: StringFieldUpdateOperationsInput | string
    scheduled?: BookedServiceUpdateManyWithoutPetNestedInput
    stayed?: BookedRoomUpdateManyWithoutPetNestedInput
    customer?: CustomerUpdateOneRequiredWithoutPetsNestedInput
    cares?: CareUpdateManyWithoutPetNestedInput
  }

  export type PetUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    sex?: EnumSexFieldUpdateOperationsInput | $Enums.Sex
    age?: IntFieldUpdateOperationsInput | number
    type?: EnumPetTypeFieldUpdateOperationsInput | $Enums.PetType
    status?: EnumPetStatusFieldUpdateOperationsInput | $Enums.PetStatus
    breed?: StringFieldUpdateOperationsInput | string
    disease?: PetUpdatediseaseInput | string[]
    allergic?: PetUpdateallergicInput | string[]
    picture?: StringFieldUpdateOperationsInput | string
    customerId?: IntFieldUpdateOperationsInput | number
    scheduled?: BookedServiceUncheckedUpdateManyWithoutPetNestedInput
    stayed?: BookedRoomUncheckedUpdateManyWithoutPetNestedInput
    cares?: CareUncheckedUpdateManyWithoutPetNestedInput
  }

  export type PetCreateManyInput = {
    id?: number
    name: string
    sex?: $Enums.Sex
    age: number
    type?: $Enums.PetType
    status?: $Enums.PetStatus
    breed: string
    disease?: PetCreatediseaseInput | string[]
    allergic?: PetCreateallergicInput | string[]
    picture: string
    customerId: number
  }

  export type PetUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    sex?: EnumSexFieldUpdateOperationsInput | $Enums.Sex
    age?: IntFieldUpdateOperationsInput | number
    type?: EnumPetTypeFieldUpdateOperationsInput | $Enums.PetType
    status?: EnumPetStatusFieldUpdateOperationsInput | $Enums.PetStatus
    breed?: StringFieldUpdateOperationsInput | string
    disease?: PetUpdatediseaseInput | string[]
    allergic?: PetUpdateallergicInput | string[]
    picture?: StringFieldUpdateOperationsInput | string
  }

  export type PetUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    sex?: EnumSexFieldUpdateOperationsInput | $Enums.Sex
    age?: IntFieldUpdateOperationsInput | number
    type?: EnumPetTypeFieldUpdateOperationsInput | $Enums.PetType
    status?: EnumPetStatusFieldUpdateOperationsInput | $Enums.PetStatus
    breed?: StringFieldUpdateOperationsInput | string
    disease?: PetUpdatediseaseInput | string[]
    allergic?: PetUpdateallergicInput | string[]
    picture?: StringFieldUpdateOperationsInput | string
    customerId?: IntFieldUpdateOperationsInput | number
  }

  export type RoomCreateInput = {
    capacity?: number
    price?: number
    picture?: RoomCreatepictureInput | string[]
    petType?: $Enums.PetType
    bookings?: BookedRoomCreateNestedManyWithoutRoomInput
    staffOnRooms?: RoomStaffCreateNestedManyWithoutRoomInput
  }

  export type RoomUncheckedCreateInput = {
    id?: number
    capacity?: number
    price?: number
    picture?: RoomCreatepictureInput | string[]
    petType?: $Enums.PetType
    bookings?: BookedRoomUncheckedCreateNestedManyWithoutRoomInput
    staffOnRooms?: RoomStaffUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomUpdateInput = {
    capacity?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    picture?: RoomUpdatepictureInput | string[]
    petType?: EnumPetTypeFieldUpdateOperationsInput | $Enums.PetType
    bookings?: BookedRoomUpdateManyWithoutRoomNestedInput
    staffOnRooms?: RoomStaffUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    capacity?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    picture?: RoomUpdatepictureInput | string[]
    petType?: EnumPetTypeFieldUpdateOperationsInput | $Enums.PetType
    bookings?: BookedRoomUncheckedUpdateManyWithoutRoomNestedInput
    staffOnRooms?: RoomStaffUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type RoomCreateManyInput = {
    id?: number
    capacity?: number
    price?: number
    picture?: RoomCreatepictureInput | string[]
    petType?: $Enums.PetType
  }

  export type RoomUpdateManyMutationInput = {
    capacity?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    picture?: RoomUpdatepictureInput | string[]
    petType?: EnumPetTypeFieldUpdateOperationsInput | $Enums.PetType
  }

  export type RoomUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    capacity?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    picture?: RoomUpdatepictureInput | string[]
    petType?: EnumPetTypeFieldUpdateOperationsInput | $Enums.PetType
  }

  export type BookedRoomCreateInput = {
    checkIn: Date | string
    checkOut: Date | string
    room: RoomCreateNestedOneWithoutBookingsInput
    pet?: PetCreateNestedOneWithoutStayedInput
    booking: BookingCreateNestedOneWithoutBooked_roomInput
  }

  export type BookedRoomUncheckedCreateInput = {
    id?: number
    checkIn: Date | string
    checkOut: Date | string
    roomId: number
    petId?: number | null
    bookingId: number
  }

  export type BookedRoomUpdateInput = {
    checkIn?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOut?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: RoomUpdateOneRequiredWithoutBookingsNestedInput
    pet?: PetUpdateOneWithoutStayedNestedInput
    booking?: BookingUpdateOneRequiredWithoutBooked_roomNestedInput
  }

  export type BookedRoomUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    checkIn?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOut?: DateTimeFieldUpdateOperationsInput | Date | string
    roomId?: IntFieldUpdateOperationsInput | number
    petId?: NullableIntFieldUpdateOperationsInput | number | null
    bookingId?: IntFieldUpdateOperationsInput | number
  }

  export type BookedRoomCreateManyInput = {
    id?: number
    checkIn: Date | string
    checkOut: Date | string
    roomId: number
    petId?: number | null
    bookingId: number
  }

  export type BookedRoomUpdateManyMutationInput = {
    checkIn?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOut?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookedRoomUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    checkIn?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOut?: DateTimeFieldUpdateOperationsInput | Date | string
    roomId?: IntFieldUpdateOperationsInput | number
    petId?: NullableIntFieldUpdateOperationsInput | number | null
    bookingId?: IntFieldUpdateOperationsInput | number
  }

  export type ServiceCreateInput = {
    name: string
    price?: number
    petType?: ServiceCreatepetTypeInput | $Enums.PetType[]
    picture: string
    reviews?: ChatLogCreateNestedManyWithoutServiceInput
    staffOnServices?: StaffOnServiceCreateNestedManyWithoutServiceInput
    bookedServices?: BookedServiceCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateInput = {
    id?: number
    name: string
    price?: number
    petType?: ServiceCreatepetTypeInput | $Enums.PetType[]
    picture: string
    reviews?: ChatLogUncheckedCreateNestedManyWithoutServiceInput
    staffOnServices?: StaffOnServiceUncheckedCreateNestedManyWithoutServiceInput
    bookedServices?: BookedServiceUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    petType?: ServiceUpdatepetTypeInput | $Enums.PetType[]
    picture?: StringFieldUpdateOperationsInput | string
    reviews?: ChatLogUpdateManyWithoutServiceNestedInput
    staffOnServices?: StaffOnServiceUpdateManyWithoutServiceNestedInput
    bookedServices?: BookedServiceUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    petType?: ServiceUpdatepetTypeInput | $Enums.PetType[]
    picture?: StringFieldUpdateOperationsInput | string
    reviews?: ChatLogUncheckedUpdateManyWithoutServiceNestedInput
    staffOnServices?: StaffOnServiceUncheckedUpdateManyWithoutServiceNestedInput
    bookedServices?: BookedServiceUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ServiceCreateManyInput = {
    id?: number
    name: string
    price?: number
    petType?: ServiceCreatepetTypeInput | $Enums.PetType[]
    picture: string
  }

  export type ServiceUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    petType?: ServiceUpdatepetTypeInput | $Enums.PetType[]
    picture?: StringFieldUpdateOperationsInput | string
  }

  export type ServiceUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    petType?: ServiceUpdatepetTypeInput | $Enums.PetType[]
    picture?: StringFieldUpdateOperationsInput | string
  }

  export type BookedServiceCreateInput = {
    scheduled: Date | string
    service: ServiceCreateNestedOneWithoutBookedServicesInput
    pet?: PetCreateNestedOneWithoutScheduledInput
    booking: BookingCreateNestedOneWithoutBooked_serviceInput
  }

  export type BookedServiceUncheckedCreateInput = {
    id?: number
    serviceId: number
    petId?: number | null
    scheduled: Date | string
    booking_id: number
  }

  export type BookedServiceUpdateInput = {
    scheduled?: DateTimeFieldUpdateOperationsInput | Date | string
    service?: ServiceUpdateOneRequiredWithoutBookedServicesNestedInput
    pet?: PetUpdateOneWithoutScheduledNestedInput
    booking?: BookingUpdateOneRequiredWithoutBooked_serviceNestedInput
  }

  export type BookedServiceUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    serviceId?: IntFieldUpdateOperationsInput | number
    petId?: NullableIntFieldUpdateOperationsInput | number | null
    scheduled?: DateTimeFieldUpdateOperationsInput | Date | string
    booking_id?: IntFieldUpdateOperationsInput | number
  }

  export type BookedServiceCreateManyInput = {
    id?: number
    serviceId: number
    petId?: number | null
    scheduled: Date | string
    booking_id: number
  }

  export type BookedServiceUpdateManyMutationInput = {
    scheduled?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookedServiceUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    serviceId?: IntFieldUpdateOperationsInput | number
    petId?: NullableIntFieldUpdateOperationsInput | number | null
    scheduled?: DateTimeFieldUpdateOperationsInput | Date | string
    booking_id?: IntFieldUpdateOperationsInput | number
  }

  export type BookingCreateInput = {
    date: Date | string
    status?: $Enums.BookingStatus
    customerName: string
    customerEmail: string
    customerNumber: string
    booked_service?: BookedServiceCreateNestedManyWithoutBookingInput
    booked_room?: BookedRoomCreateNestedManyWithoutBookingInput
    customer?: CustomerCreateNestedOneWithoutBookingsInput
    payment?: PaymentCreateNestedOneWithoutBookingInput
  }

  export type BookingUncheckedCreateInput = {
    id?: number
    date: Date | string
    status?: $Enums.BookingStatus
    customerId?: number | null
    customerName: string
    customerEmail: string
    customerNumber: string
    booked_service?: BookedServiceUncheckedCreateNestedManyWithoutBookingInput
    booked_room?: BookedRoomUncheckedCreateNestedManyWithoutBookingInput
    payment?: PaymentUncheckedCreateNestedOneWithoutBookingInput
  }

  export type BookingUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerNumber?: StringFieldUpdateOperationsInput | string
    booked_service?: BookedServiceUpdateManyWithoutBookingNestedInput
    booked_room?: BookedRoomUpdateManyWithoutBookingNestedInput
    customer?: CustomerUpdateOneWithoutBookingsNestedInput
    payment?: PaymentUpdateOneWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    customerId?: NullableIntFieldUpdateOperationsInput | number | null
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerNumber?: StringFieldUpdateOperationsInput | string
    booked_service?: BookedServiceUncheckedUpdateManyWithoutBookingNestedInput
    booked_room?: BookedRoomUncheckedUpdateManyWithoutBookingNestedInput
    payment?: PaymentUncheckedUpdateOneWithoutBookingNestedInput
  }

  export type BookingCreateManyInput = {
    id?: number
    date: Date | string
    status?: $Enums.BookingStatus
    customerId?: number | null
    customerName: string
    customerEmail: string
    customerNumber: string
  }

  export type BookingUpdateManyMutationInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerNumber?: StringFieldUpdateOperationsInput | string
  }

  export type BookingUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    customerId?: NullableIntFieldUpdateOperationsInput | number | null
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerNumber?: StringFieldUpdateOperationsInput | string
  }

  export type PaymentCreateInput = {
    cost: number
    date: Date | string
    status?: $Enums.PaymentStatus
    customerName: string
    customerEmail: string
    customerNumber: string
    booking?: BookingCreateNestedOneWithoutPaymentInput
    customer?: CustomerCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateInput = {
    id?: number
    cost: number
    date: Date | string
    status?: $Enums.PaymentStatus
    bookingId?: number | null
    customerId?: number | null
    customerName: string
    customerEmail: string
    customerNumber: string
  }

  export type PaymentUpdateInput = {
    cost?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerNumber?: StringFieldUpdateOperationsInput | string
    booking?: BookingUpdateOneWithoutPaymentNestedInput
    customer?: CustomerUpdateOneWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    cost?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    bookingId?: NullableIntFieldUpdateOperationsInput | number | null
    customerId?: NullableIntFieldUpdateOperationsInput | number | null
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerNumber?: StringFieldUpdateOperationsInput | string
  }

  export type PaymentCreateManyInput = {
    id?: number
    cost: number
    date: Date | string
    status?: $Enums.PaymentStatus
    bookingId?: number | null
    customerId?: number | null
    customerName: string
    customerEmail: string
    customerNumber: string
  }

  export type PaymentUpdateManyMutationInput = {
    cost?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerNumber?: StringFieldUpdateOperationsInput | string
  }

  export type PaymentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    cost?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    bookingId?: NullableIntFieldUpdateOperationsInput | number | null
    customerId?: NullableIntFieldUpdateOperationsInput | number | null
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerNumber?: StringFieldUpdateOperationsInput | string
  }

  export type CareCreateInput = {
    start_period?: Date | string
    end_period: Date | string
    staff: StaffCreateNestedOneWithoutCaresInput
    pet: PetCreateNestedOneWithoutCaresInput
  }

  export type CareUncheckedCreateInput = {
    start_period?: Date | string
    end_period: Date | string
    staff_id: number
    pet_id: number
  }

  export type CareUpdateInput = {
    start_period?: DateTimeFieldUpdateOperationsInput | Date | string
    end_period?: DateTimeFieldUpdateOperationsInput | Date | string
    staff?: StaffUpdateOneRequiredWithoutCaresNestedInput
    pet?: PetUpdateOneRequiredWithoutCaresNestedInput
  }

  export type CareUncheckedUpdateInput = {
    start_period?: DateTimeFieldUpdateOperationsInput | Date | string
    end_period?: DateTimeFieldUpdateOperationsInput | Date | string
    staff_id?: IntFieldUpdateOperationsInput | number
    pet_id?: IntFieldUpdateOperationsInput | number
  }

  export type CareCreateManyInput = {
    start_period?: Date | string
    end_period: Date | string
    staff_id: number
    pet_id: number
  }

  export type CareUpdateManyMutationInput = {
    start_period?: DateTimeFieldUpdateOperationsInput | Date | string
    end_period?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CareUncheckedUpdateManyInput = {
    start_period?: DateTimeFieldUpdateOperationsInput | Date | string
    end_period?: DateTimeFieldUpdateOperationsInput | Date | string
    staff_id?: IntFieldUpdateOperationsInput | number
    pet_id?: IntFieldUpdateOperationsInput | number
  }

  export type StaffOnServiceCreateInput = {
    staff: StaffCreateNestedOneWithoutStaffOnServicesInput
    service: ServiceCreateNestedOneWithoutStaffOnServicesInput
  }

  export type StaffOnServiceUncheckedCreateInput = {
    staffId: number
    serviceId: number
  }

  export type StaffOnServiceUpdateInput = {
    staff?: StaffUpdateOneRequiredWithoutStaffOnServicesNestedInput
    service?: ServiceUpdateOneRequiredWithoutStaffOnServicesNestedInput
  }

  export type StaffOnServiceUncheckedUpdateInput = {
    staffId?: IntFieldUpdateOperationsInput | number
    serviceId?: IntFieldUpdateOperationsInput | number
  }

  export type StaffOnServiceCreateManyInput = {
    staffId: number
    serviceId: number
  }

  export type StaffOnServiceUpdateManyMutationInput = {

  }

  export type StaffOnServiceUncheckedUpdateManyInput = {
    staffId?: IntFieldUpdateOperationsInput | number
    serviceId?: IntFieldUpdateOperationsInput | number
  }

  export type RoomStaffCreateInput = {
    room: RoomCreateNestedOneWithoutStaffOnRoomsInput
    staff: StaffCreateNestedOneWithoutRoomStaffInput
  }

  export type RoomStaffUncheckedCreateInput = {
    roomId: number
    staffId: number
  }

  export type RoomStaffUpdateInput = {
    room?: RoomUpdateOneRequiredWithoutStaffOnRoomsNestedInput
    staff?: StaffUpdateOneRequiredWithoutRoomStaffNestedInput
  }

  export type RoomStaffUncheckedUpdateInput = {
    roomId?: IntFieldUpdateOperationsInput | number
    staffId?: IntFieldUpdateOperationsInput | number
  }

  export type RoomStaffCreateManyInput = {
    roomId: number
    staffId: number
  }

  export type RoomStaffUpdateManyMutationInput = {

  }

  export type RoomStaffUncheckedUpdateManyInput = {
    roomId?: IntFieldUpdateOperationsInput | number
    staffId?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type StaffNullableScalarRelationFilter = {
    is?: StaffWhereInput | null
    isNot?: StaffWhereInput | null
  }

  export type CustomerNullableScalarRelationFilter = {
    is?: CustomerWhereInput | null
    isNot?: CustomerWhereInput | null
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    email?: SortOrder
    phone_number?: SortOrder
    user_name?: SortOrder
    password?: SortOrder
    role?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    email?: SortOrder
    phone_number?: SortOrder
    user_name?: SortOrder
    password?: SortOrder
    role?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    email?: SortOrder
    phone_number?: SortOrder
    user_name?: SortOrder
    password?: SortOrder
    role?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type EnumBankFilter<$PrismaModel = never> = {
    equals?: $Enums.Bank | EnumBankFieldRefInput<$PrismaModel>
    in?: $Enums.Bank[] | ListEnumBankFieldRefInput<$PrismaModel>
    notIn?: $Enums.Bank[] | ListEnumBankFieldRefInput<$PrismaModel>
    not?: NestedEnumBankFilter<$PrismaModel> | $Enums.Bank
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ChatLogListRelationFilter = {
    every?: ChatLogWhereInput
    some?: ChatLogWhereInput
    none?: ChatLogWhereInput
  }

  export type CareListRelationFilter = {
    every?: CareWhereInput
    some?: CareWhereInput
    none?: CareWhereInput
  }

  export type StaffOnServiceListRelationFilter = {
    every?: StaffOnServiceWhereInput
    some?: StaffOnServiceWhereInput
    none?: StaffOnServiceWhereInput
  }

  export type RoomStaffListRelationFilter = {
    every?: RoomStaffWhereInput
    some?: RoomStaffWhereInput
    none?: RoomStaffWhereInput
  }

  export type ChatLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CareOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StaffOnServiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoomStaffOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StaffCountOrderByAggregateInput = {
    id?: SortOrder
    wages?: SortOrder
    bank_company?: SortOrder
    bank_account?: SortOrder
    userId?: SortOrder
  }

  export type StaffAvgOrderByAggregateInput = {
    id?: SortOrder
    wages?: SortOrder
    userId?: SortOrder
  }

  export type StaffMaxOrderByAggregateInput = {
    id?: SortOrder
    wages?: SortOrder
    bank_company?: SortOrder
    bank_account?: SortOrder
    userId?: SortOrder
  }

  export type StaffMinOrderByAggregateInput = {
    id?: SortOrder
    wages?: SortOrder
    bank_company?: SortOrder
    bank_account?: SortOrder
    userId?: SortOrder
  }

  export type StaffSumOrderByAggregateInput = {
    id?: SortOrder
    wages?: SortOrder
    userId?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type EnumBankWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Bank | EnumBankFieldRefInput<$PrismaModel>
    in?: $Enums.Bank[] | ListEnumBankFieldRefInput<$PrismaModel>
    notIn?: $Enums.Bank[] | ListEnumBankFieldRefInput<$PrismaModel>
    not?: NestedEnumBankWithAggregatesFilter<$PrismaModel> | $Enums.Bank
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBankFilter<$PrismaModel>
    _max?: NestedEnumBankFilter<$PrismaModel>
  }

  export type PetListRelationFilter = {
    every?: PetWhereInput
    some?: PetWhereInput
    none?: PetWhereInput
  }

  export type BookingListRelationFilter = {
    every?: BookingWhereInput
    some?: BookingWhereInput
    none?: BookingWhereInput
  }

  export type PaymentListRelationFilter = {
    every?: PaymentWhereInput
    some?: PaymentWhereInput
    none?: PaymentWhereInput
  }

  export type PetOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BookingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PaymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CustomerCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type CustomerAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type CustomerMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type CustomerMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type CustomerSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type ServiceScalarRelationFilter = {
    is?: ServiceWhereInput
    isNot?: ServiceWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ChatLogCountOrderByAggregateInput = {
    id?: SortOrder
    review?: SortOrder
    reply?: SortOrder
    rating?: SortOrder
    review_date?: SortOrder
    reply_date?: SortOrder
    customerId?: SortOrder
    staffId?: SortOrder
    serviceId?: SortOrder
  }

  export type ChatLogAvgOrderByAggregateInput = {
    id?: SortOrder
    rating?: SortOrder
    customerId?: SortOrder
    staffId?: SortOrder
    serviceId?: SortOrder
  }

  export type ChatLogMaxOrderByAggregateInput = {
    id?: SortOrder
    review?: SortOrder
    reply?: SortOrder
    rating?: SortOrder
    review_date?: SortOrder
    reply_date?: SortOrder
    customerId?: SortOrder
    staffId?: SortOrder
    serviceId?: SortOrder
  }

  export type ChatLogMinOrderByAggregateInput = {
    id?: SortOrder
    review?: SortOrder
    reply?: SortOrder
    rating?: SortOrder
    review_date?: SortOrder
    reply_date?: SortOrder
    customerId?: SortOrder
    staffId?: SortOrder
    serviceId?: SortOrder
  }

  export type ChatLogSumOrderByAggregateInput = {
    id?: SortOrder
    rating?: SortOrder
    customerId?: SortOrder
    staffId?: SortOrder
    serviceId?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumSexFilter<$PrismaModel = never> = {
    equals?: $Enums.Sex | EnumSexFieldRefInput<$PrismaModel>
    in?: $Enums.Sex[] | ListEnumSexFieldRefInput<$PrismaModel>
    notIn?: $Enums.Sex[] | ListEnumSexFieldRefInput<$PrismaModel>
    not?: NestedEnumSexFilter<$PrismaModel> | $Enums.Sex
  }

  export type EnumPetTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PetType | EnumPetTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PetType[] | ListEnumPetTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PetType[] | ListEnumPetTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPetTypeFilter<$PrismaModel> | $Enums.PetType
  }

  export type EnumPetStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PetStatus | EnumPetStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PetStatus[] | ListEnumPetStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PetStatus[] | ListEnumPetStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPetStatusFilter<$PrismaModel> | $Enums.PetStatus
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type BookedServiceListRelationFilter = {
    every?: BookedServiceWhereInput
    some?: BookedServiceWhereInput
    none?: BookedServiceWhereInput
  }

  export type BookedRoomListRelationFilter = {
    every?: BookedRoomWhereInput
    some?: BookedRoomWhereInput
    none?: BookedRoomWhereInput
  }

  export type CustomerScalarRelationFilter = {
    is?: CustomerWhereInput
    isNot?: CustomerWhereInput
  }

  export type BookedServiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BookedRoomOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PetCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    sex?: SortOrder
    age?: SortOrder
    type?: SortOrder
    status?: SortOrder
    breed?: SortOrder
    disease?: SortOrder
    allergic?: SortOrder
    picture?: SortOrder
    customerId?: SortOrder
  }

  export type PetAvgOrderByAggregateInput = {
    id?: SortOrder
    age?: SortOrder
    customerId?: SortOrder
  }

  export type PetMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    sex?: SortOrder
    age?: SortOrder
    type?: SortOrder
    status?: SortOrder
    breed?: SortOrder
    picture?: SortOrder
    customerId?: SortOrder
  }

  export type PetMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    sex?: SortOrder
    age?: SortOrder
    type?: SortOrder
    status?: SortOrder
    breed?: SortOrder
    picture?: SortOrder
    customerId?: SortOrder
  }

  export type PetSumOrderByAggregateInput = {
    id?: SortOrder
    age?: SortOrder
    customerId?: SortOrder
  }

  export type EnumSexWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Sex | EnumSexFieldRefInput<$PrismaModel>
    in?: $Enums.Sex[] | ListEnumSexFieldRefInput<$PrismaModel>
    notIn?: $Enums.Sex[] | ListEnumSexFieldRefInput<$PrismaModel>
    not?: NestedEnumSexWithAggregatesFilter<$PrismaModel> | $Enums.Sex
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSexFilter<$PrismaModel>
    _max?: NestedEnumSexFilter<$PrismaModel>
  }

  export type EnumPetTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PetType | EnumPetTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PetType[] | ListEnumPetTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PetType[] | ListEnumPetTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPetTypeWithAggregatesFilter<$PrismaModel> | $Enums.PetType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPetTypeFilter<$PrismaModel>
    _max?: NestedEnumPetTypeFilter<$PrismaModel>
  }

  export type EnumPetStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PetStatus | EnumPetStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PetStatus[] | ListEnumPetStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PetStatus[] | ListEnumPetStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPetStatusWithAggregatesFilter<$PrismaModel> | $Enums.PetStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPetStatusFilter<$PrismaModel>
    _max?: NestedEnumPetStatusFilter<$PrismaModel>
  }

  export type RoomCountOrderByAggregateInput = {
    id?: SortOrder
    capacity?: SortOrder
    price?: SortOrder
    picture?: SortOrder
    petType?: SortOrder
  }

  export type RoomAvgOrderByAggregateInput = {
    id?: SortOrder
    capacity?: SortOrder
    price?: SortOrder
  }

  export type RoomMaxOrderByAggregateInput = {
    id?: SortOrder
    capacity?: SortOrder
    price?: SortOrder
    petType?: SortOrder
  }

  export type RoomMinOrderByAggregateInput = {
    id?: SortOrder
    capacity?: SortOrder
    price?: SortOrder
    petType?: SortOrder
  }

  export type RoomSumOrderByAggregateInput = {
    id?: SortOrder
    capacity?: SortOrder
    price?: SortOrder
  }

  export type RoomScalarRelationFilter = {
    is?: RoomWhereInput
    isNot?: RoomWhereInput
  }

  export type PetNullableScalarRelationFilter = {
    is?: PetWhereInput | null
    isNot?: PetWhereInput | null
  }

  export type BookingScalarRelationFilter = {
    is?: BookingWhereInput
    isNot?: BookingWhereInput
  }

  export type BookedRoomCountOrderByAggregateInput = {
    id?: SortOrder
    checkIn?: SortOrder
    checkOut?: SortOrder
    roomId?: SortOrder
    petId?: SortOrder
    bookingId?: SortOrder
  }

  export type BookedRoomAvgOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    petId?: SortOrder
    bookingId?: SortOrder
  }

  export type BookedRoomMaxOrderByAggregateInput = {
    id?: SortOrder
    checkIn?: SortOrder
    checkOut?: SortOrder
    roomId?: SortOrder
    petId?: SortOrder
    bookingId?: SortOrder
  }

  export type BookedRoomMinOrderByAggregateInput = {
    id?: SortOrder
    checkIn?: SortOrder
    checkOut?: SortOrder
    roomId?: SortOrder
    petId?: SortOrder
    bookingId?: SortOrder
  }

  export type BookedRoomSumOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    petId?: SortOrder
    bookingId?: SortOrder
  }

  export type EnumPetTypeNullableListFilter<$PrismaModel = never> = {
    equals?: $Enums.PetType[] | ListEnumPetTypeFieldRefInput<$PrismaModel> | null
    has?: $Enums.PetType | EnumPetTypeFieldRefInput<$PrismaModel> | null
    hasEvery?: $Enums.PetType[] | ListEnumPetTypeFieldRefInput<$PrismaModel>
    hasSome?: $Enums.PetType[] | ListEnumPetTypeFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type ServiceCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    petType?: SortOrder
    picture?: SortOrder
  }

  export type ServiceAvgOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
  }

  export type ServiceMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    picture?: SortOrder
  }

  export type ServiceMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    picture?: SortOrder
  }

  export type ServiceSumOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
  }

  export type BookedServiceCountOrderByAggregateInput = {
    id?: SortOrder
    serviceId?: SortOrder
    petId?: SortOrder
    scheduled?: SortOrder
    booking_id?: SortOrder
  }

  export type BookedServiceAvgOrderByAggregateInput = {
    id?: SortOrder
    serviceId?: SortOrder
    petId?: SortOrder
    booking_id?: SortOrder
  }

  export type BookedServiceMaxOrderByAggregateInput = {
    id?: SortOrder
    serviceId?: SortOrder
    petId?: SortOrder
    scheduled?: SortOrder
    booking_id?: SortOrder
  }

  export type BookedServiceMinOrderByAggregateInput = {
    id?: SortOrder
    serviceId?: SortOrder
    petId?: SortOrder
    scheduled?: SortOrder
    booking_id?: SortOrder
  }

  export type BookedServiceSumOrderByAggregateInput = {
    id?: SortOrder
    serviceId?: SortOrder
    petId?: SortOrder
    booking_id?: SortOrder
  }

  export type EnumBookingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusFilter<$PrismaModel> | $Enums.BookingStatus
  }

  export type PaymentNullableScalarRelationFilter = {
    is?: PaymentWhereInput | null
    isNot?: PaymentWhereInput | null
  }

  export type BookingCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    status?: SortOrder
    customerId?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    customerNumber?: SortOrder
  }

  export type BookingAvgOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
  }

  export type BookingMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    status?: SortOrder
    customerId?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    customerNumber?: SortOrder
  }

  export type BookingMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    status?: SortOrder
    customerId?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    customerNumber?: SortOrder
  }

  export type BookingSumOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
  }

  export type EnumBookingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel> | $Enums.BookingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBookingStatusFilter<$PrismaModel>
    _max?: NestedEnumBookingStatusFilter<$PrismaModel>
  }

  export type EnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type BookingNullableScalarRelationFilter = {
    is?: BookingWhereInput | null
    isNot?: BookingWhereInput | null
  }

  export type PaymentCountOrderByAggregateInput = {
    id?: SortOrder
    cost?: SortOrder
    date?: SortOrder
    status?: SortOrder
    bookingId?: SortOrder
    customerId?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    customerNumber?: SortOrder
  }

  export type PaymentAvgOrderByAggregateInput = {
    id?: SortOrder
    cost?: SortOrder
    bookingId?: SortOrder
    customerId?: SortOrder
  }

  export type PaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    cost?: SortOrder
    date?: SortOrder
    status?: SortOrder
    bookingId?: SortOrder
    customerId?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    customerNumber?: SortOrder
  }

  export type PaymentMinOrderByAggregateInput = {
    id?: SortOrder
    cost?: SortOrder
    date?: SortOrder
    status?: SortOrder
    bookingId?: SortOrder
    customerId?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    customerNumber?: SortOrder
  }

  export type PaymentSumOrderByAggregateInput = {
    id?: SortOrder
    cost?: SortOrder
    bookingId?: SortOrder
    customerId?: SortOrder
  }

  export type EnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type StaffScalarRelationFilter = {
    is?: StaffWhereInput
    isNot?: StaffWhereInput
  }

  export type PetScalarRelationFilter = {
    is?: PetWhereInput
    isNot?: PetWhereInput
  }

  export type CareStaff_idPet_idCompoundUniqueInput = {
    staff_id: number
    pet_id: number
  }

  export type CareCountOrderByAggregateInput = {
    start_period?: SortOrder
    end_period?: SortOrder
    staff_id?: SortOrder
    pet_id?: SortOrder
  }

  export type CareAvgOrderByAggregateInput = {
    staff_id?: SortOrder
    pet_id?: SortOrder
  }

  export type CareMaxOrderByAggregateInput = {
    start_period?: SortOrder
    end_period?: SortOrder
    staff_id?: SortOrder
    pet_id?: SortOrder
  }

  export type CareMinOrderByAggregateInput = {
    start_period?: SortOrder
    end_period?: SortOrder
    staff_id?: SortOrder
    pet_id?: SortOrder
  }

  export type CareSumOrderByAggregateInput = {
    staff_id?: SortOrder
    pet_id?: SortOrder
  }

  export type StaffOnServiceStaffIdServiceIdCompoundUniqueInput = {
    staffId: number
    serviceId: number
  }

  export type StaffOnServiceCountOrderByAggregateInput = {
    staffId?: SortOrder
    serviceId?: SortOrder
  }

  export type StaffOnServiceAvgOrderByAggregateInput = {
    staffId?: SortOrder
    serviceId?: SortOrder
  }

  export type StaffOnServiceMaxOrderByAggregateInput = {
    staffId?: SortOrder
    serviceId?: SortOrder
  }

  export type StaffOnServiceMinOrderByAggregateInput = {
    staffId?: SortOrder
    serviceId?: SortOrder
  }

  export type StaffOnServiceSumOrderByAggregateInput = {
    staffId?: SortOrder
    serviceId?: SortOrder
  }

  export type RoomStaffRoomIdStaffIdCompoundUniqueInput = {
    roomId: number
    staffId: number
  }

  export type RoomStaffCountOrderByAggregateInput = {
    roomId?: SortOrder
    staffId?: SortOrder
  }

  export type RoomStaffAvgOrderByAggregateInput = {
    roomId?: SortOrder
    staffId?: SortOrder
  }

  export type RoomStaffMaxOrderByAggregateInput = {
    roomId?: SortOrder
    staffId?: SortOrder
  }

  export type RoomStaffMinOrderByAggregateInput = {
    roomId?: SortOrder
    staffId?: SortOrder
  }

  export type RoomStaffSumOrderByAggregateInput = {
    roomId?: SortOrder
    staffId?: SortOrder
  }

  export type StaffCreateNestedOneWithoutUserInput = {
    create?: XOR<StaffCreateWithoutUserInput, StaffUncheckedCreateWithoutUserInput>
    connectOrCreate?: StaffCreateOrConnectWithoutUserInput
    connect?: StaffWhereUniqueInput
  }

  export type CustomerCreateNestedOneWithoutUserInput = {
    create?: XOR<CustomerCreateWithoutUserInput, CustomerUncheckedCreateWithoutUserInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutUserInput
    connect?: CustomerWhereUniqueInput
  }

  export type StaffUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<StaffCreateWithoutUserInput, StaffUncheckedCreateWithoutUserInput>
    connectOrCreate?: StaffCreateOrConnectWithoutUserInput
    connect?: StaffWhereUniqueInput
  }

  export type CustomerUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<CustomerCreateWithoutUserInput, CustomerUncheckedCreateWithoutUserInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutUserInput
    connect?: CustomerWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type StaffUpdateOneWithoutUserNestedInput = {
    create?: XOR<StaffCreateWithoutUserInput, StaffUncheckedCreateWithoutUserInput>
    connectOrCreate?: StaffCreateOrConnectWithoutUserInput
    upsert?: StaffUpsertWithoutUserInput
    disconnect?: StaffWhereInput | boolean
    delete?: StaffWhereInput | boolean
    connect?: StaffWhereUniqueInput
    update?: XOR<XOR<StaffUpdateToOneWithWhereWithoutUserInput, StaffUpdateWithoutUserInput>, StaffUncheckedUpdateWithoutUserInput>
  }

  export type CustomerUpdateOneWithoutUserNestedInput = {
    create?: XOR<CustomerCreateWithoutUserInput, CustomerUncheckedCreateWithoutUserInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutUserInput
    upsert?: CustomerUpsertWithoutUserInput
    disconnect?: CustomerWhereInput | boolean
    delete?: CustomerWhereInput | boolean
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutUserInput, CustomerUpdateWithoutUserInput>, CustomerUncheckedUpdateWithoutUserInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StaffUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<StaffCreateWithoutUserInput, StaffUncheckedCreateWithoutUserInput>
    connectOrCreate?: StaffCreateOrConnectWithoutUserInput
    upsert?: StaffUpsertWithoutUserInput
    disconnect?: StaffWhereInput | boolean
    delete?: StaffWhereInput | boolean
    connect?: StaffWhereUniqueInput
    update?: XOR<XOR<StaffUpdateToOneWithWhereWithoutUserInput, StaffUpdateWithoutUserInput>, StaffUncheckedUpdateWithoutUserInput>
  }

  export type CustomerUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<CustomerCreateWithoutUserInput, CustomerUncheckedCreateWithoutUserInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutUserInput
    upsert?: CustomerUpsertWithoutUserInput
    disconnect?: CustomerWhereInput | boolean
    delete?: CustomerWhereInput | boolean
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutUserInput, CustomerUpdateWithoutUserInput>, CustomerUncheckedUpdateWithoutUserInput>
  }

  export type UserCreateNestedOneWithoutStaffInput = {
    create?: XOR<UserCreateWithoutStaffInput, UserUncheckedCreateWithoutStaffInput>
    connectOrCreate?: UserCreateOrConnectWithoutStaffInput
    connect?: UserWhereUniqueInput
  }

  export type ChatLogCreateNestedManyWithoutStaffInput = {
    create?: XOR<ChatLogCreateWithoutStaffInput, ChatLogUncheckedCreateWithoutStaffInput> | ChatLogCreateWithoutStaffInput[] | ChatLogUncheckedCreateWithoutStaffInput[]
    connectOrCreate?: ChatLogCreateOrConnectWithoutStaffInput | ChatLogCreateOrConnectWithoutStaffInput[]
    createMany?: ChatLogCreateManyStaffInputEnvelope
    connect?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
  }

  export type CareCreateNestedManyWithoutStaffInput = {
    create?: XOR<CareCreateWithoutStaffInput, CareUncheckedCreateWithoutStaffInput> | CareCreateWithoutStaffInput[] | CareUncheckedCreateWithoutStaffInput[]
    connectOrCreate?: CareCreateOrConnectWithoutStaffInput | CareCreateOrConnectWithoutStaffInput[]
    createMany?: CareCreateManyStaffInputEnvelope
    connect?: CareWhereUniqueInput | CareWhereUniqueInput[]
  }

  export type StaffOnServiceCreateNestedManyWithoutStaffInput = {
    create?: XOR<StaffOnServiceCreateWithoutStaffInput, StaffOnServiceUncheckedCreateWithoutStaffInput> | StaffOnServiceCreateWithoutStaffInput[] | StaffOnServiceUncheckedCreateWithoutStaffInput[]
    connectOrCreate?: StaffOnServiceCreateOrConnectWithoutStaffInput | StaffOnServiceCreateOrConnectWithoutStaffInput[]
    createMany?: StaffOnServiceCreateManyStaffInputEnvelope
    connect?: StaffOnServiceWhereUniqueInput | StaffOnServiceWhereUniqueInput[]
  }

  export type RoomStaffCreateNestedManyWithoutStaffInput = {
    create?: XOR<RoomStaffCreateWithoutStaffInput, RoomStaffUncheckedCreateWithoutStaffInput> | RoomStaffCreateWithoutStaffInput[] | RoomStaffUncheckedCreateWithoutStaffInput[]
    connectOrCreate?: RoomStaffCreateOrConnectWithoutStaffInput | RoomStaffCreateOrConnectWithoutStaffInput[]
    createMany?: RoomStaffCreateManyStaffInputEnvelope
    connect?: RoomStaffWhereUniqueInput | RoomStaffWhereUniqueInput[]
  }

  export type ChatLogUncheckedCreateNestedManyWithoutStaffInput = {
    create?: XOR<ChatLogCreateWithoutStaffInput, ChatLogUncheckedCreateWithoutStaffInput> | ChatLogCreateWithoutStaffInput[] | ChatLogUncheckedCreateWithoutStaffInput[]
    connectOrCreate?: ChatLogCreateOrConnectWithoutStaffInput | ChatLogCreateOrConnectWithoutStaffInput[]
    createMany?: ChatLogCreateManyStaffInputEnvelope
    connect?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
  }

  export type CareUncheckedCreateNestedManyWithoutStaffInput = {
    create?: XOR<CareCreateWithoutStaffInput, CareUncheckedCreateWithoutStaffInput> | CareCreateWithoutStaffInput[] | CareUncheckedCreateWithoutStaffInput[]
    connectOrCreate?: CareCreateOrConnectWithoutStaffInput | CareCreateOrConnectWithoutStaffInput[]
    createMany?: CareCreateManyStaffInputEnvelope
    connect?: CareWhereUniqueInput | CareWhereUniqueInput[]
  }

  export type StaffOnServiceUncheckedCreateNestedManyWithoutStaffInput = {
    create?: XOR<StaffOnServiceCreateWithoutStaffInput, StaffOnServiceUncheckedCreateWithoutStaffInput> | StaffOnServiceCreateWithoutStaffInput[] | StaffOnServiceUncheckedCreateWithoutStaffInput[]
    connectOrCreate?: StaffOnServiceCreateOrConnectWithoutStaffInput | StaffOnServiceCreateOrConnectWithoutStaffInput[]
    createMany?: StaffOnServiceCreateManyStaffInputEnvelope
    connect?: StaffOnServiceWhereUniqueInput | StaffOnServiceWhereUniqueInput[]
  }

  export type RoomStaffUncheckedCreateNestedManyWithoutStaffInput = {
    create?: XOR<RoomStaffCreateWithoutStaffInput, RoomStaffUncheckedCreateWithoutStaffInput> | RoomStaffCreateWithoutStaffInput[] | RoomStaffUncheckedCreateWithoutStaffInput[]
    connectOrCreate?: RoomStaffCreateOrConnectWithoutStaffInput | RoomStaffCreateOrConnectWithoutStaffInput[]
    createMany?: RoomStaffCreateManyStaffInputEnvelope
    connect?: RoomStaffWhereUniqueInput | RoomStaffWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumBankFieldUpdateOperationsInput = {
    set?: $Enums.Bank
  }

  export type UserUpdateOneRequiredWithoutStaffNestedInput = {
    create?: XOR<UserCreateWithoutStaffInput, UserUncheckedCreateWithoutStaffInput>
    connectOrCreate?: UserCreateOrConnectWithoutStaffInput
    upsert?: UserUpsertWithoutStaffInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutStaffInput, UserUpdateWithoutStaffInput>, UserUncheckedUpdateWithoutStaffInput>
  }

  export type ChatLogUpdateManyWithoutStaffNestedInput = {
    create?: XOR<ChatLogCreateWithoutStaffInput, ChatLogUncheckedCreateWithoutStaffInput> | ChatLogCreateWithoutStaffInput[] | ChatLogUncheckedCreateWithoutStaffInput[]
    connectOrCreate?: ChatLogCreateOrConnectWithoutStaffInput | ChatLogCreateOrConnectWithoutStaffInput[]
    upsert?: ChatLogUpsertWithWhereUniqueWithoutStaffInput | ChatLogUpsertWithWhereUniqueWithoutStaffInput[]
    createMany?: ChatLogCreateManyStaffInputEnvelope
    set?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
    disconnect?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
    delete?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
    connect?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
    update?: ChatLogUpdateWithWhereUniqueWithoutStaffInput | ChatLogUpdateWithWhereUniqueWithoutStaffInput[]
    updateMany?: ChatLogUpdateManyWithWhereWithoutStaffInput | ChatLogUpdateManyWithWhereWithoutStaffInput[]
    deleteMany?: ChatLogScalarWhereInput | ChatLogScalarWhereInput[]
  }

  export type CareUpdateManyWithoutStaffNestedInput = {
    create?: XOR<CareCreateWithoutStaffInput, CareUncheckedCreateWithoutStaffInput> | CareCreateWithoutStaffInput[] | CareUncheckedCreateWithoutStaffInput[]
    connectOrCreate?: CareCreateOrConnectWithoutStaffInput | CareCreateOrConnectWithoutStaffInput[]
    upsert?: CareUpsertWithWhereUniqueWithoutStaffInput | CareUpsertWithWhereUniqueWithoutStaffInput[]
    createMany?: CareCreateManyStaffInputEnvelope
    set?: CareWhereUniqueInput | CareWhereUniqueInput[]
    disconnect?: CareWhereUniqueInput | CareWhereUniqueInput[]
    delete?: CareWhereUniqueInput | CareWhereUniqueInput[]
    connect?: CareWhereUniqueInput | CareWhereUniqueInput[]
    update?: CareUpdateWithWhereUniqueWithoutStaffInput | CareUpdateWithWhereUniqueWithoutStaffInput[]
    updateMany?: CareUpdateManyWithWhereWithoutStaffInput | CareUpdateManyWithWhereWithoutStaffInput[]
    deleteMany?: CareScalarWhereInput | CareScalarWhereInput[]
  }

  export type StaffOnServiceUpdateManyWithoutStaffNestedInput = {
    create?: XOR<StaffOnServiceCreateWithoutStaffInput, StaffOnServiceUncheckedCreateWithoutStaffInput> | StaffOnServiceCreateWithoutStaffInput[] | StaffOnServiceUncheckedCreateWithoutStaffInput[]
    connectOrCreate?: StaffOnServiceCreateOrConnectWithoutStaffInput | StaffOnServiceCreateOrConnectWithoutStaffInput[]
    upsert?: StaffOnServiceUpsertWithWhereUniqueWithoutStaffInput | StaffOnServiceUpsertWithWhereUniqueWithoutStaffInput[]
    createMany?: StaffOnServiceCreateManyStaffInputEnvelope
    set?: StaffOnServiceWhereUniqueInput | StaffOnServiceWhereUniqueInput[]
    disconnect?: StaffOnServiceWhereUniqueInput | StaffOnServiceWhereUniqueInput[]
    delete?: StaffOnServiceWhereUniqueInput | StaffOnServiceWhereUniqueInput[]
    connect?: StaffOnServiceWhereUniqueInput | StaffOnServiceWhereUniqueInput[]
    update?: StaffOnServiceUpdateWithWhereUniqueWithoutStaffInput | StaffOnServiceUpdateWithWhereUniqueWithoutStaffInput[]
    updateMany?: StaffOnServiceUpdateManyWithWhereWithoutStaffInput | StaffOnServiceUpdateManyWithWhereWithoutStaffInput[]
    deleteMany?: StaffOnServiceScalarWhereInput | StaffOnServiceScalarWhereInput[]
  }

  export type RoomStaffUpdateManyWithoutStaffNestedInput = {
    create?: XOR<RoomStaffCreateWithoutStaffInput, RoomStaffUncheckedCreateWithoutStaffInput> | RoomStaffCreateWithoutStaffInput[] | RoomStaffUncheckedCreateWithoutStaffInput[]
    connectOrCreate?: RoomStaffCreateOrConnectWithoutStaffInput | RoomStaffCreateOrConnectWithoutStaffInput[]
    upsert?: RoomStaffUpsertWithWhereUniqueWithoutStaffInput | RoomStaffUpsertWithWhereUniqueWithoutStaffInput[]
    createMany?: RoomStaffCreateManyStaffInputEnvelope
    set?: RoomStaffWhereUniqueInput | RoomStaffWhereUniqueInput[]
    disconnect?: RoomStaffWhereUniqueInput | RoomStaffWhereUniqueInput[]
    delete?: RoomStaffWhereUniqueInput | RoomStaffWhereUniqueInput[]
    connect?: RoomStaffWhereUniqueInput | RoomStaffWhereUniqueInput[]
    update?: RoomStaffUpdateWithWhereUniqueWithoutStaffInput | RoomStaffUpdateWithWhereUniqueWithoutStaffInput[]
    updateMany?: RoomStaffUpdateManyWithWhereWithoutStaffInput | RoomStaffUpdateManyWithWhereWithoutStaffInput[]
    deleteMany?: RoomStaffScalarWhereInput | RoomStaffScalarWhereInput[]
  }

  export type ChatLogUncheckedUpdateManyWithoutStaffNestedInput = {
    create?: XOR<ChatLogCreateWithoutStaffInput, ChatLogUncheckedCreateWithoutStaffInput> | ChatLogCreateWithoutStaffInput[] | ChatLogUncheckedCreateWithoutStaffInput[]
    connectOrCreate?: ChatLogCreateOrConnectWithoutStaffInput | ChatLogCreateOrConnectWithoutStaffInput[]
    upsert?: ChatLogUpsertWithWhereUniqueWithoutStaffInput | ChatLogUpsertWithWhereUniqueWithoutStaffInput[]
    createMany?: ChatLogCreateManyStaffInputEnvelope
    set?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
    disconnect?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
    delete?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
    connect?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
    update?: ChatLogUpdateWithWhereUniqueWithoutStaffInput | ChatLogUpdateWithWhereUniqueWithoutStaffInput[]
    updateMany?: ChatLogUpdateManyWithWhereWithoutStaffInput | ChatLogUpdateManyWithWhereWithoutStaffInput[]
    deleteMany?: ChatLogScalarWhereInput | ChatLogScalarWhereInput[]
  }

  export type CareUncheckedUpdateManyWithoutStaffNestedInput = {
    create?: XOR<CareCreateWithoutStaffInput, CareUncheckedCreateWithoutStaffInput> | CareCreateWithoutStaffInput[] | CareUncheckedCreateWithoutStaffInput[]
    connectOrCreate?: CareCreateOrConnectWithoutStaffInput | CareCreateOrConnectWithoutStaffInput[]
    upsert?: CareUpsertWithWhereUniqueWithoutStaffInput | CareUpsertWithWhereUniqueWithoutStaffInput[]
    createMany?: CareCreateManyStaffInputEnvelope
    set?: CareWhereUniqueInput | CareWhereUniqueInput[]
    disconnect?: CareWhereUniqueInput | CareWhereUniqueInput[]
    delete?: CareWhereUniqueInput | CareWhereUniqueInput[]
    connect?: CareWhereUniqueInput | CareWhereUniqueInput[]
    update?: CareUpdateWithWhereUniqueWithoutStaffInput | CareUpdateWithWhereUniqueWithoutStaffInput[]
    updateMany?: CareUpdateManyWithWhereWithoutStaffInput | CareUpdateManyWithWhereWithoutStaffInput[]
    deleteMany?: CareScalarWhereInput | CareScalarWhereInput[]
  }

  export type StaffOnServiceUncheckedUpdateManyWithoutStaffNestedInput = {
    create?: XOR<StaffOnServiceCreateWithoutStaffInput, StaffOnServiceUncheckedCreateWithoutStaffInput> | StaffOnServiceCreateWithoutStaffInput[] | StaffOnServiceUncheckedCreateWithoutStaffInput[]
    connectOrCreate?: StaffOnServiceCreateOrConnectWithoutStaffInput | StaffOnServiceCreateOrConnectWithoutStaffInput[]
    upsert?: StaffOnServiceUpsertWithWhereUniqueWithoutStaffInput | StaffOnServiceUpsertWithWhereUniqueWithoutStaffInput[]
    createMany?: StaffOnServiceCreateManyStaffInputEnvelope
    set?: StaffOnServiceWhereUniqueInput | StaffOnServiceWhereUniqueInput[]
    disconnect?: StaffOnServiceWhereUniqueInput | StaffOnServiceWhereUniqueInput[]
    delete?: StaffOnServiceWhereUniqueInput | StaffOnServiceWhereUniqueInput[]
    connect?: StaffOnServiceWhereUniqueInput | StaffOnServiceWhereUniqueInput[]
    update?: StaffOnServiceUpdateWithWhereUniqueWithoutStaffInput | StaffOnServiceUpdateWithWhereUniqueWithoutStaffInput[]
    updateMany?: StaffOnServiceUpdateManyWithWhereWithoutStaffInput | StaffOnServiceUpdateManyWithWhereWithoutStaffInput[]
    deleteMany?: StaffOnServiceScalarWhereInput | StaffOnServiceScalarWhereInput[]
  }

  export type RoomStaffUncheckedUpdateManyWithoutStaffNestedInput = {
    create?: XOR<RoomStaffCreateWithoutStaffInput, RoomStaffUncheckedCreateWithoutStaffInput> | RoomStaffCreateWithoutStaffInput[] | RoomStaffUncheckedCreateWithoutStaffInput[]
    connectOrCreate?: RoomStaffCreateOrConnectWithoutStaffInput | RoomStaffCreateOrConnectWithoutStaffInput[]
    upsert?: RoomStaffUpsertWithWhereUniqueWithoutStaffInput | RoomStaffUpsertWithWhereUniqueWithoutStaffInput[]
    createMany?: RoomStaffCreateManyStaffInputEnvelope
    set?: RoomStaffWhereUniqueInput | RoomStaffWhereUniqueInput[]
    disconnect?: RoomStaffWhereUniqueInput | RoomStaffWhereUniqueInput[]
    delete?: RoomStaffWhereUniqueInput | RoomStaffWhereUniqueInput[]
    connect?: RoomStaffWhereUniqueInput | RoomStaffWhereUniqueInput[]
    update?: RoomStaffUpdateWithWhereUniqueWithoutStaffInput | RoomStaffUpdateWithWhereUniqueWithoutStaffInput[]
    updateMany?: RoomStaffUpdateManyWithWhereWithoutStaffInput | RoomStaffUpdateManyWithWhereWithoutStaffInput[]
    deleteMany?: RoomStaffScalarWhereInput | RoomStaffScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutCustomerInput = {
    create?: XOR<UserCreateWithoutCustomerInput, UserUncheckedCreateWithoutCustomerInput>
    connectOrCreate?: UserCreateOrConnectWithoutCustomerInput
    connect?: UserWhereUniqueInput
  }

  export type ChatLogCreateNestedManyWithoutCustomerInput = {
    create?: XOR<ChatLogCreateWithoutCustomerInput, ChatLogUncheckedCreateWithoutCustomerInput> | ChatLogCreateWithoutCustomerInput[] | ChatLogUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: ChatLogCreateOrConnectWithoutCustomerInput | ChatLogCreateOrConnectWithoutCustomerInput[]
    createMany?: ChatLogCreateManyCustomerInputEnvelope
    connect?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
  }

  export type PetCreateNestedManyWithoutCustomerInput = {
    create?: XOR<PetCreateWithoutCustomerInput, PetUncheckedCreateWithoutCustomerInput> | PetCreateWithoutCustomerInput[] | PetUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: PetCreateOrConnectWithoutCustomerInput | PetCreateOrConnectWithoutCustomerInput[]
    createMany?: PetCreateManyCustomerInputEnvelope
    connect?: PetWhereUniqueInput | PetWhereUniqueInput[]
  }

  export type BookingCreateNestedManyWithoutCustomerInput = {
    create?: XOR<BookingCreateWithoutCustomerInput, BookingUncheckedCreateWithoutCustomerInput> | BookingCreateWithoutCustomerInput[] | BookingUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutCustomerInput | BookingCreateOrConnectWithoutCustomerInput[]
    createMany?: BookingCreateManyCustomerInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type PaymentCreateNestedManyWithoutCustomerInput = {
    create?: XOR<PaymentCreateWithoutCustomerInput, PaymentUncheckedCreateWithoutCustomerInput> | PaymentCreateWithoutCustomerInput[] | PaymentUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutCustomerInput | PaymentCreateOrConnectWithoutCustomerInput[]
    createMany?: PaymentCreateManyCustomerInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type ChatLogUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<ChatLogCreateWithoutCustomerInput, ChatLogUncheckedCreateWithoutCustomerInput> | ChatLogCreateWithoutCustomerInput[] | ChatLogUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: ChatLogCreateOrConnectWithoutCustomerInput | ChatLogCreateOrConnectWithoutCustomerInput[]
    createMany?: ChatLogCreateManyCustomerInputEnvelope
    connect?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
  }

  export type PetUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<PetCreateWithoutCustomerInput, PetUncheckedCreateWithoutCustomerInput> | PetCreateWithoutCustomerInput[] | PetUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: PetCreateOrConnectWithoutCustomerInput | PetCreateOrConnectWithoutCustomerInput[]
    createMany?: PetCreateManyCustomerInputEnvelope
    connect?: PetWhereUniqueInput | PetWhereUniqueInput[]
  }

  export type BookingUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<BookingCreateWithoutCustomerInput, BookingUncheckedCreateWithoutCustomerInput> | BookingCreateWithoutCustomerInput[] | BookingUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutCustomerInput | BookingCreateOrConnectWithoutCustomerInput[]
    createMany?: BookingCreateManyCustomerInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type PaymentUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<PaymentCreateWithoutCustomerInput, PaymentUncheckedCreateWithoutCustomerInput> | PaymentCreateWithoutCustomerInput[] | PaymentUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutCustomerInput | PaymentCreateOrConnectWithoutCustomerInput[]
    createMany?: PaymentCreateManyCustomerInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutCustomerNestedInput = {
    create?: XOR<UserCreateWithoutCustomerInput, UserUncheckedCreateWithoutCustomerInput>
    connectOrCreate?: UserCreateOrConnectWithoutCustomerInput
    upsert?: UserUpsertWithoutCustomerInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCustomerInput, UserUpdateWithoutCustomerInput>, UserUncheckedUpdateWithoutCustomerInput>
  }

  export type ChatLogUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<ChatLogCreateWithoutCustomerInput, ChatLogUncheckedCreateWithoutCustomerInput> | ChatLogCreateWithoutCustomerInput[] | ChatLogUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: ChatLogCreateOrConnectWithoutCustomerInput | ChatLogCreateOrConnectWithoutCustomerInput[]
    upsert?: ChatLogUpsertWithWhereUniqueWithoutCustomerInput | ChatLogUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: ChatLogCreateManyCustomerInputEnvelope
    set?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
    disconnect?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
    delete?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
    connect?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
    update?: ChatLogUpdateWithWhereUniqueWithoutCustomerInput | ChatLogUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: ChatLogUpdateManyWithWhereWithoutCustomerInput | ChatLogUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: ChatLogScalarWhereInput | ChatLogScalarWhereInput[]
  }

  export type PetUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<PetCreateWithoutCustomerInput, PetUncheckedCreateWithoutCustomerInput> | PetCreateWithoutCustomerInput[] | PetUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: PetCreateOrConnectWithoutCustomerInput | PetCreateOrConnectWithoutCustomerInput[]
    upsert?: PetUpsertWithWhereUniqueWithoutCustomerInput | PetUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: PetCreateManyCustomerInputEnvelope
    set?: PetWhereUniqueInput | PetWhereUniqueInput[]
    disconnect?: PetWhereUniqueInput | PetWhereUniqueInput[]
    delete?: PetWhereUniqueInput | PetWhereUniqueInput[]
    connect?: PetWhereUniqueInput | PetWhereUniqueInput[]
    update?: PetUpdateWithWhereUniqueWithoutCustomerInput | PetUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: PetUpdateManyWithWhereWithoutCustomerInput | PetUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: PetScalarWhereInput | PetScalarWhereInput[]
  }

  export type BookingUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<BookingCreateWithoutCustomerInput, BookingUncheckedCreateWithoutCustomerInput> | BookingCreateWithoutCustomerInput[] | BookingUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutCustomerInput | BookingCreateOrConnectWithoutCustomerInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutCustomerInput | BookingUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: BookingCreateManyCustomerInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutCustomerInput | BookingUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutCustomerInput | BookingUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type PaymentUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<PaymentCreateWithoutCustomerInput, PaymentUncheckedCreateWithoutCustomerInput> | PaymentCreateWithoutCustomerInput[] | PaymentUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutCustomerInput | PaymentCreateOrConnectWithoutCustomerInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutCustomerInput | PaymentUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: PaymentCreateManyCustomerInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutCustomerInput | PaymentUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutCustomerInput | PaymentUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type ChatLogUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<ChatLogCreateWithoutCustomerInput, ChatLogUncheckedCreateWithoutCustomerInput> | ChatLogCreateWithoutCustomerInput[] | ChatLogUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: ChatLogCreateOrConnectWithoutCustomerInput | ChatLogCreateOrConnectWithoutCustomerInput[]
    upsert?: ChatLogUpsertWithWhereUniqueWithoutCustomerInput | ChatLogUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: ChatLogCreateManyCustomerInputEnvelope
    set?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
    disconnect?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
    delete?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
    connect?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
    update?: ChatLogUpdateWithWhereUniqueWithoutCustomerInput | ChatLogUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: ChatLogUpdateManyWithWhereWithoutCustomerInput | ChatLogUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: ChatLogScalarWhereInput | ChatLogScalarWhereInput[]
  }

  export type PetUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<PetCreateWithoutCustomerInput, PetUncheckedCreateWithoutCustomerInput> | PetCreateWithoutCustomerInput[] | PetUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: PetCreateOrConnectWithoutCustomerInput | PetCreateOrConnectWithoutCustomerInput[]
    upsert?: PetUpsertWithWhereUniqueWithoutCustomerInput | PetUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: PetCreateManyCustomerInputEnvelope
    set?: PetWhereUniqueInput | PetWhereUniqueInput[]
    disconnect?: PetWhereUniqueInput | PetWhereUniqueInput[]
    delete?: PetWhereUniqueInput | PetWhereUniqueInput[]
    connect?: PetWhereUniqueInput | PetWhereUniqueInput[]
    update?: PetUpdateWithWhereUniqueWithoutCustomerInput | PetUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: PetUpdateManyWithWhereWithoutCustomerInput | PetUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: PetScalarWhereInput | PetScalarWhereInput[]
  }

  export type BookingUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<BookingCreateWithoutCustomerInput, BookingUncheckedCreateWithoutCustomerInput> | BookingCreateWithoutCustomerInput[] | BookingUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutCustomerInput | BookingCreateOrConnectWithoutCustomerInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutCustomerInput | BookingUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: BookingCreateManyCustomerInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutCustomerInput | BookingUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutCustomerInput | BookingUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type PaymentUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<PaymentCreateWithoutCustomerInput, PaymentUncheckedCreateWithoutCustomerInput> | PaymentCreateWithoutCustomerInput[] | PaymentUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutCustomerInput | PaymentCreateOrConnectWithoutCustomerInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutCustomerInput | PaymentUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: PaymentCreateManyCustomerInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutCustomerInput | PaymentUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutCustomerInput | PaymentUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type CustomerCreateNestedOneWithoutChatsInput = {
    create?: XOR<CustomerCreateWithoutChatsInput, CustomerUncheckedCreateWithoutChatsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutChatsInput
    connect?: CustomerWhereUniqueInput
  }

  export type StaffCreateNestedOneWithoutRepliesInput = {
    create?: XOR<StaffCreateWithoutRepliesInput, StaffUncheckedCreateWithoutRepliesInput>
    connectOrCreate?: StaffCreateOrConnectWithoutRepliesInput
    connect?: StaffWhereUniqueInput
  }

  export type ServiceCreateNestedOneWithoutReviewsInput = {
    create?: XOR<ServiceCreateWithoutReviewsInput, ServiceUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutReviewsInput
    connect?: ServiceWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type CustomerUpdateOneWithoutChatsNestedInput = {
    create?: XOR<CustomerCreateWithoutChatsInput, CustomerUncheckedCreateWithoutChatsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutChatsInput
    upsert?: CustomerUpsertWithoutChatsInput
    disconnect?: CustomerWhereInput | boolean
    delete?: CustomerWhereInput | boolean
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutChatsInput, CustomerUpdateWithoutChatsInput>, CustomerUncheckedUpdateWithoutChatsInput>
  }

  export type StaffUpdateOneWithoutRepliesNestedInput = {
    create?: XOR<StaffCreateWithoutRepliesInput, StaffUncheckedCreateWithoutRepliesInput>
    connectOrCreate?: StaffCreateOrConnectWithoutRepliesInput
    upsert?: StaffUpsertWithoutRepliesInput
    disconnect?: StaffWhereInput | boolean
    delete?: StaffWhereInput | boolean
    connect?: StaffWhereUniqueInput
    update?: XOR<XOR<StaffUpdateToOneWithWhereWithoutRepliesInput, StaffUpdateWithoutRepliesInput>, StaffUncheckedUpdateWithoutRepliesInput>
  }

  export type ServiceUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<ServiceCreateWithoutReviewsInput, ServiceUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutReviewsInput
    upsert?: ServiceUpsertWithoutReviewsInput
    connect?: ServiceWhereUniqueInput
    update?: XOR<XOR<ServiceUpdateToOneWithWhereWithoutReviewsInput, ServiceUpdateWithoutReviewsInput>, ServiceUncheckedUpdateWithoutReviewsInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PetCreatediseaseInput = {
    set: string[]
  }

  export type PetCreateallergicInput = {
    set: string[]
  }

  export type BookedServiceCreateNestedManyWithoutPetInput = {
    create?: XOR<BookedServiceCreateWithoutPetInput, BookedServiceUncheckedCreateWithoutPetInput> | BookedServiceCreateWithoutPetInput[] | BookedServiceUncheckedCreateWithoutPetInput[]
    connectOrCreate?: BookedServiceCreateOrConnectWithoutPetInput | BookedServiceCreateOrConnectWithoutPetInput[]
    createMany?: BookedServiceCreateManyPetInputEnvelope
    connect?: BookedServiceWhereUniqueInput | BookedServiceWhereUniqueInput[]
  }

  export type BookedRoomCreateNestedManyWithoutPetInput = {
    create?: XOR<BookedRoomCreateWithoutPetInput, BookedRoomUncheckedCreateWithoutPetInput> | BookedRoomCreateWithoutPetInput[] | BookedRoomUncheckedCreateWithoutPetInput[]
    connectOrCreate?: BookedRoomCreateOrConnectWithoutPetInput | BookedRoomCreateOrConnectWithoutPetInput[]
    createMany?: BookedRoomCreateManyPetInputEnvelope
    connect?: BookedRoomWhereUniqueInput | BookedRoomWhereUniqueInput[]
  }

  export type CustomerCreateNestedOneWithoutPetsInput = {
    create?: XOR<CustomerCreateWithoutPetsInput, CustomerUncheckedCreateWithoutPetsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutPetsInput
    connect?: CustomerWhereUniqueInput
  }

  export type CareCreateNestedManyWithoutPetInput = {
    create?: XOR<CareCreateWithoutPetInput, CareUncheckedCreateWithoutPetInput> | CareCreateWithoutPetInput[] | CareUncheckedCreateWithoutPetInput[]
    connectOrCreate?: CareCreateOrConnectWithoutPetInput | CareCreateOrConnectWithoutPetInput[]
    createMany?: CareCreateManyPetInputEnvelope
    connect?: CareWhereUniqueInput | CareWhereUniqueInput[]
  }

  export type BookedServiceUncheckedCreateNestedManyWithoutPetInput = {
    create?: XOR<BookedServiceCreateWithoutPetInput, BookedServiceUncheckedCreateWithoutPetInput> | BookedServiceCreateWithoutPetInput[] | BookedServiceUncheckedCreateWithoutPetInput[]
    connectOrCreate?: BookedServiceCreateOrConnectWithoutPetInput | BookedServiceCreateOrConnectWithoutPetInput[]
    createMany?: BookedServiceCreateManyPetInputEnvelope
    connect?: BookedServiceWhereUniqueInput | BookedServiceWhereUniqueInput[]
  }

  export type BookedRoomUncheckedCreateNestedManyWithoutPetInput = {
    create?: XOR<BookedRoomCreateWithoutPetInput, BookedRoomUncheckedCreateWithoutPetInput> | BookedRoomCreateWithoutPetInput[] | BookedRoomUncheckedCreateWithoutPetInput[]
    connectOrCreate?: BookedRoomCreateOrConnectWithoutPetInput | BookedRoomCreateOrConnectWithoutPetInput[]
    createMany?: BookedRoomCreateManyPetInputEnvelope
    connect?: BookedRoomWhereUniqueInput | BookedRoomWhereUniqueInput[]
  }

  export type CareUncheckedCreateNestedManyWithoutPetInput = {
    create?: XOR<CareCreateWithoutPetInput, CareUncheckedCreateWithoutPetInput> | CareCreateWithoutPetInput[] | CareUncheckedCreateWithoutPetInput[]
    connectOrCreate?: CareCreateOrConnectWithoutPetInput | CareCreateOrConnectWithoutPetInput[]
    createMany?: CareCreateManyPetInputEnvelope
    connect?: CareWhereUniqueInput | CareWhereUniqueInput[]
  }

  export type EnumSexFieldUpdateOperationsInput = {
    set?: $Enums.Sex
  }

  export type EnumPetTypeFieldUpdateOperationsInput = {
    set?: $Enums.PetType
  }

  export type EnumPetStatusFieldUpdateOperationsInput = {
    set?: $Enums.PetStatus
  }

  export type PetUpdatediseaseInput = {
    set?: string[]
    push?: string | string[]
  }

  export type PetUpdateallergicInput = {
    set?: string[]
    push?: string | string[]
  }

  export type BookedServiceUpdateManyWithoutPetNestedInput = {
    create?: XOR<BookedServiceCreateWithoutPetInput, BookedServiceUncheckedCreateWithoutPetInput> | BookedServiceCreateWithoutPetInput[] | BookedServiceUncheckedCreateWithoutPetInput[]
    connectOrCreate?: BookedServiceCreateOrConnectWithoutPetInput | BookedServiceCreateOrConnectWithoutPetInput[]
    upsert?: BookedServiceUpsertWithWhereUniqueWithoutPetInput | BookedServiceUpsertWithWhereUniqueWithoutPetInput[]
    createMany?: BookedServiceCreateManyPetInputEnvelope
    set?: BookedServiceWhereUniqueInput | BookedServiceWhereUniqueInput[]
    disconnect?: BookedServiceWhereUniqueInput | BookedServiceWhereUniqueInput[]
    delete?: BookedServiceWhereUniqueInput | BookedServiceWhereUniqueInput[]
    connect?: BookedServiceWhereUniqueInput | BookedServiceWhereUniqueInput[]
    update?: BookedServiceUpdateWithWhereUniqueWithoutPetInput | BookedServiceUpdateWithWhereUniqueWithoutPetInput[]
    updateMany?: BookedServiceUpdateManyWithWhereWithoutPetInput | BookedServiceUpdateManyWithWhereWithoutPetInput[]
    deleteMany?: BookedServiceScalarWhereInput | BookedServiceScalarWhereInput[]
  }

  export type BookedRoomUpdateManyWithoutPetNestedInput = {
    create?: XOR<BookedRoomCreateWithoutPetInput, BookedRoomUncheckedCreateWithoutPetInput> | BookedRoomCreateWithoutPetInput[] | BookedRoomUncheckedCreateWithoutPetInput[]
    connectOrCreate?: BookedRoomCreateOrConnectWithoutPetInput | BookedRoomCreateOrConnectWithoutPetInput[]
    upsert?: BookedRoomUpsertWithWhereUniqueWithoutPetInput | BookedRoomUpsertWithWhereUniqueWithoutPetInput[]
    createMany?: BookedRoomCreateManyPetInputEnvelope
    set?: BookedRoomWhereUniqueInput | BookedRoomWhereUniqueInput[]
    disconnect?: BookedRoomWhereUniqueInput | BookedRoomWhereUniqueInput[]
    delete?: BookedRoomWhereUniqueInput | BookedRoomWhereUniqueInput[]
    connect?: BookedRoomWhereUniqueInput | BookedRoomWhereUniqueInput[]
    update?: BookedRoomUpdateWithWhereUniqueWithoutPetInput | BookedRoomUpdateWithWhereUniqueWithoutPetInput[]
    updateMany?: BookedRoomUpdateManyWithWhereWithoutPetInput | BookedRoomUpdateManyWithWhereWithoutPetInput[]
    deleteMany?: BookedRoomScalarWhereInput | BookedRoomScalarWhereInput[]
  }

  export type CustomerUpdateOneRequiredWithoutPetsNestedInput = {
    create?: XOR<CustomerCreateWithoutPetsInput, CustomerUncheckedCreateWithoutPetsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutPetsInput
    upsert?: CustomerUpsertWithoutPetsInput
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutPetsInput, CustomerUpdateWithoutPetsInput>, CustomerUncheckedUpdateWithoutPetsInput>
  }

  export type CareUpdateManyWithoutPetNestedInput = {
    create?: XOR<CareCreateWithoutPetInput, CareUncheckedCreateWithoutPetInput> | CareCreateWithoutPetInput[] | CareUncheckedCreateWithoutPetInput[]
    connectOrCreate?: CareCreateOrConnectWithoutPetInput | CareCreateOrConnectWithoutPetInput[]
    upsert?: CareUpsertWithWhereUniqueWithoutPetInput | CareUpsertWithWhereUniqueWithoutPetInput[]
    createMany?: CareCreateManyPetInputEnvelope
    set?: CareWhereUniqueInput | CareWhereUniqueInput[]
    disconnect?: CareWhereUniqueInput | CareWhereUniqueInput[]
    delete?: CareWhereUniqueInput | CareWhereUniqueInput[]
    connect?: CareWhereUniqueInput | CareWhereUniqueInput[]
    update?: CareUpdateWithWhereUniqueWithoutPetInput | CareUpdateWithWhereUniqueWithoutPetInput[]
    updateMany?: CareUpdateManyWithWhereWithoutPetInput | CareUpdateManyWithWhereWithoutPetInput[]
    deleteMany?: CareScalarWhereInput | CareScalarWhereInput[]
  }

  export type BookedServiceUncheckedUpdateManyWithoutPetNestedInput = {
    create?: XOR<BookedServiceCreateWithoutPetInput, BookedServiceUncheckedCreateWithoutPetInput> | BookedServiceCreateWithoutPetInput[] | BookedServiceUncheckedCreateWithoutPetInput[]
    connectOrCreate?: BookedServiceCreateOrConnectWithoutPetInput | BookedServiceCreateOrConnectWithoutPetInput[]
    upsert?: BookedServiceUpsertWithWhereUniqueWithoutPetInput | BookedServiceUpsertWithWhereUniqueWithoutPetInput[]
    createMany?: BookedServiceCreateManyPetInputEnvelope
    set?: BookedServiceWhereUniqueInput | BookedServiceWhereUniqueInput[]
    disconnect?: BookedServiceWhereUniqueInput | BookedServiceWhereUniqueInput[]
    delete?: BookedServiceWhereUniqueInput | BookedServiceWhereUniqueInput[]
    connect?: BookedServiceWhereUniqueInput | BookedServiceWhereUniqueInput[]
    update?: BookedServiceUpdateWithWhereUniqueWithoutPetInput | BookedServiceUpdateWithWhereUniqueWithoutPetInput[]
    updateMany?: BookedServiceUpdateManyWithWhereWithoutPetInput | BookedServiceUpdateManyWithWhereWithoutPetInput[]
    deleteMany?: BookedServiceScalarWhereInput | BookedServiceScalarWhereInput[]
  }

  export type BookedRoomUncheckedUpdateManyWithoutPetNestedInput = {
    create?: XOR<BookedRoomCreateWithoutPetInput, BookedRoomUncheckedCreateWithoutPetInput> | BookedRoomCreateWithoutPetInput[] | BookedRoomUncheckedCreateWithoutPetInput[]
    connectOrCreate?: BookedRoomCreateOrConnectWithoutPetInput | BookedRoomCreateOrConnectWithoutPetInput[]
    upsert?: BookedRoomUpsertWithWhereUniqueWithoutPetInput | BookedRoomUpsertWithWhereUniqueWithoutPetInput[]
    createMany?: BookedRoomCreateManyPetInputEnvelope
    set?: BookedRoomWhereUniqueInput | BookedRoomWhereUniqueInput[]
    disconnect?: BookedRoomWhereUniqueInput | BookedRoomWhereUniqueInput[]
    delete?: BookedRoomWhereUniqueInput | BookedRoomWhereUniqueInput[]
    connect?: BookedRoomWhereUniqueInput | BookedRoomWhereUniqueInput[]
    update?: BookedRoomUpdateWithWhereUniqueWithoutPetInput | BookedRoomUpdateWithWhereUniqueWithoutPetInput[]
    updateMany?: BookedRoomUpdateManyWithWhereWithoutPetInput | BookedRoomUpdateManyWithWhereWithoutPetInput[]
    deleteMany?: BookedRoomScalarWhereInput | BookedRoomScalarWhereInput[]
  }

  export type CareUncheckedUpdateManyWithoutPetNestedInput = {
    create?: XOR<CareCreateWithoutPetInput, CareUncheckedCreateWithoutPetInput> | CareCreateWithoutPetInput[] | CareUncheckedCreateWithoutPetInput[]
    connectOrCreate?: CareCreateOrConnectWithoutPetInput | CareCreateOrConnectWithoutPetInput[]
    upsert?: CareUpsertWithWhereUniqueWithoutPetInput | CareUpsertWithWhereUniqueWithoutPetInput[]
    createMany?: CareCreateManyPetInputEnvelope
    set?: CareWhereUniqueInput | CareWhereUniqueInput[]
    disconnect?: CareWhereUniqueInput | CareWhereUniqueInput[]
    delete?: CareWhereUniqueInput | CareWhereUniqueInput[]
    connect?: CareWhereUniqueInput | CareWhereUniqueInput[]
    update?: CareUpdateWithWhereUniqueWithoutPetInput | CareUpdateWithWhereUniqueWithoutPetInput[]
    updateMany?: CareUpdateManyWithWhereWithoutPetInput | CareUpdateManyWithWhereWithoutPetInput[]
    deleteMany?: CareScalarWhereInput | CareScalarWhereInput[]
  }

  export type RoomCreatepictureInput = {
    set: string[]
  }

  export type BookedRoomCreateNestedManyWithoutRoomInput = {
    create?: XOR<BookedRoomCreateWithoutRoomInput, BookedRoomUncheckedCreateWithoutRoomInput> | BookedRoomCreateWithoutRoomInput[] | BookedRoomUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: BookedRoomCreateOrConnectWithoutRoomInput | BookedRoomCreateOrConnectWithoutRoomInput[]
    createMany?: BookedRoomCreateManyRoomInputEnvelope
    connect?: BookedRoomWhereUniqueInput | BookedRoomWhereUniqueInput[]
  }

  export type RoomStaffCreateNestedManyWithoutRoomInput = {
    create?: XOR<RoomStaffCreateWithoutRoomInput, RoomStaffUncheckedCreateWithoutRoomInput> | RoomStaffCreateWithoutRoomInput[] | RoomStaffUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomStaffCreateOrConnectWithoutRoomInput | RoomStaffCreateOrConnectWithoutRoomInput[]
    createMany?: RoomStaffCreateManyRoomInputEnvelope
    connect?: RoomStaffWhereUniqueInput | RoomStaffWhereUniqueInput[]
  }

  export type BookedRoomUncheckedCreateNestedManyWithoutRoomInput = {
    create?: XOR<BookedRoomCreateWithoutRoomInput, BookedRoomUncheckedCreateWithoutRoomInput> | BookedRoomCreateWithoutRoomInput[] | BookedRoomUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: BookedRoomCreateOrConnectWithoutRoomInput | BookedRoomCreateOrConnectWithoutRoomInput[]
    createMany?: BookedRoomCreateManyRoomInputEnvelope
    connect?: BookedRoomWhereUniqueInput | BookedRoomWhereUniqueInput[]
  }

  export type RoomStaffUncheckedCreateNestedManyWithoutRoomInput = {
    create?: XOR<RoomStaffCreateWithoutRoomInput, RoomStaffUncheckedCreateWithoutRoomInput> | RoomStaffCreateWithoutRoomInput[] | RoomStaffUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomStaffCreateOrConnectWithoutRoomInput | RoomStaffCreateOrConnectWithoutRoomInput[]
    createMany?: RoomStaffCreateManyRoomInputEnvelope
    connect?: RoomStaffWhereUniqueInput | RoomStaffWhereUniqueInput[]
  }

  export type RoomUpdatepictureInput = {
    set?: string[]
    push?: string | string[]
  }

  export type BookedRoomUpdateManyWithoutRoomNestedInput = {
    create?: XOR<BookedRoomCreateWithoutRoomInput, BookedRoomUncheckedCreateWithoutRoomInput> | BookedRoomCreateWithoutRoomInput[] | BookedRoomUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: BookedRoomCreateOrConnectWithoutRoomInput | BookedRoomCreateOrConnectWithoutRoomInput[]
    upsert?: BookedRoomUpsertWithWhereUniqueWithoutRoomInput | BookedRoomUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: BookedRoomCreateManyRoomInputEnvelope
    set?: BookedRoomWhereUniqueInput | BookedRoomWhereUniqueInput[]
    disconnect?: BookedRoomWhereUniqueInput | BookedRoomWhereUniqueInput[]
    delete?: BookedRoomWhereUniqueInput | BookedRoomWhereUniqueInput[]
    connect?: BookedRoomWhereUniqueInput | BookedRoomWhereUniqueInput[]
    update?: BookedRoomUpdateWithWhereUniqueWithoutRoomInput | BookedRoomUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: BookedRoomUpdateManyWithWhereWithoutRoomInput | BookedRoomUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: BookedRoomScalarWhereInput | BookedRoomScalarWhereInput[]
  }

  export type RoomStaffUpdateManyWithoutRoomNestedInput = {
    create?: XOR<RoomStaffCreateWithoutRoomInput, RoomStaffUncheckedCreateWithoutRoomInput> | RoomStaffCreateWithoutRoomInput[] | RoomStaffUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomStaffCreateOrConnectWithoutRoomInput | RoomStaffCreateOrConnectWithoutRoomInput[]
    upsert?: RoomStaffUpsertWithWhereUniqueWithoutRoomInput | RoomStaffUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: RoomStaffCreateManyRoomInputEnvelope
    set?: RoomStaffWhereUniqueInput | RoomStaffWhereUniqueInput[]
    disconnect?: RoomStaffWhereUniqueInput | RoomStaffWhereUniqueInput[]
    delete?: RoomStaffWhereUniqueInput | RoomStaffWhereUniqueInput[]
    connect?: RoomStaffWhereUniqueInput | RoomStaffWhereUniqueInput[]
    update?: RoomStaffUpdateWithWhereUniqueWithoutRoomInput | RoomStaffUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: RoomStaffUpdateManyWithWhereWithoutRoomInput | RoomStaffUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: RoomStaffScalarWhereInput | RoomStaffScalarWhereInput[]
  }

  export type BookedRoomUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: XOR<BookedRoomCreateWithoutRoomInput, BookedRoomUncheckedCreateWithoutRoomInput> | BookedRoomCreateWithoutRoomInput[] | BookedRoomUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: BookedRoomCreateOrConnectWithoutRoomInput | BookedRoomCreateOrConnectWithoutRoomInput[]
    upsert?: BookedRoomUpsertWithWhereUniqueWithoutRoomInput | BookedRoomUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: BookedRoomCreateManyRoomInputEnvelope
    set?: BookedRoomWhereUniqueInput | BookedRoomWhereUniqueInput[]
    disconnect?: BookedRoomWhereUniqueInput | BookedRoomWhereUniqueInput[]
    delete?: BookedRoomWhereUniqueInput | BookedRoomWhereUniqueInput[]
    connect?: BookedRoomWhereUniqueInput | BookedRoomWhereUniqueInput[]
    update?: BookedRoomUpdateWithWhereUniqueWithoutRoomInput | BookedRoomUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: BookedRoomUpdateManyWithWhereWithoutRoomInput | BookedRoomUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: BookedRoomScalarWhereInput | BookedRoomScalarWhereInput[]
  }

  export type RoomStaffUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: XOR<RoomStaffCreateWithoutRoomInput, RoomStaffUncheckedCreateWithoutRoomInput> | RoomStaffCreateWithoutRoomInput[] | RoomStaffUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomStaffCreateOrConnectWithoutRoomInput | RoomStaffCreateOrConnectWithoutRoomInput[]
    upsert?: RoomStaffUpsertWithWhereUniqueWithoutRoomInput | RoomStaffUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: RoomStaffCreateManyRoomInputEnvelope
    set?: RoomStaffWhereUniqueInput | RoomStaffWhereUniqueInput[]
    disconnect?: RoomStaffWhereUniqueInput | RoomStaffWhereUniqueInput[]
    delete?: RoomStaffWhereUniqueInput | RoomStaffWhereUniqueInput[]
    connect?: RoomStaffWhereUniqueInput | RoomStaffWhereUniqueInput[]
    update?: RoomStaffUpdateWithWhereUniqueWithoutRoomInput | RoomStaffUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: RoomStaffUpdateManyWithWhereWithoutRoomInput | RoomStaffUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: RoomStaffScalarWhereInput | RoomStaffScalarWhereInput[]
  }

  export type RoomCreateNestedOneWithoutBookingsInput = {
    create?: XOR<RoomCreateWithoutBookingsInput, RoomUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: RoomCreateOrConnectWithoutBookingsInput
    connect?: RoomWhereUniqueInput
  }

  export type PetCreateNestedOneWithoutStayedInput = {
    create?: XOR<PetCreateWithoutStayedInput, PetUncheckedCreateWithoutStayedInput>
    connectOrCreate?: PetCreateOrConnectWithoutStayedInput
    connect?: PetWhereUniqueInput
  }

  export type BookingCreateNestedOneWithoutBooked_roomInput = {
    create?: XOR<BookingCreateWithoutBooked_roomInput, BookingUncheckedCreateWithoutBooked_roomInput>
    connectOrCreate?: BookingCreateOrConnectWithoutBooked_roomInput
    connect?: BookingWhereUniqueInput
  }

  export type RoomUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: XOR<RoomCreateWithoutBookingsInput, RoomUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: RoomCreateOrConnectWithoutBookingsInput
    upsert?: RoomUpsertWithoutBookingsInput
    connect?: RoomWhereUniqueInput
    update?: XOR<XOR<RoomUpdateToOneWithWhereWithoutBookingsInput, RoomUpdateWithoutBookingsInput>, RoomUncheckedUpdateWithoutBookingsInput>
  }

  export type PetUpdateOneWithoutStayedNestedInput = {
    create?: XOR<PetCreateWithoutStayedInput, PetUncheckedCreateWithoutStayedInput>
    connectOrCreate?: PetCreateOrConnectWithoutStayedInput
    upsert?: PetUpsertWithoutStayedInput
    disconnect?: PetWhereInput | boolean
    delete?: PetWhereInput | boolean
    connect?: PetWhereUniqueInput
    update?: XOR<XOR<PetUpdateToOneWithWhereWithoutStayedInput, PetUpdateWithoutStayedInput>, PetUncheckedUpdateWithoutStayedInput>
  }

  export type BookingUpdateOneRequiredWithoutBooked_roomNestedInput = {
    create?: XOR<BookingCreateWithoutBooked_roomInput, BookingUncheckedCreateWithoutBooked_roomInput>
    connectOrCreate?: BookingCreateOrConnectWithoutBooked_roomInput
    upsert?: BookingUpsertWithoutBooked_roomInput
    connect?: BookingWhereUniqueInput
    update?: XOR<XOR<BookingUpdateToOneWithWhereWithoutBooked_roomInput, BookingUpdateWithoutBooked_roomInput>, BookingUncheckedUpdateWithoutBooked_roomInput>
  }

  export type ServiceCreatepetTypeInput = {
    set: $Enums.PetType[]
  }

  export type ChatLogCreateNestedManyWithoutServiceInput = {
    create?: XOR<ChatLogCreateWithoutServiceInput, ChatLogUncheckedCreateWithoutServiceInput> | ChatLogCreateWithoutServiceInput[] | ChatLogUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: ChatLogCreateOrConnectWithoutServiceInput | ChatLogCreateOrConnectWithoutServiceInput[]
    createMany?: ChatLogCreateManyServiceInputEnvelope
    connect?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
  }

  export type StaffOnServiceCreateNestedManyWithoutServiceInput = {
    create?: XOR<StaffOnServiceCreateWithoutServiceInput, StaffOnServiceUncheckedCreateWithoutServiceInput> | StaffOnServiceCreateWithoutServiceInput[] | StaffOnServiceUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: StaffOnServiceCreateOrConnectWithoutServiceInput | StaffOnServiceCreateOrConnectWithoutServiceInput[]
    createMany?: StaffOnServiceCreateManyServiceInputEnvelope
    connect?: StaffOnServiceWhereUniqueInput | StaffOnServiceWhereUniqueInput[]
  }

  export type BookedServiceCreateNestedManyWithoutServiceInput = {
    create?: XOR<BookedServiceCreateWithoutServiceInput, BookedServiceUncheckedCreateWithoutServiceInput> | BookedServiceCreateWithoutServiceInput[] | BookedServiceUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: BookedServiceCreateOrConnectWithoutServiceInput | BookedServiceCreateOrConnectWithoutServiceInput[]
    createMany?: BookedServiceCreateManyServiceInputEnvelope
    connect?: BookedServiceWhereUniqueInput | BookedServiceWhereUniqueInput[]
  }

  export type ChatLogUncheckedCreateNestedManyWithoutServiceInput = {
    create?: XOR<ChatLogCreateWithoutServiceInput, ChatLogUncheckedCreateWithoutServiceInput> | ChatLogCreateWithoutServiceInput[] | ChatLogUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: ChatLogCreateOrConnectWithoutServiceInput | ChatLogCreateOrConnectWithoutServiceInput[]
    createMany?: ChatLogCreateManyServiceInputEnvelope
    connect?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
  }

  export type StaffOnServiceUncheckedCreateNestedManyWithoutServiceInput = {
    create?: XOR<StaffOnServiceCreateWithoutServiceInput, StaffOnServiceUncheckedCreateWithoutServiceInput> | StaffOnServiceCreateWithoutServiceInput[] | StaffOnServiceUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: StaffOnServiceCreateOrConnectWithoutServiceInput | StaffOnServiceCreateOrConnectWithoutServiceInput[]
    createMany?: StaffOnServiceCreateManyServiceInputEnvelope
    connect?: StaffOnServiceWhereUniqueInput | StaffOnServiceWhereUniqueInput[]
  }

  export type BookedServiceUncheckedCreateNestedManyWithoutServiceInput = {
    create?: XOR<BookedServiceCreateWithoutServiceInput, BookedServiceUncheckedCreateWithoutServiceInput> | BookedServiceCreateWithoutServiceInput[] | BookedServiceUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: BookedServiceCreateOrConnectWithoutServiceInput | BookedServiceCreateOrConnectWithoutServiceInput[]
    createMany?: BookedServiceCreateManyServiceInputEnvelope
    connect?: BookedServiceWhereUniqueInput | BookedServiceWhereUniqueInput[]
  }

  export type ServiceUpdatepetTypeInput = {
    set?: $Enums.PetType[]
    push?: $Enums.PetType | $Enums.PetType[]
  }

  export type ChatLogUpdateManyWithoutServiceNestedInput = {
    create?: XOR<ChatLogCreateWithoutServiceInput, ChatLogUncheckedCreateWithoutServiceInput> | ChatLogCreateWithoutServiceInput[] | ChatLogUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: ChatLogCreateOrConnectWithoutServiceInput | ChatLogCreateOrConnectWithoutServiceInput[]
    upsert?: ChatLogUpsertWithWhereUniqueWithoutServiceInput | ChatLogUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: ChatLogCreateManyServiceInputEnvelope
    set?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
    disconnect?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
    delete?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
    connect?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
    update?: ChatLogUpdateWithWhereUniqueWithoutServiceInput | ChatLogUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: ChatLogUpdateManyWithWhereWithoutServiceInput | ChatLogUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: ChatLogScalarWhereInput | ChatLogScalarWhereInput[]
  }

  export type StaffOnServiceUpdateManyWithoutServiceNestedInput = {
    create?: XOR<StaffOnServiceCreateWithoutServiceInput, StaffOnServiceUncheckedCreateWithoutServiceInput> | StaffOnServiceCreateWithoutServiceInput[] | StaffOnServiceUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: StaffOnServiceCreateOrConnectWithoutServiceInput | StaffOnServiceCreateOrConnectWithoutServiceInput[]
    upsert?: StaffOnServiceUpsertWithWhereUniqueWithoutServiceInput | StaffOnServiceUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: StaffOnServiceCreateManyServiceInputEnvelope
    set?: StaffOnServiceWhereUniqueInput | StaffOnServiceWhereUniqueInput[]
    disconnect?: StaffOnServiceWhereUniqueInput | StaffOnServiceWhereUniqueInput[]
    delete?: StaffOnServiceWhereUniqueInput | StaffOnServiceWhereUniqueInput[]
    connect?: StaffOnServiceWhereUniqueInput | StaffOnServiceWhereUniqueInput[]
    update?: StaffOnServiceUpdateWithWhereUniqueWithoutServiceInput | StaffOnServiceUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: StaffOnServiceUpdateManyWithWhereWithoutServiceInput | StaffOnServiceUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: StaffOnServiceScalarWhereInput | StaffOnServiceScalarWhereInput[]
  }

  export type BookedServiceUpdateManyWithoutServiceNestedInput = {
    create?: XOR<BookedServiceCreateWithoutServiceInput, BookedServiceUncheckedCreateWithoutServiceInput> | BookedServiceCreateWithoutServiceInput[] | BookedServiceUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: BookedServiceCreateOrConnectWithoutServiceInput | BookedServiceCreateOrConnectWithoutServiceInput[]
    upsert?: BookedServiceUpsertWithWhereUniqueWithoutServiceInput | BookedServiceUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: BookedServiceCreateManyServiceInputEnvelope
    set?: BookedServiceWhereUniqueInput | BookedServiceWhereUniqueInput[]
    disconnect?: BookedServiceWhereUniqueInput | BookedServiceWhereUniqueInput[]
    delete?: BookedServiceWhereUniqueInput | BookedServiceWhereUniqueInput[]
    connect?: BookedServiceWhereUniqueInput | BookedServiceWhereUniqueInput[]
    update?: BookedServiceUpdateWithWhereUniqueWithoutServiceInput | BookedServiceUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: BookedServiceUpdateManyWithWhereWithoutServiceInput | BookedServiceUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: BookedServiceScalarWhereInput | BookedServiceScalarWhereInput[]
  }

  export type ChatLogUncheckedUpdateManyWithoutServiceNestedInput = {
    create?: XOR<ChatLogCreateWithoutServiceInput, ChatLogUncheckedCreateWithoutServiceInput> | ChatLogCreateWithoutServiceInput[] | ChatLogUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: ChatLogCreateOrConnectWithoutServiceInput | ChatLogCreateOrConnectWithoutServiceInput[]
    upsert?: ChatLogUpsertWithWhereUniqueWithoutServiceInput | ChatLogUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: ChatLogCreateManyServiceInputEnvelope
    set?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
    disconnect?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
    delete?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
    connect?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
    update?: ChatLogUpdateWithWhereUniqueWithoutServiceInput | ChatLogUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: ChatLogUpdateManyWithWhereWithoutServiceInput | ChatLogUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: ChatLogScalarWhereInput | ChatLogScalarWhereInput[]
  }

  export type StaffOnServiceUncheckedUpdateManyWithoutServiceNestedInput = {
    create?: XOR<StaffOnServiceCreateWithoutServiceInput, StaffOnServiceUncheckedCreateWithoutServiceInput> | StaffOnServiceCreateWithoutServiceInput[] | StaffOnServiceUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: StaffOnServiceCreateOrConnectWithoutServiceInput | StaffOnServiceCreateOrConnectWithoutServiceInput[]
    upsert?: StaffOnServiceUpsertWithWhereUniqueWithoutServiceInput | StaffOnServiceUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: StaffOnServiceCreateManyServiceInputEnvelope
    set?: StaffOnServiceWhereUniqueInput | StaffOnServiceWhereUniqueInput[]
    disconnect?: StaffOnServiceWhereUniqueInput | StaffOnServiceWhereUniqueInput[]
    delete?: StaffOnServiceWhereUniqueInput | StaffOnServiceWhereUniqueInput[]
    connect?: StaffOnServiceWhereUniqueInput | StaffOnServiceWhereUniqueInput[]
    update?: StaffOnServiceUpdateWithWhereUniqueWithoutServiceInput | StaffOnServiceUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: StaffOnServiceUpdateManyWithWhereWithoutServiceInput | StaffOnServiceUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: StaffOnServiceScalarWhereInput | StaffOnServiceScalarWhereInput[]
  }

  export type BookedServiceUncheckedUpdateManyWithoutServiceNestedInput = {
    create?: XOR<BookedServiceCreateWithoutServiceInput, BookedServiceUncheckedCreateWithoutServiceInput> | BookedServiceCreateWithoutServiceInput[] | BookedServiceUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: BookedServiceCreateOrConnectWithoutServiceInput | BookedServiceCreateOrConnectWithoutServiceInput[]
    upsert?: BookedServiceUpsertWithWhereUniqueWithoutServiceInput | BookedServiceUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: BookedServiceCreateManyServiceInputEnvelope
    set?: BookedServiceWhereUniqueInput | BookedServiceWhereUniqueInput[]
    disconnect?: BookedServiceWhereUniqueInput | BookedServiceWhereUniqueInput[]
    delete?: BookedServiceWhereUniqueInput | BookedServiceWhereUniqueInput[]
    connect?: BookedServiceWhereUniqueInput | BookedServiceWhereUniqueInput[]
    update?: BookedServiceUpdateWithWhereUniqueWithoutServiceInput | BookedServiceUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: BookedServiceUpdateManyWithWhereWithoutServiceInput | BookedServiceUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: BookedServiceScalarWhereInput | BookedServiceScalarWhereInput[]
  }

  export type ServiceCreateNestedOneWithoutBookedServicesInput = {
    create?: XOR<ServiceCreateWithoutBookedServicesInput, ServiceUncheckedCreateWithoutBookedServicesInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutBookedServicesInput
    connect?: ServiceWhereUniqueInput
  }

  export type PetCreateNestedOneWithoutScheduledInput = {
    create?: XOR<PetCreateWithoutScheduledInput, PetUncheckedCreateWithoutScheduledInput>
    connectOrCreate?: PetCreateOrConnectWithoutScheduledInput
    connect?: PetWhereUniqueInput
  }

  export type BookingCreateNestedOneWithoutBooked_serviceInput = {
    create?: XOR<BookingCreateWithoutBooked_serviceInput, BookingUncheckedCreateWithoutBooked_serviceInput>
    connectOrCreate?: BookingCreateOrConnectWithoutBooked_serviceInput
    connect?: BookingWhereUniqueInput
  }

  export type ServiceUpdateOneRequiredWithoutBookedServicesNestedInput = {
    create?: XOR<ServiceCreateWithoutBookedServicesInput, ServiceUncheckedCreateWithoutBookedServicesInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutBookedServicesInput
    upsert?: ServiceUpsertWithoutBookedServicesInput
    connect?: ServiceWhereUniqueInput
    update?: XOR<XOR<ServiceUpdateToOneWithWhereWithoutBookedServicesInput, ServiceUpdateWithoutBookedServicesInput>, ServiceUncheckedUpdateWithoutBookedServicesInput>
  }

  export type PetUpdateOneWithoutScheduledNestedInput = {
    create?: XOR<PetCreateWithoutScheduledInput, PetUncheckedCreateWithoutScheduledInput>
    connectOrCreate?: PetCreateOrConnectWithoutScheduledInput
    upsert?: PetUpsertWithoutScheduledInput
    disconnect?: PetWhereInput | boolean
    delete?: PetWhereInput | boolean
    connect?: PetWhereUniqueInput
    update?: XOR<XOR<PetUpdateToOneWithWhereWithoutScheduledInput, PetUpdateWithoutScheduledInput>, PetUncheckedUpdateWithoutScheduledInput>
  }

  export type BookingUpdateOneRequiredWithoutBooked_serviceNestedInput = {
    create?: XOR<BookingCreateWithoutBooked_serviceInput, BookingUncheckedCreateWithoutBooked_serviceInput>
    connectOrCreate?: BookingCreateOrConnectWithoutBooked_serviceInput
    upsert?: BookingUpsertWithoutBooked_serviceInput
    connect?: BookingWhereUniqueInput
    update?: XOR<XOR<BookingUpdateToOneWithWhereWithoutBooked_serviceInput, BookingUpdateWithoutBooked_serviceInput>, BookingUncheckedUpdateWithoutBooked_serviceInput>
  }

  export type BookedServiceCreateNestedManyWithoutBookingInput = {
    create?: XOR<BookedServiceCreateWithoutBookingInput, BookedServiceUncheckedCreateWithoutBookingInput> | BookedServiceCreateWithoutBookingInput[] | BookedServiceUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: BookedServiceCreateOrConnectWithoutBookingInput | BookedServiceCreateOrConnectWithoutBookingInput[]
    createMany?: BookedServiceCreateManyBookingInputEnvelope
    connect?: BookedServiceWhereUniqueInput | BookedServiceWhereUniqueInput[]
  }

  export type BookedRoomCreateNestedManyWithoutBookingInput = {
    create?: XOR<BookedRoomCreateWithoutBookingInput, BookedRoomUncheckedCreateWithoutBookingInput> | BookedRoomCreateWithoutBookingInput[] | BookedRoomUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: BookedRoomCreateOrConnectWithoutBookingInput | BookedRoomCreateOrConnectWithoutBookingInput[]
    createMany?: BookedRoomCreateManyBookingInputEnvelope
    connect?: BookedRoomWhereUniqueInput | BookedRoomWhereUniqueInput[]
  }

  export type CustomerCreateNestedOneWithoutBookingsInput = {
    create?: XOR<CustomerCreateWithoutBookingsInput, CustomerUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutBookingsInput
    connect?: CustomerWhereUniqueInput
  }

  export type PaymentCreateNestedOneWithoutBookingInput = {
    create?: XOR<PaymentCreateWithoutBookingInput, PaymentUncheckedCreateWithoutBookingInput>
    connectOrCreate?: PaymentCreateOrConnectWithoutBookingInput
    connect?: PaymentWhereUniqueInput
  }

  export type BookedServiceUncheckedCreateNestedManyWithoutBookingInput = {
    create?: XOR<BookedServiceCreateWithoutBookingInput, BookedServiceUncheckedCreateWithoutBookingInput> | BookedServiceCreateWithoutBookingInput[] | BookedServiceUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: BookedServiceCreateOrConnectWithoutBookingInput | BookedServiceCreateOrConnectWithoutBookingInput[]
    createMany?: BookedServiceCreateManyBookingInputEnvelope
    connect?: BookedServiceWhereUniqueInput | BookedServiceWhereUniqueInput[]
  }

  export type BookedRoomUncheckedCreateNestedManyWithoutBookingInput = {
    create?: XOR<BookedRoomCreateWithoutBookingInput, BookedRoomUncheckedCreateWithoutBookingInput> | BookedRoomCreateWithoutBookingInput[] | BookedRoomUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: BookedRoomCreateOrConnectWithoutBookingInput | BookedRoomCreateOrConnectWithoutBookingInput[]
    createMany?: BookedRoomCreateManyBookingInputEnvelope
    connect?: BookedRoomWhereUniqueInput | BookedRoomWhereUniqueInput[]
  }

  export type PaymentUncheckedCreateNestedOneWithoutBookingInput = {
    create?: XOR<PaymentCreateWithoutBookingInput, PaymentUncheckedCreateWithoutBookingInput>
    connectOrCreate?: PaymentCreateOrConnectWithoutBookingInput
    connect?: PaymentWhereUniqueInput
  }

  export type EnumBookingStatusFieldUpdateOperationsInput = {
    set?: $Enums.BookingStatus
  }

  export type BookedServiceUpdateManyWithoutBookingNestedInput = {
    create?: XOR<BookedServiceCreateWithoutBookingInput, BookedServiceUncheckedCreateWithoutBookingInput> | BookedServiceCreateWithoutBookingInput[] | BookedServiceUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: BookedServiceCreateOrConnectWithoutBookingInput | BookedServiceCreateOrConnectWithoutBookingInput[]
    upsert?: BookedServiceUpsertWithWhereUniqueWithoutBookingInput | BookedServiceUpsertWithWhereUniqueWithoutBookingInput[]
    createMany?: BookedServiceCreateManyBookingInputEnvelope
    set?: BookedServiceWhereUniqueInput | BookedServiceWhereUniqueInput[]
    disconnect?: BookedServiceWhereUniqueInput | BookedServiceWhereUniqueInput[]
    delete?: BookedServiceWhereUniqueInput | BookedServiceWhereUniqueInput[]
    connect?: BookedServiceWhereUniqueInput | BookedServiceWhereUniqueInput[]
    update?: BookedServiceUpdateWithWhereUniqueWithoutBookingInput | BookedServiceUpdateWithWhereUniqueWithoutBookingInput[]
    updateMany?: BookedServiceUpdateManyWithWhereWithoutBookingInput | BookedServiceUpdateManyWithWhereWithoutBookingInput[]
    deleteMany?: BookedServiceScalarWhereInput | BookedServiceScalarWhereInput[]
  }

  export type BookedRoomUpdateManyWithoutBookingNestedInput = {
    create?: XOR<BookedRoomCreateWithoutBookingInput, BookedRoomUncheckedCreateWithoutBookingInput> | BookedRoomCreateWithoutBookingInput[] | BookedRoomUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: BookedRoomCreateOrConnectWithoutBookingInput | BookedRoomCreateOrConnectWithoutBookingInput[]
    upsert?: BookedRoomUpsertWithWhereUniqueWithoutBookingInput | BookedRoomUpsertWithWhereUniqueWithoutBookingInput[]
    createMany?: BookedRoomCreateManyBookingInputEnvelope
    set?: BookedRoomWhereUniqueInput | BookedRoomWhereUniqueInput[]
    disconnect?: BookedRoomWhereUniqueInput | BookedRoomWhereUniqueInput[]
    delete?: BookedRoomWhereUniqueInput | BookedRoomWhereUniqueInput[]
    connect?: BookedRoomWhereUniqueInput | BookedRoomWhereUniqueInput[]
    update?: BookedRoomUpdateWithWhereUniqueWithoutBookingInput | BookedRoomUpdateWithWhereUniqueWithoutBookingInput[]
    updateMany?: BookedRoomUpdateManyWithWhereWithoutBookingInput | BookedRoomUpdateManyWithWhereWithoutBookingInput[]
    deleteMany?: BookedRoomScalarWhereInput | BookedRoomScalarWhereInput[]
  }

  export type CustomerUpdateOneWithoutBookingsNestedInput = {
    create?: XOR<CustomerCreateWithoutBookingsInput, CustomerUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutBookingsInput
    upsert?: CustomerUpsertWithoutBookingsInput
    disconnect?: CustomerWhereInput | boolean
    delete?: CustomerWhereInput | boolean
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutBookingsInput, CustomerUpdateWithoutBookingsInput>, CustomerUncheckedUpdateWithoutBookingsInput>
  }

  export type PaymentUpdateOneWithoutBookingNestedInput = {
    create?: XOR<PaymentCreateWithoutBookingInput, PaymentUncheckedCreateWithoutBookingInput>
    connectOrCreate?: PaymentCreateOrConnectWithoutBookingInput
    upsert?: PaymentUpsertWithoutBookingInput
    disconnect?: PaymentWhereInput | boolean
    delete?: PaymentWhereInput | boolean
    connect?: PaymentWhereUniqueInput
    update?: XOR<XOR<PaymentUpdateToOneWithWhereWithoutBookingInput, PaymentUpdateWithoutBookingInput>, PaymentUncheckedUpdateWithoutBookingInput>
  }

  export type BookedServiceUncheckedUpdateManyWithoutBookingNestedInput = {
    create?: XOR<BookedServiceCreateWithoutBookingInput, BookedServiceUncheckedCreateWithoutBookingInput> | BookedServiceCreateWithoutBookingInput[] | BookedServiceUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: BookedServiceCreateOrConnectWithoutBookingInput | BookedServiceCreateOrConnectWithoutBookingInput[]
    upsert?: BookedServiceUpsertWithWhereUniqueWithoutBookingInput | BookedServiceUpsertWithWhereUniqueWithoutBookingInput[]
    createMany?: BookedServiceCreateManyBookingInputEnvelope
    set?: BookedServiceWhereUniqueInput | BookedServiceWhereUniqueInput[]
    disconnect?: BookedServiceWhereUniqueInput | BookedServiceWhereUniqueInput[]
    delete?: BookedServiceWhereUniqueInput | BookedServiceWhereUniqueInput[]
    connect?: BookedServiceWhereUniqueInput | BookedServiceWhereUniqueInput[]
    update?: BookedServiceUpdateWithWhereUniqueWithoutBookingInput | BookedServiceUpdateWithWhereUniqueWithoutBookingInput[]
    updateMany?: BookedServiceUpdateManyWithWhereWithoutBookingInput | BookedServiceUpdateManyWithWhereWithoutBookingInput[]
    deleteMany?: BookedServiceScalarWhereInput | BookedServiceScalarWhereInput[]
  }

  export type BookedRoomUncheckedUpdateManyWithoutBookingNestedInput = {
    create?: XOR<BookedRoomCreateWithoutBookingInput, BookedRoomUncheckedCreateWithoutBookingInput> | BookedRoomCreateWithoutBookingInput[] | BookedRoomUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: BookedRoomCreateOrConnectWithoutBookingInput | BookedRoomCreateOrConnectWithoutBookingInput[]
    upsert?: BookedRoomUpsertWithWhereUniqueWithoutBookingInput | BookedRoomUpsertWithWhereUniqueWithoutBookingInput[]
    createMany?: BookedRoomCreateManyBookingInputEnvelope
    set?: BookedRoomWhereUniqueInput | BookedRoomWhereUniqueInput[]
    disconnect?: BookedRoomWhereUniqueInput | BookedRoomWhereUniqueInput[]
    delete?: BookedRoomWhereUniqueInput | BookedRoomWhereUniqueInput[]
    connect?: BookedRoomWhereUniqueInput | BookedRoomWhereUniqueInput[]
    update?: BookedRoomUpdateWithWhereUniqueWithoutBookingInput | BookedRoomUpdateWithWhereUniqueWithoutBookingInput[]
    updateMany?: BookedRoomUpdateManyWithWhereWithoutBookingInput | BookedRoomUpdateManyWithWhereWithoutBookingInput[]
    deleteMany?: BookedRoomScalarWhereInput | BookedRoomScalarWhereInput[]
  }

  export type PaymentUncheckedUpdateOneWithoutBookingNestedInput = {
    create?: XOR<PaymentCreateWithoutBookingInput, PaymentUncheckedCreateWithoutBookingInput>
    connectOrCreate?: PaymentCreateOrConnectWithoutBookingInput
    upsert?: PaymentUpsertWithoutBookingInput
    disconnect?: PaymentWhereInput | boolean
    delete?: PaymentWhereInput | boolean
    connect?: PaymentWhereUniqueInput
    update?: XOR<XOR<PaymentUpdateToOneWithWhereWithoutBookingInput, PaymentUpdateWithoutBookingInput>, PaymentUncheckedUpdateWithoutBookingInput>
  }

  export type BookingCreateNestedOneWithoutPaymentInput = {
    create?: XOR<BookingCreateWithoutPaymentInput, BookingUncheckedCreateWithoutPaymentInput>
    connectOrCreate?: BookingCreateOrConnectWithoutPaymentInput
    connect?: BookingWhereUniqueInput
  }

  export type CustomerCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<CustomerCreateWithoutPaymentsInput, CustomerUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutPaymentsInput
    connect?: CustomerWhereUniqueInput
  }

  export type EnumPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.PaymentStatus
  }

  export type BookingUpdateOneWithoutPaymentNestedInput = {
    create?: XOR<BookingCreateWithoutPaymentInput, BookingUncheckedCreateWithoutPaymentInput>
    connectOrCreate?: BookingCreateOrConnectWithoutPaymentInput
    upsert?: BookingUpsertWithoutPaymentInput
    disconnect?: BookingWhereInput | boolean
    delete?: BookingWhereInput | boolean
    connect?: BookingWhereUniqueInput
    update?: XOR<XOR<BookingUpdateToOneWithWhereWithoutPaymentInput, BookingUpdateWithoutPaymentInput>, BookingUncheckedUpdateWithoutPaymentInput>
  }

  export type CustomerUpdateOneWithoutPaymentsNestedInput = {
    create?: XOR<CustomerCreateWithoutPaymentsInput, CustomerUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutPaymentsInput
    upsert?: CustomerUpsertWithoutPaymentsInput
    disconnect?: CustomerWhereInput | boolean
    delete?: CustomerWhereInput | boolean
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutPaymentsInput, CustomerUpdateWithoutPaymentsInput>, CustomerUncheckedUpdateWithoutPaymentsInput>
  }

  export type StaffCreateNestedOneWithoutCaresInput = {
    create?: XOR<StaffCreateWithoutCaresInput, StaffUncheckedCreateWithoutCaresInput>
    connectOrCreate?: StaffCreateOrConnectWithoutCaresInput
    connect?: StaffWhereUniqueInput
  }

  export type PetCreateNestedOneWithoutCaresInput = {
    create?: XOR<PetCreateWithoutCaresInput, PetUncheckedCreateWithoutCaresInput>
    connectOrCreate?: PetCreateOrConnectWithoutCaresInput
    connect?: PetWhereUniqueInput
  }

  export type StaffUpdateOneRequiredWithoutCaresNestedInput = {
    create?: XOR<StaffCreateWithoutCaresInput, StaffUncheckedCreateWithoutCaresInput>
    connectOrCreate?: StaffCreateOrConnectWithoutCaresInput
    upsert?: StaffUpsertWithoutCaresInput
    connect?: StaffWhereUniqueInput
    update?: XOR<XOR<StaffUpdateToOneWithWhereWithoutCaresInput, StaffUpdateWithoutCaresInput>, StaffUncheckedUpdateWithoutCaresInput>
  }

  export type PetUpdateOneRequiredWithoutCaresNestedInput = {
    create?: XOR<PetCreateWithoutCaresInput, PetUncheckedCreateWithoutCaresInput>
    connectOrCreate?: PetCreateOrConnectWithoutCaresInput
    upsert?: PetUpsertWithoutCaresInput
    connect?: PetWhereUniqueInput
    update?: XOR<XOR<PetUpdateToOneWithWhereWithoutCaresInput, PetUpdateWithoutCaresInput>, PetUncheckedUpdateWithoutCaresInput>
  }

  export type StaffCreateNestedOneWithoutStaffOnServicesInput = {
    create?: XOR<StaffCreateWithoutStaffOnServicesInput, StaffUncheckedCreateWithoutStaffOnServicesInput>
    connectOrCreate?: StaffCreateOrConnectWithoutStaffOnServicesInput
    connect?: StaffWhereUniqueInput
  }

  export type ServiceCreateNestedOneWithoutStaffOnServicesInput = {
    create?: XOR<ServiceCreateWithoutStaffOnServicesInput, ServiceUncheckedCreateWithoutStaffOnServicesInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutStaffOnServicesInput
    connect?: ServiceWhereUniqueInput
  }

  export type StaffUpdateOneRequiredWithoutStaffOnServicesNestedInput = {
    create?: XOR<StaffCreateWithoutStaffOnServicesInput, StaffUncheckedCreateWithoutStaffOnServicesInput>
    connectOrCreate?: StaffCreateOrConnectWithoutStaffOnServicesInput
    upsert?: StaffUpsertWithoutStaffOnServicesInput
    connect?: StaffWhereUniqueInput
    update?: XOR<XOR<StaffUpdateToOneWithWhereWithoutStaffOnServicesInput, StaffUpdateWithoutStaffOnServicesInput>, StaffUncheckedUpdateWithoutStaffOnServicesInput>
  }

  export type ServiceUpdateOneRequiredWithoutStaffOnServicesNestedInput = {
    create?: XOR<ServiceCreateWithoutStaffOnServicesInput, ServiceUncheckedCreateWithoutStaffOnServicesInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutStaffOnServicesInput
    upsert?: ServiceUpsertWithoutStaffOnServicesInput
    connect?: ServiceWhereUniqueInput
    update?: XOR<XOR<ServiceUpdateToOneWithWhereWithoutStaffOnServicesInput, ServiceUpdateWithoutStaffOnServicesInput>, ServiceUncheckedUpdateWithoutStaffOnServicesInput>
  }

  export type RoomCreateNestedOneWithoutStaffOnRoomsInput = {
    create?: XOR<RoomCreateWithoutStaffOnRoomsInput, RoomUncheckedCreateWithoutStaffOnRoomsInput>
    connectOrCreate?: RoomCreateOrConnectWithoutStaffOnRoomsInput
    connect?: RoomWhereUniqueInput
  }

  export type StaffCreateNestedOneWithoutRoomStaffInput = {
    create?: XOR<StaffCreateWithoutRoomStaffInput, StaffUncheckedCreateWithoutRoomStaffInput>
    connectOrCreate?: StaffCreateOrConnectWithoutRoomStaffInput
    connect?: StaffWhereUniqueInput
  }

  export type RoomUpdateOneRequiredWithoutStaffOnRoomsNestedInput = {
    create?: XOR<RoomCreateWithoutStaffOnRoomsInput, RoomUncheckedCreateWithoutStaffOnRoomsInput>
    connectOrCreate?: RoomCreateOrConnectWithoutStaffOnRoomsInput
    upsert?: RoomUpsertWithoutStaffOnRoomsInput
    connect?: RoomWhereUniqueInput
    update?: XOR<XOR<RoomUpdateToOneWithWhereWithoutStaffOnRoomsInput, RoomUpdateWithoutStaffOnRoomsInput>, RoomUncheckedUpdateWithoutStaffOnRoomsInput>
  }

  export type StaffUpdateOneRequiredWithoutRoomStaffNestedInput = {
    create?: XOR<StaffCreateWithoutRoomStaffInput, StaffUncheckedCreateWithoutRoomStaffInput>
    connectOrCreate?: StaffCreateOrConnectWithoutRoomStaffInput
    upsert?: StaffUpsertWithoutRoomStaffInput
    connect?: StaffWhereUniqueInput
    update?: XOR<XOR<StaffUpdateToOneWithWhereWithoutRoomStaffInput, StaffUpdateWithoutRoomStaffInput>, StaffUncheckedUpdateWithoutRoomStaffInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedEnumBankFilter<$PrismaModel = never> = {
    equals?: $Enums.Bank | EnumBankFieldRefInput<$PrismaModel>
    in?: $Enums.Bank[] | ListEnumBankFieldRefInput<$PrismaModel>
    notIn?: $Enums.Bank[] | ListEnumBankFieldRefInput<$PrismaModel>
    not?: NestedEnumBankFilter<$PrismaModel> | $Enums.Bank
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumBankWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Bank | EnumBankFieldRefInput<$PrismaModel>
    in?: $Enums.Bank[] | ListEnumBankFieldRefInput<$PrismaModel>
    notIn?: $Enums.Bank[] | ListEnumBankFieldRefInput<$PrismaModel>
    not?: NestedEnumBankWithAggregatesFilter<$PrismaModel> | $Enums.Bank
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBankFilter<$PrismaModel>
    _max?: NestedEnumBankFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedEnumSexFilter<$PrismaModel = never> = {
    equals?: $Enums.Sex | EnumSexFieldRefInput<$PrismaModel>
    in?: $Enums.Sex[] | ListEnumSexFieldRefInput<$PrismaModel>
    notIn?: $Enums.Sex[] | ListEnumSexFieldRefInput<$PrismaModel>
    not?: NestedEnumSexFilter<$PrismaModel> | $Enums.Sex
  }

  export type NestedEnumPetTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PetType | EnumPetTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PetType[] | ListEnumPetTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PetType[] | ListEnumPetTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPetTypeFilter<$PrismaModel> | $Enums.PetType
  }

  export type NestedEnumPetStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PetStatus | EnumPetStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PetStatus[] | ListEnumPetStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PetStatus[] | ListEnumPetStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPetStatusFilter<$PrismaModel> | $Enums.PetStatus
  }

  export type NestedEnumSexWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Sex | EnumSexFieldRefInput<$PrismaModel>
    in?: $Enums.Sex[] | ListEnumSexFieldRefInput<$PrismaModel>
    notIn?: $Enums.Sex[] | ListEnumSexFieldRefInput<$PrismaModel>
    not?: NestedEnumSexWithAggregatesFilter<$PrismaModel> | $Enums.Sex
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSexFilter<$PrismaModel>
    _max?: NestedEnumSexFilter<$PrismaModel>
  }

  export type NestedEnumPetTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PetType | EnumPetTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PetType[] | ListEnumPetTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PetType[] | ListEnumPetTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPetTypeWithAggregatesFilter<$PrismaModel> | $Enums.PetType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPetTypeFilter<$PrismaModel>
    _max?: NestedEnumPetTypeFilter<$PrismaModel>
  }

  export type NestedEnumPetStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PetStatus | EnumPetStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PetStatus[] | ListEnumPetStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PetStatus[] | ListEnumPetStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPetStatusWithAggregatesFilter<$PrismaModel> | $Enums.PetStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPetStatusFilter<$PrismaModel>
    _max?: NestedEnumPetStatusFilter<$PrismaModel>
  }

  export type NestedEnumBookingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusFilter<$PrismaModel> | $Enums.BookingStatus
  }

  export type NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel> | $Enums.BookingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBookingStatusFilter<$PrismaModel>
    _max?: NestedEnumBookingStatusFilter<$PrismaModel>
  }

  export type NestedEnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type StaffCreateWithoutUserInput = {
    wages: number
    bank_company?: $Enums.Bank
    bank_account: string
    replies?: ChatLogCreateNestedManyWithoutStaffInput
    cares?: CareCreateNestedManyWithoutStaffInput
    staffOnServices?: StaffOnServiceCreateNestedManyWithoutStaffInput
    roomStaff?: RoomStaffCreateNestedManyWithoutStaffInput
  }

  export type StaffUncheckedCreateWithoutUserInput = {
    id?: number
    wages: number
    bank_company?: $Enums.Bank
    bank_account: string
    replies?: ChatLogUncheckedCreateNestedManyWithoutStaffInput
    cares?: CareUncheckedCreateNestedManyWithoutStaffInput
    staffOnServices?: StaffOnServiceUncheckedCreateNestedManyWithoutStaffInput
    roomStaff?: RoomStaffUncheckedCreateNestedManyWithoutStaffInput
  }

  export type StaffCreateOrConnectWithoutUserInput = {
    where: StaffWhereUniqueInput
    create: XOR<StaffCreateWithoutUserInput, StaffUncheckedCreateWithoutUserInput>
  }

  export type CustomerCreateWithoutUserInput = {
    chats?: ChatLogCreateNestedManyWithoutCustomerInput
    pets?: PetCreateNestedManyWithoutCustomerInput
    bookings?: BookingCreateNestedManyWithoutCustomerInput
    payments?: PaymentCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutUserInput = {
    id?: number
    chats?: ChatLogUncheckedCreateNestedManyWithoutCustomerInput
    pets?: PetUncheckedCreateNestedManyWithoutCustomerInput
    bookings?: BookingUncheckedCreateNestedManyWithoutCustomerInput
    payments?: PaymentUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerCreateOrConnectWithoutUserInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutUserInput, CustomerUncheckedCreateWithoutUserInput>
  }

  export type StaffUpsertWithoutUserInput = {
    update: XOR<StaffUpdateWithoutUserInput, StaffUncheckedUpdateWithoutUserInput>
    create: XOR<StaffCreateWithoutUserInput, StaffUncheckedCreateWithoutUserInput>
    where?: StaffWhereInput
  }

  export type StaffUpdateToOneWithWhereWithoutUserInput = {
    where?: StaffWhereInput
    data: XOR<StaffUpdateWithoutUserInput, StaffUncheckedUpdateWithoutUserInput>
  }

  export type StaffUpdateWithoutUserInput = {
    wages?: FloatFieldUpdateOperationsInput | number
    bank_company?: EnumBankFieldUpdateOperationsInput | $Enums.Bank
    bank_account?: StringFieldUpdateOperationsInput | string
    replies?: ChatLogUpdateManyWithoutStaffNestedInput
    cares?: CareUpdateManyWithoutStaffNestedInput
    staffOnServices?: StaffOnServiceUpdateManyWithoutStaffNestedInput
    roomStaff?: RoomStaffUpdateManyWithoutStaffNestedInput
  }

  export type StaffUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    wages?: FloatFieldUpdateOperationsInput | number
    bank_company?: EnumBankFieldUpdateOperationsInput | $Enums.Bank
    bank_account?: StringFieldUpdateOperationsInput | string
    replies?: ChatLogUncheckedUpdateManyWithoutStaffNestedInput
    cares?: CareUncheckedUpdateManyWithoutStaffNestedInput
    staffOnServices?: StaffOnServiceUncheckedUpdateManyWithoutStaffNestedInput
    roomStaff?: RoomStaffUncheckedUpdateManyWithoutStaffNestedInput
  }

  export type CustomerUpsertWithoutUserInput = {
    update: XOR<CustomerUpdateWithoutUserInput, CustomerUncheckedUpdateWithoutUserInput>
    create: XOR<CustomerCreateWithoutUserInput, CustomerUncheckedCreateWithoutUserInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutUserInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutUserInput, CustomerUncheckedUpdateWithoutUserInput>
  }

  export type CustomerUpdateWithoutUserInput = {
    chats?: ChatLogUpdateManyWithoutCustomerNestedInput
    pets?: PetUpdateManyWithoutCustomerNestedInput
    bookings?: BookingUpdateManyWithoutCustomerNestedInput
    payments?: PaymentUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    chats?: ChatLogUncheckedUpdateManyWithoutCustomerNestedInput
    pets?: PetUncheckedUpdateManyWithoutCustomerNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutCustomerNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type UserCreateWithoutStaffInput = {
    firstname: string
    lastname: string
    email: string
    phone_number: string
    user_name: string
    password: string
    role?: $Enums.Role
    customer?: CustomerCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutStaffInput = {
    id?: number
    firstname: string
    lastname: string
    email: string
    phone_number: string
    user_name: string
    password: string
    role?: $Enums.Role
    customer?: CustomerUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutStaffInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutStaffInput, UserUncheckedCreateWithoutStaffInput>
  }

  export type ChatLogCreateWithoutStaffInput = {
    review?: string | null
    reply?: string | null
    rating?: number | null
    review_date?: Date | string
    reply_date?: Date | string | null
    customer?: CustomerCreateNestedOneWithoutChatsInput
    service: ServiceCreateNestedOneWithoutReviewsInput
  }

  export type ChatLogUncheckedCreateWithoutStaffInput = {
    id?: number
    review?: string | null
    reply?: string | null
    rating?: number | null
    review_date?: Date | string
    reply_date?: Date | string | null
    customerId?: number | null
    serviceId: number
  }

  export type ChatLogCreateOrConnectWithoutStaffInput = {
    where: ChatLogWhereUniqueInput
    create: XOR<ChatLogCreateWithoutStaffInput, ChatLogUncheckedCreateWithoutStaffInput>
  }

  export type ChatLogCreateManyStaffInputEnvelope = {
    data: ChatLogCreateManyStaffInput | ChatLogCreateManyStaffInput[]
    skipDuplicates?: boolean
  }

  export type CareCreateWithoutStaffInput = {
    start_period?: Date | string
    end_period: Date | string
    pet: PetCreateNestedOneWithoutCaresInput
  }

  export type CareUncheckedCreateWithoutStaffInput = {
    start_period?: Date | string
    end_period: Date | string
    pet_id: number
  }

  export type CareCreateOrConnectWithoutStaffInput = {
    where: CareWhereUniqueInput
    create: XOR<CareCreateWithoutStaffInput, CareUncheckedCreateWithoutStaffInput>
  }

  export type CareCreateManyStaffInputEnvelope = {
    data: CareCreateManyStaffInput | CareCreateManyStaffInput[]
    skipDuplicates?: boolean
  }

  export type StaffOnServiceCreateWithoutStaffInput = {
    service: ServiceCreateNestedOneWithoutStaffOnServicesInput
  }

  export type StaffOnServiceUncheckedCreateWithoutStaffInput = {
    serviceId: number
  }

  export type StaffOnServiceCreateOrConnectWithoutStaffInput = {
    where: StaffOnServiceWhereUniqueInput
    create: XOR<StaffOnServiceCreateWithoutStaffInput, StaffOnServiceUncheckedCreateWithoutStaffInput>
  }

  export type StaffOnServiceCreateManyStaffInputEnvelope = {
    data: StaffOnServiceCreateManyStaffInput | StaffOnServiceCreateManyStaffInput[]
    skipDuplicates?: boolean
  }

  export type RoomStaffCreateWithoutStaffInput = {
    room: RoomCreateNestedOneWithoutStaffOnRoomsInput
  }

  export type RoomStaffUncheckedCreateWithoutStaffInput = {
    roomId: number
  }

  export type RoomStaffCreateOrConnectWithoutStaffInput = {
    where: RoomStaffWhereUniqueInput
    create: XOR<RoomStaffCreateWithoutStaffInput, RoomStaffUncheckedCreateWithoutStaffInput>
  }

  export type RoomStaffCreateManyStaffInputEnvelope = {
    data: RoomStaffCreateManyStaffInput | RoomStaffCreateManyStaffInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutStaffInput = {
    update: XOR<UserUpdateWithoutStaffInput, UserUncheckedUpdateWithoutStaffInput>
    create: XOR<UserCreateWithoutStaffInput, UserUncheckedCreateWithoutStaffInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutStaffInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutStaffInput, UserUncheckedUpdateWithoutStaffInput>
  }

  export type UserUpdateWithoutStaffInput = {
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone_number?: StringFieldUpdateOperationsInput | string
    user_name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    customer?: CustomerUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutStaffInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone_number?: StringFieldUpdateOperationsInput | string
    user_name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    customer?: CustomerUncheckedUpdateOneWithoutUserNestedInput
  }

  export type ChatLogUpsertWithWhereUniqueWithoutStaffInput = {
    where: ChatLogWhereUniqueInput
    update: XOR<ChatLogUpdateWithoutStaffInput, ChatLogUncheckedUpdateWithoutStaffInput>
    create: XOR<ChatLogCreateWithoutStaffInput, ChatLogUncheckedCreateWithoutStaffInput>
  }

  export type ChatLogUpdateWithWhereUniqueWithoutStaffInput = {
    where: ChatLogWhereUniqueInput
    data: XOR<ChatLogUpdateWithoutStaffInput, ChatLogUncheckedUpdateWithoutStaffInput>
  }

  export type ChatLogUpdateManyWithWhereWithoutStaffInput = {
    where: ChatLogScalarWhereInput
    data: XOR<ChatLogUpdateManyMutationInput, ChatLogUncheckedUpdateManyWithoutStaffInput>
  }

  export type ChatLogScalarWhereInput = {
    AND?: ChatLogScalarWhereInput | ChatLogScalarWhereInput[]
    OR?: ChatLogScalarWhereInput[]
    NOT?: ChatLogScalarWhereInput | ChatLogScalarWhereInput[]
    id?: IntFilter<"ChatLog"> | number
    review?: StringNullableFilter<"ChatLog"> | string | null
    reply?: StringNullableFilter<"ChatLog"> | string | null
    rating?: FloatNullableFilter<"ChatLog"> | number | null
    review_date?: DateTimeFilter<"ChatLog"> | Date | string
    reply_date?: DateTimeNullableFilter<"ChatLog"> | Date | string | null
    customerId?: IntNullableFilter<"ChatLog"> | number | null
    staffId?: IntNullableFilter<"ChatLog"> | number | null
    serviceId?: IntFilter<"ChatLog"> | number
  }

  export type CareUpsertWithWhereUniqueWithoutStaffInput = {
    where: CareWhereUniqueInput
    update: XOR<CareUpdateWithoutStaffInput, CareUncheckedUpdateWithoutStaffInput>
    create: XOR<CareCreateWithoutStaffInput, CareUncheckedCreateWithoutStaffInput>
  }

  export type CareUpdateWithWhereUniqueWithoutStaffInput = {
    where: CareWhereUniqueInput
    data: XOR<CareUpdateWithoutStaffInput, CareUncheckedUpdateWithoutStaffInput>
  }

  export type CareUpdateManyWithWhereWithoutStaffInput = {
    where: CareScalarWhereInput
    data: XOR<CareUpdateManyMutationInput, CareUncheckedUpdateManyWithoutStaffInput>
  }

  export type CareScalarWhereInput = {
    AND?: CareScalarWhereInput | CareScalarWhereInput[]
    OR?: CareScalarWhereInput[]
    NOT?: CareScalarWhereInput | CareScalarWhereInput[]
    start_period?: DateTimeFilter<"Care"> | Date | string
    end_period?: DateTimeFilter<"Care"> | Date | string
    staff_id?: IntFilter<"Care"> | number
    pet_id?: IntFilter<"Care"> | number
  }

  export type StaffOnServiceUpsertWithWhereUniqueWithoutStaffInput = {
    where: StaffOnServiceWhereUniqueInput
    update: XOR<StaffOnServiceUpdateWithoutStaffInput, StaffOnServiceUncheckedUpdateWithoutStaffInput>
    create: XOR<StaffOnServiceCreateWithoutStaffInput, StaffOnServiceUncheckedCreateWithoutStaffInput>
  }

  export type StaffOnServiceUpdateWithWhereUniqueWithoutStaffInput = {
    where: StaffOnServiceWhereUniqueInput
    data: XOR<StaffOnServiceUpdateWithoutStaffInput, StaffOnServiceUncheckedUpdateWithoutStaffInput>
  }

  export type StaffOnServiceUpdateManyWithWhereWithoutStaffInput = {
    where: StaffOnServiceScalarWhereInput
    data: XOR<StaffOnServiceUpdateManyMutationInput, StaffOnServiceUncheckedUpdateManyWithoutStaffInput>
  }

  export type StaffOnServiceScalarWhereInput = {
    AND?: StaffOnServiceScalarWhereInput | StaffOnServiceScalarWhereInput[]
    OR?: StaffOnServiceScalarWhereInput[]
    NOT?: StaffOnServiceScalarWhereInput | StaffOnServiceScalarWhereInput[]
    staffId?: IntFilter<"StaffOnService"> | number
    serviceId?: IntFilter<"StaffOnService"> | number
  }

  export type RoomStaffUpsertWithWhereUniqueWithoutStaffInput = {
    where: RoomStaffWhereUniqueInput
    update: XOR<RoomStaffUpdateWithoutStaffInput, RoomStaffUncheckedUpdateWithoutStaffInput>
    create: XOR<RoomStaffCreateWithoutStaffInput, RoomStaffUncheckedCreateWithoutStaffInput>
  }

  export type RoomStaffUpdateWithWhereUniqueWithoutStaffInput = {
    where: RoomStaffWhereUniqueInput
    data: XOR<RoomStaffUpdateWithoutStaffInput, RoomStaffUncheckedUpdateWithoutStaffInput>
  }

  export type RoomStaffUpdateManyWithWhereWithoutStaffInput = {
    where: RoomStaffScalarWhereInput
    data: XOR<RoomStaffUpdateManyMutationInput, RoomStaffUncheckedUpdateManyWithoutStaffInput>
  }

  export type RoomStaffScalarWhereInput = {
    AND?: RoomStaffScalarWhereInput | RoomStaffScalarWhereInput[]
    OR?: RoomStaffScalarWhereInput[]
    NOT?: RoomStaffScalarWhereInput | RoomStaffScalarWhereInput[]
    roomId?: IntFilter<"RoomStaff"> | number
    staffId?: IntFilter<"RoomStaff"> | number
  }

  export type UserCreateWithoutCustomerInput = {
    firstname: string
    lastname: string
    email: string
    phone_number: string
    user_name: string
    password: string
    role?: $Enums.Role
    staff?: StaffCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCustomerInput = {
    id?: number
    firstname: string
    lastname: string
    email: string
    phone_number: string
    user_name: string
    password: string
    role?: $Enums.Role
    staff?: StaffUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCustomerInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCustomerInput, UserUncheckedCreateWithoutCustomerInput>
  }

  export type ChatLogCreateWithoutCustomerInput = {
    review?: string | null
    reply?: string | null
    rating?: number | null
    review_date?: Date | string
    reply_date?: Date | string | null
    staff?: StaffCreateNestedOneWithoutRepliesInput
    service: ServiceCreateNestedOneWithoutReviewsInput
  }

  export type ChatLogUncheckedCreateWithoutCustomerInput = {
    id?: number
    review?: string | null
    reply?: string | null
    rating?: number | null
    review_date?: Date | string
    reply_date?: Date | string | null
    staffId?: number | null
    serviceId: number
  }

  export type ChatLogCreateOrConnectWithoutCustomerInput = {
    where: ChatLogWhereUniqueInput
    create: XOR<ChatLogCreateWithoutCustomerInput, ChatLogUncheckedCreateWithoutCustomerInput>
  }

  export type ChatLogCreateManyCustomerInputEnvelope = {
    data: ChatLogCreateManyCustomerInput | ChatLogCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type PetCreateWithoutCustomerInput = {
    name: string
    sex?: $Enums.Sex
    age: number
    type?: $Enums.PetType
    status?: $Enums.PetStatus
    breed: string
    disease?: PetCreatediseaseInput | string[]
    allergic?: PetCreateallergicInput | string[]
    picture: string
    scheduled?: BookedServiceCreateNestedManyWithoutPetInput
    stayed?: BookedRoomCreateNestedManyWithoutPetInput
    cares?: CareCreateNestedManyWithoutPetInput
  }

  export type PetUncheckedCreateWithoutCustomerInput = {
    id?: number
    name: string
    sex?: $Enums.Sex
    age: number
    type?: $Enums.PetType
    status?: $Enums.PetStatus
    breed: string
    disease?: PetCreatediseaseInput | string[]
    allergic?: PetCreateallergicInput | string[]
    picture: string
    scheduled?: BookedServiceUncheckedCreateNestedManyWithoutPetInput
    stayed?: BookedRoomUncheckedCreateNestedManyWithoutPetInput
    cares?: CareUncheckedCreateNestedManyWithoutPetInput
  }

  export type PetCreateOrConnectWithoutCustomerInput = {
    where: PetWhereUniqueInput
    create: XOR<PetCreateWithoutCustomerInput, PetUncheckedCreateWithoutCustomerInput>
  }

  export type PetCreateManyCustomerInputEnvelope = {
    data: PetCreateManyCustomerInput | PetCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type BookingCreateWithoutCustomerInput = {
    date: Date | string
    status?: $Enums.BookingStatus
    customerName: string
    customerEmail: string
    customerNumber: string
    booked_service?: BookedServiceCreateNestedManyWithoutBookingInput
    booked_room?: BookedRoomCreateNestedManyWithoutBookingInput
    payment?: PaymentCreateNestedOneWithoutBookingInput
  }

  export type BookingUncheckedCreateWithoutCustomerInput = {
    id?: number
    date: Date | string
    status?: $Enums.BookingStatus
    customerName: string
    customerEmail: string
    customerNumber: string
    booked_service?: BookedServiceUncheckedCreateNestedManyWithoutBookingInput
    booked_room?: BookedRoomUncheckedCreateNestedManyWithoutBookingInput
    payment?: PaymentUncheckedCreateNestedOneWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutCustomerInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutCustomerInput, BookingUncheckedCreateWithoutCustomerInput>
  }

  export type BookingCreateManyCustomerInputEnvelope = {
    data: BookingCreateManyCustomerInput | BookingCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type PaymentCreateWithoutCustomerInput = {
    cost: number
    date: Date | string
    status?: $Enums.PaymentStatus
    customerName: string
    customerEmail: string
    customerNumber: string
    booking?: BookingCreateNestedOneWithoutPaymentInput
  }

  export type PaymentUncheckedCreateWithoutCustomerInput = {
    id?: number
    cost: number
    date: Date | string
    status?: $Enums.PaymentStatus
    bookingId?: number | null
    customerName: string
    customerEmail: string
    customerNumber: string
  }

  export type PaymentCreateOrConnectWithoutCustomerInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutCustomerInput, PaymentUncheckedCreateWithoutCustomerInput>
  }

  export type PaymentCreateManyCustomerInputEnvelope = {
    data: PaymentCreateManyCustomerInput | PaymentCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCustomerInput = {
    update: XOR<UserUpdateWithoutCustomerInput, UserUncheckedUpdateWithoutCustomerInput>
    create: XOR<UserCreateWithoutCustomerInput, UserUncheckedCreateWithoutCustomerInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCustomerInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCustomerInput, UserUncheckedUpdateWithoutCustomerInput>
  }

  export type UserUpdateWithoutCustomerInput = {
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone_number?: StringFieldUpdateOperationsInput | string
    user_name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    staff?: StaffUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCustomerInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone_number?: StringFieldUpdateOperationsInput | string
    user_name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    staff?: StaffUncheckedUpdateOneWithoutUserNestedInput
  }

  export type ChatLogUpsertWithWhereUniqueWithoutCustomerInput = {
    where: ChatLogWhereUniqueInput
    update: XOR<ChatLogUpdateWithoutCustomerInput, ChatLogUncheckedUpdateWithoutCustomerInput>
    create: XOR<ChatLogCreateWithoutCustomerInput, ChatLogUncheckedCreateWithoutCustomerInput>
  }

  export type ChatLogUpdateWithWhereUniqueWithoutCustomerInput = {
    where: ChatLogWhereUniqueInput
    data: XOR<ChatLogUpdateWithoutCustomerInput, ChatLogUncheckedUpdateWithoutCustomerInput>
  }

  export type ChatLogUpdateManyWithWhereWithoutCustomerInput = {
    where: ChatLogScalarWhereInput
    data: XOR<ChatLogUpdateManyMutationInput, ChatLogUncheckedUpdateManyWithoutCustomerInput>
  }

  export type PetUpsertWithWhereUniqueWithoutCustomerInput = {
    where: PetWhereUniqueInput
    update: XOR<PetUpdateWithoutCustomerInput, PetUncheckedUpdateWithoutCustomerInput>
    create: XOR<PetCreateWithoutCustomerInput, PetUncheckedCreateWithoutCustomerInput>
  }

  export type PetUpdateWithWhereUniqueWithoutCustomerInput = {
    where: PetWhereUniqueInput
    data: XOR<PetUpdateWithoutCustomerInput, PetUncheckedUpdateWithoutCustomerInput>
  }

  export type PetUpdateManyWithWhereWithoutCustomerInput = {
    where: PetScalarWhereInput
    data: XOR<PetUpdateManyMutationInput, PetUncheckedUpdateManyWithoutCustomerInput>
  }

  export type PetScalarWhereInput = {
    AND?: PetScalarWhereInput | PetScalarWhereInput[]
    OR?: PetScalarWhereInput[]
    NOT?: PetScalarWhereInput | PetScalarWhereInput[]
    id?: IntFilter<"Pet"> | number
    name?: StringFilter<"Pet"> | string
    sex?: EnumSexFilter<"Pet"> | $Enums.Sex
    age?: IntFilter<"Pet"> | number
    type?: EnumPetTypeFilter<"Pet"> | $Enums.PetType
    status?: EnumPetStatusFilter<"Pet"> | $Enums.PetStatus
    breed?: StringFilter<"Pet"> | string
    disease?: StringNullableListFilter<"Pet">
    allergic?: StringNullableListFilter<"Pet">
    picture?: StringFilter<"Pet"> | string
    customerId?: IntFilter<"Pet"> | number
  }

  export type BookingUpsertWithWhereUniqueWithoutCustomerInput = {
    where: BookingWhereUniqueInput
    update: XOR<BookingUpdateWithoutCustomerInput, BookingUncheckedUpdateWithoutCustomerInput>
    create: XOR<BookingCreateWithoutCustomerInput, BookingUncheckedCreateWithoutCustomerInput>
  }

  export type BookingUpdateWithWhereUniqueWithoutCustomerInput = {
    where: BookingWhereUniqueInput
    data: XOR<BookingUpdateWithoutCustomerInput, BookingUncheckedUpdateWithoutCustomerInput>
  }

  export type BookingUpdateManyWithWhereWithoutCustomerInput = {
    where: BookingScalarWhereInput
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyWithoutCustomerInput>
  }

  export type BookingScalarWhereInput = {
    AND?: BookingScalarWhereInput | BookingScalarWhereInput[]
    OR?: BookingScalarWhereInput[]
    NOT?: BookingScalarWhereInput | BookingScalarWhereInput[]
    id?: IntFilter<"Booking"> | number
    date?: DateTimeFilter<"Booking"> | Date | string
    status?: EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus
    customerId?: IntNullableFilter<"Booking"> | number | null
    customerName?: StringFilter<"Booking"> | string
    customerEmail?: StringFilter<"Booking"> | string
    customerNumber?: StringFilter<"Booking"> | string
  }

  export type PaymentUpsertWithWhereUniqueWithoutCustomerInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutCustomerInput, PaymentUncheckedUpdateWithoutCustomerInput>
    create: XOR<PaymentCreateWithoutCustomerInput, PaymentUncheckedCreateWithoutCustomerInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutCustomerInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutCustomerInput, PaymentUncheckedUpdateWithoutCustomerInput>
  }

  export type PaymentUpdateManyWithWhereWithoutCustomerInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutCustomerInput>
  }

  export type PaymentScalarWhereInput = {
    AND?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    OR?: PaymentScalarWhereInput[]
    NOT?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    id?: IntFilter<"Payment"> | number
    cost?: FloatFilter<"Payment"> | number
    date?: DateTimeFilter<"Payment"> | Date | string
    status?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    bookingId?: IntNullableFilter<"Payment"> | number | null
    customerId?: IntNullableFilter<"Payment"> | number | null
    customerName?: StringFilter<"Payment"> | string
    customerEmail?: StringFilter<"Payment"> | string
    customerNumber?: StringFilter<"Payment"> | string
  }

  export type CustomerCreateWithoutChatsInput = {
    user: UserCreateNestedOneWithoutCustomerInput
    pets?: PetCreateNestedManyWithoutCustomerInput
    bookings?: BookingCreateNestedManyWithoutCustomerInput
    payments?: PaymentCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutChatsInput = {
    id?: number
    userId: number
    pets?: PetUncheckedCreateNestedManyWithoutCustomerInput
    bookings?: BookingUncheckedCreateNestedManyWithoutCustomerInput
    payments?: PaymentUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerCreateOrConnectWithoutChatsInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutChatsInput, CustomerUncheckedCreateWithoutChatsInput>
  }

  export type StaffCreateWithoutRepliesInput = {
    wages: number
    bank_company?: $Enums.Bank
    bank_account: string
    user: UserCreateNestedOneWithoutStaffInput
    cares?: CareCreateNestedManyWithoutStaffInput
    staffOnServices?: StaffOnServiceCreateNestedManyWithoutStaffInput
    roomStaff?: RoomStaffCreateNestedManyWithoutStaffInput
  }

  export type StaffUncheckedCreateWithoutRepliesInput = {
    id?: number
    wages: number
    bank_company?: $Enums.Bank
    bank_account: string
    userId: number
    cares?: CareUncheckedCreateNestedManyWithoutStaffInput
    staffOnServices?: StaffOnServiceUncheckedCreateNestedManyWithoutStaffInput
    roomStaff?: RoomStaffUncheckedCreateNestedManyWithoutStaffInput
  }

  export type StaffCreateOrConnectWithoutRepliesInput = {
    where: StaffWhereUniqueInput
    create: XOR<StaffCreateWithoutRepliesInput, StaffUncheckedCreateWithoutRepliesInput>
  }

  export type ServiceCreateWithoutReviewsInput = {
    name: string
    price?: number
    petType?: ServiceCreatepetTypeInput | $Enums.PetType[]
    picture: string
    staffOnServices?: StaffOnServiceCreateNestedManyWithoutServiceInput
    bookedServices?: BookedServiceCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateWithoutReviewsInput = {
    id?: number
    name: string
    price?: number
    petType?: ServiceCreatepetTypeInput | $Enums.PetType[]
    picture: string
    staffOnServices?: StaffOnServiceUncheckedCreateNestedManyWithoutServiceInput
    bookedServices?: BookedServiceUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutReviewsInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutReviewsInput, ServiceUncheckedCreateWithoutReviewsInput>
  }

  export type CustomerUpsertWithoutChatsInput = {
    update: XOR<CustomerUpdateWithoutChatsInput, CustomerUncheckedUpdateWithoutChatsInput>
    create: XOR<CustomerCreateWithoutChatsInput, CustomerUncheckedCreateWithoutChatsInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutChatsInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutChatsInput, CustomerUncheckedUpdateWithoutChatsInput>
  }

  export type CustomerUpdateWithoutChatsInput = {
    user?: UserUpdateOneRequiredWithoutCustomerNestedInput
    pets?: PetUpdateManyWithoutCustomerNestedInput
    bookings?: BookingUpdateManyWithoutCustomerNestedInput
    payments?: PaymentUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutChatsInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    pets?: PetUncheckedUpdateManyWithoutCustomerNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutCustomerNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type StaffUpsertWithoutRepliesInput = {
    update: XOR<StaffUpdateWithoutRepliesInput, StaffUncheckedUpdateWithoutRepliesInput>
    create: XOR<StaffCreateWithoutRepliesInput, StaffUncheckedCreateWithoutRepliesInput>
    where?: StaffWhereInput
  }

  export type StaffUpdateToOneWithWhereWithoutRepliesInput = {
    where?: StaffWhereInput
    data: XOR<StaffUpdateWithoutRepliesInput, StaffUncheckedUpdateWithoutRepliesInput>
  }

  export type StaffUpdateWithoutRepliesInput = {
    wages?: FloatFieldUpdateOperationsInput | number
    bank_company?: EnumBankFieldUpdateOperationsInput | $Enums.Bank
    bank_account?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutStaffNestedInput
    cares?: CareUpdateManyWithoutStaffNestedInput
    staffOnServices?: StaffOnServiceUpdateManyWithoutStaffNestedInput
    roomStaff?: RoomStaffUpdateManyWithoutStaffNestedInput
  }

  export type StaffUncheckedUpdateWithoutRepliesInput = {
    id?: IntFieldUpdateOperationsInput | number
    wages?: FloatFieldUpdateOperationsInput | number
    bank_company?: EnumBankFieldUpdateOperationsInput | $Enums.Bank
    bank_account?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    cares?: CareUncheckedUpdateManyWithoutStaffNestedInput
    staffOnServices?: StaffOnServiceUncheckedUpdateManyWithoutStaffNestedInput
    roomStaff?: RoomStaffUncheckedUpdateManyWithoutStaffNestedInput
  }

  export type ServiceUpsertWithoutReviewsInput = {
    update: XOR<ServiceUpdateWithoutReviewsInput, ServiceUncheckedUpdateWithoutReviewsInput>
    create: XOR<ServiceCreateWithoutReviewsInput, ServiceUncheckedCreateWithoutReviewsInput>
    where?: ServiceWhereInput
  }

  export type ServiceUpdateToOneWithWhereWithoutReviewsInput = {
    where?: ServiceWhereInput
    data: XOR<ServiceUpdateWithoutReviewsInput, ServiceUncheckedUpdateWithoutReviewsInput>
  }

  export type ServiceUpdateWithoutReviewsInput = {
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    petType?: ServiceUpdatepetTypeInput | $Enums.PetType[]
    picture?: StringFieldUpdateOperationsInput | string
    staffOnServices?: StaffOnServiceUpdateManyWithoutServiceNestedInput
    bookedServices?: BookedServiceUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateWithoutReviewsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    petType?: ServiceUpdatepetTypeInput | $Enums.PetType[]
    picture?: StringFieldUpdateOperationsInput | string
    staffOnServices?: StaffOnServiceUncheckedUpdateManyWithoutServiceNestedInput
    bookedServices?: BookedServiceUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type BookedServiceCreateWithoutPetInput = {
    scheduled: Date | string
    service: ServiceCreateNestedOneWithoutBookedServicesInput
    booking: BookingCreateNestedOneWithoutBooked_serviceInput
  }

  export type BookedServiceUncheckedCreateWithoutPetInput = {
    id?: number
    serviceId: number
    scheduled: Date | string
    booking_id: number
  }

  export type BookedServiceCreateOrConnectWithoutPetInput = {
    where: BookedServiceWhereUniqueInput
    create: XOR<BookedServiceCreateWithoutPetInput, BookedServiceUncheckedCreateWithoutPetInput>
  }

  export type BookedServiceCreateManyPetInputEnvelope = {
    data: BookedServiceCreateManyPetInput | BookedServiceCreateManyPetInput[]
    skipDuplicates?: boolean
  }

  export type BookedRoomCreateWithoutPetInput = {
    checkIn: Date | string
    checkOut: Date | string
    room: RoomCreateNestedOneWithoutBookingsInput
    booking: BookingCreateNestedOneWithoutBooked_roomInput
  }

  export type BookedRoomUncheckedCreateWithoutPetInput = {
    id?: number
    checkIn: Date | string
    checkOut: Date | string
    roomId: number
    bookingId: number
  }

  export type BookedRoomCreateOrConnectWithoutPetInput = {
    where: BookedRoomWhereUniqueInput
    create: XOR<BookedRoomCreateWithoutPetInput, BookedRoomUncheckedCreateWithoutPetInput>
  }

  export type BookedRoomCreateManyPetInputEnvelope = {
    data: BookedRoomCreateManyPetInput | BookedRoomCreateManyPetInput[]
    skipDuplicates?: boolean
  }

  export type CustomerCreateWithoutPetsInput = {
    user: UserCreateNestedOneWithoutCustomerInput
    chats?: ChatLogCreateNestedManyWithoutCustomerInput
    bookings?: BookingCreateNestedManyWithoutCustomerInput
    payments?: PaymentCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutPetsInput = {
    id?: number
    userId: number
    chats?: ChatLogUncheckedCreateNestedManyWithoutCustomerInput
    bookings?: BookingUncheckedCreateNestedManyWithoutCustomerInput
    payments?: PaymentUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerCreateOrConnectWithoutPetsInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutPetsInput, CustomerUncheckedCreateWithoutPetsInput>
  }

  export type CareCreateWithoutPetInput = {
    start_period?: Date | string
    end_period: Date | string
    staff: StaffCreateNestedOneWithoutCaresInput
  }

  export type CareUncheckedCreateWithoutPetInput = {
    start_period?: Date | string
    end_period: Date | string
    staff_id: number
  }

  export type CareCreateOrConnectWithoutPetInput = {
    where: CareWhereUniqueInput
    create: XOR<CareCreateWithoutPetInput, CareUncheckedCreateWithoutPetInput>
  }

  export type CareCreateManyPetInputEnvelope = {
    data: CareCreateManyPetInput | CareCreateManyPetInput[]
    skipDuplicates?: boolean
  }

  export type BookedServiceUpsertWithWhereUniqueWithoutPetInput = {
    where: BookedServiceWhereUniqueInput
    update: XOR<BookedServiceUpdateWithoutPetInput, BookedServiceUncheckedUpdateWithoutPetInput>
    create: XOR<BookedServiceCreateWithoutPetInput, BookedServiceUncheckedCreateWithoutPetInput>
  }

  export type BookedServiceUpdateWithWhereUniqueWithoutPetInput = {
    where: BookedServiceWhereUniqueInput
    data: XOR<BookedServiceUpdateWithoutPetInput, BookedServiceUncheckedUpdateWithoutPetInput>
  }

  export type BookedServiceUpdateManyWithWhereWithoutPetInput = {
    where: BookedServiceScalarWhereInput
    data: XOR<BookedServiceUpdateManyMutationInput, BookedServiceUncheckedUpdateManyWithoutPetInput>
  }

  export type BookedServiceScalarWhereInput = {
    AND?: BookedServiceScalarWhereInput | BookedServiceScalarWhereInput[]
    OR?: BookedServiceScalarWhereInput[]
    NOT?: BookedServiceScalarWhereInput | BookedServiceScalarWhereInput[]
    id?: IntFilter<"BookedService"> | number
    serviceId?: IntFilter<"BookedService"> | number
    petId?: IntNullableFilter<"BookedService"> | number | null
    scheduled?: DateTimeFilter<"BookedService"> | Date | string
    booking_id?: IntFilter<"BookedService"> | number
  }

  export type BookedRoomUpsertWithWhereUniqueWithoutPetInput = {
    where: BookedRoomWhereUniqueInput
    update: XOR<BookedRoomUpdateWithoutPetInput, BookedRoomUncheckedUpdateWithoutPetInput>
    create: XOR<BookedRoomCreateWithoutPetInput, BookedRoomUncheckedCreateWithoutPetInput>
  }

  export type BookedRoomUpdateWithWhereUniqueWithoutPetInput = {
    where: BookedRoomWhereUniqueInput
    data: XOR<BookedRoomUpdateWithoutPetInput, BookedRoomUncheckedUpdateWithoutPetInput>
  }

  export type BookedRoomUpdateManyWithWhereWithoutPetInput = {
    where: BookedRoomScalarWhereInput
    data: XOR<BookedRoomUpdateManyMutationInput, BookedRoomUncheckedUpdateManyWithoutPetInput>
  }

  export type BookedRoomScalarWhereInput = {
    AND?: BookedRoomScalarWhereInput | BookedRoomScalarWhereInput[]
    OR?: BookedRoomScalarWhereInput[]
    NOT?: BookedRoomScalarWhereInput | BookedRoomScalarWhereInput[]
    id?: IntFilter<"BookedRoom"> | number
    checkIn?: DateTimeFilter<"BookedRoom"> | Date | string
    checkOut?: DateTimeFilter<"BookedRoom"> | Date | string
    roomId?: IntFilter<"BookedRoom"> | number
    petId?: IntNullableFilter<"BookedRoom"> | number | null
    bookingId?: IntFilter<"BookedRoom"> | number
  }

  export type CustomerUpsertWithoutPetsInput = {
    update: XOR<CustomerUpdateWithoutPetsInput, CustomerUncheckedUpdateWithoutPetsInput>
    create: XOR<CustomerCreateWithoutPetsInput, CustomerUncheckedCreateWithoutPetsInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutPetsInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutPetsInput, CustomerUncheckedUpdateWithoutPetsInput>
  }

  export type CustomerUpdateWithoutPetsInput = {
    user?: UserUpdateOneRequiredWithoutCustomerNestedInput
    chats?: ChatLogUpdateManyWithoutCustomerNestedInput
    bookings?: BookingUpdateManyWithoutCustomerNestedInput
    payments?: PaymentUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutPetsInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    chats?: ChatLogUncheckedUpdateManyWithoutCustomerNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutCustomerNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type CareUpsertWithWhereUniqueWithoutPetInput = {
    where: CareWhereUniqueInput
    update: XOR<CareUpdateWithoutPetInput, CareUncheckedUpdateWithoutPetInput>
    create: XOR<CareCreateWithoutPetInput, CareUncheckedCreateWithoutPetInput>
  }

  export type CareUpdateWithWhereUniqueWithoutPetInput = {
    where: CareWhereUniqueInput
    data: XOR<CareUpdateWithoutPetInput, CareUncheckedUpdateWithoutPetInput>
  }

  export type CareUpdateManyWithWhereWithoutPetInput = {
    where: CareScalarWhereInput
    data: XOR<CareUpdateManyMutationInput, CareUncheckedUpdateManyWithoutPetInput>
  }

  export type BookedRoomCreateWithoutRoomInput = {
    checkIn: Date | string
    checkOut: Date | string
    pet?: PetCreateNestedOneWithoutStayedInput
    booking: BookingCreateNestedOneWithoutBooked_roomInput
  }

  export type BookedRoomUncheckedCreateWithoutRoomInput = {
    id?: number
    checkIn: Date | string
    checkOut: Date | string
    petId?: number | null
    bookingId: number
  }

  export type BookedRoomCreateOrConnectWithoutRoomInput = {
    where: BookedRoomWhereUniqueInput
    create: XOR<BookedRoomCreateWithoutRoomInput, BookedRoomUncheckedCreateWithoutRoomInput>
  }

  export type BookedRoomCreateManyRoomInputEnvelope = {
    data: BookedRoomCreateManyRoomInput | BookedRoomCreateManyRoomInput[]
    skipDuplicates?: boolean
  }

  export type RoomStaffCreateWithoutRoomInput = {
    staff: StaffCreateNestedOneWithoutRoomStaffInput
  }

  export type RoomStaffUncheckedCreateWithoutRoomInput = {
    staffId: number
  }

  export type RoomStaffCreateOrConnectWithoutRoomInput = {
    where: RoomStaffWhereUniqueInput
    create: XOR<RoomStaffCreateWithoutRoomInput, RoomStaffUncheckedCreateWithoutRoomInput>
  }

  export type RoomStaffCreateManyRoomInputEnvelope = {
    data: RoomStaffCreateManyRoomInput | RoomStaffCreateManyRoomInput[]
    skipDuplicates?: boolean
  }

  export type BookedRoomUpsertWithWhereUniqueWithoutRoomInput = {
    where: BookedRoomWhereUniqueInput
    update: XOR<BookedRoomUpdateWithoutRoomInput, BookedRoomUncheckedUpdateWithoutRoomInput>
    create: XOR<BookedRoomCreateWithoutRoomInput, BookedRoomUncheckedCreateWithoutRoomInput>
  }

  export type BookedRoomUpdateWithWhereUniqueWithoutRoomInput = {
    where: BookedRoomWhereUniqueInput
    data: XOR<BookedRoomUpdateWithoutRoomInput, BookedRoomUncheckedUpdateWithoutRoomInput>
  }

  export type BookedRoomUpdateManyWithWhereWithoutRoomInput = {
    where: BookedRoomScalarWhereInput
    data: XOR<BookedRoomUpdateManyMutationInput, BookedRoomUncheckedUpdateManyWithoutRoomInput>
  }

  export type RoomStaffUpsertWithWhereUniqueWithoutRoomInput = {
    where: RoomStaffWhereUniqueInput
    update: XOR<RoomStaffUpdateWithoutRoomInput, RoomStaffUncheckedUpdateWithoutRoomInput>
    create: XOR<RoomStaffCreateWithoutRoomInput, RoomStaffUncheckedCreateWithoutRoomInput>
  }

  export type RoomStaffUpdateWithWhereUniqueWithoutRoomInput = {
    where: RoomStaffWhereUniqueInput
    data: XOR<RoomStaffUpdateWithoutRoomInput, RoomStaffUncheckedUpdateWithoutRoomInput>
  }

  export type RoomStaffUpdateManyWithWhereWithoutRoomInput = {
    where: RoomStaffScalarWhereInput
    data: XOR<RoomStaffUpdateManyMutationInput, RoomStaffUncheckedUpdateManyWithoutRoomInput>
  }

  export type RoomCreateWithoutBookingsInput = {
    capacity?: number
    price?: number
    picture?: RoomCreatepictureInput | string[]
    petType?: $Enums.PetType
    staffOnRooms?: RoomStaffCreateNestedManyWithoutRoomInput
  }

  export type RoomUncheckedCreateWithoutBookingsInput = {
    id?: number
    capacity?: number
    price?: number
    picture?: RoomCreatepictureInput | string[]
    petType?: $Enums.PetType
    staffOnRooms?: RoomStaffUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomCreateOrConnectWithoutBookingsInput = {
    where: RoomWhereUniqueInput
    create: XOR<RoomCreateWithoutBookingsInput, RoomUncheckedCreateWithoutBookingsInput>
  }

  export type PetCreateWithoutStayedInput = {
    name: string
    sex?: $Enums.Sex
    age: number
    type?: $Enums.PetType
    status?: $Enums.PetStatus
    breed: string
    disease?: PetCreatediseaseInput | string[]
    allergic?: PetCreateallergicInput | string[]
    picture: string
    scheduled?: BookedServiceCreateNestedManyWithoutPetInput
    customer: CustomerCreateNestedOneWithoutPetsInput
    cares?: CareCreateNestedManyWithoutPetInput
  }

  export type PetUncheckedCreateWithoutStayedInput = {
    id?: number
    name: string
    sex?: $Enums.Sex
    age: number
    type?: $Enums.PetType
    status?: $Enums.PetStatus
    breed: string
    disease?: PetCreatediseaseInput | string[]
    allergic?: PetCreateallergicInput | string[]
    picture: string
    customerId: number
    scheduled?: BookedServiceUncheckedCreateNestedManyWithoutPetInput
    cares?: CareUncheckedCreateNestedManyWithoutPetInput
  }

  export type PetCreateOrConnectWithoutStayedInput = {
    where: PetWhereUniqueInput
    create: XOR<PetCreateWithoutStayedInput, PetUncheckedCreateWithoutStayedInput>
  }

  export type BookingCreateWithoutBooked_roomInput = {
    date: Date | string
    status?: $Enums.BookingStatus
    customerName: string
    customerEmail: string
    customerNumber: string
    booked_service?: BookedServiceCreateNestedManyWithoutBookingInput
    customer?: CustomerCreateNestedOneWithoutBookingsInput
    payment?: PaymentCreateNestedOneWithoutBookingInput
  }

  export type BookingUncheckedCreateWithoutBooked_roomInput = {
    id?: number
    date: Date | string
    status?: $Enums.BookingStatus
    customerId?: number | null
    customerName: string
    customerEmail: string
    customerNumber: string
    booked_service?: BookedServiceUncheckedCreateNestedManyWithoutBookingInput
    payment?: PaymentUncheckedCreateNestedOneWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutBooked_roomInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutBooked_roomInput, BookingUncheckedCreateWithoutBooked_roomInput>
  }

  export type RoomUpsertWithoutBookingsInput = {
    update: XOR<RoomUpdateWithoutBookingsInput, RoomUncheckedUpdateWithoutBookingsInput>
    create: XOR<RoomCreateWithoutBookingsInput, RoomUncheckedCreateWithoutBookingsInput>
    where?: RoomWhereInput
  }

  export type RoomUpdateToOneWithWhereWithoutBookingsInput = {
    where?: RoomWhereInput
    data: XOR<RoomUpdateWithoutBookingsInput, RoomUncheckedUpdateWithoutBookingsInput>
  }

  export type RoomUpdateWithoutBookingsInput = {
    capacity?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    picture?: RoomUpdatepictureInput | string[]
    petType?: EnumPetTypeFieldUpdateOperationsInput | $Enums.PetType
    staffOnRooms?: RoomStaffUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateWithoutBookingsInput = {
    id?: IntFieldUpdateOperationsInput | number
    capacity?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    picture?: RoomUpdatepictureInput | string[]
    petType?: EnumPetTypeFieldUpdateOperationsInput | $Enums.PetType
    staffOnRooms?: RoomStaffUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type PetUpsertWithoutStayedInput = {
    update: XOR<PetUpdateWithoutStayedInput, PetUncheckedUpdateWithoutStayedInput>
    create: XOR<PetCreateWithoutStayedInput, PetUncheckedCreateWithoutStayedInput>
    where?: PetWhereInput
  }

  export type PetUpdateToOneWithWhereWithoutStayedInput = {
    where?: PetWhereInput
    data: XOR<PetUpdateWithoutStayedInput, PetUncheckedUpdateWithoutStayedInput>
  }

  export type PetUpdateWithoutStayedInput = {
    name?: StringFieldUpdateOperationsInput | string
    sex?: EnumSexFieldUpdateOperationsInput | $Enums.Sex
    age?: IntFieldUpdateOperationsInput | number
    type?: EnumPetTypeFieldUpdateOperationsInput | $Enums.PetType
    status?: EnumPetStatusFieldUpdateOperationsInput | $Enums.PetStatus
    breed?: StringFieldUpdateOperationsInput | string
    disease?: PetUpdatediseaseInput | string[]
    allergic?: PetUpdateallergicInput | string[]
    picture?: StringFieldUpdateOperationsInput | string
    scheduled?: BookedServiceUpdateManyWithoutPetNestedInput
    customer?: CustomerUpdateOneRequiredWithoutPetsNestedInput
    cares?: CareUpdateManyWithoutPetNestedInput
  }

  export type PetUncheckedUpdateWithoutStayedInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    sex?: EnumSexFieldUpdateOperationsInput | $Enums.Sex
    age?: IntFieldUpdateOperationsInput | number
    type?: EnumPetTypeFieldUpdateOperationsInput | $Enums.PetType
    status?: EnumPetStatusFieldUpdateOperationsInput | $Enums.PetStatus
    breed?: StringFieldUpdateOperationsInput | string
    disease?: PetUpdatediseaseInput | string[]
    allergic?: PetUpdateallergicInput | string[]
    picture?: StringFieldUpdateOperationsInput | string
    customerId?: IntFieldUpdateOperationsInput | number
    scheduled?: BookedServiceUncheckedUpdateManyWithoutPetNestedInput
    cares?: CareUncheckedUpdateManyWithoutPetNestedInput
  }

  export type BookingUpsertWithoutBooked_roomInput = {
    update: XOR<BookingUpdateWithoutBooked_roomInput, BookingUncheckedUpdateWithoutBooked_roomInput>
    create: XOR<BookingCreateWithoutBooked_roomInput, BookingUncheckedCreateWithoutBooked_roomInput>
    where?: BookingWhereInput
  }

  export type BookingUpdateToOneWithWhereWithoutBooked_roomInput = {
    where?: BookingWhereInput
    data: XOR<BookingUpdateWithoutBooked_roomInput, BookingUncheckedUpdateWithoutBooked_roomInput>
  }

  export type BookingUpdateWithoutBooked_roomInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerNumber?: StringFieldUpdateOperationsInput | string
    booked_service?: BookedServiceUpdateManyWithoutBookingNestedInput
    customer?: CustomerUpdateOneWithoutBookingsNestedInput
    payment?: PaymentUpdateOneWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateWithoutBooked_roomInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    customerId?: NullableIntFieldUpdateOperationsInput | number | null
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerNumber?: StringFieldUpdateOperationsInput | string
    booked_service?: BookedServiceUncheckedUpdateManyWithoutBookingNestedInput
    payment?: PaymentUncheckedUpdateOneWithoutBookingNestedInput
  }

  export type ChatLogCreateWithoutServiceInput = {
    review?: string | null
    reply?: string | null
    rating?: number | null
    review_date?: Date | string
    reply_date?: Date | string | null
    customer?: CustomerCreateNestedOneWithoutChatsInput
    staff?: StaffCreateNestedOneWithoutRepliesInput
  }

  export type ChatLogUncheckedCreateWithoutServiceInput = {
    id?: number
    review?: string | null
    reply?: string | null
    rating?: number | null
    review_date?: Date | string
    reply_date?: Date | string | null
    customerId?: number | null
    staffId?: number | null
  }

  export type ChatLogCreateOrConnectWithoutServiceInput = {
    where: ChatLogWhereUniqueInput
    create: XOR<ChatLogCreateWithoutServiceInput, ChatLogUncheckedCreateWithoutServiceInput>
  }

  export type ChatLogCreateManyServiceInputEnvelope = {
    data: ChatLogCreateManyServiceInput | ChatLogCreateManyServiceInput[]
    skipDuplicates?: boolean
  }

  export type StaffOnServiceCreateWithoutServiceInput = {
    staff: StaffCreateNestedOneWithoutStaffOnServicesInput
  }

  export type StaffOnServiceUncheckedCreateWithoutServiceInput = {
    staffId: number
  }

  export type StaffOnServiceCreateOrConnectWithoutServiceInput = {
    where: StaffOnServiceWhereUniqueInput
    create: XOR<StaffOnServiceCreateWithoutServiceInput, StaffOnServiceUncheckedCreateWithoutServiceInput>
  }

  export type StaffOnServiceCreateManyServiceInputEnvelope = {
    data: StaffOnServiceCreateManyServiceInput | StaffOnServiceCreateManyServiceInput[]
    skipDuplicates?: boolean
  }

  export type BookedServiceCreateWithoutServiceInput = {
    scheduled: Date | string
    pet?: PetCreateNestedOneWithoutScheduledInput
    booking: BookingCreateNestedOneWithoutBooked_serviceInput
  }

  export type BookedServiceUncheckedCreateWithoutServiceInput = {
    id?: number
    petId?: number | null
    scheduled: Date | string
    booking_id: number
  }

  export type BookedServiceCreateOrConnectWithoutServiceInput = {
    where: BookedServiceWhereUniqueInput
    create: XOR<BookedServiceCreateWithoutServiceInput, BookedServiceUncheckedCreateWithoutServiceInput>
  }

  export type BookedServiceCreateManyServiceInputEnvelope = {
    data: BookedServiceCreateManyServiceInput | BookedServiceCreateManyServiceInput[]
    skipDuplicates?: boolean
  }

  export type ChatLogUpsertWithWhereUniqueWithoutServiceInput = {
    where: ChatLogWhereUniqueInput
    update: XOR<ChatLogUpdateWithoutServiceInput, ChatLogUncheckedUpdateWithoutServiceInput>
    create: XOR<ChatLogCreateWithoutServiceInput, ChatLogUncheckedCreateWithoutServiceInput>
  }

  export type ChatLogUpdateWithWhereUniqueWithoutServiceInput = {
    where: ChatLogWhereUniqueInput
    data: XOR<ChatLogUpdateWithoutServiceInput, ChatLogUncheckedUpdateWithoutServiceInput>
  }

  export type ChatLogUpdateManyWithWhereWithoutServiceInput = {
    where: ChatLogScalarWhereInput
    data: XOR<ChatLogUpdateManyMutationInput, ChatLogUncheckedUpdateManyWithoutServiceInput>
  }

  export type StaffOnServiceUpsertWithWhereUniqueWithoutServiceInput = {
    where: StaffOnServiceWhereUniqueInput
    update: XOR<StaffOnServiceUpdateWithoutServiceInput, StaffOnServiceUncheckedUpdateWithoutServiceInput>
    create: XOR<StaffOnServiceCreateWithoutServiceInput, StaffOnServiceUncheckedCreateWithoutServiceInput>
  }

  export type StaffOnServiceUpdateWithWhereUniqueWithoutServiceInput = {
    where: StaffOnServiceWhereUniqueInput
    data: XOR<StaffOnServiceUpdateWithoutServiceInput, StaffOnServiceUncheckedUpdateWithoutServiceInput>
  }

  export type StaffOnServiceUpdateManyWithWhereWithoutServiceInput = {
    where: StaffOnServiceScalarWhereInput
    data: XOR<StaffOnServiceUpdateManyMutationInput, StaffOnServiceUncheckedUpdateManyWithoutServiceInput>
  }

  export type BookedServiceUpsertWithWhereUniqueWithoutServiceInput = {
    where: BookedServiceWhereUniqueInput
    update: XOR<BookedServiceUpdateWithoutServiceInput, BookedServiceUncheckedUpdateWithoutServiceInput>
    create: XOR<BookedServiceCreateWithoutServiceInput, BookedServiceUncheckedCreateWithoutServiceInput>
  }

  export type BookedServiceUpdateWithWhereUniqueWithoutServiceInput = {
    where: BookedServiceWhereUniqueInput
    data: XOR<BookedServiceUpdateWithoutServiceInput, BookedServiceUncheckedUpdateWithoutServiceInput>
  }

  export type BookedServiceUpdateManyWithWhereWithoutServiceInput = {
    where: BookedServiceScalarWhereInput
    data: XOR<BookedServiceUpdateManyMutationInput, BookedServiceUncheckedUpdateManyWithoutServiceInput>
  }

  export type ServiceCreateWithoutBookedServicesInput = {
    name: string
    price?: number
    petType?: ServiceCreatepetTypeInput | $Enums.PetType[]
    picture: string
    reviews?: ChatLogCreateNestedManyWithoutServiceInput
    staffOnServices?: StaffOnServiceCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateWithoutBookedServicesInput = {
    id?: number
    name: string
    price?: number
    petType?: ServiceCreatepetTypeInput | $Enums.PetType[]
    picture: string
    reviews?: ChatLogUncheckedCreateNestedManyWithoutServiceInput
    staffOnServices?: StaffOnServiceUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutBookedServicesInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutBookedServicesInput, ServiceUncheckedCreateWithoutBookedServicesInput>
  }

  export type PetCreateWithoutScheduledInput = {
    name: string
    sex?: $Enums.Sex
    age: number
    type?: $Enums.PetType
    status?: $Enums.PetStatus
    breed: string
    disease?: PetCreatediseaseInput | string[]
    allergic?: PetCreateallergicInput | string[]
    picture: string
    stayed?: BookedRoomCreateNestedManyWithoutPetInput
    customer: CustomerCreateNestedOneWithoutPetsInput
    cares?: CareCreateNestedManyWithoutPetInput
  }

  export type PetUncheckedCreateWithoutScheduledInput = {
    id?: number
    name: string
    sex?: $Enums.Sex
    age: number
    type?: $Enums.PetType
    status?: $Enums.PetStatus
    breed: string
    disease?: PetCreatediseaseInput | string[]
    allergic?: PetCreateallergicInput | string[]
    picture: string
    customerId: number
    stayed?: BookedRoomUncheckedCreateNestedManyWithoutPetInput
    cares?: CareUncheckedCreateNestedManyWithoutPetInput
  }

  export type PetCreateOrConnectWithoutScheduledInput = {
    where: PetWhereUniqueInput
    create: XOR<PetCreateWithoutScheduledInput, PetUncheckedCreateWithoutScheduledInput>
  }

  export type BookingCreateWithoutBooked_serviceInput = {
    date: Date | string
    status?: $Enums.BookingStatus
    customerName: string
    customerEmail: string
    customerNumber: string
    booked_room?: BookedRoomCreateNestedManyWithoutBookingInput
    customer?: CustomerCreateNestedOneWithoutBookingsInput
    payment?: PaymentCreateNestedOneWithoutBookingInput
  }

  export type BookingUncheckedCreateWithoutBooked_serviceInput = {
    id?: number
    date: Date | string
    status?: $Enums.BookingStatus
    customerId?: number | null
    customerName: string
    customerEmail: string
    customerNumber: string
    booked_room?: BookedRoomUncheckedCreateNestedManyWithoutBookingInput
    payment?: PaymentUncheckedCreateNestedOneWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutBooked_serviceInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutBooked_serviceInput, BookingUncheckedCreateWithoutBooked_serviceInput>
  }

  export type ServiceUpsertWithoutBookedServicesInput = {
    update: XOR<ServiceUpdateWithoutBookedServicesInput, ServiceUncheckedUpdateWithoutBookedServicesInput>
    create: XOR<ServiceCreateWithoutBookedServicesInput, ServiceUncheckedCreateWithoutBookedServicesInput>
    where?: ServiceWhereInput
  }

  export type ServiceUpdateToOneWithWhereWithoutBookedServicesInput = {
    where?: ServiceWhereInput
    data: XOR<ServiceUpdateWithoutBookedServicesInput, ServiceUncheckedUpdateWithoutBookedServicesInput>
  }

  export type ServiceUpdateWithoutBookedServicesInput = {
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    petType?: ServiceUpdatepetTypeInput | $Enums.PetType[]
    picture?: StringFieldUpdateOperationsInput | string
    reviews?: ChatLogUpdateManyWithoutServiceNestedInput
    staffOnServices?: StaffOnServiceUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateWithoutBookedServicesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    petType?: ServiceUpdatepetTypeInput | $Enums.PetType[]
    picture?: StringFieldUpdateOperationsInput | string
    reviews?: ChatLogUncheckedUpdateManyWithoutServiceNestedInput
    staffOnServices?: StaffOnServiceUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type PetUpsertWithoutScheduledInput = {
    update: XOR<PetUpdateWithoutScheduledInput, PetUncheckedUpdateWithoutScheduledInput>
    create: XOR<PetCreateWithoutScheduledInput, PetUncheckedCreateWithoutScheduledInput>
    where?: PetWhereInput
  }

  export type PetUpdateToOneWithWhereWithoutScheduledInput = {
    where?: PetWhereInput
    data: XOR<PetUpdateWithoutScheduledInput, PetUncheckedUpdateWithoutScheduledInput>
  }

  export type PetUpdateWithoutScheduledInput = {
    name?: StringFieldUpdateOperationsInput | string
    sex?: EnumSexFieldUpdateOperationsInput | $Enums.Sex
    age?: IntFieldUpdateOperationsInput | number
    type?: EnumPetTypeFieldUpdateOperationsInput | $Enums.PetType
    status?: EnumPetStatusFieldUpdateOperationsInput | $Enums.PetStatus
    breed?: StringFieldUpdateOperationsInput | string
    disease?: PetUpdatediseaseInput | string[]
    allergic?: PetUpdateallergicInput | string[]
    picture?: StringFieldUpdateOperationsInput | string
    stayed?: BookedRoomUpdateManyWithoutPetNestedInput
    customer?: CustomerUpdateOneRequiredWithoutPetsNestedInput
    cares?: CareUpdateManyWithoutPetNestedInput
  }

  export type PetUncheckedUpdateWithoutScheduledInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    sex?: EnumSexFieldUpdateOperationsInput | $Enums.Sex
    age?: IntFieldUpdateOperationsInput | number
    type?: EnumPetTypeFieldUpdateOperationsInput | $Enums.PetType
    status?: EnumPetStatusFieldUpdateOperationsInput | $Enums.PetStatus
    breed?: StringFieldUpdateOperationsInput | string
    disease?: PetUpdatediseaseInput | string[]
    allergic?: PetUpdateallergicInput | string[]
    picture?: StringFieldUpdateOperationsInput | string
    customerId?: IntFieldUpdateOperationsInput | number
    stayed?: BookedRoomUncheckedUpdateManyWithoutPetNestedInput
    cares?: CareUncheckedUpdateManyWithoutPetNestedInput
  }

  export type BookingUpsertWithoutBooked_serviceInput = {
    update: XOR<BookingUpdateWithoutBooked_serviceInput, BookingUncheckedUpdateWithoutBooked_serviceInput>
    create: XOR<BookingCreateWithoutBooked_serviceInput, BookingUncheckedCreateWithoutBooked_serviceInput>
    where?: BookingWhereInput
  }

  export type BookingUpdateToOneWithWhereWithoutBooked_serviceInput = {
    where?: BookingWhereInput
    data: XOR<BookingUpdateWithoutBooked_serviceInput, BookingUncheckedUpdateWithoutBooked_serviceInput>
  }

  export type BookingUpdateWithoutBooked_serviceInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerNumber?: StringFieldUpdateOperationsInput | string
    booked_room?: BookedRoomUpdateManyWithoutBookingNestedInput
    customer?: CustomerUpdateOneWithoutBookingsNestedInput
    payment?: PaymentUpdateOneWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateWithoutBooked_serviceInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    customerId?: NullableIntFieldUpdateOperationsInput | number | null
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerNumber?: StringFieldUpdateOperationsInput | string
    booked_room?: BookedRoomUncheckedUpdateManyWithoutBookingNestedInput
    payment?: PaymentUncheckedUpdateOneWithoutBookingNestedInput
  }

  export type BookedServiceCreateWithoutBookingInput = {
    scheduled: Date | string
    service: ServiceCreateNestedOneWithoutBookedServicesInput
    pet?: PetCreateNestedOneWithoutScheduledInput
  }

  export type BookedServiceUncheckedCreateWithoutBookingInput = {
    id?: number
    serviceId: number
    petId?: number | null
    scheduled: Date | string
  }

  export type BookedServiceCreateOrConnectWithoutBookingInput = {
    where: BookedServiceWhereUniqueInput
    create: XOR<BookedServiceCreateWithoutBookingInput, BookedServiceUncheckedCreateWithoutBookingInput>
  }

  export type BookedServiceCreateManyBookingInputEnvelope = {
    data: BookedServiceCreateManyBookingInput | BookedServiceCreateManyBookingInput[]
    skipDuplicates?: boolean
  }

  export type BookedRoomCreateWithoutBookingInput = {
    checkIn: Date | string
    checkOut: Date | string
    room: RoomCreateNestedOneWithoutBookingsInput
    pet?: PetCreateNestedOneWithoutStayedInput
  }

  export type BookedRoomUncheckedCreateWithoutBookingInput = {
    id?: number
    checkIn: Date | string
    checkOut: Date | string
    roomId: number
    petId?: number | null
  }

  export type BookedRoomCreateOrConnectWithoutBookingInput = {
    where: BookedRoomWhereUniqueInput
    create: XOR<BookedRoomCreateWithoutBookingInput, BookedRoomUncheckedCreateWithoutBookingInput>
  }

  export type BookedRoomCreateManyBookingInputEnvelope = {
    data: BookedRoomCreateManyBookingInput | BookedRoomCreateManyBookingInput[]
    skipDuplicates?: boolean
  }

  export type CustomerCreateWithoutBookingsInput = {
    user: UserCreateNestedOneWithoutCustomerInput
    chats?: ChatLogCreateNestedManyWithoutCustomerInput
    pets?: PetCreateNestedManyWithoutCustomerInput
    payments?: PaymentCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutBookingsInput = {
    id?: number
    userId: number
    chats?: ChatLogUncheckedCreateNestedManyWithoutCustomerInput
    pets?: PetUncheckedCreateNestedManyWithoutCustomerInput
    payments?: PaymentUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerCreateOrConnectWithoutBookingsInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutBookingsInput, CustomerUncheckedCreateWithoutBookingsInput>
  }

  export type PaymentCreateWithoutBookingInput = {
    cost: number
    date: Date | string
    status?: $Enums.PaymentStatus
    customerName: string
    customerEmail: string
    customerNumber: string
    customer?: CustomerCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateWithoutBookingInput = {
    id?: number
    cost: number
    date: Date | string
    status?: $Enums.PaymentStatus
    customerId?: number | null
    customerName: string
    customerEmail: string
    customerNumber: string
  }

  export type PaymentCreateOrConnectWithoutBookingInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutBookingInput, PaymentUncheckedCreateWithoutBookingInput>
  }

  export type BookedServiceUpsertWithWhereUniqueWithoutBookingInput = {
    where: BookedServiceWhereUniqueInput
    update: XOR<BookedServiceUpdateWithoutBookingInput, BookedServiceUncheckedUpdateWithoutBookingInput>
    create: XOR<BookedServiceCreateWithoutBookingInput, BookedServiceUncheckedCreateWithoutBookingInput>
  }

  export type BookedServiceUpdateWithWhereUniqueWithoutBookingInput = {
    where: BookedServiceWhereUniqueInput
    data: XOR<BookedServiceUpdateWithoutBookingInput, BookedServiceUncheckedUpdateWithoutBookingInput>
  }

  export type BookedServiceUpdateManyWithWhereWithoutBookingInput = {
    where: BookedServiceScalarWhereInput
    data: XOR<BookedServiceUpdateManyMutationInput, BookedServiceUncheckedUpdateManyWithoutBookingInput>
  }

  export type BookedRoomUpsertWithWhereUniqueWithoutBookingInput = {
    where: BookedRoomWhereUniqueInput
    update: XOR<BookedRoomUpdateWithoutBookingInput, BookedRoomUncheckedUpdateWithoutBookingInput>
    create: XOR<BookedRoomCreateWithoutBookingInput, BookedRoomUncheckedCreateWithoutBookingInput>
  }

  export type BookedRoomUpdateWithWhereUniqueWithoutBookingInput = {
    where: BookedRoomWhereUniqueInput
    data: XOR<BookedRoomUpdateWithoutBookingInput, BookedRoomUncheckedUpdateWithoutBookingInput>
  }

  export type BookedRoomUpdateManyWithWhereWithoutBookingInput = {
    where: BookedRoomScalarWhereInput
    data: XOR<BookedRoomUpdateManyMutationInput, BookedRoomUncheckedUpdateManyWithoutBookingInput>
  }

  export type CustomerUpsertWithoutBookingsInput = {
    update: XOR<CustomerUpdateWithoutBookingsInput, CustomerUncheckedUpdateWithoutBookingsInput>
    create: XOR<CustomerCreateWithoutBookingsInput, CustomerUncheckedCreateWithoutBookingsInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutBookingsInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutBookingsInput, CustomerUncheckedUpdateWithoutBookingsInput>
  }

  export type CustomerUpdateWithoutBookingsInput = {
    user?: UserUpdateOneRequiredWithoutCustomerNestedInput
    chats?: ChatLogUpdateManyWithoutCustomerNestedInput
    pets?: PetUpdateManyWithoutCustomerNestedInput
    payments?: PaymentUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutBookingsInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    chats?: ChatLogUncheckedUpdateManyWithoutCustomerNestedInput
    pets?: PetUncheckedUpdateManyWithoutCustomerNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type PaymentUpsertWithoutBookingInput = {
    update: XOR<PaymentUpdateWithoutBookingInput, PaymentUncheckedUpdateWithoutBookingInput>
    create: XOR<PaymentCreateWithoutBookingInput, PaymentUncheckedCreateWithoutBookingInput>
    where?: PaymentWhereInput
  }

  export type PaymentUpdateToOneWithWhereWithoutBookingInput = {
    where?: PaymentWhereInput
    data: XOR<PaymentUpdateWithoutBookingInput, PaymentUncheckedUpdateWithoutBookingInput>
  }

  export type PaymentUpdateWithoutBookingInput = {
    cost?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerNumber?: StringFieldUpdateOperationsInput | string
    customer?: CustomerUpdateOneWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateWithoutBookingInput = {
    id?: IntFieldUpdateOperationsInput | number
    cost?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    customerId?: NullableIntFieldUpdateOperationsInput | number | null
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerNumber?: StringFieldUpdateOperationsInput | string
  }

  export type BookingCreateWithoutPaymentInput = {
    date: Date | string
    status?: $Enums.BookingStatus
    customerName: string
    customerEmail: string
    customerNumber: string
    booked_service?: BookedServiceCreateNestedManyWithoutBookingInput
    booked_room?: BookedRoomCreateNestedManyWithoutBookingInput
    customer?: CustomerCreateNestedOneWithoutBookingsInput
  }

  export type BookingUncheckedCreateWithoutPaymentInput = {
    id?: number
    date: Date | string
    status?: $Enums.BookingStatus
    customerId?: number | null
    customerName: string
    customerEmail: string
    customerNumber: string
    booked_service?: BookedServiceUncheckedCreateNestedManyWithoutBookingInput
    booked_room?: BookedRoomUncheckedCreateNestedManyWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutPaymentInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutPaymentInput, BookingUncheckedCreateWithoutPaymentInput>
  }

  export type CustomerCreateWithoutPaymentsInput = {
    user: UserCreateNestedOneWithoutCustomerInput
    chats?: ChatLogCreateNestedManyWithoutCustomerInput
    pets?: PetCreateNestedManyWithoutCustomerInput
    bookings?: BookingCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutPaymentsInput = {
    id?: number
    userId: number
    chats?: ChatLogUncheckedCreateNestedManyWithoutCustomerInput
    pets?: PetUncheckedCreateNestedManyWithoutCustomerInput
    bookings?: BookingUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerCreateOrConnectWithoutPaymentsInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutPaymentsInput, CustomerUncheckedCreateWithoutPaymentsInput>
  }

  export type BookingUpsertWithoutPaymentInput = {
    update: XOR<BookingUpdateWithoutPaymentInput, BookingUncheckedUpdateWithoutPaymentInput>
    create: XOR<BookingCreateWithoutPaymentInput, BookingUncheckedCreateWithoutPaymentInput>
    where?: BookingWhereInput
  }

  export type BookingUpdateToOneWithWhereWithoutPaymentInput = {
    where?: BookingWhereInput
    data: XOR<BookingUpdateWithoutPaymentInput, BookingUncheckedUpdateWithoutPaymentInput>
  }

  export type BookingUpdateWithoutPaymentInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerNumber?: StringFieldUpdateOperationsInput | string
    booked_service?: BookedServiceUpdateManyWithoutBookingNestedInput
    booked_room?: BookedRoomUpdateManyWithoutBookingNestedInput
    customer?: CustomerUpdateOneWithoutBookingsNestedInput
  }

  export type BookingUncheckedUpdateWithoutPaymentInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    customerId?: NullableIntFieldUpdateOperationsInput | number | null
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerNumber?: StringFieldUpdateOperationsInput | string
    booked_service?: BookedServiceUncheckedUpdateManyWithoutBookingNestedInput
    booked_room?: BookedRoomUncheckedUpdateManyWithoutBookingNestedInput
  }

  export type CustomerUpsertWithoutPaymentsInput = {
    update: XOR<CustomerUpdateWithoutPaymentsInput, CustomerUncheckedUpdateWithoutPaymentsInput>
    create: XOR<CustomerCreateWithoutPaymentsInput, CustomerUncheckedCreateWithoutPaymentsInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutPaymentsInput, CustomerUncheckedUpdateWithoutPaymentsInput>
  }

  export type CustomerUpdateWithoutPaymentsInput = {
    user?: UserUpdateOneRequiredWithoutCustomerNestedInput
    chats?: ChatLogUpdateManyWithoutCustomerNestedInput
    pets?: PetUpdateManyWithoutCustomerNestedInput
    bookings?: BookingUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutPaymentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    chats?: ChatLogUncheckedUpdateManyWithoutCustomerNestedInput
    pets?: PetUncheckedUpdateManyWithoutCustomerNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type StaffCreateWithoutCaresInput = {
    wages: number
    bank_company?: $Enums.Bank
    bank_account: string
    user: UserCreateNestedOneWithoutStaffInput
    replies?: ChatLogCreateNestedManyWithoutStaffInput
    staffOnServices?: StaffOnServiceCreateNestedManyWithoutStaffInput
    roomStaff?: RoomStaffCreateNestedManyWithoutStaffInput
  }

  export type StaffUncheckedCreateWithoutCaresInput = {
    id?: number
    wages: number
    bank_company?: $Enums.Bank
    bank_account: string
    userId: number
    replies?: ChatLogUncheckedCreateNestedManyWithoutStaffInput
    staffOnServices?: StaffOnServiceUncheckedCreateNestedManyWithoutStaffInput
    roomStaff?: RoomStaffUncheckedCreateNestedManyWithoutStaffInput
  }

  export type StaffCreateOrConnectWithoutCaresInput = {
    where: StaffWhereUniqueInput
    create: XOR<StaffCreateWithoutCaresInput, StaffUncheckedCreateWithoutCaresInput>
  }

  export type PetCreateWithoutCaresInput = {
    name: string
    sex?: $Enums.Sex
    age: number
    type?: $Enums.PetType
    status?: $Enums.PetStatus
    breed: string
    disease?: PetCreatediseaseInput | string[]
    allergic?: PetCreateallergicInput | string[]
    picture: string
    scheduled?: BookedServiceCreateNestedManyWithoutPetInput
    stayed?: BookedRoomCreateNestedManyWithoutPetInput
    customer: CustomerCreateNestedOneWithoutPetsInput
  }

  export type PetUncheckedCreateWithoutCaresInput = {
    id?: number
    name: string
    sex?: $Enums.Sex
    age: number
    type?: $Enums.PetType
    status?: $Enums.PetStatus
    breed: string
    disease?: PetCreatediseaseInput | string[]
    allergic?: PetCreateallergicInput | string[]
    picture: string
    customerId: number
    scheduled?: BookedServiceUncheckedCreateNestedManyWithoutPetInput
    stayed?: BookedRoomUncheckedCreateNestedManyWithoutPetInput
  }

  export type PetCreateOrConnectWithoutCaresInput = {
    where: PetWhereUniqueInput
    create: XOR<PetCreateWithoutCaresInput, PetUncheckedCreateWithoutCaresInput>
  }

  export type StaffUpsertWithoutCaresInput = {
    update: XOR<StaffUpdateWithoutCaresInput, StaffUncheckedUpdateWithoutCaresInput>
    create: XOR<StaffCreateWithoutCaresInput, StaffUncheckedCreateWithoutCaresInput>
    where?: StaffWhereInput
  }

  export type StaffUpdateToOneWithWhereWithoutCaresInput = {
    where?: StaffWhereInput
    data: XOR<StaffUpdateWithoutCaresInput, StaffUncheckedUpdateWithoutCaresInput>
  }

  export type StaffUpdateWithoutCaresInput = {
    wages?: FloatFieldUpdateOperationsInput | number
    bank_company?: EnumBankFieldUpdateOperationsInput | $Enums.Bank
    bank_account?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutStaffNestedInput
    replies?: ChatLogUpdateManyWithoutStaffNestedInput
    staffOnServices?: StaffOnServiceUpdateManyWithoutStaffNestedInput
    roomStaff?: RoomStaffUpdateManyWithoutStaffNestedInput
  }

  export type StaffUncheckedUpdateWithoutCaresInput = {
    id?: IntFieldUpdateOperationsInput | number
    wages?: FloatFieldUpdateOperationsInput | number
    bank_company?: EnumBankFieldUpdateOperationsInput | $Enums.Bank
    bank_account?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    replies?: ChatLogUncheckedUpdateManyWithoutStaffNestedInput
    staffOnServices?: StaffOnServiceUncheckedUpdateManyWithoutStaffNestedInput
    roomStaff?: RoomStaffUncheckedUpdateManyWithoutStaffNestedInput
  }

  export type PetUpsertWithoutCaresInput = {
    update: XOR<PetUpdateWithoutCaresInput, PetUncheckedUpdateWithoutCaresInput>
    create: XOR<PetCreateWithoutCaresInput, PetUncheckedCreateWithoutCaresInput>
    where?: PetWhereInput
  }

  export type PetUpdateToOneWithWhereWithoutCaresInput = {
    where?: PetWhereInput
    data: XOR<PetUpdateWithoutCaresInput, PetUncheckedUpdateWithoutCaresInput>
  }

  export type PetUpdateWithoutCaresInput = {
    name?: StringFieldUpdateOperationsInput | string
    sex?: EnumSexFieldUpdateOperationsInput | $Enums.Sex
    age?: IntFieldUpdateOperationsInput | number
    type?: EnumPetTypeFieldUpdateOperationsInput | $Enums.PetType
    status?: EnumPetStatusFieldUpdateOperationsInput | $Enums.PetStatus
    breed?: StringFieldUpdateOperationsInput | string
    disease?: PetUpdatediseaseInput | string[]
    allergic?: PetUpdateallergicInput | string[]
    picture?: StringFieldUpdateOperationsInput | string
    scheduled?: BookedServiceUpdateManyWithoutPetNestedInput
    stayed?: BookedRoomUpdateManyWithoutPetNestedInput
    customer?: CustomerUpdateOneRequiredWithoutPetsNestedInput
  }

  export type PetUncheckedUpdateWithoutCaresInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    sex?: EnumSexFieldUpdateOperationsInput | $Enums.Sex
    age?: IntFieldUpdateOperationsInput | number
    type?: EnumPetTypeFieldUpdateOperationsInput | $Enums.PetType
    status?: EnumPetStatusFieldUpdateOperationsInput | $Enums.PetStatus
    breed?: StringFieldUpdateOperationsInput | string
    disease?: PetUpdatediseaseInput | string[]
    allergic?: PetUpdateallergicInput | string[]
    picture?: StringFieldUpdateOperationsInput | string
    customerId?: IntFieldUpdateOperationsInput | number
    scheduled?: BookedServiceUncheckedUpdateManyWithoutPetNestedInput
    stayed?: BookedRoomUncheckedUpdateManyWithoutPetNestedInput
  }

  export type StaffCreateWithoutStaffOnServicesInput = {
    wages: number
    bank_company?: $Enums.Bank
    bank_account: string
    user: UserCreateNestedOneWithoutStaffInput
    replies?: ChatLogCreateNestedManyWithoutStaffInput
    cares?: CareCreateNestedManyWithoutStaffInput
    roomStaff?: RoomStaffCreateNestedManyWithoutStaffInput
  }

  export type StaffUncheckedCreateWithoutStaffOnServicesInput = {
    id?: number
    wages: number
    bank_company?: $Enums.Bank
    bank_account: string
    userId: number
    replies?: ChatLogUncheckedCreateNestedManyWithoutStaffInput
    cares?: CareUncheckedCreateNestedManyWithoutStaffInput
    roomStaff?: RoomStaffUncheckedCreateNestedManyWithoutStaffInput
  }

  export type StaffCreateOrConnectWithoutStaffOnServicesInput = {
    where: StaffWhereUniqueInput
    create: XOR<StaffCreateWithoutStaffOnServicesInput, StaffUncheckedCreateWithoutStaffOnServicesInput>
  }

  export type ServiceCreateWithoutStaffOnServicesInput = {
    name: string
    price?: number
    petType?: ServiceCreatepetTypeInput | $Enums.PetType[]
    picture: string
    reviews?: ChatLogCreateNestedManyWithoutServiceInput
    bookedServices?: BookedServiceCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateWithoutStaffOnServicesInput = {
    id?: number
    name: string
    price?: number
    petType?: ServiceCreatepetTypeInput | $Enums.PetType[]
    picture: string
    reviews?: ChatLogUncheckedCreateNestedManyWithoutServiceInput
    bookedServices?: BookedServiceUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutStaffOnServicesInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutStaffOnServicesInput, ServiceUncheckedCreateWithoutStaffOnServicesInput>
  }

  export type StaffUpsertWithoutStaffOnServicesInput = {
    update: XOR<StaffUpdateWithoutStaffOnServicesInput, StaffUncheckedUpdateWithoutStaffOnServicesInput>
    create: XOR<StaffCreateWithoutStaffOnServicesInput, StaffUncheckedCreateWithoutStaffOnServicesInput>
    where?: StaffWhereInput
  }

  export type StaffUpdateToOneWithWhereWithoutStaffOnServicesInput = {
    where?: StaffWhereInput
    data: XOR<StaffUpdateWithoutStaffOnServicesInput, StaffUncheckedUpdateWithoutStaffOnServicesInput>
  }

  export type StaffUpdateWithoutStaffOnServicesInput = {
    wages?: FloatFieldUpdateOperationsInput | number
    bank_company?: EnumBankFieldUpdateOperationsInput | $Enums.Bank
    bank_account?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutStaffNestedInput
    replies?: ChatLogUpdateManyWithoutStaffNestedInput
    cares?: CareUpdateManyWithoutStaffNestedInput
    roomStaff?: RoomStaffUpdateManyWithoutStaffNestedInput
  }

  export type StaffUncheckedUpdateWithoutStaffOnServicesInput = {
    id?: IntFieldUpdateOperationsInput | number
    wages?: FloatFieldUpdateOperationsInput | number
    bank_company?: EnumBankFieldUpdateOperationsInput | $Enums.Bank
    bank_account?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    replies?: ChatLogUncheckedUpdateManyWithoutStaffNestedInput
    cares?: CareUncheckedUpdateManyWithoutStaffNestedInput
    roomStaff?: RoomStaffUncheckedUpdateManyWithoutStaffNestedInput
  }

  export type ServiceUpsertWithoutStaffOnServicesInput = {
    update: XOR<ServiceUpdateWithoutStaffOnServicesInput, ServiceUncheckedUpdateWithoutStaffOnServicesInput>
    create: XOR<ServiceCreateWithoutStaffOnServicesInput, ServiceUncheckedCreateWithoutStaffOnServicesInput>
    where?: ServiceWhereInput
  }

  export type ServiceUpdateToOneWithWhereWithoutStaffOnServicesInput = {
    where?: ServiceWhereInput
    data: XOR<ServiceUpdateWithoutStaffOnServicesInput, ServiceUncheckedUpdateWithoutStaffOnServicesInput>
  }

  export type ServiceUpdateWithoutStaffOnServicesInput = {
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    petType?: ServiceUpdatepetTypeInput | $Enums.PetType[]
    picture?: StringFieldUpdateOperationsInput | string
    reviews?: ChatLogUpdateManyWithoutServiceNestedInput
    bookedServices?: BookedServiceUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateWithoutStaffOnServicesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    petType?: ServiceUpdatepetTypeInput | $Enums.PetType[]
    picture?: StringFieldUpdateOperationsInput | string
    reviews?: ChatLogUncheckedUpdateManyWithoutServiceNestedInput
    bookedServices?: BookedServiceUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type RoomCreateWithoutStaffOnRoomsInput = {
    capacity?: number
    price?: number
    picture?: RoomCreatepictureInput | string[]
    petType?: $Enums.PetType
    bookings?: BookedRoomCreateNestedManyWithoutRoomInput
  }

  export type RoomUncheckedCreateWithoutStaffOnRoomsInput = {
    id?: number
    capacity?: number
    price?: number
    picture?: RoomCreatepictureInput | string[]
    petType?: $Enums.PetType
    bookings?: BookedRoomUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomCreateOrConnectWithoutStaffOnRoomsInput = {
    where: RoomWhereUniqueInput
    create: XOR<RoomCreateWithoutStaffOnRoomsInput, RoomUncheckedCreateWithoutStaffOnRoomsInput>
  }

  export type StaffCreateWithoutRoomStaffInput = {
    wages: number
    bank_company?: $Enums.Bank
    bank_account: string
    user: UserCreateNestedOneWithoutStaffInput
    replies?: ChatLogCreateNestedManyWithoutStaffInput
    cares?: CareCreateNestedManyWithoutStaffInput
    staffOnServices?: StaffOnServiceCreateNestedManyWithoutStaffInput
  }

  export type StaffUncheckedCreateWithoutRoomStaffInput = {
    id?: number
    wages: number
    bank_company?: $Enums.Bank
    bank_account: string
    userId: number
    replies?: ChatLogUncheckedCreateNestedManyWithoutStaffInput
    cares?: CareUncheckedCreateNestedManyWithoutStaffInput
    staffOnServices?: StaffOnServiceUncheckedCreateNestedManyWithoutStaffInput
  }

  export type StaffCreateOrConnectWithoutRoomStaffInput = {
    where: StaffWhereUniqueInput
    create: XOR<StaffCreateWithoutRoomStaffInput, StaffUncheckedCreateWithoutRoomStaffInput>
  }

  export type RoomUpsertWithoutStaffOnRoomsInput = {
    update: XOR<RoomUpdateWithoutStaffOnRoomsInput, RoomUncheckedUpdateWithoutStaffOnRoomsInput>
    create: XOR<RoomCreateWithoutStaffOnRoomsInput, RoomUncheckedCreateWithoutStaffOnRoomsInput>
    where?: RoomWhereInput
  }

  export type RoomUpdateToOneWithWhereWithoutStaffOnRoomsInput = {
    where?: RoomWhereInput
    data: XOR<RoomUpdateWithoutStaffOnRoomsInput, RoomUncheckedUpdateWithoutStaffOnRoomsInput>
  }

  export type RoomUpdateWithoutStaffOnRoomsInput = {
    capacity?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    picture?: RoomUpdatepictureInput | string[]
    petType?: EnumPetTypeFieldUpdateOperationsInput | $Enums.PetType
    bookings?: BookedRoomUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateWithoutStaffOnRoomsInput = {
    id?: IntFieldUpdateOperationsInput | number
    capacity?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    picture?: RoomUpdatepictureInput | string[]
    petType?: EnumPetTypeFieldUpdateOperationsInput | $Enums.PetType
    bookings?: BookedRoomUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type StaffUpsertWithoutRoomStaffInput = {
    update: XOR<StaffUpdateWithoutRoomStaffInput, StaffUncheckedUpdateWithoutRoomStaffInput>
    create: XOR<StaffCreateWithoutRoomStaffInput, StaffUncheckedCreateWithoutRoomStaffInput>
    where?: StaffWhereInput
  }

  export type StaffUpdateToOneWithWhereWithoutRoomStaffInput = {
    where?: StaffWhereInput
    data: XOR<StaffUpdateWithoutRoomStaffInput, StaffUncheckedUpdateWithoutRoomStaffInput>
  }

  export type StaffUpdateWithoutRoomStaffInput = {
    wages?: FloatFieldUpdateOperationsInput | number
    bank_company?: EnumBankFieldUpdateOperationsInput | $Enums.Bank
    bank_account?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutStaffNestedInput
    replies?: ChatLogUpdateManyWithoutStaffNestedInput
    cares?: CareUpdateManyWithoutStaffNestedInput
    staffOnServices?: StaffOnServiceUpdateManyWithoutStaffNestedInput
  }

  export type StaffUncheckedUpdateWithoutRoomStaffInput = {
    id?: IntFieldUpdateOperationsInput | number
    wages?: FloatFieldUpdateOperationsInput | number
    bank_company?: EnumBankFieldUpdateOperationsInput | $Enums.Bank
    bank_account?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    replies?: ChatLogUncheckedUpdateManyWithoutStaffNestedInput
    cares?: CareUncheckedUpdateManyWithoutStaffNestedInput
    staffOnServices?: StaffOnServiceUncheckedUpdateManyWithoutStaffNestedInput
  }

  export type ChatLogCreateManyStaffInput = {
    id?: number
    review?: string | null
    reply?: string | null
    rating?: number | null
    review_date?: Date | string
    reply_date?: Date | string | null
    customerId?: number | null
    serviceId: number
  }

  export type CareCreateManyStaffInput = {
    start_period?: Date | string
    end_period: Date | string
    pet_id: number
  }

  export type StaffOnServiceCreateManyStaffInput = {
    serviceId: number
  }

  export type RoomStaffCreateManyStaffInput = {
    roomId: number
  }

  export type ChatLogUpdateWithoutStaffInput = {
    review?: NullableStringFieldUpdateOperationsInput | string | null
    reply?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    review_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reply_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customer?: CustomerUpdateOneWithoutChatsNestedInput
    service?: ServiceUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ChatLogUncheckedUpdateWithoutStaffInput = {
    id?: IntFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    reply?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    review_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reply_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customerId?: NullableIntFieldUpdateOperationsInput | number | null
    serviceId?: IntFieldUpdateOperationsInput | number
  }

  export type ChatLogUncheckedUpdateManyWithoutStaffInput = {
    id?: IntFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    reply?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    review_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reply_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customerId?: NullableIntFieldUpdateOperationsInput | number | null
    serviceId?: IntFieldUpdateOperationsInput | number
  }

  export type CareUpdateWithoutStaffInput = {
    start_period?: DateTimeFieldUpdateOperationsInput | Date | string
    end_period?: DateTimeFieldUpdateOperationsInput | Date | string
    pet?: PetUpdateOneRequiredWithoutCaresNestedInput
  }

  export type CareUncheckedUpdateWithoutStaffInput = {
    start_period?: DateTimeFieldUpdateOperationsInput | Date | string
    end_period?: DateTimeFieldUpdateOperationsInput | Date | string
    pet_id?: IntFieldUpdateOperationsInput | number
  }

  export type CareUncheckedUpdateManyWithoutStaffInput = {
    start_period?: DateTimeFieldUpdateOperationsInput | Date | string
    end_period?: DateTimeFieldUpdateOperationsInput | Date | string
    pet_id?: IntFieldUpdateOperationsInput | number
  }

  export type StaffOnServiceUpdateWithoutStaffInput = {
    service?: ServiceUpdateOneRequiredWithoutStaffOnServicesNestedInput
  }

  export type StaffOnServiceUncheckedUpdateWithoutStaffInput = {
    serviceId?: IntFieldUpdateOperationsInput | number
  }

  export type StaffOnServiceUncheckedUpdateManyWithoutStaffInput = {
    serviceId?: IntFieldUpdateOperationsInput | number
  }

  export type RoomStaffUpdateWithoutStaffInput = {
    room?: RoomUpdateOneRequiredWithoutStaffOnRoomsNestedInput
  }

  export type RoomStaffUncheckedUpdateWithoutStaffInput = {
    roomId?: IntFieldUpdateOperationsInput | number
  }

  export type RoomStaffUncheckedUpdateManyWithoutStaffInput = {
    roomId?: IntFieldUpdateOperationsInput | number
  }

  export type ChatLogCreateManyCustomerInput = {
    id?: number
    review?: string | null
    reply?: string | null
    rating?: number | null
    review_date?: Date | string
    reply_date?: Date | string | null
    staffId?: number | null
    serviceId: number
  }

  export type PetCreateManyCustomerInput = {
    id?: number
    name: string
    sex?: $Enums.Sex
    age: number
    type?: $Enums.PetType
    status?: $Enums.PetStatus
    breed: string
    disease?: PetCreatediseaseInput | string[]
    allergic?: PetCreateallergicInput | string[]
    picture: string
  }

  export type BookingCreateManyCustomerInput = {
    id?: number
    date: Date | string
    status?: $Enums.BookingStatus
    customerName: string
    customerEmail: string
    customerNumber: string
  }

  export type PaymentCreateManyCustomerInput = {
    id?: number
    cost: number
    date: Date | string
    status?: $Enums.PaymentStatus
    bookingId?: number | null
    customerName: string
    customerEmail: string
    customerNumber: string
  }

  export type ChatLogUpdateWithoutCustomerInput = {
    review?: NullableStringFieldUpdateOperationsInput | string | null
    reply?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    review_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reply_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    staff?: StaffUpdateOneWithoutRepliesNestedInput
    service?: ServiceUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ChatLogUncheckedUpdateWithoutCustomerInput = {
    id?: IntFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    reply?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    review_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reply_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    staffId?: NullableIntFieldUpdateOperationsInput | number | null
    serviceId?: IntFieldUpdateOperationsInput | number
  }

  export type ChatLogUncheckedUpdateManyWithoutCustomerInput = {
    id?: IntFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    reply?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    review_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reply_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    staffId?: NullableIntFieldUpdateOperationsInput | number | null
    serviceId?: IntFieldUpdateOperationsInput | number
  }

  export type PetUpdateWithoutCustomerInput = {
    name?: StringFieldUpdateOperationsInput | string
    sex?: EnumSexFieldUpdateOperationsInput | $Enums.Sex
    age?: IntFieldUpdateOperationsInput | number
    type?: EnumPetTypeFieldUpdateOperationsInput | $Enums.PetType
    status?: EnumPetStatusFieldUpdateOperationsInput | $Enums.PetStatus
    breed?: StringFieldUpdateOperationsInput | string
    disease?: PetUpdatediseaseInput | string[]
    allergic?: PetUpdateallergicInput | string[]
    picture?: StringFieldUpdateOperationsInput | string
    scheduled?: BookedServiceUpdateManyWithoutPetNestedInput
    stayed?: BookedRoomUpdateManyWithoutPetNestedInput
    cares?: CareUpdateManyWithoutPetNestedInput
  }

  export type PetUncheckedUpdateWithoutCustomerInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    sex?: EnumSexFieldUpdateOperationsInput | $Enums.Sex
    age?: IntFieldUpdateOperationsInput | number
    type?: EnumPetTypeFieldUpdateOperationsInput | $Enums.PetType
    status?: EnumPetStatusFieldUpdateOperationsInput | $Enums.PetStatus
    breed?: StringFieldUpdateOperationsInput | string
    disease?: PetUpdatediseaseInput | string[]
    allergic?: PetUpdateallergicInput | string[]
    picture?: StringFieldUpdateOperationsInput | string
    scheduled?: BookedServiceUncheckedUpdateManyWithoutPetNestedInput
    stayed?: BookedRoomUncheckedUpdateManyWithoutPetNestedInput
    cares?: CareUncheckedUpdateManyWithoutPetNestedInput
  }

  export type PetUncheckedUpdateManyWithoutCustomerInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    sex?: EnumSexFieldUpdateOperationsInput | $Enums.Sex
    age?: IntFieldUpdateOperationsInput | number
    type?: EnumPetTypeFieldUpdateOperationsInput | $Enums.PetType
    status?: EnumPetStatusFieldUpdateOperationsInput | $Enums.PetStatus
    breed?: StringFieldUpdateOperationsInput | string
    disease?: PetUpdatediseaseInput | string[]
    allergic?: PetUpdateallergicInput | string[]
    picture?: StringFieldUpdateOperationsInput | string
  }

  export type BookingUpdateWithoutCustomerInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerNumber?: StringFieldUpdateOperationsInput | string
    booked_service?: BookedServiceUpdateManyWithoutBookingNestedInput
    booked_room?: BookedRoomUpdateManyWithoutBookingNestedInput
    payment?: PaymentUpdateOneWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateWithoutCustomerInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerNumber?: StringFieldUpdateOperationsInput | string
    booked_service?: BookedServiceUncheckedUpdateManyWithoutBookingNestedInput
    booked_room?: BookedRoomUncheckedUpdateManyWithoutBookingNestedInput
    payment?: PaymentUncheckedUpdateOneWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateManyWithoutCustomerInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerNumber?: StringFieldUpdateOperationsInput | string
  }

  export type PaymentUpdateWithoutCustomerInput = {
    cost?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerNumber?: StringFieldUpdateOperationsInput | string
    booking?: BookingUpdateOneWithoutPaymentNestedInput
  }

  export type PaymentUncheckedUpdateWithoutCustomerInput = {
    id?: IntFieldUpdateOperationsInput | number
    cost?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    bookingId?: NullableIntFieldUpdateOperationsInput | number | null
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerNumber?: StringFieldUpdateOperationsInput | string
  }

  export type PaymentUncheckedUpdateManyWithoutCustomerInput = {
    id?: IntFieldUpdateOperationsInput | number
    cost?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    bookingId?: NullableIntFieldUpdateOperationsInput | number | null
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerNumber?: StringFieldUpdateOperationsInput | string
  }

  export type BookedServiceCreateManyPetInput = {
    id?: number
    serviceId: number
    scheduled: Date | string
    booking_id: number
  }

  export type BookedRoomCreateManyPetInput = {
    id?: number
    checkIn: Date | string
    checkOut: Date | string
    roomId: number
    bookingId: number
  }

  export type CareCreateManyPetInput = {
    start_period?: Date | string
    end_period: Date | string
    staff_id: number
  }

  export type BookedServiceUpdateWithoutPetInput = {
    scheduled?: DateTimeFieldUpdateOperationsInput | Date | string
    service?: ServiceUpdateOneRequiredWithoutBookedServicesNestedInput
    booking?: BookingUpdateOneRequiredWithoutBooked_serviceNestedInput
  }

  export type BookedServiceUncheckedUpdateWithoutPetInput = {
    id?: IntFieldUpdateOperationsInput | number
    serviceId?: IntFieldUpdateOperationsInput | number
    scheduled?: DateTimeFieldUpdateOperationsInput | Date | string
    booking_id?: IntFieldUpdateOperationsInput | number
  }

  export type BookedServiceUncheckedUpdateManyWithoutPetInput = {
    id?: IntFieldUpdateOperationsInput | number
    serviceId?: IntFieldUpdateOperationsInput | number
    scheduled?: DateTimeFieldUpdateOperationsInput | Date | string
    booking_id?: IntFieldUpdateOperationsInput | number
  }

  export type BookedRoomUpdateWithoutPetInput = {
    checkIn?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOut?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: RoomUpdateOneRequiredWithoutBookingsNestedInput
    booking?: BookingUpdateOneRequiredWithoutBooked_roomNestedInput
  }

  export type BookedRoomUncheckedUpdateWithoutPetInput = {
    id?: IntFieldUpdateOperationsInput | number
    checkIn?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOut?: DateTimeFieldUpdateOperationsInput | Date | string
    roomId?: IntFieldUpdateOperationsInput | number
    bookingId?: IntFieldUpdateOperationsInput | number
  }

  export type BookedRoomUncheckedUpdateManyWithoutPetInput = {
    id?: IntFieldUpdateOperationsInput | number
    checkIn?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOut?: DateTimeFieldUpdateOperationsInput | Date | string
    roomId?: IntFieldUpdateOperationsInput | number
    bookingId?: IntFieldUpdateOperationsInput | number
  }

  export type CareUpdateWithoutPetInput = {
    start_period?: DateTimeFieldUpdateOperationsInput | Date | string
    end_period?: DateTimeFieldUpdateOperationsInput | Date | string
    staff?: StaffUpdateOneRequiredWithoutCaresNestedInput
  }

  export type CareUncheckedUpdateWithoutPetInput = {
    start_period?: DateTimeFieldUpdateOperationsInput | Date | string
    end_period?: DateTimeFieldUpdateOperationsInput | Date | string
    staff_id?: IntFieldUpdateOperationsInput | number
  }

  export type CareUncheckedUpdateManyWithoutPetInput = {
    start_period?: DateTimeFieldUpdateOperationsInput | Date | string
    end_period?: DateTimeFieldUpdateOperationsInput | Date | string
    staff_id?: IntFieldUpdateOperationsInput | number
  }

  export type BookedRoomCreateManyRoomInput = {
    id?: number
    checkIn: Date | string
    checkOut: Date | string
    petId?: number | null
    bookingId: number
  }

  export type RoomStaffCreateManyRoomInput = {
    staffId: number
  }

  export type BookedRoomUpdateWithoutRoomInput = {
    checkIn?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOut?: DateTimeFieldUpdateOperationsInput | Date | string
    pet?: PetUpdateOneWithoutStayedNestedInput
    booking?: BookingUpdateOneRequiredWithoutBooked_roomNestedInput
  }

  export type BookedRoomUncheckedUpdateWithoutRoomInput = {
    id?: IntFieldUpdateOperationsInput | number
    checkIn?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOut?: DateTimeFieldUpdateOperationsInput | Date | string
    petId?: NullableIntFieldUpdateOperationsInput | number | null
    bookingId?: IntFieldUpdateOperationsInput | number
  }

  export type BookedRoomUncheckedUpdateManyWithoutRoomInput = {
    id?: IntFieldUpdateOperationsInput | number
    checkIn?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOut?: DateTimeFieldUpdateOperationsInput | Date | string
    petId?: NullableIntFieldUpdateOperationsInput | number | null
    bookingId?: IntFieldUpdateOperationsInput | number
  }

  export type RoomStaffUpdateWithoutRoomInput = {
    staff?: StaffUpdateOneRequiredWithoutRoomStaffNestedInput
  }

  export type RoomStaffUncheckedUpdateWithoutRoomInput = {
    staffId?: IntFieldUpdateOperationsInput | number
  }

  export type RoomStaffUncheckedUpdateManyWithoutRoomInput = {
    staffId?: IntFieldUpdateOperationsInput | number
  }

  export type ChatLogCreateManyServiceInput = {
    id?: number
    review?: string | null
    reply?: string | null
    rating?: number | null
    review_date?: Date | string
    reply_date?: Date | string | null
    customerId?: number | null
    staffId?: number | null
  }

  export type StaffOnServiceCreateManyServiceInput = {
    staffId: number
  }

  export type BookedServiceCreateManyServiceInput = {
    id?: number
    petId?: number | null
    scheduled: Date | string
    booking_id: number
  }

  export type ChatLogUpdateWithoutServiceInput = {
    review?: NullableStringFieldUpdateOperationsInput | string | null
    reply?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    review_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reply_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customer?: CustomerUpdateOneWithoutChatsNestedInput
    staff?: StaffUpdateOneWithoutRepliesNestedInput
  }

  export type ChatLogUncheckedUpdateWithoutServiceInput = {
    id?: IntFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    reply?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    review_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reply_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customerId?: NullableIntFieldUpdateOperationsInput | number | null
    staffId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ChatLogUncheckedUpdateManyWithoutServiceInput = {
    id?: IntFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    reply?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    review_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reply_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customerId?: NullableIntFieldUpdateOperationsInput | number | null
    staffId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type StaffOnServiceUpdateWithoutServiceInput = {
    staff?: StaffUpdateOneRequiredWithoutStaffOnServicesNestedInput
  }

  export type StaffOnServiceUncheckedUpdateWithoutServiceInput = {
    staffId?: IntFieldUpdateOperationsInput | number
  }

  export type StaffOnServiceUncheckedUpdateManyWithoutServiceInput = {
    staffId?: IntFieldUpdateOperationsInput | number
  }

  export type BookedServiceUpdateWithoutServiceInput = {
    scheduled?: DateTimeFieldUpdateOperationsInput | Date | string
    pet?: PetUpdateOneWithoutScheduledNestedInput
    booking?: BookingUpdateOneRequiredWithoutBooked_serviceNestedInput
  }

  export type BookedServiceUncheckedUpdateWithoutServiceInput = {
    id?: IntFieldUpdateOperationsInput | number
    petId?: NullableIntFieldUpdateOperationsInput | number | null
    scheduled?: DateTimeFieldUpdateOperationsInput | Date | string
    booking_id?: IntFieldUpdateOperationsInput | number
  }

  export type BookedServiceUncheckedUpdateManyWithoutServiceInput = {
    id?: IntFieldUpdateOperationsInput | number
    petId?: NullableIntFieldUpdateOperationsInput | number | null
    scheduled?: DateTimeFieldUpdateOperationsInput | Date | string
    booking_id?: IntFieldUpdateOperationsInput | number
  }

  export type BookedServiceCreateManyBookingInput = {
    id?: number
    serviceId: number
    petId?: number | null
    scheduled: Date | string
  }

  export type BookedRoomCreateManyBookingInput = {
    id?: number
    checkIn: Date | string
    checkOut: Date | string
    roomId: number
    petId?: number | null
  }

  export type BookedServiceUpdateWithoutBookingInput = {
    scheduled?: DateTimeFieldUpdateOperationsInput | Date | string
    service?: ServiceUpdateOneRequiredWithoutBookedServicesNestedInput
    pet?: PetUpdateOneWithoutScheduledNestedInput
  }

  export type BookedServiceUncheckedUpdateWithoutBookingInput = {
    id?: IntFieldUpdateOperationsInput | number
    serviceId?: IntFieldUpdateOperationsInput | number
    petId?: NullableIntFieldUpdateOperationsInput | number | null
    scheduled?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookedServiceUncheckedUpdateManyWithoutBookingInput = {
    id?: IntFieldUpdateOperationsInput | number
    serviceId?: IntFieldUpdateOperationsInput | number
    petId?: NullableIntFieldUpdateOperationsInput | number | null
    scheduled?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookedRoomUpdateWithoutBookingInput = {
    checkIn?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOut?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: RoomUpdateOneRequiredWithoutBookingsNestedInput
    pet?: PetUpdateOneWithoutStayedNestedInput
  }

  export type BookedRoomUncheckedUpdateWithoutBookingInput = {
    id?: IntFieldUpdateOperationsInput | number
    checkIn?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOut?: DateTimeFieldUpdateOperationsInput | Date | string
    roomId?: IntFieldUpdateOperationsInput | number
    petId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type BookedRoomUncheckedUpdateManyWithoutBookingInput = {
    id?: IntFieldUpdateOperationsInput | number
    checkIn?: DateTimeFieldUpdateOperationsInput | Date | string
    checkOut?: DateTimeFieldUpdateOperationsInput | Date | string
    roomId?: IntFieldUpdateOperationsInput | number
    petId?: NullableIntFieldUpdateOperationsInput | number | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}