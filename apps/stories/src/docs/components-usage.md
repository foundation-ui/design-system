# Foundation Components

Foundation Design System comes with a set of components located in the `@foundation-ui/components`. They are low-level components with a focus on accessibility, customization and developer experience. `@foundation-ui/components` components are styled using CSS in JS with [styled-components](https://styled-components.com/). While CSS in JS would be preferable, you can still use `className` and combine it with common CSS styles or any css framework to style your components.

### Accessibility

Foundation Design System Components are tested using [Axe](https://www.deque.com/axe/), [jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/). They follow the [Web Content Accessibility Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/) to provide robust, accessibile components with predictable behaviors.

### Components API

`@foundation-ui/components` are using the [Compound Component Pattern](https://www.patterns.dev/react/compound-pattern), the components manage their own internal state and share them among the other compound components within the same `Root`.

> `Root` components always refers to the internal [Context API](https://react.dev/reference/react/useContext) used to share internal states.

`@foundation-ui/components` is made of small UI units that handles common interactions you'll need to build User Interfaces. They can be used as is or combined with other components to handle more complex interactions such as pages shortcuts, collapsible list of actions.. Each Compound Component handle a specific part of

### Components Hierarchy

`@foundation-ui/components` is made of low-level components that handles common interactions you'll need to build User Interfaces. They follows the [Atomic Design Methodology](https://atomicdesign.bradfrost.com/chapter-2/) and can be used as is or combined with other components to handle more complex interactions such as pages shortcuts, collapsible list of actions.

> Components are classified in three categories, based on their usage on a User Interface: `Bases`, `Layers` and `Layouts`.

#### Bases

`Bases` Components are interactible elements on a User Interface; `Button`, `Field` and `Toolbar` components for instance, each has a different level of complexity but are built to handle an usage pattern.

#### Layers

`Layers` Components are elements that can be visible on a single or multiple layers of a User Interface; a `Dialog` component for instance, it uses a `Button` on the default layer that shows an `Overlay` and `Dialog` itself when clicked.

#### Layouts

`Layouts` Components are used to build sections and organize the interactible elements of a page.

### Common Properties

Most `@foundation-ui/components` components are using the same properties to define their styles variants and spacing definitions.
When the component has a style definition, the `raw` property is available and enable you to deactivate it if set to `true`.
The `variant` and `sizing` properties are available for most of `Bases` components.
the `proximity`, `global` and `spacing` properties are transmited by the `Container` components.

| Name        | Description                                                 | Type      | Enum                                                     | Default |
| ----------- | ----------------------------------------------------------- | --------- | -------------------------------------------------------- | ------- |
| `raw`       | Define whether the component is styled or not.              | `boolean` | -                                                        | `false` |
| `variant`   | The style definition used by the component.                 | `string`  | `primary` `secondary` `tertiary` `border` `mono` `ghost` | -       |
| `sizing`    | The size definition used by the component.                  | `string`  | `small` `medium` `large`                                 | -       |
| `proximity` | Define if the inner components has spacing.                 | `boolean` | -                                                        | -       |
| `global`    | Define if the inner spacings are applied to every children. | `boolean` | -                                                        | -       |
| `spacing`   | The spacing definition used by the component.               | `string`  | `small` `medium` `large`                                 | -       |

Read the Component's Story file on [github](https://github.com/foundation-ui/design-system/tree/main/packages/components/src) to know more about the implementation.
