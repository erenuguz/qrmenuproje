import {HOW_IT_WORKS_STEPS} from '@/pages/welcomeScreen/constants/welcomeData';

const HowItWorksSection = () => {
    return (
        <section className="dm-steps-section" id="nasil-calisir">
            <div className="dm-section-head">
                <div className="dm-eyebrow">SÜREÇ</div>
                <h2>Nasıl Çalışır?</h2>
            </div>

            <div className="dm-steps-timeline">
                {HOW_IT_WORKS_STEPS.map((step) => (
                    <div className="dm-step-item" key={step.num}>
                        <div className="dm-step-node">{step.num}</div>
                        <h3 className="dm-step-title">{step.title}</h3>
                        <p className="dm-step-desc">{step.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HowItWorksSection;
