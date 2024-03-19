// @ts-check

import { readFile } from "node:fs/promises";

import { beforeEach, expect, test } from "vitest";

import { commentToStory } from "../lib/util/comment-to-story.js";

let payload;

beforeEach(async () => {
  // API reference: https://docs.github.com/en/rest/issues/comments
  // API reference: https://docs.github.com/en/rest/issues/issues

    const commentFixture = new URL("./fixtures/comment.json", import.meta.url);
  const commentJson = (await readFile(commentFixture)).toString();
  const issueFixture = new URL("./fixtures/issue.json", import.meta.url);
  const issueJson = (await readFile(issueFixture)).toString();

  const comment = JSON.parse(commentJson);
  const issue =  JSON.parse(issueJson);
  payload = { "action": "created", comment, issue};
  // example JSON doesn't include the issue, add it


});

test("Comment to Story Test", () => {
  const actual = commentToStory(payload);
  const user = payload.issue.user.login;
  const user_url = payload.issue.user.html_url;

  expect(actual).toHaveProperty("data");
  expect(actual.data).toHaveProperty("html_text");
  expect(actual.data.html_text).toContain('<body>');
  expect(actual.data.html_text).toContain('</body>');
  expect(actual.data.html_text).toContain(user);
  expect(actual.data.html_text).toContain(user_url);
  console.log(actual.data.html_text);
  expect(actual.data.html_text).toMatch(/.*#\d+<\/a>/);
  expect(actual.data.html_text).toMatch(/.*@\S+<\/a> on <a/);

});
