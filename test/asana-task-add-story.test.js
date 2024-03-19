// @ts-check

import { afterEach, expect, test, vi } from "vitest";

import { findTaskContaining } from "../lib/asana-task-find.js";

// const mocks = vi.hoisted(() => {
//   const nextPage = vi.fn(() => 55)  //.mockResolvedValue(55);
//   return {
//     nextPage,
//     getTasksForProject: vi.fn(() => ({
//       data: [{ gid: "1234", html_notes: "text" }],
//       nextPage,
//     })),
//   };
// });
// vi.mock("asana", () => {
//   const ApiClientMock = { instance: { authentications: { token: {} } } };
//   const TasksApiMock = vi.fn(() => ({
//     getTasksForProject: mocks.getTasksForProject, // testable
//   }));
//   return { ApiClient: ApiClientMock, TasksApi: TasksApiMock };
// });

// afterEach(() => {
//   vi.restoreAllMocks();
// });

// test("Get Task", async () => {
//   const projectId = "1234";
//   const needle = "text";
//   const actual = await findTaskContaining(needle, projectId);
//   expect(actual.gid).toBe("1234");
//   // expect(mocks.nextPage).toHaveBeenCalled()
// });

// test("No task to find", async () => {
//   const projectId = "1206848227995333";
//   const issueUrl = "https://github.com/not-a-user/not-a-repo/issues/123";
//   const actual = await findTaskContaining(issueUrl, projectId);
//   expect(actual).toBe(false);
// });

// test("handle error", async () => {
//   const projectId = "1206848227995333";
//   const issueUrl = "https://github.com/ideasonpurpose/iop022-iop-next/issues/5";
//   const actual = await findTaskContaining(issueUrl, projectId);

//   expect(actual).toHaveProperty("errors");
// });

test('placeholder', () => {
  expect(true).toBe(true);
})