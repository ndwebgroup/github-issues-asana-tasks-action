// @ts-check

/**
 * Extracts Project GIDs from Asana Project Links (permalink_url)
 *
 * @link https://developers.asana.com/reference/projects
 * @example getProjectId("https://app.asana.com/0/12345678900/12345678900")
 * @param {string | URL } projectLink from Asana's "Copy Project Link"
 * @returns {string | false} Returns the project Id as a numeric string.
 */
export function getProjectId(projectLink = "") {
  const projectPattern = new RegExp("https://app\\.asana\\.com/0/(\\d+)/\\d+(?=$|[^/0-9])");
  projectLink = projectLink.toString();

  const match = projectLink.match(projectPattern);
  return match ? match[1] : false;
}
