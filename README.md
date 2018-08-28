
## mui-drawer

The Material-UI [docs](https://material-ui.com/)
give an example of using a Drawer to navigate
to different parts of the documentation.  The
[AppDrawer](https://github.com/mui-org/material-ui/blob/master/docs/src/modules/components/AppDrawer.js)
code uses Next.js [Link](https://github.com/mui-org/material-ui/blob/master/docs/src/modules/components/Link.js)
for its routing.  This demo shows how to use
[react-router](https://reacttraining.com/react-router/web/api/Link)
for its routing instead of [Next.js](https://github.com/zeit/next.js#with-link).

There are two standard ways to navigate inside Material-UI; **[drawers](https://material-ui.com/demos/drawers/)** and **[menus](https://material-ui.com/demos/menus/)**.  The software for the **AppDrawer** is located inside Material-UI **[docs](https://github.com/mui-org/material-ui/tree/master/docs#material-ui-docs)** and is not part of a released NPM repo (yet).  Therefore, I have broken out the drawer code into this demo to show how to use it standalone in the context of Create React App instead of Next.js which is how it is currently implemented.  The key minor change or refactor is to use
[React Router](https://github.com/ReactTraining/react-router) instead of Next.js for the routing.

If you look at the Material-UI docs the main piece of Navigational software is the **AppDrawer** which is derived from
[Drawer](https://material-ui.com/api/drawer/).

This section is about refactoring AppDrawer from Next.js to Create-React-App

This section will outline the details of how to transform the
[Material-UI Docs](https://material-ui.com/)
from Next.js to Create-React-App through a simple code
example.  

## The AppDrawer Concept

Currently the Material-UI docs
[AppDrawer](https://github.com/mui-org/material-ui/blob/master/docs/src/modules/components/AppDrawer.js)
are driven by
[Next-js Routing](https://nextjs.org/docs/#routing)
by using the Material-UI
[Link](https://github.com/mui-org/material-ui/blob/master/docs/src/modules/components/Link.js) component.
In order to transform the
[Drawer](https://material-ui.com/demos/drawers/)
from Next-js to
[React-Router](https://reacttraining.com/react-router/core/guides/philosophy)
one must remove references to the Next-js Link inside the
[AppDrawerNavItem](https://github.com/mui-org/material-ui/blob/master/docs/src/modules/components/AppDrawerNavItem.js)
and replace it with the React-Router
[Link](https://reacttraining.com/react-router/web/api/Link).

## The AppDrawer Details

If you take a look at the Material-UI docs and open the drawer
you will notice that all of the content inside the drawer is defined
by an an object called **pages** which is located inside the file
[withRoot](https://github.com/mui-org/material-ui/blob/master/docs/src/modules/components/withRoot.js).

Inside this file are two other important functions.

* findActivePage
* getChildContext

These 3 pieces of code are ported over to their own file
in the sample code called
[Drawer](https://github.com/stormasm/mui-drawer/blob/master/v2/src/containers/Drawer.js)

This code is the basis for the refactor.

## The AppDrawer Code

This is a demo that allows you to navigate inside
the drawer and show an example delineating a **Chapter**
in a book and a **Section** inside of the chapter.

Along with the **pages** object and the two functions
mentioned above this code is the other piece of logic
located inside the file
[Drawer](https://github.com/stormasm/mui-drawer/blob/master/v2/src/containers/Drawer.js)
that completes the refactor.


```js
const ShowChapterSection = ({ match }) => (
  <div>
    <h3>Chapter: {match.params.ch}</h3>
    <h4>Section: {match.params.sec}</h4>
  </div>
);
```

### More Details

For the details on how to refactor the code from Next.js
to Create React App [review code.md](https://github.com/stormasm/mui-drawer/blob/master/code.md)
for more details on how to refactor the Material-UI code.
