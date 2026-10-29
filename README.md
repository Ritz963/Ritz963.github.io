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
- Work experience disclosures: `src/components/ExperienceEntry.tsx`
- Work experience: `src/lib/experience.ts`
- Case studies: `src/app/apps/*/page.mdx`
- Appearance: `src/app/globals.css`
- Interactive sculpture: `src/components/DotSculpture.tsx`

## Deployment

GitHub Pages must use **GitHub Actions** as its source. Pushes to `main` build and deploy the exported site. Pull requests build without deploying. The workflow can also be run manually. The site lives at https://ritz963.github.io/.

## Design

A restrained, typography-led layout with a self-hosted Newsreader display face, the original paper/ink palette, and generous spacing. The dot sculpture is the only expressive motion; project rows and experience disclosures stay still. Both light and dark system themes are supported. The font license is included in `public/fonts/`.
