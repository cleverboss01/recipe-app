import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { useTheme } from "../hooks/useTheme";

function Footer() {
  const { color } = useTheme();
  return (
    <div className="footer-container" style={{ backgroundColor: color }}>
      <section className="footer-subscription"></section>
      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>Recipe Store</h2>
            <p>
              Discover new recipes according to your preference(s) and
              recommendations from friends.
            </p>
          </div>
          <div className="footer-link-items">
            <h2>Connect</h2>
            <p>hello@recipestore.com</p>
            <p>+234(0) 903 067 3128</p>
            <div className="social-icons">
              {" "}
              <Link
                className="social-icon-link"
                to="/"
                target="_blank"
                aria-label="Twitter"
              >
                <FaTwitter />
              </Link>
              <Link
                className="social-icon-link"
                to="/"
                target="_blank"
                aria-label="Instagram"
              >
                <FaInstagram />
              </Link>
              <Link
                className="social-icon-link"
                to="/"
                target="_blank"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <section className="social-media">
        <div className="social-media-wrap">
          <small className="website-rights">
            © Recipe Store 2022. All rights reserved
          </small>
        </div>
      </section>
    </div>
  );
}

export default Footer;
