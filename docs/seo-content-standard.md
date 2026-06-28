# SEO Content Standard for Tool Pages

This standard explains how to create useful search-friendly landing pages for online tools. The goal is to help real visitors first, while making it easy for search engines to understand the page.

## Page Structure

Every tool page must include these sections in this order:

1. H1 title with the primary keyword.
2. Introduction paragraph with 2-3 sentences explaining what the tool does and who it is for.
3. The tool itself, interactive and functional.
4. How to Use with 3-5 numbered steps.
5. Example showing a before/after or sample input/output.
6. Use Cases with 3-5 bullet points starting with "Use this when you need to..."
7. FAQ with 3-5 real questions people search for and helpful answers.
8. Related Tools linking to other tools on the site.
9. Privacy Note explaining how user data is handled.

Example outline:

```md
# Count Words Online

Use this free word counter to count words, characters, sentences, and paragraphs in your text. It is useful for writers, students, editors, and anyone preparing content with a length limit.

[Interactive word counter tool]

## How to Use

1. Paste your text into the input box.
2. Review the word, character, and sentence counts.
3. Copy or export the result if needed.

## Example

Input: "This is a short example."
Output: 5 words, 24 characters.

## Use Cases

- Use this when you need to check an essay word limit.
- Use this when you need to write a meta description.
- Use this when you need to trim social media copy.

## FAQ

### Does this word counter store my text?

No. The tool runs in your browser and does not upload your text.

## Related Tools

- Character Counter
- Case Converter

## Privacy Note

This tool runs in your browser. Your text is processed locally unless the page clearly says otherwise.
```

## Title Rules

- Keep titles around 50-60 characters when possible.
- Include the primary keyword.
- Make the benefit clear.
- Use this format: `[Action] [Object] - [Benefit] | SiteName`.

Example:

```text
Count Words Online - Free Character Counter | MyTools
```

## Meta Description Rules

- Keep meta descriptions around 120-155 characters.
- Include the primary keyword naturally.
- Include a clear call-to-action.
- Make every meta description unique.
- Describe what the visitor can do on the page.

Example:

```text
Count words, characters, and sentences online for free. Paste your text and get instant browser-based results.
```

## Content Quality

- Aim for at least 600 words per page, including FAQ content.
- Use original phrasing.
- Write in a helpful tone for humans, not search engines.
- Avoid keyword stuffing.
- Explain practical details, limits, and examples.
- Do not publish empty sections or generic filler.
- Keep FAQ answers specific and useful.

## Structured Data

Use these schema types:

- FAQPage schema for the FAQ section.
- SoftwareApplication schema for the tool.
- BreadcrumbList schema for navigation.

The starter template auto-generates these when the page supplies the required data. Review the rendered page with Google's Rich Results Test before launch.

## Internal Linking

- Every tool page links to at least 2 other pages.
- The homepage links to all tools.
- Related Tools should point to relevant tools, not random pages.
- Legal pages must be accessible from the footer.
- Avoid orphan pages that cannot be reached from navigation, homepage, sitemap, or related links.

## Canonical URL

- Always set a canonical URL.
- Always use an absolute URL.
- Always use the preferred URL.
- Do not create duplicate canonical targets for different pages.
- Use the HTTPS production domain, not localhost or preview URLs.

## Images

- Add descriptive alt text to every meaningful image.
- Compress images before uploading.
- Use descriptive filenames, such as `word-counter-screenshot.png`.
- Do not use vague filenames such as `img1.png`.
- Avoid images that look decorative but do not help the visitor understand the tool.
