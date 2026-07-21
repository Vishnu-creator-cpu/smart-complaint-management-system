import "./StatCard.css";

function StatCard({ title, count, subtitle, icon, color }) {

    return (

        <div className="stat-card">

            <div
                className="stat-icon"
                style={{ background: color }}
            >
                {icon}
            </div>

            <div className="stat-content">

                <h4>{title}</h4>

                <h2>{count}</h2>

                <p>{subtitle}</p>

            </div>

        </div>

    );

}

export default StatCard;