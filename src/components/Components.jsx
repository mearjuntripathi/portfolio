import { Introduction, SocialAccount } from "../information"
import { elementToggleFunc } from "../function";
import quotepic from "../images/icon-quote.svg";
import { useState } from 'react';

// View Sidebar

function SidebarInfo() {
    function toggleSidebar() {
        const sidebar = document.querySelector("[data-sidebar]");
        elementToggleFunc(sidebar);
    }
    return <div className="sidebar-info">
        <figure className="avatar-box" style={{borderRadius :"50%"}}>
            <img src={Introduction.profile} alt={Introduction.name} width="80" />
        </figure>

        <div className="info-content">
            <h1 className="name" title={Introduction.name}>{Introduction.name}</h1>

            <p className="title">{Introduction.position}</p>
        </div>

        <button className="info_more-btn" data-sidebar-btn onClick={toggleSidebar}>
            <span style={{ fontWeight: 'bolder' }}>Show Contacts</span>

            <ion-icon name="chevron-down"></ion-icon>
        </button>
    </div>
}

// ALl Content Item

function ContactItem(props) {
    return (
        <li className="contact-item">
            <div className="icon-box">
                <ion-icon name={props.icon}></ion-icon>
            </div>
            <div className="contact-info">
                <p className="contact-title">{props.name}</p>
                {props.link ? (
                    <a href={props.link} target="_blank" rel="noreferrer" className="contact-link">{props.displayText}</a>
                ) : props.time ? (
                    <time dateTime={props.dateTime}>{props.displayText}</time>
                ) : props.address ? (
                    <address>{props.displayText}</address>
                ) : (
                    <p>{props.displayText}</p>
                )}
            </div>
        </li>
    );
}


// ALl Social Item

function SocialItem(props) {
    return <li className="social-item">
        <a href={props.link} target="_blank" rel="noreferrer" className="social-link">
            <ion-icon name={props.icon}></ion-icon>
        </a>
    </li>
}


// All hidden Sidebar Information

function SidebarInfoMore() {
    return <div className="sidebar-info_more">

        <div className="separator"></div>

        <ul className="contacts-list">

            <ContactItem
                icon="mail-outline"
                name="Email"
                link="mailto:mearjuntripathi@gmail.com"
                displayText="mearjuntripathi@gmail.com"
            />
            <ContactItem
                icon="phone-portrait-outline"
                name="Phone"
                link="tel:+918887135297"
                displayText="+91 8887135297"
            />
            <ContactItem
                icon="calendar-outline"
                name="Birthday"
                time
                dateTime="2002-04-15"
                displayText="April 15, 2002"
            />
            <ContactItem
                icon="location-outline"
                name="Location"
                address
                displayText="Varanasi, U.P., India"
            />

        </ul>

        <div className="separator"></div>

        <ul className="social-list">
            <SocialItem icon="logo-github" link={SocialAccount.github} />
            <SocialItem icon="logo-twitter" link={SocialAccount.twitter} />
            <SocialItem icon="logo-linkedin" link={SocialAccount.linkedin} />
            <SocialItem icon="logo-google" link={SocialAccount.google} />
        </ul>

    </div>
}

// Nav Icons

function NavbarItem({ name, isActive, onClick }) {
    return (
        <li className="navbar-item">
            <button
                className={`navbar-link ${isActive ? 'active' : ''}`}
                data-nav-link
                onClick={() => onClick(name)}
            >
                {name}
            </button>
        </li>
    );
}

function NavBar({ setActivePage, activePage }) {
    const navItems = ["About", "Resume", "Portfolio", "Contact"];

    return (
        <nav className="navbar">
            <ul className="navbar-list">
                {navItems.map((item) => (
                    <NavbarItem
                        key={item}
                        name={item}
                        isActive={activePage === item}
                        onClick={setActivePage}
                    />
                ))}
            </ul>
        </nav>
    );
}


function ServiceIconBox(props) {
    return <li className="service-item">

        <div className="service-icon-box">
            <img src={props.icon} alt={props.name + " icon"} width="40" />
        </div>

        <div className="service-content-box">
            <h4 className="h4 service-item-title">{props.name}</h4>

            <p className="service-item-text" dangerouslySetInnerHTML={{ __html: props.about }} />
        </div>

    </li>
}

