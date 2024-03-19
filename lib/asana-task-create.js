// @ts-check

import { ApiClient, TasksApi } from "asana";

let client = ApiClient.instance;
let token = client.authentications["token"];
token.accessToken = process.env.ASANA_PAT;

let tasksApiInstance = new TasksApi();

/**
 *
 * @param {{name: string, html_notes: string}} content The contents of the task
 * @param {string} projectId numeric string of the project to put this task in
 */
export async function createTask(content, projectId) {
  const task_data = { data: { ...content, projects: [projectId] } };
  const opts = { opt_fields: "permalink_url" };

  try {
    const result = await tasksApiInstance.createTask(task_data, opts);

    console.log({ result });
    return result.data.permalink_url;
  } catch (error) {
    console.error(error.response.status, error.response.body);
    return error.response.body;
  }
}
