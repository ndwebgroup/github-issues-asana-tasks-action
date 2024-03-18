// @ts-check

// import "dotenv/config";

/**
 * This scans tasks in a project looking for a task with a description
 * containing a specific url (the Issue url).
 */

import { ApiClient, TasksApi } from "asana";

let client = ApiClient.instance;
let token = client.authentications["token"];
token.accessToken = process.env.TOKEN;

let tasksApiInstance = new TasksApi();

/**
 * Search Project tasks for a note containing a given string
 * @param {string} needle string to search for in Task notes
 * @param {string} projectId numeric string gid of the project to search in
 */
export async function findTaskContaining(needle, projectId) {
  let taskRequests = 1;
  let tasksSearched = 0;

  const opts = {
    // completed_since: "2012-02-22T02:06:58.158Z",
    limit: 3, // lower this when paging is working.
    opt_fields: "name,created_at,modified_at,notes,html_notes",
  };

  let foundTask = false;
  let query = await tasksApiInstance.getTasksForProject(projectId, opts);
  let tasks = query.data;

  while (!foundTask) {
    for (let n = 0; n < tasks.length; n++) {
      const search = tasks[n].html_notes.indexOf(needle);
      tasksSearched++;
      // console.log({ indexOf: search, gid: tasks[n].gid, tasksSearched });
      if (search > -1) {
        foundTask = tasks[n];
        // console.log(foundTask);
        break;
      }
    }

    if (foundTask) {
      break;
    }

    console.log("getting more tasks");

    query = await query.nextPage();
    if (!query.data) {
      // console.log("Nothing else to get");
      break;
    }
    taskRequests++;
    console.log("got more:", query.data.length, "page:", taskRequests);
    tasks = query.data;
  }

  console.log(
    "Done!, Searched",
    tasksSearched,
    "tasks across",
    taskRequests,
    "requests."
  );

  //TODO: Handle errors
  return foundTask;
}
