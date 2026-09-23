# GitHub and publishing

GitHub repository: https://github.com/jkim02493-code/- . This is the owner's existing 青古堂 repository. Its short repository name is unchanged; the README and folders identify the project clearly.

The deployed Site has its own source repository required by Sites hosting. The GitHub repository contains a readable copy of the complete project. A local `github` remote points to the GitHub repository, while the Sites workflow authenticates directly with the required hosting repository. Credentials are supplied per operation and are never stored in remote URLs.

A GitHub commit alone does **not** automatically publish the Site. There is no automatic GitHub-to-Sites pipeline configured. To update the website:

1. Bring the approved GitHub changes into the Site checkout and resolve any differences.
2. Run type checks, the relevant tests and the Site build.
3. Commit and push the same source to the Sites source repository, and mirror the resulting files to GitHub.
4. Package the validated output, save the version and deploy through Sites.
5. Verify that deployment succeeded. Runtime secret changes require a new deployment.

The site remains owner-private until its owner explicitly changes the audience. The GitHub repository was already public; only source and public reference assets belong there. Do not upload visitor inquiries, private inventory records, Notion tokens or local `.env` files.
