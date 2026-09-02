import '@/components/pages/welcomeScreen/styles/welcomeScreen.scss';
import HeroSection from '@/components/pages/welcomeScreen/components/HeroSection';
import FeaturesMenu from '@/components/pages/welcomeScreen/components/FeaturesMenu';
import ContactSection from '@/components/pages/welcomeScreen/components/ContactSection';
import Footer from '@/components/pages/welcomeScreen/components/Footer';

const WelcomeScreen = () => {
    return (
        <div className="dm-root">
            <HeroSection />
            <FeaturesMenu />
            <ContactSection />
            <Footer />
        </div>
    );
};

export default WelcomeScreen;
