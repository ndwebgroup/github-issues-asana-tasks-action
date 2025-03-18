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
  const viewID = 1200000987654322;
  const projectLink = `https://app.asana.com/0/${projectId}/${viewID}`;
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
  const viewID = 1200000987654322;
  const projectLink = `https://app.asana.com/0/${projectId}/${viewID}`;
  const projectLinkURL = new URL(projectLink);
  const actual = getProjectId(projectLinkURL);
  expect(actual).toBe(projectId.toString());
});

test("works on large blobs too?", () => {
  const projectId = 1200000987654321;
  const viewID = 1200000987654322;
  const projectLink = `https://app.asana.com/0/${projectId}/${viewID}`;
  const blob = `loremConsectetur ut commodo ad voluptate ${projectLink} dolore do incididunt fugiat ex cupidatat ipsum aliquip nulla sit. Ut in ea est nisi reprehenderit sint. Amet deserunt do consectetur duis magna sit. Occaecat est tempor aliquip nulla et laboris. Ut excepteur non eiusmod aliqua deserunt amet elit esse. Velit quis labore non ullamco occaecat nulla ea sit. Ad occaecat nisi officia velit veniam anim.`;

  const actual = getProjectId(blob);
  expect(actual).toBe(projectId.toString());
});
