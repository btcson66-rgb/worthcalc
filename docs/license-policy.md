# License & Attribution Policy

This policy defines which third-party code, packages, assets, and media can be used in sites built from this multi-site system.

## Approved Licenses

These licenses are generally safe for commercial use:

- MIT
- Apache-2.0
- BSD-2-Clause
- BSD-3-Clause
- ISC
- 0BSD
- Unlicense
- CC0

Even when a license is approved, keep the copyright notice and license text when the license requires it.

## Restricted Licenses

Do not use code under these licenses unless the requirements are fully understood, documented, and isolated:

- GPL-2.0
- GPL-3.0
- AGPL-3.0
- LGPL, any version
- MPL-2.0, case-by-case only
- SSPL

These licenses can create obligations that affect source code distribution, server-side use, or derivative works. Get a specific review before using them.

## No License = No Use

If a repository, package, snippet, image, icon set, font, video, or audio file has no LICENSE file or clear license statement, do not use it.

"Available online" does not mean "free to use." Only use material with an explicit license that allows the intended commercial use.

## Attribution

Even MIT requires the copyright notice be preserved.

Each site must keep a `license-audit.md` file that lists third-party packages, copied code, assets, fonts, icons, and any required attribution. Update it before launch and after adding a new dependency or asset source.

## Assets & Media

Images, fonts, icons, music, and video must have an explicit commercial-use license.

Recommended sources:

- Unsplash: free images, check the current license terms before use.
- Pexels: free images and videos, check the current license terms before use.
- Google Fonts: usually OFL or Apache licensed, verify each font.
- Heroicons: MIT licensed icons.
- Lucide: ISC licensed icons.

Never use images from Google Image Search without checking the original license. Google Image Search is a search engine, not a license source.

## Audit Process

Before each site launch:

1. Run `npx license-checker --summary`.
2. Review the license summary for restricted or unknown licenses.
3. Check assets manually, including images, fonts, icons, audio, and video.
4. Update the site's `license-audit.md`.
5. Preserve required copyright notices.
6. Sign off with the review date and reviewer name.

## Template

Use this table format in each site's `license-audit.md`:

| Package | Version | License | Status | Notes |
| --- | --- | --- | --- | --- |
| example-package | 1.0.0 | MIT | Approved | Copyright notice preserved. |
| example-font | 2.1.0 | OFL-1.1 | Approved | Used through Google Fonts. |
| example-asset | N/A | Unknown | Rejected | No clear commercial-use license. |
