// @ts-check

import * as core from "@actions/core";
import * as github from "@actions/github";

/**
 * Building from the docs here:
 * @link https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action
 */
try {
  const TOKEN = core.getInput("ASANA_PAT");
  const payload = JSON.stringify(github.context.payload, null, 2);
  console.log(`The '${github.context.eventName}' event payload: ${payload}`);
  console.log(`token length: ${TOKEN.length}`);
  console.log(`munged token: ${TOKEN.replace(/[46]/g, "%")}`);
} catch (error) {
  core.setFailed(error.message);
}
