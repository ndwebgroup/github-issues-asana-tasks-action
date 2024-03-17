// @ts-check

import { expect, test } from "vitest";

import { findTaskContaining } from "../lib/asana-find-task.js";

test("Get Task", async () => {
  const projectId = "1206848227995333";
  const issueUrl = "https://github.com/ideasonpurpose/iop022-iop-next/issues/5";
  const actual = await findTaskContaining(issueUrl, projectId);
  expect(actual.gid).toBe("1206856020643407");
});


test("No task to find", async () => {
  const projectId = "1206848227995333";
  const issueUrl = "https://github.com/not-a-user/not-a-repo/issues/123";
  const actual = await findTaskContaining(issueUrl, projectId);
  expect(actual).toBe(false);
});
