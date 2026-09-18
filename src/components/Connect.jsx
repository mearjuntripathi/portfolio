import React, { useEffect, useRef, useState } from "react";
import { ConnectLinks } from "../information";

export default function Connect() {
    const socialLinks = ['github', 'linkedin', 'twitter', 'google', 'email'];
    const contactFormRef = useRef(null);
    const submitButtonRef = useRef(null);
    const successMessageRef = useRef(null);
    const errorMessageRef = useRef(null);

    const [connectionStep, setConnectionStep] = useState(0);
    const [submittingState, setSubmittingState] = useState("idle"); // idle | sending | success | error

    useEffect(() => {
        // Animate connection sequence
        const timers = [
            setTimeout(() => setConnectionStep(1), 150),
            setTimeout(() => setConnectionStep(2), 350),
            setTimeout(() => setConnectionStep(3), 550),
            setTimeout(() => setConnectionStep(4), 750),
        ];

        return () => timers.forEach(t => clearTimeout(t));
    }, []);

    const showSuccessMessage = () => {
        const successMessage = successMessageRef.current;
        if (successMessage) {
            successMessage.style.display = "block";
            setTimeout(() => {
                successMessage.style.display = "none";
            }, 5000);
        }
    };

    const showErrorMessage = () => {
        const errorMessage = errorMessageRef.current;
        if (errorMessage) {
            errorMessage.style.display = "block";
            setTimeout(() => {
                errorMessage.style.display = "none";
            }, 5000);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmittingState("sending");
        const contact_form = contactFormRef.current;
        const submitButton = submitButtonRef.current;
        if (submitButton) submitButton.disabled = true;

        let requestBody = new FormData(contact_form);
        const scriptURL = process.env.REACT_APP_SCRIPT_URL;

        fetch(scriptURL, {
            method: 'POST',
            body: requestBody,
            mode: 'no-cors'
        })
            .then(() => {
                setSubmittingState("success");
                showSuccessMessage();
                if (contact_form) contact_form.reset();
                setTimeout(() => {
                    setSubmittingState("idle");
                    if (submitButton) submitButton.disabled = false;
                }, 3000);
            })
            .catch(() => {
                setSubmittingState("error");
                showErrorMessage();
                setTimeout(() => {
                    setSubmittingState("idle");
                    if (submitButton) submitButton.disabled = false;
                }, 3000);
            });
    };

    return (
        <>
            <div id="success-message" className="alert success" ref={successMessageRef}>
                😊 Message sent successfully!
            </div>
            <div id="error-message" className="alert error" ref={errorMessageRef}>
                😔 Failed to send message. Please try again.
            </div>

            <article className="connect active" data-page="connect">
                <header>
                    <h2 className="h2 article-title">Connect</h2>
                </header>

                {/* ===== TERMINAL CONNECTION & MESSAGE FORM ===== */}
                <div className="contact-form-wrapper">
                    <div className="terminal-window">
                        <div className="terminal-header">
                            <div className="terminal-dots">
                                <span className="terminal-dot red"></span>
                                <span className="terminal-dot yellow"></span>
                                <span className="terminal-dot green"></span>
                            </div>
                            <span className="terminal-title">connect.sh — bash</span>
                        </div>
                        <div className="terminal-body">
                            <div className="terminal-prompt">
                                <span className="prompt-symbol">$</span>
                                <span className="prompt-command">./connect --with arjun_tripathi</span>
                            </div>
                            <div className="terminal-output" style={{ marginBottom: '16px' }}>
                                {connectionStep >= 1 && <p>[1/3] Resolving host address... ✓</p>}
                                {connectionStep >= 2 && <p>[2/3] Establishing TLS 1.3 handshake... ✓</p>}
                                {connectionStep >= 3 && <p>[3/3] Authenticating session (latency: 12ms)... ✓</p>}
                                {connectionStep >= 4 ? (
                                    <p style={{ color: 'var(--accent-green)', fontWeight: '600', marginTop: '6px' }}>
                                        [CONNECTED ✓] Connection established! You can now send a direct message below.
                                    </p>
                                ) : (
                                    <span className="terminal-cursor"></span>
                                )}
                            </div>

                            {connectionStep >= 4 && (
                                <>
                                    <div className="terminal-prompt" style={{ marginBottom: '16px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                                        <span className="prompt-symbol">$</span>
                                        <span className="prompt-command">./send-message --to arjun</span>
                                    </div>
                                    <form className="form" id="form" ref={contactFormRef} onSubmit={handleSubmit}>
                                        <div className="form-inputs-group">
                                            <input
                                                type="text"
                                                name="Name"
                                                className="form-input-term"
                                                placeholder="Full name"
                                                required
                                            />
                                            <input
                                                type="email"
                                                name="Email"
                                                className="form-input-term"
                                                placeholder="Email address"
                                                required
                                            />
                                        </div>
                                        <textarea
                                            name="Message"
                                            className="form-input-term"
                                            placeholder="Your message..."
                                            required
                                        ></textarea>
                                        <button
                                            className="form-submit-btn"
                                            id="submit"
                                            type="submit"
                                            ref={submitButtonRef}
                                            style={{
                                                background: submittingState === 'success' ? 'var(--accent-green)' : submittingState === 'error' ? 'var(--accent-red)' : 'var(--accent-cyan)'
                                            }}
                                        >
                                            {submittingState === 'sending' ? (
                                                <>
                                                    <span className="terminal-cursor"></span>
                                                    <span>$ transmitting_data...</span>
                                                </>
                                            ) : submittingState === 'success' ? (
                                                <>
                                                    <span>[SENT ✓] Message Delivered!</span>
                                                </>
                                            ) : submittingState === 'error' ? (
                                                <>
                                                    <span>[ERROR ✗] Retry Send</span>
                                                </>
                                            ) : (
                                                <>
                                                    <ion-icon name="paper-plane"></ion-icon>
                                                    <span>$ send_message.sh</span>
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="connect-grid" style={{ marginTop: '24px' }}>
                    {socialLinks.map((key) => {
                        const item = ConnectLinks[key];
                        if (!item) return null;
                        return (
                            <a
                                key={key}
                                href={item.url}
                                target="_blank"
                                rel="noreferrer"
                                className="connect-card"
                            >
                                {item.icon && (
                                    <ion-icon name={item.icon} className="connect-icon"></ion-icon>
                                )}
                                <div className="connect-info">
                                    <div className="connect-label">{item.label}</div>
                                    {item.username && (
                                        <div className="connect-username">{item.username}</div>
                                    )}
                                </div>
                                <span className="connect-arrow">→</span>
                            </a>
                        );
                    })}
                </div>

                <a
                    href={ConnectLinks.resume.url}
                    target="_blank"
                    rel="noreferrer"
                    className="resume-download-btn"
                    style={{ marginBottom: '30px' }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    $ wget resume.pdf
                </a>

            </article>
        </>
    );
}
