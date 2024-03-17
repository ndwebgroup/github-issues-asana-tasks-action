/**
 * We use @ts-check in our JS files to benefit from TypeScript static analysis without
 * the overhead of having to transpile our code.
 */
declare module "asana" {
  export class ApiClient {
    static instance: ApiClient;
    instance: ApiClient;
    authentications: {
      token: {
        accessToken: string?;
      };
    };
  }

  export class TasksApi {
    createTask(body: CreateTaskBody, opts?: any): Promise<CreateTaskResult>;
    getTasksForProject(projectId: string, opts?: any): Promise<array>;
  }

  export type CreateTaskBody = {
    data: {
      name: string;
      notes?: string;
      html_notes?: string;
      projects: [] | string[];
    };
  };

  export type CreateTaskResult = {
    // Define the properties of the result as per Asana API's response
    id: string;
    name: string;
    notes: string;
    data?: object;
  };
}

/**
 * for process.env
 */

declare namespace NodeJS {
  export interface ProcessEnv {
    TOKEN: string;
  }
}
