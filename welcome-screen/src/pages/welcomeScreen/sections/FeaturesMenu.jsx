import {MENU_ITEMS} from '@/constants/welcomeData';

const FeaturesMenu = () => {
    return (
        <section className="dm-features" id="ozellikler">
            <div className="dm-section-head">
                <div className="dm-eyebrow">NEDEN DİJİTAL MENÜ</div>
                <h2>İşletmenizi Hızlandırın</h2>
            </div>

            <div className="dm-features-grid">
                {MENU_ITEMS.map((item, index) => (
                    <div className="dm-feature-card" key={index}>
                        <div className="dm-feature-icon">{item.icon}</div>
                        <h3 className="dm-feature-title">{item.title}</h3>
                        <p className="dm-feature-desc">{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturesMenu;
