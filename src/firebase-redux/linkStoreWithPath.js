import linkStoreWithDb from "./linkStoreWithDb";

const linkStoreWithPath = ({ path, actionCreator, selector, dbMethod = 'set', debug = false }) =>
  (db, store) => {
    let previous = selector && selector(store.getState());
    let mustWrite = true;

    const fromDb = actionCreator &&
      ((db, dispatch) => {
        const listener = db.ref(path).on("value", snap => {
          if (snap.val()) {
            mustWrite = false;
            dispatch(actionCreator(snap.val()));
            mustWrite = true;
          }
        }, error => {
            dispatch(actionCreator(error));
        });
        return () => db.ref(path).off("value", listener);
      });

    const fromStore = selector &&
      ((state, db) => {
        const portion = selector(state);
        if (mustWrite && portion !== previous) {
          if (debug) {
              console.log(`Writing to path - firebase.database().ref(${JSON.stringify(path)}).${dbMethod}()`);
          }
          // Typically, db.ref(path).set or db.ref(path).update
          db.ref(path)[dbMethod](portion);
        }
        previous = portion;
      });

    return linkStoreWithDb(fromDb, fromStore)(db, store);
  };

export default linkStoreWithPath;
