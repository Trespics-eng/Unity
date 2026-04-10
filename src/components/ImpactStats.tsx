import './styles/ImpactStats.css';

const stats = [
    { label: 'Stories Shared', value: '1,000+' },
    { label: 'Voices Heard', value: '8,000+' },
    { label: 'Communities Reached', value: '40+' },
];

const ImpactStats = () => {
    return (
        <section className="impact-section">
            <div className="container">
                <div className="impact-grid">
                    {stats.map((stat, index) => (
                        <div key={index} className="impact-card">
                            <h3 className="impact-value">{stat.value}</h3>
                            <p className="impact-label">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ImpactStats;
