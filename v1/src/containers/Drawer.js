import React from "react";
import PropTypes from "prop-types";

import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";

import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import find from "lodash/find";
import withRoot from "../withRoot";

import { Route } from "react-router-dom";
import AppDrawer from "../modules/components/AppDrawer";

import Tooltip from "@material-ui/core/Tooltip";
import GithubIcon from "@material-ui/docs/svgIcons/GitHub";
import Home from "../components/Home";

const styles = theme => ({
  root: {
    flexGrow: 1,
    // textAlign: "center",
    paddingTop: theme.spacing.unit * 10
  },
  flex: {
    flex: 1
  }
});

const pages = [
  {
    pathname: "/ch1",
    children: [
      {
        pathname: "/ch1/sec1"
      },
      {
        pathname: "/ch1/sec2"
      },
      {
        pathname: "/ch1/sec3"
      }
    ]
  },
  {
    pathname: "/ch2",
    children: [
      {
        pathname: "/ch2/sec1"
      },
      {
        pathname: "/ch2/sec2"
      },
      {
        pathname: "/ch2/sec3"
      }
    ]
  },
  {
    pathname: "/ch3",
    children: [
      {
        pathname: "/ch3/sec1"
      },
      {
        pathname: "/ch3/sec2"
      },
      {
        pathname: "/ch3/sec3"
      }
    ]
  },
  {
    pathname: "/",
    title: false
  }
];

function findActivePage(currentPages, url) {
  const activePage = find(currentPages, page => {
    if (page.children) {
      return url.pathname.indexOf(page.pathname) === 0;
    }

    // Should be an exact match if no children
    return url.pathname === page.pathname;
  });

  if (!activePage) {
    return null;
  }

  // We need to drill down
  if (activePage.pathname !== url.pathname) {
    return findActivePage(activePage.children, url);
  }

  return activePage;
}

const ShowChapterSection = ({ match }) => (
  <div>
    <h3>Chapter: {match.params.ch}</h3>
    <h4>Section: {match.params.sec}</h4>
  </div>
);

class Drawer extends React.Component {
  state = {
    mobileOpen: false
  };

  getChildContext() {

    let pathname = this.props.history.location.pathname;
    if (pathname !== '/') {
      // The leading / is only added to support static hosting (resolve /index.html).
      // We remove it to normalize the pathname.
      pathname = pathname.replace(/\/$/, '');
    }

    let myurl = {};
    myurl.pathname = pathname;

    return {
      url: myurl ? myurl : null,
      pages,
      activePage: findActivePage(pages, myurl)
    };
  }

  handleDrawerOpen = () => {
    this.setState({ mobileOpen: true });
  };

  handleDrawerClose = () => {
    this.setState({ mobileOpen: false });
  };

  render() {
    const { classes } = this.props;
    const title = "Material-UI Drawer using Create React App";

    return (
      <div className={classes.root}>
        <AppBar>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              {title}
            </Typography>
            <Tooltip title="GitHub repository" enterDelay={300}>
              <IconButton
                className={classes.githubButton}
                component="a"
                color="inherit"
                href="https://github.com/stormasm/mui-drawer"
                aria-label="GitHub repository"
              >
                <GithubIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>

        <AppDrawer
          className={classes.drawer}
          disablePermanent={false}
          onClose={this.handleDrawerClose}
          onOpen={this.handleDrawerOpen}
          mobileOpen={this.state.mobileOpen}
        />

        <div style={{ flex: 1, padding: "10px" }}>
          <Route exact path="/" component={Home} />
          <Route exact path="/mui-drawer" component={Home} />
          <Route path="/:ch/:sec" component={ShowChapterSection} />
        </div>
      </div>
    );
  }
}

Drawer.propTypes = {
  classes: PropTypes.object.isRequired
};

Drawer.childContextTypes = {
  url: PropTypes.object,
  pages: PropTypes.array,
  activePage: PropTypes.object
};

export default withRoot(withStyles(styles)(Drawer));
