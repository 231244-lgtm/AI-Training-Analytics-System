
import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import SettingCard from "../components/SettingCard";

import "../styles/Settings.css";

function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [analyticsEmails, setAnalyticsEmails] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-content">
        <Navbar />

        <div className="settings-page">
          <div className="settings-header">
            <h1>Settings</h1>
            <p>
              Manage account information, application preferences,
              and analytics configuration.
            </p>
          </div>

          <div className="settings-grid">
            <SettingCard title="Administrator">
              <div className="setting-item">
                <label htmlFor="admin-name">Name</label>
                <input
                  id="admin-name"
                  type="text"
                  value="Admin"
                  readOnly
                />
              </div>

              <div className="setting-item">
                <label htmlFor="admin-email">Email</label>
                <input
                  id="admin-email"
                  type="email"
                  value="admin@readfoundation.org"
                  readOnly
                />
              </div>

              <div className="setting-item">
                <label htmlFor="admin-organization">Organization</label>
                <input
                  id="admin-organization"
                  type="text"
                  value="READ Foundation"
                  readOnly
                />
              </div>

              <p className="settings-note">
                Account details are displayed for reference and are
                not editable from this page.
              </p>
            </SettingCard>

            <SettingCard title="Preferences">
              <div className="toggle-item">
                <label htmlFor="notifications">
                  Enable Notifications
                </label>
                <input
                  id="notifications"
                  type="checkbox"
                  checked={notifications}
                  onChange={(event) =>
                    setNotifications(event.target.checked)
                  }
                />
              </div>

              <div className="toggle-item">
                <label htmlFor="analytics-emails">
                  Receive Analytics Emails
                </label>
                <input
                  id="analytics-emails"
                  type="checkbox"
                  checked={analyticsEmails}
                  onChange={(event) =>
                    setAnalyticsEmails(event.target.checked)
                  }
                />
              </div>

              <div className="toggle-item">
                <label htmlFor="dark-mode">Dark Mode</label>
                <input
                  id="dark-mode"
                  type="checkbox"
                  checked={darkMode}
                  onChange={(event) =>
                    setDarkMode(event.target.checked)
                  }
                />
              </div>

              <p className="settings-note">
                These preferences currently apply only to this page
                session. They do not yet control application-wide
                notifications, email delivery, or the website theme.
              </p>
            </SettingCard>

            <SettingCard title="Analytics Configuration">
              <div className="setting-item">
                <label>Data Source</label>
                <input
                  type="text"
                  value="READ Foundation Dataset"
                  readOnly
                />
              </div>

              <div className="setting-item">
                <label>Recommendation Method</label>
                <input
                  type="text"
                  value="Rule-based data analysis"
                  readOnly
                />
              </div>

              <div className="setting-item">
                <label>Feedback Theme Analysis</label>
                <input
                  type="text"
                  value="Keyword-based extraction"
                  readOnly
                />
              </div>

              <p className="settings-note">
                These reflect the analysis methods currently used by
                the recommendations workflow. No model confidence
                percentage is configured here.
              </p>
            </SettingCard>

            <SettingCard title="Security">
              <p className="settings-note">
                Password management and persistent settings require
                backend support.
              </p>

              <button
                type="button"
                className="settings-btn"
                disabled
                title="Password management is not implemented yet."
              >
                Change Password
              </button>

              <button
                type="button"
                className="settings-btn save"
                disabled
                title="Persistent settings are not implemented yet."
              >
                Save Settings
              </button>

              <p className="settings-note">
                These actions are unavailable until the corresponding
                functionality is implemented.
              </p>
            </SettingCard>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
