import "../styles/SettingCard.css";

function SettingCard({ title, children }) {
  return (
    <div className="setting-card">
      <h2>{title}</h2>
      {children}
    </div>
  );
}

export default SettingCard;