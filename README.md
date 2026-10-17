# Ritvik Thakur — Portfolio

A minimal Next.js portfolio, statically exported for GitHub Pages. The home page includes projects, expandable work experience, education, skills, and a pointer- and keyboard-accessible dot sculpture.

## Development

```sh
npm ci
npm run dev
```

## Production

```sh
npm run build
python3 -m http.server 3000 --directory out
```

The build writes `out/`. All routes use trailing slashes so project URLs work on a static server, including direct visits and refreshes. No server APIs or environment variables are required. Contact links use LinkedIn and GitHub.

## Editing

- Home page and skills: `src/app/page.tsx`
- Work experience animation: `src/components/ExperienceEntry.tsx`
- Work experience: `src/lib/experience.ts`
- Case studies: `src/app/apps/*/page.mdx`
- Appearance: `src/app/globals.css`
- Interactive sculpture: `src/components/DotSculpture.tsx`

## Deployment

GitHub Pages must use **GitHub Actions** as its source. Pushes to `main` build and deploy the exported site. Pull requests build without deploying. The workflow can also be run manually. The site lives at https://ritz963.github.io/.
