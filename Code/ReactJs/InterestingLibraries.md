
# Want to use

**Immer**: Helps with immutability
https://github.com/immerjs/immer

**GraphQl**: HTTP requests queries, anti-REST

**React-Query**: Hooks for REST requests
https://github.com/tannerlinsley/react-query#queries

**RxJS**: Not a React library, but worth looking into its use with React

**Why did you render**: React library to help with development
https://github.com/welldone-software/why-did-you-render


# Do not want to use

**Formik**: Component for forms, limiting, offers little to no value, increases complexity of the project,
seems useful only for native uncontrolled html components. Issues with controlled components:
https://github.com/jaredpalmer/formik/issues/184
https://github.com/jaredpalmer/formik/issues/812
https://github.com/jaredpalmer/formik/issues/485
https://github.com/jaredpalmer/formik/issues/401
https://github.com/jaredpalmer/formik/issues/271
[Even their codesandbox example seems more of a hassle than it is worth]
(https://github.com/jaredpalmer/formik/issues/465)
There are ways around these issues in order to use Formik as a controlled component, such as using [useFormikContext()](https://jaredpalmer.com/formik/docs/api/useFormikContext#example), using Formik is left as an exercise to the reader.
**React Hook Form**: Hooks and components for forms, adds much complexity, poor documentation, focus on uncontrolled components. I tried using their `<Control>` component for controlled inputs but it's confusing and boilerplate-y.
https://github.com/react-hook-form/react-hook-form/discussions/1782
