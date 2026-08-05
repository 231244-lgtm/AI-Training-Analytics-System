import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import SettingCard from "../components/SettingCard";

import "../styles/Settings.css";

function Settings() {
  return (
    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-content">

        <Navbar />

        <div className="settings-page">

          <div className="settings-header">

            <h1>⚙️ Settings</h1>

            <p>
              Manage administrator account, AI configuration,
              and application preferences.
            </p>

          </div>

          <div className="settings-grid">

            <SettingCard title="👤 Administrator">

              <div className="setting-item">
                <label>Name</label>
                <input type="text" value="Admin" readOnly />
              </div>

              <div className="setting-item">
                <label>Email</label>
                <input
                  type="email"
                  value="admin@readfoundation.org"
                  readOnly
                />
              </div>

              <div className="setting-item">
                <label>Organization</label>
                <input
                  type="text"
                  value="READ Foundation"
                  readOnly
                />
              </div>

            </SettingCard>

            <SettingCard title="🔔 Preferences">

              <div className="toggle-item">
                <label>Enable Notifications</label>
                <input type="checkbox" defaultChecked />
              </div>

              <div className="toggle-item">
                <label>Receive Analytics Emails</label>
                <input type="checkbox" defaultChecked />
              </div>

              <div className="toggle-item">
                <label>Dark Mode</label>
                <input type="checkbox" />
              </div>

            </SettingCard>

            <SettingCard title="🤖 AI Configuration">

              <div className="setting-item">
                <label>AI Model</label>
                <input type="text" value="GPT-4" readOnly />
              </div>

              <div className="setting-item">
                <label>Confidence Threshold</label>
                <input type="text" value="90%" readOnly />
              </div>

              <div className="setting-item">
                <label>Auto Recommendations</label>
                <input type="text" value="Enabled" readOnly />
              </div>

            </SettingCard>

            <SettingCard title="🔒 Security">

              <button className="settings-btn">
                Change Password
              </button>

              <button className="settings-btn save">
                Save Settings
              </button>

            </SettingCard>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Settings;