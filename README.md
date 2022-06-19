A react `createContext` that allows for selectors in `useContext`. Components only re-render if the result of the selector function changes. Use `<Context.Provider>` without any of the drawbacks.

```js
const prop = useContext(Context, ({ obj }) => obj.prop)
```
