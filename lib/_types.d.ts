/**
 * We use @ts-check in our JS files to benefit from TypeScript static analysis without
 * the overhead of having to transpile our code.
 */

/**
 * for process.env
 */
declare namespace NodeJS {
  export interface ProcessEnv {
    TOKEN: string;
  }
}
