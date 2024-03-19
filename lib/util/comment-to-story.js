// @ts-check

import { renderMarkdown } from "./markdown-to-asana-html.js";

/**
 * Some simple conversions for translating a GitHub Issue to
 * an Asana Task:
 *
 *  - Add the issue number to the title, eg. Fix blue widgets #44
 *  - Translate raw markdown body to HTML (for html_notes)
 *
 * @param {object} payload An object representation of a GitHub Issue
 * @link https://docs.github.com/en/rest/issues/issues
 *
 * @returns {object}
 */
export function commentToStory(payload) {
  const { body: body_md, html_url, user } = payload.comment;
  const { login: user_name, html_url: user_url } = user;
  const { number: issue_number } = payload.issue;

  const story_md = `${body_md} -- [@${user_name}](${user_url}) on [#${issue_number}](${html_url})`;
  const html_text = renderMarkdown(story_md);

  return { data: { html_text } };
}
