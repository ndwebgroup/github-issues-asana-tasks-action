//@ts-check

import 'dotenv/config'

/**
 * START TEMP DEV STUFF
 */

// Actual url will be extracted from the issue description
// This is a throwaway workspace
process.env.PROJECTLINK = `https://app.asana.com/0/1206848227995333/1206848227995333`;

// TODO: Replace this with the description from the GitHub action
const rawNote = `_replace this_ with the **GitHub Issue [Description](https://github.com/org/repo/issues/3)**

Task created at ${new Date().toLocaleString()}`;

/**
 * END TEMP DEV STUFF
 */

import { ApiClient, TasksApi } from "asana";

import { getProjectId } from "./util/project-id-from-url.js";
import { renderMarkdown } from "./util/markdown-to-asana-html.js";

let client = ApiClient.instance;
let token = client.authentications["token"];
token.accessToken = process.env.TOKEN;

let tasksApiInstance = new TasksApi();

const projectId = getProjectId(process.env.PROJECTLINK);

const random = Math.ceil(Math.random() * 20);

const html_notes = renderMarkdown(rawNote);
const projects = projectId ? [projectId] : [];


const body = {
  data: {
    name: `Task from node #${random}`,
    html_notes,
    projects,
  },
};

let opts = {};

console.log(body);

tasksApiInstance.createTask(body, opts).then(
  (result) => {
    console.log(
      "API called successfully. Returned data: " +
        JSON.stringify(result.data, null, 2)
    );
  },
  (error) => {
    console.error(error.response.body);
  }
);
