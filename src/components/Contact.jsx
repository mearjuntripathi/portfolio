import React, { useEffect, useRef } from "react";

export default function Contact() {
  const contactFormRef = useRef(null);
  const submitButtonRef = useRef(null);
  const successMessageRef = useRef(null);
  const errorMessageRef = useRef(null);

  useEffect(() => {
    const contact_form = contactFormRef.current;
    const submitButton = submitButtonRef.current;
    const successMessage = successMessageRef.current;
    const errorMessage = errorMessageRef.current;
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyhGkN-CxqsJK8Z2quntg4hIQqjLTcDVG3ClYSWS7fIAVDg9SthW8hJzH7WTbuCQtW-uw/exec';

    const handleSubmit = (e) => {
      e.preventDefault();
      submitButton.disabled = true;
      let requestBody = new FormData(contact_form);

      fetch(scriptURL, { method: 'POST', body: requestBody })
        .then(response => {
          if (response.ok) {
            showSuccessMessage();
          } else {
            showErrorMessage();
          }
          submitButton.disabled = false;
        })
        .catch(error => {
          showErrorMessage();
          submitButton.disabled = false;
        });
    };

    const showSuccessMessage = () => {
      successMessage.style.display = "block";
      setTimeout(() => {
        successMessage.style.display = "none";
      }, 5000); // Hide after 5 seconds
    };

    const showErrorMessage = () => {
      errorMessage.style.display = "block";
      setTimeout(() => {
        errorMessage.style.display = "none";
      }, 5000); // Hide after 5 seconds
    };

    contact_form.addEventListener('submit', handleSubmit);
    
    return () => {
      contact_form.removeEventListener('submit', handleSubmit);
    };
  }, []);

  return (
    <>
      <div id="success-message" className="alert success" ref={successMessageRef}>
        😊 Form submitted successfully! 
      </div>
      <div id="error-message" className="alert error" ref={errorMessageRef}>
        😔 Error to Submit Form 
      </div>
      <article className="contact active" data-page="contact">
        <header>
          <h2 className="h2 article-title">Contact</h2>
        </header>

        <section className="mapbox" data-mapbox>
          <figure>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1236.2250006075787!2d82.96312178629285!3d25.37405984647004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2d8f9bf724f7%3A0x6b76bd13928cdc4!2sParmanandpur%20vidyabhushan%20Tripathi%20home!5e0!3m2!1sen!2sin!4v1720166522712!5m2!1sen!2sin"
              width="400"
              height="300"
              loading="lazy"
            ></iframe>
          </figure>
        </section>

        <section className="contact-form">
          <h3 className="h3 form-title">Contact Form</h3>
          <form method="post" className="form" id="form" data-form ref={contactFormRef}>
            <div className="input-wrapper">
              <input type="text" name="Name" className="form-input" placeholder="Full name" required data-form-input />
              <input type="email" name="Email" className="form-input" placeholder="Email address" required data-form-input />
            </div>
            <textarea name="Message" className="form-input" placeholder="Your Message" required data-form-input></textarea>
            <button className="form-btn" id="submit" type="submit" ref={submitButtonRef}>
              <ion-icon name="paper-plane"></ion-icon>
              <span>Send Message</span>
            </button>
          </form>
        </section>
      </article>
    </>
  );
}
