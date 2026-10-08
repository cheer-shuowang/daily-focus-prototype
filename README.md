# Daily Focus prototype

Local React, TypeScript, and Vite recreation of the two Daily Focus states in the linked Figma design.

## Run locally

```bash
npm install
npm run dev
```

Open the local address shown by Vite. Select any priority to update the progress bar, and use **Reset demo** to return to the starting state.

To open it without running a server, use the included `dist/offline.html` file. Opening the project-root `index.html` directly also redirects there when the build is present. Rebuild the offline file after source changes with `npm run build`.

For a production build, run `npm run build`.

## GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds and deploys the site on pushes to `main`. In the repository's **Settings → Pages**, choose **GitHub Actions** as the build and deployment source.
