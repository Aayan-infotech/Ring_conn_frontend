import React from "react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy container">
      <div className="policy-header">
        <h1>Privacy Policy</h1>
        <h2>RingConn Privacy Policy</h2>
        <p className="update-date">
          Last updated and effective: April 24th, 2025
        </p>
        <p className="view-info">
          You can view this Privacy Policy in RingConn App and/or on the bottom
          of our website (
          <a href="http://18.209.91.97:1113/">https://www.ringconn.com</a>).
        </p>
      </div>

      <div className="policy-content">
        <h3>This Privacy Policy covers:</h3>
        <ol className="policy-sections">
          <li>Introduction</li>
          <li>What data we collect</li>
          <li>How we use your data</li>
          <li>Legal basis for processing data</li>
          <li>Policy for children</li>
          <li>How data is shared and disclosed</li>
          <li>How we store and transfer data</li>
          <li>How we safeguard your data</li>
          <li>Data streams</li>
          <li>What are your rights</li>
          <li>Policy for European users</li>
          <li>Policy for California users</li>
          <li>Updates to this privacy policy</li>
          <li>Sovereigns</li>
          <li>Dual language</li>
          <li>SDK numbers</li>
        </ol>

        <div className="full-policy">
          {/* Section 1 */}
          <h4>1. Introduction</h4>
          <p>
            RingConn ("we", "us", or "our") is committed to protecting your
            privacy. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you use our smart ring, mobile
            application, and services.
          </p>

          {/* Section 2 */}
          <h4>2. What data we collect</h4>
          <p>We collect several types of information:</p>
          <ul>
            <li>
              <strong>Personal Data:</strong> Name, email, phone number,
              shipping address
            </li>
            <li>
              <strong>Health Data:</strong> Heart rate, sleep patterns, activity
              metrics
            </li>
            <li>
              <strong>Device Data:</strong> Device identifiers, usage statistics
            </li>
            <li>
              <strong>Location Data:</strong> With your permission, approximate
              location
            </li>
          </ul>

          {/* Section 3 */}
          <h4>3. How we use your data</h4>
          <p>Your data is used to:</p>
          <ul>
            <li>Provide and maintain our services</li>
            <li>Improve product functionality</li>
            <li>Personalize your experience</li>
            <li>Communicate with you</li>
            <li>For research and development</li>
          </ul>

          {/* Continue with all other sections... */}
          <h4>4. Legal basis for processing data</h4>
          <p>We process your data based on:</p>
          <ul>
            <li>Your consent</li>
            <li>Performance of a contract</li>
            <li>Legal obligations</li>
            <li>Legitimate interests</li>
          </ul>

          <h4>5. Policy for children</h4>
          <p>
            Our services are not directed to children under 13. We do not
            knowingly collect personal information from children under 13.
          </p>

          <h4>6. How data is shared and disclosed</h4>
          <p>We may share your information with:</p>
          <ul>
            <li>Service providers and vendors</li>
            <li>Business partners</li>
            <li>For legal compliance</li>
            <li>With your consent</li>
          </ul>

          <h4>7. How we store and transfer data</h4>
          <p>
            Your data is stored securely and may be transferred to and processed
            in countries other than your own.
          </p>

          <h4>8. How we safeguard your data</h4>
          <p>
            We implement appropriate technical and organizational measures to
            protect your personal data.
          </p>

          <h4>9. Data streams</h4>
          <p>
            We collect data through multiple streams including the RingConn app,
            device synchronization, and website interactions.
          </p>

          <h4>10. What are your rights</h4>
          <p>Depending on your location, you may have rights to:</p>
          <ul>
            <li>Access your data</li>
            <li>Request correction</li>
            <li>Request deletion</li>
            <li>Restrict processing</li>
            <li>Data portability</li>
            <li>Object to processing</li>
          </ul>

          <h4>11. Policy for European users</h4>
          <p>
            For users in the European Economic Area, we comply with the General
            Data Protection Regulation (GDPR).
          </p>

          <h4>12. Policy for California users</h4>
          <p>
            California residents have specific rights under the California
            Consumer Privacy Act (CCPA).
          </p>

          <h4>13. Updates to this privacy policy</h4>
          <p>
            We may update this policy periodically. We will notify you of
            significant changes.
          </p>

          <h4>14. Sovereigns</h4>
          <p>
            This policy is governed by the laws of the State of California
            without regard to its conflict of laws provisions.
          </p>

          <h4>15. Dual language</h4>
          <p>
            In case of discrepancies between language versions, the English
            version prevails.
          </p>

          <h4>16. SDK numbers</h4>
          <p>
            We use the following SDK versions in our mobile application: [List
            SDK versions here]
          </p>

          <div className="contact-section">
            <h4>Contact Us</h4>
            <p>
              If you have questions about this Privacy Policy, please contact us
              at:
            </p>
            <p>
              <strong>Email:</strong> privacy@ringconn.com
            </p>
            <p>
              <strong>Address:</strong> RingConn Privacy Office, 123 Privacy
              Lane, San Francisco, CA 94107
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
