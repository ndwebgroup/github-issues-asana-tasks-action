// @ts-check

import {
  expect,
  test,
} from "vitest";

import { renderMarkdown } from "../lib/util/markdown-to-asana-html.js";

test("Renders basic markdown", () => {
  const raw = 'hello **world**';
  const expected = '<body>hello <strong>world</strong></body>';
  const actual = renderMarkdown(raw);
  expect(actual).toEqual(expected);
});

test("Two paragraphs", () => {
  const raw = 'Paragraph 1\n\nParagraph 2';
  const expected = '<body>Paragraph 1\n\nParagraph 2</body>';
  const actual = renderMarkdown(raw);
  expect(actual).toEqual(expected);
});

test("Translate Headings", () => {
  const raw = '# heading 1\n## heading 2\n### heading 3\n#### heading 4\n##### heading 5\n###### heading 6';
  const expected = '<body><h1>heading 1</h1><h1>heading 2</h1><h1>heading 3</h1><h2>heading 4</h2><h2>heading 5</h2><h2>heading 6</h2></body>';
  // TODO: Keep/normalize trailing space after heading tags? How do these render?
  const actual = renderMarkdown(raw);
  expect(actual).toEqual(expected);
});
