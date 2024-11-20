import { useState } from "react";
import { AboutMe } from "../information";
import { ServiceIconBox, TestimonialItem, TestimonialModel } from "./Components";
export default function About() {
    const [model, setModel] = useState(null);
    return <article className="about active" data-page="about">
        <header>
            <h2 className="h2 article-title">About me</h2>
        </header>
        <section className="about-text" dangerouslySetInnerHTML={{ __html: AboutMe.about_text }}>

        </section>

        <a href={AboutMe.resume} rel="noreferrer"
            class="download-resume"><svg class="download-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
            </svg> Download Resume</a>
        <br />
        <section className="service">
            <h3 class="h3 service-title">What i'm doing</h3>

            <ul class="service-list">
                {AboutMe.service.map(item => (
                    <ServiceIconBox
                        {...item}
                    />
                ))}
            </ul>
        </section>

        <section className="testimonials">
            <h3 class="h3 testimonials-title">Testimonials</h3>

            <ul className="testimonials-list has-scrollbar">
                {AboutMe.testimonial.map((item, index) => (
                    <TestimonialItem key={index} {...item} setModel={setModel} />
                ))}
            </ul>
        </section>
        {model && <TestimonialModel {...model} setModel={setModel} />}
    </article>
}