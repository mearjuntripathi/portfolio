import { ResumeData } from "../information";
import { TimelineItem, SkillItem } from "./Components";

export default function Resume() {
    return <article className="resume active" data-page="resume">

        <header>
            <h2 className="h2 article-title">Resume</h2>
        </header>

        <section className="timeline">

            <div className="title-wrapper">
                <div className="icon-box">
                    <ion-icon name="book-outline"></ion-icon>
                </div>

                <h3 className="h3">Experience</h3>
            </div>

            <ol className="timeline-list">

                {ResumeData.Experience.map((item) => (
                    <TimelineItem {...item} />
                ))}

            </ol>

        </section>

        <section className="timeline">

            <div className="title-wrapper">
                <div className="icon-box">
                    <ion-icon name="book-outline"></ion-icon>
                </div>

                <h3 className="h3">Education</h3>
            </div>

            <ol className="timeline-list">

                {ResumeData.Education.map((item) => (
                    <TimelineItem {...item} />
                ))}

            </ol>

        </section>

        <section className="skill">

            <h3 className="h3 skills-title">My skills</h3>

            <ul className="skills-list content-card">

                {ResumeData.Skills.map((item) => (
                    <SkillItem {...item} />
                ))}

            </ul>

        </section>

    </article>
}