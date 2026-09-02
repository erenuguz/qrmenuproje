import {PRICING_PLANS} from '@/pages/welcomeScreen/constants/welcomeData';

const PricingSection = () => {
    return (
        <section className="dm-pricing-section" id="fiyatlar">
            <div className="dm-section-head">
                <div className="dm-eyebrow">YATIRIM</div>
                <h2>Sade Fiyatlandırma</h2>
            </div>

            <div className="dm-pricing-grid">
                {PRICING_PLANS.map((plan) => (
                    <div
                        className={`dm-price-card ${plan.popular ? 'popular' : ''}`}
                        key={plan.name}
                    >
                        {plan.badge && (
                            <div className="dm-price-badge">{plan.badge}</div>
                        )}
                        <div className="dm-price-name">{plan.name}</div>

                        <div className="dm-price-amount">
                            {plan.currency}
                            {plan.price}
                            <span>{plan.period}</span>
                        </div>

                        {plan.yearlyTotal && (
                            <div className="dm-price-subtext">
                                Yıllık{' '}
                                <del>
                                    {plan.currency}
                                    {plan.oldPrice}
                                </del>{' '}
                                yerine toplam{' '}
                                <strong>
                                    {plan.currency}
                                    {plan.yearlyTotal}
                                </strong>
                            </div>
                        )}

                        <ul className="dm-price-features">
                            {plan.features.map((feature, i) => (
                                <li key={i}>{feature}</li>
                            ))}
                        </ul>
                        <a
                            href={plan.btnLink}
                            className={`dm-price-btn ${plan.popular ? 'popular-btn' : ''}`}
                        >
                            {plan.btnText}
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PricingSection;
