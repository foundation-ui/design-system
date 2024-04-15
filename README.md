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

`@foundation-ui/design-system` is using Unified Versioning. all packages within the monorepo share the same version number, regardless of which packages have changed. This approach simplifies dependency management and versioning, as consumers of the packages only need to keep track of a single version number.

Every push and/or Pull Request to the `main` branch will first trigger the `CI` Github Action. It will build and test every packages before moving on to the next step. If the `CI` Action is completed with success, the `Publish` Github Action is triggered. It will tag and release each packages as [Private Github Registries](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry).

#### Branches

`@foundation-ui/design-system` has two sources branches `main` and `dev`.
The `main` branch is used to build, tag and deploy packages. The `dev` branch is used to create, test and the maintain the exported packages.

#### Pull Request

Start by creating a new branch from `dev`. Your branch name must come with one of the following tags as prefix:

- `feature`
- `maintenance`

Your branch name should look like `feature/feature-name` or `maintenance/component-name`.

> Before opening your Pull Request, run `pnpm changeset` and add the generated markdown file to your changes.

The generated file will be used for the by [Changesets](https://github.com/changesets/changesets) for the versioning part.

#### Release

To create a new release and deploy the packages, go to the `main` branch and pull the changes from `dev`.
Prepare the changelogs and versions by runing `pnpm changeset version`. Commit the files and push the changes.

<!--
#### Prepare new version
run changeset version to update changelogs and packages versions before pushing changes.

#### Adding new changesets

To generate a new changeset, run pnpm changeset in the root of the repository. The generated markdown files in the .changeset directory should be committed to the repository.

##### Releasing changes

Run pnpm changeset version. This will bump the versions of the packages previously specified with pnpm changeset (and any dependents of those) and update the changelog files.
Run pnpm install. This will update the lockfile and rebuild packages.
Commit the changes.
Run pnpm publish -r. This command will publish all packages that have bumped versions not yet present in the registry. -->
