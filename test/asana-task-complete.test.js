// @ts-check

import { afterEach, expect, test, vi } from "vitest";

import * as asana from "asana";
import { ApiClient, TasksApi } from "asana";

import { issueToTask } from "../lib/util/issue-to-task.js";
import { createTask } from "../lib/asana-task-create.js";

/**
 * Mocking a module with a factory
 *
 * Mock the module, but provide a factory function which returns an object
 * mapping across the needed factory methods. These internal methods
 * are imported directly into the System Under Test (SUT) using named
 * imports and Vitest will replace them with the mocks.
 *
 * Methods which will be used in the SUT provide their own factory
 * implementations. These inner methods can be imported using named imports
 * into the test, then checked as parallel to how they're imported and used
 * in the SUT.
 *
 * To test agaist the internal methods, define method mocks beforehand using
 * vi.hoisted, then reference those mocked methods in the factory constructor.
 */
const mocks = vi.hoisted(() => {
  return {
    createTask: vi.fn(() => ({ data: { permalink_url: "https://url" } })),
  };
});
vi.mock("asana", () => {
  const ApiClientMock = { instance: { authentications: { token: {} } } };
  const TasksApiMock = vi.fn(() => ({
    // createTask: () => ({ data: { permalink_url: "https://url" } }),  // untestable
    createTask: mocks.createTask, // testable
  }));
  return { ApiClient: ApiClientMock, TasksApi: TasksApiMock };
});

afterEach(() => {
  vi.restoreAllMocks();
});

test("get mocks working", async () => {
  const tasksApiInstance = new TasksApi();
  const actual = await tasksApiInstance.createTask("data", 123);

  expect(TasksApi).toHaveBeenCalled();
  expect(tasksApiInstance).toHaveProperty("createTask");
  expect(actual).toHaveProperty("data");
  expect(actual.data).toHaveProperty("permalink_url");
});

test("Call create task", async () => {
  const dummyTask = issueToTask({
    issue: {
      title: "Test Task",
      number: 3456,
      body: "Task content",
      html_url: "https://github.com/joemaller/actions-test-throwaway",
    },
  });

  const projectId = "1206848227995333";
  const actual = await createTask(dummyTask, projectId);

  console.log(mocks.createTask.mock.calls);
  expect(actual).toBe("https://url");
  expect(mocks.createTask).toHaveBeenCalled();
  expect(mocks.createTask).toHaveBeenCalledTimes(1);
});
