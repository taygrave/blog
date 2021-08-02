import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import Navigation from "../components/navigation";
import "prismjs/themes/prism-okaidia.css";

export default ({ children }) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );
  return (
    <div className="site-wrapper">
      <header className="site-header">
        <div className="site-title">
          <Link to="/">{data.site.siteMetadata.title}</Link>
        </div>
        <Navigation />
      </header>
      {children}
      <footer className="site-footer">
        <p>
          Thank you for visiting{" "}
          <span role="img" aria-label="love">
            ❤️
          </span>{" "}
          Feedback welcome!
        </p>
        <p className="tiny">
          All content and images are my own unless otherwise credited, please
          ask for permission to use elsewhere.
        </p>
      </footer>
    </div>
  );
};
