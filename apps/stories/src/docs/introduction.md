# Foundation Design System

`@foundation-ui/design-system` is a React Design System built to generate and use low-level UI foundations, bringing cohesion throughout your Libraries and User Interfaces along the way.
Foundation is divided into three distinct packages, each serving a specific purpose and allowing you to include only the dependencies you need.

---

### Core

`@foundation-ui/core` is a Design Tokens System built to bring frictionless cohesion across apps. Use it coupled with `@foundation-ui/tokens` and `@foundation-ui/components` or as a standalone package to customize your own Design Tokens System.

### Tokens

`@foundation-ui/tokens` is an assets library with a dedicated provider to distribute Design Tokens in React apps. Use it with `@foundation-ui/core` to distribute your Design Tokens library across your apps or a standalone package to use the built-in Design Tokens libraries.

### Components

`@foundation-ui/components` is low-level UI component library with a focus on accessibility, customization and developer experience. Use it with `@foundation-ui/core` and `@foundation-ui/tokens` to get styled components ruled by your Design Tokens library and Theme, or, as a standalone package with unstyled, accessible components library.
