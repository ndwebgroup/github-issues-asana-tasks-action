// asana-update-task.js

/**
 * This adds comments to an existing task.
 */

import { ApiClient, StoriesApi } from "asana";

// import { renderMarkdown } from "./util/markdown-to-asana-html.js";
import { commentToStory } from "./util/comment-to-story.js";

let client = ApiClient.instance;
let token = client.authentications["token"];
token.accessToken = process.env.ASANA_PAT;

let storiesApiInstance = new StoriesApi();

export async function updateTask(comment, task_gid) {
  const story = commentToStory(comment);

  try {
    const result = await storiesApiInstance.createStoryForTask(story, task_gid);

    console.log({ story, task_gid, result });
    return result;
  } catch (error) {
    console.error(error.response.status, error.response.body);
    return error.response.body;
  }
}
