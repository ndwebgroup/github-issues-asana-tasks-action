// @ts-check

import { readFile } from "node:fs/promises";

import { beforeEach, expect, test } from "vitest";

import { issueToTask } from "../lib/util/issue-to-task.js";

let payload;

beforeEach(async () => {
  // API reference: https://docs.github.com/en/rest/issues/issues
  const issueFixture = new URL("./fixtures/issue.json", import.meta.url);
  const issueJson = (await readFile(issueFixture)).toString();
  const issue = JSON.parse(issueJson);
  payload = { action: "opened", issue };
});


test("Issue to Task Test", () => {
  const actual = issueToTask(payload);
  expect(actual).toHaveProperty("name");
  expect(actual).toHaveProperty("html_notes");
  expect(actual.name).toMatch(/.*#\d+/);
  expect(actual.html_notes).toContain("<body>");
  expect(actual.html_notes).toContain("</body>");
});
