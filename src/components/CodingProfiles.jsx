import { CodingProfiles as profiles } from "../information";

function ProfileCard({ profile }) {
    return (
        <div className="profile-card">
            <div className="profile-card-header">
                <div className="profile-platform">
                    <span className="profile-platform-dot" style={{ background: profile.color }}></span>
                    <span className="profile-platform-name">{profile.platform}</span>
                </div>
                <span className="profile-username">@{profile.username}</span>
            </div>
            <div className="profile-card-body">
                <div className="profile-stats">
                    <div className="profile-stat">
                        <div className="profile-stat-value">{profile.totalSolved}</div>
                        <div className="profile-stat-label">Solved</div>
                    </div>
                    {profile.rating && (
                        <div className="profile-stat">
                            <div className="profile-stat-value">{profile.rating}</div>
                            <div className="profile-stat-label">Rating</div>
                        </div>
                    )}
                    {profile.maxRating && (
                        <div className="profile-stat">
                            <div className="profile-stat-value">{profile.maxRating}</div>
                            <div className="profile-stat-label">Max Rating</div>
                        </div>
                    )}
                    {profile.contestsParticipated && (
                        <div className="profile-stat">
                            <div className="profile-stat-value">{profile.contestsParticipated}</div>
                            <div className="profile-stat-label">Contests</div>
                        </div>
                    )}
                    {profile.globalRank && (
                        <div className="profile-stat">
                            <div className="profile-stat-value">#{profile.globalRank.toLocaleString()}</div>
                            <div className="profile-stat-label">Global Rank</div>
                        </div>
                    )}
                    {profile.countryRank && (
                        <div className="profile-stat">
                            <div className="profile-stat-value">#{profile.countryRank.toLocaleString()}</div>
                            <div className="profile-stat-label">Country</div>
                        </div>
                    )}
                    {profile.certifications && (
                        <div className="profile-stat">
                            <div className="profile-stat-value">{profile.certifications}</div>
                            <div className="profile-stat-label">Certs</div>
                        </div>
                    )}
                </div>

                {profile.stars && (
                    <div className="profile-stars">
                        {Array.from({ length: profile.stars }).map((_, i) => (
                            <span key={i} className="profile-star">★</span>
                        ))}
                    </div>
                )}

                {profile.breakdown && (
                    <div className="profile-breakdown">
                        {Object.entries(profile.breakdown).map(([key, val]) => (
                            <div key={key} className="profile-breakdown-item">
                                <span className="breakdown-dot" style={{ background: val.color }}></span>
                                <span className="breakdown-label">{key}</span>
                                <span className="breakdown-value">{val.solved}</span>
                            </div>
                        ))}
                    </div>
                )}

                {profile.badges && (
                    <div className="profile-badges">
                        {profile.badges.map((badge, i) => (
                            <span key={i} className="profile-badge">{badge}</span>
                        ))}
                    </div>
                )}

                {profile.certificationLinks && (
                    <div className="profile-cert-links">
                        {profile.certificationLinks.map((link, i) => (
                            <a key={i} href={link} target="_blank" rel="noreferrer" className="cert-link">
                                Cert #{i + 1}
                            </a>
                        ))}
                    </div>
                )}

                <a href={profile.link} target="_blank" rel="noreferrer" className="profile-link">
                    Visit Profile →
                </a>
            </div>
        </div>
    );
}

export default function CodingProfiles() {
    const totalSolved = profiles.reduce((sum, p) => sum + p.totalSolved, 0);
    const totalContests = profiles.reduce((sum, p) => sum + (p.contestsParticipated || 0), 0);

    return (
        <article className="profiles active" data-page="profiles">
            <header>
                <h2 className="h2 article-title">Coding Profiles</h2>
            </header>

            <div className="terminal-window" style={{ marginBottom: '24px' }}>
                <div className="terminal-header">
                    <div className="terminal-dots">
                        <span className="terminal-dot red"></span>
                        <span className="terminal-dot yellow"></span>
                        <span className="terminal-dot green"></span>
                    </div>
                    <span className="terminal-title">stats.json — node</span>
                </div>
                <div className="terminal-body">
                    <div className="terminal-prompt">
                        <span className="prompt-symbol">$</span>
                        <span className="prompt-command">cat stats.json | jq '.summary'</span>
                    </div>
                    <div className="profile-total-stats">
                        <div className="total-stat-card">
                            <div className="total-stat-value">{totalSolved.toLocaleString()}</div>
                            <div className="total-stat-label">Total Solved</div>
                        </div>
                        <div className="total-stat-card">
                            <div className="total-stat-value">{profiles.length}</div>
                            <div className="total-stat-label">Platforms</div>
                        </div>
                        <div className="total-stat-card">
                            <div className="total-stat-value">{totalContests}</div>
                            <div className="total-stat-label">Contests</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="profiles-grid">
                {profiles.map((profile, index) => (
                    <ProfileCard key={index} profile={profile} />
                ))}
            </div>
        </article>
    );
}
