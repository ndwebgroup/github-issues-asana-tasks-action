// @ts-check

import * as core from "@actions/core";
import * as github from "@actions/github";

import { findTaskContaining } from "./lib/asana-task-find.js";
import { markTaskComplete } from "./lib/asana-task-completed.js";

import { issueToTask } from "./lib/util/issue-to-task.js";
import { createTask } from "./lib/asana-task-create.js";
import { updateTask } from "./lib/asana-task-add-story.js";

console.log('checking...')
/**
 * Building from the docs here:
 * @link https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action
 */
try {
  const { eventName, payload } = github.context;
  const { action } = payload;

  //
  // TODO: GET THE PROJECT_ID
  //
  const projectId = "1206848227995333";

  // TODO: TOKEN needs to be set on the environment, not so much as an input.
  // const TOKEN = core.getInput("ASANA_PAT");
  // const TOKEN = process.env.ASANA_PAT;
  // const TOKEN = process.env.TOKEN;
  // process.env.TOKEN = process.env.ASANA_PAT;    // this won't work because the connections have already been set up and the env var was missing
  // const payload = JSON.stringify(github.context.payload, null, 2);
  const payload_str = JSON.stringify(payload, null, 2);
  console.log(`The '${eventName}' event payload: ${payload_str}`);
  // console.log({ TOKEN });
  // console.log(`token length: ${TOKEN.length}`);
  // console.log(`munged token: ${TOKEN.replace(/[46]/g, "%")}`);

  // NOTE: Actions must be validated to prevent running in the wrong context if the action is
  //       specified to run on all types or un-handled types.
  if (eventName === "issues") {
    if (action === "opened") {
      const taskContent = issueToTask(payload);
      const newTask = await createTask(taskContent, projectId);

      console.log(newTask);
    } else if (action === "closed" || action === "reopened") {
      // mark action completed = true, or incomplete = false)

      const theTask = await findTaskContaining("platypus", projectId);
      const completed = !!(action === "closed");
      const result = await markTaskComplete(completed, theTask.gid);
      console.log({ eventName, action, result });
    }
  } else if (eventName === "issue_comment" && action === "created") {
    //
    //
    // TODO: GEt the search string and Project_gid first
    const theTask = await findTaskContaining("platypus", projectId);

    await updateTask(github.context.payload, theTask.gid);
  }
  /**
   * Temporary wiring
   * project ID: 1206848227995333
   * search string: platypus
   */
  // const foundTask = await findTaskContaining("platypus", "1206848227995333");

  // console.log(`foundTask: ${JSON.stringify(foundTask, null, 2)}`);
} catch (error) {
  core.setFailed(error.message);
}
