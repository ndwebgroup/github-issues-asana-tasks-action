// @ts-check

import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from "vitest";

import { getProjectId } from "../lib/util/project-id-from-url.js";

test("Get Project ID from Link URL", () => {
  const projectId = 1200000987654321;
  const projectLink = `https://app.asana.com/0/${projectId}/${projectId}`;
  const actual = getProjectId(projectLink);
  expect(actual).toBe(projectId.toString());
  expect(actual).not.toBe(projectId);
});

test("fail on Task Link URL", () => {
  const taskLink =
    "https://app.asana.com/0/1201186619448742/1206844077072202/f";
  const actual = getProjectId(taskLink);
  expect(actual).toBe(false);
});

test("handles URL objects correctly", () => {
  const projectId = 1200000987654321;
  const projectLink = `https://app.asana.com/0/${projectId}/${projectId}`;
  const projectLinkURL = new URL(projectLink);
  const actual = getProjectId(projectLinkURL);
  expect(actual).toBe(projectId.toString());
});
