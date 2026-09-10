import React, { useState, useEffect } from "react";
import { CodingProfiles as initialProfiles } from "../information";

const PLATFORM_TTLS = {
    leetcode: 30 * 60 * 1000,      // 30 minutes
    gfg: 30 * 60 * 1000,           // 30 minutes
    codeforces: 60 * 60 * 1000,    // 1 hour
    codechef: 2 * 60 * 60 * 1000,  // 2 hours
    hackerrank: 6 * 60 * 60 * 1000 // 6 hours
};

const BASE_PLATFORMS = {
    leetcode: {
        platform: "LeetCode",
        username: "mearjuntripathi",
        link: "https://leetcode.com/mearjuntripathi",
        color: "#FFA116"
    },
    hackerrank: {
        platform: "HackerRank",
        username: "mearjuntripathi",
        link: "https://www.hackerrank.com/mearjuntripathi",
        color: "#2EC866"
    },
    codechef: {
        platform: "CodeChef",
        username: "isthisarjun",
        link: "https://www.codechef.com/users/isthisarjun",
        color: "#5B4638"
    },
    gfg: {
        platform: "GeeksforGeeks",
        username: "mearjuntripathi",
        link: "https://www.geeksforgeeks.org/user/mearjuntripathi",
        color: "#2F8D46"
    },
    codeforces: {
        platform: "Codeforces",
        username: "isthisarjun",
        link: "https://codeforces.com/profile/isthisarjun",
        color: "#1890FF"
    }
};

