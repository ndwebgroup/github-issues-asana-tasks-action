// @ts-check

import * as core from '@actions/core'
import * as github from '@actions/github'

/**
 * Building from the docs here:
 * @link https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action
 */
try {
  const payload = JSON.stringify(github.context.payload, null, 2);
  console.log(`The '${github.context.eventName}' event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
