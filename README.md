I never heard no one say that before &mdash; Convent Ave and W 125th St
-----------------------------------------------------------------------


# Reference

- [Firebase console](https://console.firebase.google.com)
- Old user id: oCgYABQ5eqP05jcc59jrxRw7XIk2. Creating a new user _always_
  creates a unique user id, even if you use the same email.
- `store.dispatch({ type: 'UPDATE_STORY_TEXT', storyText: 'x hello - W
  1245th St' });`
- `store.dispatch({ type: 'UPDATE_MODE', mode: 'edit' });`
- Why are writes with only a `storyUserId` property present ignored? (It's
  the desired behavior, but where did this get configured?) Notice how the
  `Writing to database` and `Writing to path -` console log statements don't
  agree
