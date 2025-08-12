# Foundation Design System

Open Source Design System providing low-level components and foundations to help you build high-quality, accessible applications.

### Technologies

- [React]('https://react.dev/')
- [Typescript]('https://www.typescriptlang.org/')
- [React Testing Library]('https://testing-library.com/docs')
- [Axe]('https://www.deque.com/axe/')
- [Storybook]('https://react.dev/')
- [pnpm Workspace]('https://pnpm.io/')
- [Changesets]('https://github.com/changesets/changesets')
- [GitHub Actions]('https://react.dev/')

### CI/CD

#### Strategy

`@@usefui/design-system` is using Unified Versioning. all packages within the monorepo share the same version number, regardless of which packages have changed. This approach simplifies dependency management and versioning, as consumers of the packages only need to keep track of a single version number.

Every push and/or Pull Request to the `main` branch will first trigger the `CI` Github Action. It will build and test every packages before moving on to the next step. If the `CI` Action is completed with success, the `Publish` Github Action is triggered. It will tag and release each packages as [Private Github Registries](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry).

#### Release

Start by creating a new branch from `main`. Your branch name must come with one of the following tags as prefix:

- `feature`
- `maintenance`

Your branch name should look like `feature/feature-name` or `maintenance/component-name`.

Before opening your Pull Request, run `pnpm changeset`, select every packages and define the type of the version (major, minor, patch).
The generated markdown file will be used by [Changesets](https://github.com/changesets/changesets) for the versioning part.
Then, run `pnpm changeset version` to update the changelogs and versions of the packages. Commit the files and push the changes.
