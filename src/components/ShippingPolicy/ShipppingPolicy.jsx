import React from 'react';
import './ShippingPolicy.css';

const ShippingPolicy = () => {
  return (
    <div className="sp-wrapper container">
      <div className="sp-container">
        <h1 className="sp-heading">Shipping Policy</h1>
        
        <section className="sp-section">
          <h2 className="sp-subheading">Shipping Regions</h2>
          <p className="sp-text">
            We currently ship to the following regions:
          </p>
          <p className="sp-text"><strong>Free Shipping Regions:</strong> United States, Canada, Mexico, Puerto Rico, Costa Rica, Chile, Colombia, EU countries, United Kingdom, Switzerland, Norway, Australia, New Zealand, China, South Korea, Singapore, Malaysia, Thailand, Philippines, Vietnam, United Arab Emirates, Qatar, Saudi Arabia, and Kuwait.</p>
          <p className="sp-text"><strong>Regions with $15 Shipping Fee:</strong> India, Cambodia, Indonesia, Iceland, Liechtenstein, Egypt.</p>
          <p className="sp-text">Shipping is free to the specified free shipping regions, while a flat fee of $15 applies to the other regions listed.</p>
          <p className="sp-text sp-notice"><strong>Important Notice:</strong> You may be required to pay additional taxes, customs duties, or other fees depending on your location. These are determined by local customs and are not included in our shipping fee. We do not ship to APO/FPO addresses.</p>
        </section>

        <section className="sp-section">
          <h2 className="sp-subheading">Shipping Times</h2>
          <p className="sp-text">
            Orders are typically processed within 2 business days. If you selected "Don't know my size", you’ll first receive a sizing kit within 2 business days. After submitting your ring size and color, the smart ring will ship within another 2 business days.
          </p>
          <p className="sp-text">We ship from a local warehouse in the U.S. (USPS/express), and use international air transport for other countries.</p>

          <div className="sp-table-container">
            <table className="sp-table">
              <thead>
                <tr>
                  <th>Region</th>
                  <th>Standard Shipping</th>
                  <th>Express Shipping</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>United States</td><td>3–5 business days</td><td>2–3 business days</td></tr>
                <tr><td>European Union</td><td>6–10 business days</td><td>5–8 business days</td></tr>
                <tr><td>United Kingdom</td><td>6–10 business days</td><td>5–7 business days</td></tr>
                <tr><td>Canada</td><td>8–15 business days</td><td>3–5 business days</td></tr>
                <tr><td>Mexico</td><td>8–12 business days</td><td>/</td></tr>
                <tr><td>Puerto Rico</td><td>6–10 business days</td><td>/</td></tr>
                <tr><td>Costa Rica</td><td>6–10 business days</td><td>/</td></tr>
                <tr><td>Chile, Colombia</td><td>19–21 business days</td><td>/</td></tr>
                <tr><td>Switzerland</td><td>8–12 business days</td><td>/</td></tr>
                <tr><td>Norway</td><td>8–10 business days</td><td>/</td></tr>
                <tr><td>Singapore</td><td>8–15 business days</td><td>3–5 business days</td></tr>
                <tr><td>Malaysia, Philippines</td><td>8–10 business days</td><td>/</td></tr>
                <tr><td>Vietnam</td><td>5–8 business days</td><td>/</td></tr>
                <tr><td>China</td><td>2–3 business days</td><td>/</td></tr>
                <tr><td>Australia, New Zealand</td><td>5–10 business days</td><td>4–7 business days</td></tr>
                <tr><td>South Korea</td><td>5–8 business days</td><td>3–5 business days</td></tr>
                <tr><td>UAE, Qatar, Saudi Arabia</td><td>6–10 business days</td><td>/</td></tr>
                <tr><td>Thailand</td><td>5–8 business days</td><td>/</td></tr>
                <tr><td>India, Cambodia, Indonesia, Iceland, Liechtenstein</td><td>3–5 business days</td><td>/</td></tr>
                <tr><td>Egypt</td><td>13–16 business days</td><td>/</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="sp-section">
          <h2 className="sp-subheading">Address Changes</h2>
          <p className="sp-text">You can change your delivery address before confirming your ring size. For U.S. orders, you may update the address within the same state, provided the tax rate is the same. If not, we may be unable to update it.</p>
          <p className="sp-text">Addresses cannot be changed between countries. If needed, contact us to cancel the current order and place a new one: <a href="mailto:cs@ringconn.com">cs@ringconn.com</a>.</p>
          <p className="sp-text">For shipped orders, contact the courier directly using the tracking number in your confirmation email.</p>
        </section>

        <section className="sp-section">
          <h2 className="sp-subheading">Shipping Origin</h2>
          <p className="sp-text">U.S. orders are shipped from either the U.S. or Hong Kong. All other orders are shipped from Hong Kong. We reserve the right to change shipping origin based on logistics.</p>
        </section>

        <section className="sp-section">
          <h2 className="sp-subheading">What If My Package Was Marked Delivered?</h2>
          <p className="sp-text">Packages may be left at your door or accepted by neighbors. Please check with them first. Use your tracking number to follow up with the courier. If needed, share supporting images with us.</p>
          <p className="sp-text">For help, contact us at: <a href="mailto:cs@ringconn.com">cs@ringconn.com</a></p>
        </section>
      </div>
    </div>
  );
};

export default ShippingPolicy;