function normalizeProfile(apiData) {
    const key = (apiData.platform || "").toLowerCase();
    const base = BASE_PLATFORMS[key] || {
        platform: apiData.platform,
        username: apiData.username,
        link: "#",
        color: "#58a6ff"
    };

    let breakdown = null;

    if (apiData.easySolved !== undefined || apiData.mediumSolved !== undefined || apiData.hardSolved !== undefined) {
        breakdown = {
            easy: { solved: apiData.easySolved || 0, color: "#00b8a3" },
            medium: { solved: apiData.mediumSolved || 0, color: "#ffc01e" },
            hard: { solved: apiData.hardSolved || 0, color: "#ff375f" }
        };
    } else if (apiData.questionsByType) {
        breakdown = {
            easy: { solved: apiData.questionsByType.easy || 0, color: "#00b8a3" },
            medium: { solved: apiData.questionsByType.medium || 0, color: "#ffc01e" }
        };
        if (apiData.questionsByType.hard) {
            breakdown.hard = { solved: apiData.questionsByType.hard, color: "#ff375f" };
        }
    } else if (apiData.breakdown) {
        breakdown = apiData.breakdown;
    }

    return {
        ...base,
        ...apiData,
        platform: base.platform,
        breakdown
    };
}

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
    const [profilesList, setProfilesList] = useState(() => {
        try {
            const cachedStr = localStorage.getItem("coding_profiles_cache");
            if (cachedStr) {
                const cached = JSON.parse(cachedStr);
                if (cached.data && Array.isArray(cached.data)) {
                    return cached.data;
                }
            }
        } catch (e) {
            console.error("Cache read error:", e);
        }
        return initialProfiles;
    });

    const [syncStatus, setSyncStatus] = useState("cached"); // cached | syncing | live

    useEffect(() => {
        const fetchProfiles = async () => {
            // Check if local cache is still fresh based on smallest TTL (30 min)
            try {
                const cachedStr = localStorage.getItem("coding_profiles_cache");
                if (cachedStr) {
                    const cached = JSON.parse(cachedStr);
                    const now = Date.now();
                    const age = now - (cached.timestamp || 0);
                    const minTTL = Math.min(...Object.values(PLATFORM_TTLS));
                    if (age < minTTL && cached.data) {
                        setSyncStatus("cached");
                        return;
                    }
                }
            } catch (e) {
                // Ignore cache parse error
            }

            setSyncStatus("syncing");

            const statsApiUrl = process.env.REACT_APP_STATS_API_URL ||
                "https://coding-profile-service-v2-0.onrender.com/stats?leetcode=mearjuntripathi&codechef=isthisarjun&gfg=mearjuntripathi&hackerrank=mearjuntripathi&codeforces=isthisarjun";

            try {
                const response = await fetch(statsApiUrl);
                if (!response.ok) throw new Error(`HTTP error ${response.status}`);
                const json = await response.json();

                if (json.profiles && Array.isArray(json.profiles)) {
                    const normalized = json.profiles.map(normalizeProfile);
                    setProfilesList(normalized);
                    setSyncStatus("live");
                    localStorage.setItem("coding_profiles_cache", JSON.stringify({
                        timestamp: Date.now(),
                        data: normalized
                    }));
                }
            } catch (error) {
                console.warn("Backend API fetch failed, trying Upstash Redis REST fallback...", error);
                
                // Fallback to Upstash Redis REST API if available
                const redisUrl = process.env.REACT_APP_UPSTASH_REDIS_REST_URL;
                const redisToken = process.env.REACT_APP_UPSTASH_REDIS_REST_TOKEN;

                if (redisUrl && redisToken) {
                    try {
                        const redisRes = await fetch(`${redisUrl}/get/coding_stats`, {
                            headers: { Authorization: `Bearer ${redisToken}` }
                        });
                        const redisJson = await redisRes.json();
                        if (redisJson.result) {
                            const parsed = JSON.parse(redisJson.result);
                            if (parsed.profiles) {
                                const normalized = parsed.profiles.map(normalizeProfile);
                                setProfilesList(normalized);
                                setSyncStatus("live");
                                localStorage.setItem("coding_profiles_cache", JSON.stringify({
                                    timestamp: Date.now(),
                                    data: normalized
                                }));
                                return;
                            }
                        }
                    } catch (redisErr) {
                        console.error("Redis REST fetch failed:", redisErr);
                    }
                }
                setSyncStatus("cached");
            }
        };

        fetchProfiles();
    }, []);

    const totalSolved = profilesList.reduce((sum, p) => sum + (p.totalSolved || 0), 0);
    const totalContests = profilesList.reduce((sum, p) => sum + (p.contestsParticipated || 0), 0);

    return (
        <article className="profiles active" data-page="profiles">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 className="h2 article-title">Coding Profiles</h2>
                <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: syncStatus === 'syncing' ? 'var(--accent-yellow)' : syncStatus === 'live' ? 'var(--accent-green)' : 'var(--text-muted)' }}>
                    {syncStatus === 'syncing' && '$ fetching_live_stats... ⏳'}
                    {syncStatus === 'live' && 'LIVE REDIS SYNCED ✓'}
                    {syncStatus === 'cached' && 'LOCAL CACHE (TTL Active) ✓'}
                </div>
            </header>

            <div className="terminal-window" style={{ marginBottom: '24px' }}>
                <div className="terminal-header">
                    <div className="terminal-dots">
                        <span className="terminal-dot red"></span>
                        <span className="terminal-dot yellow"></span>
                        <span className="terminal-dot green"></span>
                    </div>
                    <span className="terminal-title">stats.json — node (redis cached)</span>
                </div>
                <div className="terminal-body">
                    <div className="terminal-prompt">
                        <span className="prompt-symbol">$</span>
                        <span className="prompt-command">curl -s "$STATS_API_URL" | jq '.summary'</span>
                    </div>
                    <div className="profile-total-stats">
                        <div className="total-stat-card">
                            <div className="total-stat-value">{totalSolved.toLocaleString()}</div>
                            <div className="total-stat-label">Total Solved</div>
                        </div>
                        <div className="total-stat-card">
                            <div className="total-stat-value">{profilesList.length}</div>
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
                {profilesList.map((profile, index) => (
                    <ProfileCard key={index} profile={profile} />
                ))}
            </div>
        </article>
    );
}