function TestimonialItem(props) {
    async function handleClick() {
        await props.setModel(props);
        const modalContainer = document.querySelector("[data-modal-container]");
        const overlay = document.querySelector("[data-overlay]");
        elementToggleFunc(modalContainer);
        elementToggleFunc(overlay);
    }
    return <li className="testimonials-item" onClick={handleClick}>
        <div className="content-card" data-testimonials-item>

            <figure className="testimonials-avatar-box">
                <img src={props.pic} alt={props.name} width="60" data-testimonials-avatar />
            </figure>

            <h4 className="h4 testimonials-item-title" data-testimonials-title>{props.name}</h4>

            <div className="testimonials-text" data-testimonials-text>
                <p dangerouslySetInnerHTML={{ __html: props.about }} />
            </div>

        </div>
    </li>
}

function TestimonialModel(props) {
    function handleClose() {
        const modalContainer = document.querySelector("[data-modal-container]");
        const overlay = document.querySelector("[data-overlay]");
        elementToggleFunc(modalContainer);
        elementToggleFunc(overlay);
        props.setModel(props);
    }

    return <div className="modal-container" data-modal-container>

        <div className="overlay" data-overlay></div>

        <section className="testimonials-modal">

            <button className="modal-close-btn" onClick={handleClose} data-modal-close-btn>
                <ion-icon name="close-outline"></ion-icon>
            </button>

            <div className="modal-img-wrapper">
                <figure className="modal-avatar-box">
                    <img src={props.pic} alt={props.name} width="80" data-modal-img />
                </figure>

                <img src={quotepic} alt="quote icon" />
            </div>

            <div className="modal-content">

                <h4 className="h3 modal-title" data-modal-title>{props.name}</h4>

                <time datetime={props.dateTime}>{props.displayDate}</time>

                <div data-modal-text >
                    <p dangerouslySetInnerHTML={{ __html: props.about }} />

                </div>

            </div>

        </section>

    </div>
}


function TimelineItem(props) {
    return (
        <li className="timeline-item">
            {
                props.title ? (
                    <h4 className="h4 timeline-item-title">{props.title}</h4>
                ) : (
                    <div className="job-header">
                        <span className="company-name">{props.companyName}</span>
                        <span className="position">{props.jobTitle}</span>
                    </div>
                )
            }
            <span className="timeline-session">{props.session}</span>

            <p
                className="timeline-text"
                dangerouslySetInnerHTML={{ __html: props.about }}
            />
        </li>
    );
}


function SkillItem(props) {
    return <li className="skills-item">

        <div className="title-wrapper">
            <h5 className="h5">{props.title}</h5>
        </div>

        <div className="skill-progress-bg">
            {props.skill.map((item) => (
                <span className="skills">{item}</span>
            ))}
        </div>

    </li>
}

function ProjectItem(props) {
    const [showPopup, setShowPopup] = useState(false);

    const openPopup = () => setShowPopup(true);
    const closePopup = () => setShowPopup(false);

    return (
        <>
            <li className="project-item active" onClick={openPopup}>
                <figure className="project-img">
                    <img src={props.pic} alt={props.title} loading="lazy" />
                </figure>
                <h3 className="project-title">{props.title}</h3>
                <p className="project-category">{props.category}</p>
            </li>

            {showPopup && (
                <ProjectPopup
                    {...props}
                    onClose={closePopup}
                />
            )}
        </>
    );
}

function ProjectPopup({ title, pic, description, skills, link, codeLink, onClose }) {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button className="modal-close-btn" onClick={onClose} data-modal-close-btn>
                    <ion-icon name="close-outline"></ion-icon>
                </button>
                <div style={{ width: "100%", right: "0px" }}>
                    <h2 className="popup-title">{title}</h2>
                </div>
                <img className="popup-image" src={pic} alt={title} />
                <div className="popup-details">
                    <hr />
                    <p className="popup-description">{description}</p>
                    <hr />
                    {skills && (
                        <h4 className="popup-skills">
                            Skills Used:
                            <div className="skill-progress-bg">
                                {skills.map((item) => (
                                    <span className="skills" key={item}>{item}</span>
                                ))}
                            </div>
                        </h4>
                    )}
                    <div className="popup-links">
                        {link && (
                            <a href={link} target="_blank" rel="noreferrer" className="popup-link">
                                Open Project
                            </a>
                        )}
                        {codeLink && (
                            <a href={codeLink} target="_blank" rel="noreferrer" className="popup-link">
                                View Code
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export { SidebarInfo, SidebarInfoMore, NavBar, ServiceIconBox, TestimonialItem, TestimonialModel, TimelineItem, SkillItem, ProjectItem, ProjectPopup }