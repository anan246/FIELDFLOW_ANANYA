import "./Footers.css";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">


        <div className="footer-about">

          <h2 className="footer-logo">
            Field<span>Flow</span>
          </h2>

          <p>
            Smart Appliance Repair Management System that connects
            customers, technicians, dispatchers and administrators
            through one intelligent platform.
          </p>

          <div className="footer-social">

            <a href="#">🌐</a>
            <a href="#">📘</a>
            <a href="#">📷</a>
            <a href="#">🐦</a>

          </div>

          <div className="newsletter">

            <input
              type="email"
              placeholder="Enter your email"
            />

            <button>
              Subscribe
            </button>

          </div>

        </div>


        <div className="footer-links">

          <h3>Quick Links</h3>

          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/services">Services</a>
          <a href="/profile">Profile</a>

        </div>


        <div className="footer-links">

          <h3>Services</h3>

          <a href="#">AC Repair</a>
          <a href="#">Refrigerator</a>
          <a href="#">Washing Machine</a>
          <a href="#">Microwave</a>

        </div>


        <div className="footer-links">

          <h3>Support</h3>

          <a href="#">Contact</a>
          <a href="#">FAQ</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>

        </div>


        <div className="footer-links">

          <h3>Company</h3>

          <a href="#">About Us</a>
          <a href="#">Our Team</a>
          <a href="#">Careers</a>
          <a href="#">Blog</a>

        </div>

      </div>

      <div className="footer-bottom">

        © 2026 FieldFlow. All Rights Reserved.

      </div>

    </footer>
  );
}