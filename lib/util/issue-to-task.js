// @ts-check

import { renderMarkdown } from "./markdown-to-asana-html.js";

/**
 * Some simple conversions for translating a GitHub Issue to
 * an Asana Task:
 *
 *  - Add the issue number to the title, eg. Fix blue widgets #44
 *  - Translate raw markdown body to HTML (for html_notes)
 *
 * @param {object} issue An object representation of a GitHub Issue
 * @link https://docs.github.com/en/rest/issues/issues
 *
 * @returns {object}
 */
export function issueToTask(issue) {
  const { title, number, body, html_url } = issue;

  const name = `${title} #${number}`;
  const issueLink = `\r\n\r\n${html_url}`;
  const html_notes = renderMarkdown(body.trim() + issueLink);

  return { name, html_notes };
}
