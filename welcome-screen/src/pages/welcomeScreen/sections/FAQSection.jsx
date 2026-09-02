import {useState} from 'react';
import {FAQS} from '@/constants/welcomeData';

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="dm-faq-section" id="sss">
            <div className="dm-section-head">
                <div className="dm-eyebrow">MERAK EDİLENLER</div>
                <h2>Sıkça Sorulan Sorular</h2>
            </div>
            <div className="dm-faq-container">
                {FAQS.map((faq, index) => (
                    <div
                        className={`dm-faq-item ${openIndex === index ? 'open' : ''}`}
                        key={index}
                        onClick={() => toggleFaq(index)}
                    >
                        <div className="dm-faq-q">
                            {faq.q}
                            <span className="dm-faq-icon">
                                {openIndex === index ? '−' : '+'}
                            </span>
                        </div>
                        <div className="dm-faq-a-wrapper">
                            <p className="dm-faq-a">{faq.a}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQSection;
