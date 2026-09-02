import {MENU_ITEMS} from '@/components/pages/welcomeScreen/constants/welcomeData';

const FeaturesMenu = () => {
    return (
        <section className="dm-menu">
            <div className="dm-menu-head">
                <div className="dm-eyebrow">NEDEN DİJİTAL MENÜ</div>
                <h2>Bugünün Menüsü</h2>
            </div>

            {MENU_ITEMS.map((item) => (
                <div className="dm-menu-row" key={item.title}>
                    <div className="dm-menu-course">{item.course}</div>
                    <div>
                        <h3 className="dm-menu-title">{item.title}</h3>
                        <p className="dm-menu-desc">{item.desc}</p>
                    </div>
                    <div className="dm-menu-tag">{item.tag}</div>
                </div>
            ))}
        </section>
    );
};

export default FeaturesMenu;
