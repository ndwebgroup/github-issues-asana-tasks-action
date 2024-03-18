// @ts-check

import * as core from "@actions/core";
import * as github from "@actions/github";

import { findTaskContaining } from "./lib/asana-find-task.js";

/**
 * Building from the docs here:
 * @link https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action
 */
try {
  // TODO: TOKEN needs to be set on the environment, not so much as an input.
  // const TOKEN = core.getInput("ASANA_PAT");
  // const TOKEN = process.env.ASANA_PAT;
  const TOKEN = process.env.TOKEN;
  // process.env.TOKEN = process.env.ASANA_PAT;    // this won't work because the connections have already been set up and the env var was missing
  // const payload = JSON.stringify(github.context.payload, null, 2);
  // console.log(`The '${github.context.eventName}' event payload: ${payload}`);
  console.log({ TOKEN });
  console.log(`token length: ${TOKEN.length}`);
  console.log(`munged token: ${TOKEN.replace(/[46]/g, "%")}`);

  /**
   * Temporary wiring
   * project ID: 1206848227995333
   * search string: platypus
   */
  const foundTask = await findTaskContaining("platypus", "1206848227995333");

  console.log(`foundTask: ${JSON.stringify(foundTask, null, 2)}`);
} catch (error) {
  core.setFailed(error.message);
}
