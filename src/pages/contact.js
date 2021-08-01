import React, { useState } from "react";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";

const FORM_NAME = "contact";

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

const ContactPage = ({ data: { site } }) => {
  const [name, setName] = useState("");
  const [sender, setSender] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": FORM_NAME,
        name,
        sender,
        subject,
        message,
      }),
    })
      .then(() => {
        console.log("Form successfully submitted");
        setIsSubmitted(true);
      })
      .catch((error) => alert(error));
  };

  return (
    <Layout>
      <Helmet>
        <title>Contact — {site.siteMetadata.title}</title>
        <meta
          name="description"
          content={"Contact page of " + site.siteMetadata.description}
        />
      </Helmet>
      {isSubmitted ? (
        <div
          className="post-thumbnail submitted"
          style={{
            backgroundImage: `url('/assets/billy-huynh-W8KTS-mhFUE-unsplash.jpg')`,
            marginBottom: 0,
          }}
        >
          <h1 className="post-title">~ Thank You ~</h1>
          <p>Your message was submitted.</p>
          <Link to="/" className="button -primary homeButton">
            Home
          </Link>
        </div>
      ) : (
        <div className="two-grids -contact">
          <div
            className="post-thumbnail"
            style={{
              backgroundImage: `url('/assets/billy-huynh-W8KTS-mhFUE-unsplash.jpg')`,
              marginBottom: 0,
            }}
          >
            <h1 className="post-title">Get in Touch</h1>
            <p>Feedback? Questions? Comments? Requests? Other? &rarr;</p>
          </div>
          <div>
            <form
              className="form-container"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              method="post"
              name={FORM_NAME}
              onSubmit={handleSubmit}
            >
              <div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="sender">Email</label>
                <input
                  type="email"
                  name="sender"
                  id="sender"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="message">Message</label>
                <textarea
                  name="message"
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <input
                  type="submit"
                  className="button -primary"
                  style={{ marginRight: 0 }}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};
export default ContactPage;
export const pageQuery = graphql`
  query ContactPageQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;
