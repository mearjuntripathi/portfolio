import { useState } from "react";
import { AboutMe } from "../information";
import { ServiceIconBox, TestimonialItem, TestimonialModel } from "./Components";

export default function About() {
    const [model, setModel] = useState(null);
    return <article className="about active" data-page="about">
        <header>
            <h2 className="h2 article-title">About me</h2>
        </header>

        <div className="terminal-window">
            <div className="terminal-header">
                <div className="terminal-dots">
                    <span className="terminal-dot red"></span>
                    <span className="terminal-dot yellow"></span>
                    <span className="terminal-dot green"></span>
                </div>
                <span className="terminal-title">about.md — bash</span>
            </div>
            <div className="terminal-body">
                <div className="terminal-prompt">
                    <span className="prompt-symbol">$</span>
                    <span className="prompt-command">cat about.md</span>
                </div>
                <div className="terminal-output about-text" dangerouslySetInnerHTML={{ __html: AboutMe.about_text }}>
                </div>
            </div>
        </div>

        <a href={AboutMe.resume} target="_blank" rel="noreferrer"
            className="download-resume">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            $ wget resume.pdf
        </a>

        <br />

        <section className="service">
            <h3 className="h3 service-title">what_i_do()</h3>
            <ul className="service-list">
                {AboutMe.service.map((item, index) => (
                    <ServiceIconBox key={index} {...item} />
                ))}
            </ul>
        </section>

        <section className="testimonials">
            <h3 className="h3 testimonials-title">testimonials</h3>
            <ul className="testimonials-list has-scrollbar">
                {AboutMe.testimonial.map((item, index) => (
                    <TestimonialItem key={index} {...item} setModel={setModel} />
                ))}
            </ul>
        </section>
        {model && <TestimonialModel {...model} setModel={setModel} />}
    </article>
}