// @ts-check

import { readFile } from "node:fs/promises";

import { beforeEach, expect, test } from "vitest";

import { issueToTask } from "../lib/util/issue-to-task-body.js";

let issue;

beforeEach(async () => {
  const issueFixture = new URL("./fixtures/issue.json", import.meta.url);
  const issueJson = (await readFile(issueFixture)).toString();
  issue = JSON.parse(issueJson);
});

console.log(issue);
test("Issue to Task Test", () => {
  const actual = issueToTask(issue);
  expect(actual).toHaveProperty("name");
  expect(actual).toHaveProperty("html_notes");
  expect(actual.name).toMatch(/.*#\d+/);
});
