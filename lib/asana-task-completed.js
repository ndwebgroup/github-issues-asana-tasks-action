// @ts-check

import { ApiClient, TasksApi } from "asana";

let client = ApiClient.instance;
let token = client.authentications["token"];
token.accessToken = process.env.ASANA_PAT;

let tasksApiInstance = new TasksApi();

/**
 * Toggle task completion
 *
 * @param {boolean} status True for completed, false for incomplete
 * @param {string} task_gid
 * @returns
 */
export async function markTaskComplete(status, task_gid) {
  try {
    const result = await tasksApiInstance.updateTask(
      { data: { completed: !!status } },
      task_gid
    );

    console.log({ status, task_gid, result });

    return result;
  } catch (error) {
    console.log("error in markTaskComplete", error);
    console.error(error.response?.status, error.response?.body);
    return error.response?.body;
  }
}
