import React from 'react';
import './Distributors.css';

const Distributors = () => {
  return (
    <div className="distributors-container container">
      {/* Header Section */}
      <div className="distributors-header">
        <h1 className="distributors-title">Distributors</h1>
      </div>

      {/* Become a Distributor Section */}
      <section className="become-distributor">
        <h2 className="section-title">Who are we looking for?</h2>
        <p className="section-description">
          We are positively recruiting brand distributors worldwide, if you have offline stores, 
          or other sales channels and want to become our brand distributor, please contact us.
        </p>
        <div className="contact-email">
          Email: <a className="email-link" href="mailto:sales@ringconn.com">sales@ringconn.com</a>
        </div>
      </section>

      {/* Distributors Table */}
      <section className="distributors-table-section">
        <h2 className="section-title">Distributors working with RingConn:</h2>
        
        <div className="table-container">
          <table className="distributors-table">
            <thead>
              <tr className="table-header-row">
                <th className="table-header">Country/Region</th>
                <th className="table-header">Name</th>
                <th className="table-header">Website</th>
                <th className="table-header">Email</th>
              </tr>
            </thead>
            <tbody>
              {/* Europe */}
              <tr className="region-header">
                <td className="region-title" colSpan="4">Europe:</td>
              </tr>
              <tr className="table-row">
                <td className="table-data">UK & Ireland</td>
                <td className="table-data">WESTCOAST LTD</td>
                <td className="table-data"><a className="table-link" href="https://westcoast.co.uk" target="_blank" rel="noopener noreferrer">westcoast.co.uk</a></td>
                <td className="table-data"><a className="table-link" href="mailto:smb@westcoast.co.uk">smb@westcoast.co.uk</a></td>
              </tr>
              <tr className="table-row">
                <td className="table-data">Germany</td>
                <td className="table-data">QUINTA GmbH</td>
                <td className="table-data"><a className="table-link" href="https://quinta.biz" target="_blank" rel="noopener noreferrer">quinta.biz</a></td>
                <td className="table-data"><a className="table-link" href="mailto:vertrieb@quinta.biz">vertrieb@quinta.biz</a></td>
              </tr>
              <tr className="table-row">
                <td className="table-data">Switzerland</td>
                <td className="table-data">Tobco AG</td>
                <td className="table-data"><a className="table-link" href="https://tobco.com" target="_blank" rel="noopener noreferrer">tobco.com</a></td>
                <td className="table-data"><a className="table-link" href="mailto:info@tobco.com">info@tobco.com</a></td>
              </tr>
              {/* Continue with all other regions... */}
              
              {/* North America */}
              <tr className="region-header">
                <td className="region-title" colSpan="4">North America</td>
              </tr>
              <tr className="table-row">
                <td className="table-data">USA</td>
                <td className="table-data">Petra Industries, LLC</td>
                <td className="table-data"><a className="table-link" href="https://www.petra.com" target="_blank" rel="noopener noreferrer">petra.com</a></td>
                <td className="table-data"><a className="table-link" href="mailto:feedback@petra.com">feedback@petra.com</a></td>
              </tr>
              
              {/* Asia */}
              <tr className="region-header">
                <td className="region-title" colSpan="4">Asia:</td>
              </tr>
              <tr className="table-row">
                <td className="table-data">UAE</td>
                <td className="table-data">Techmart</td>
                <td className="table-data"><a className="table-link" href="https://techmartworld.com" target="_blank" rel="noopener noreferrer">techmartworld.com</a></td>
                <td className="table-data"><a className="table-link" href="mailto:info@techmartworld.com">info@techmartworld.com</a></td>
              </tr>
              {/* Continue with all other countries... */}
              
              {/* Oceania */}
              <tr className="region-header">
                <td className="region-title" colSpan="4">Oceania</td>
              </tr>
              <tr className="table-row">
                <td className="table-data">Australia</td>
                <td className="table-data">Elite Electronics</td>
                <td className="table-data"><a className="table-link" href="https://www.elite-electronics.com.au" target="_blank" rel="noopener noreferrer">elite-electronics.com.au</a></td>
                <td className="table-data"><a className="table-link" href="mailto:support@elite-electronics.com.au">support@elite-electronics.com.au</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Retailers Section */}
      <section className="retailers-section">
        <h2 className="section-title">Retailers working with RingConn:</h2>
        
        <div className="table-container">
          <table className="retailers-table">
            <thead>
              <tr className="table-header-row">
                <th className="table-header">Country/Region</th>
                <th className="table-header">Name</th>
                <th className="table-header">Website</th>
                <th className="table-header">Email</th>
              </tr>
            </thead>
            <tbody>
              <tr className="table-row">
                <td className="table-data">UK</td>
                <td className="table-data">Argos</td>
                <td className="table-data"><a className="table-link" href="https://www.argos.co.uk" target="_blank" rel="noopener noreferrer">argos.co.uk</a></td>
                <td className="table-data">-</td>
              </tr>
              <tr className="table-row">
                <td className="table-data">Germany</td>
                <td className="table-data">CD-EMOTION</td>
                <td className="table-data"><a className="table-link" href="https://www.ringconn-germany.de" target="_blank" rel="noopener noreferrer">ringconn-germany.de</a></td>
                <td className="table-data"><a className="table-link" href="mailto:info@ringconn-germany.de">info@ringconn-germany.de</a></td>
              </tr>
              <tr className="table-row">
                <td className="table-data">Australia</td>
                <td className="table-data">Harvey Norman</td>
                <td className="table-data"><a className="table-link" href="https://www.harveynorman.com.au" target="_blank" rel="noopener noreferrer">harveynorman.com.au</a></td>
                <td className="table-data">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Distributors;