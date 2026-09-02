import '@/pages/welcomeScreen/styles/welcomeScreen.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/pages/welcomeScreen/sections/HeroSection';
import FeaturesMenu from '@/pages/welcomeScreen/sections/FeaturesMenu';
import DemoSection from '@/pages/welcomeScreen/sections/DemoSection';
import HowItWorksSection from '@/pages/welcomeScreen/sections/HowItWorksSection';
import PricingSection from '@/pages/welcomeScreen/sections/PricingSection';
import FAQSection from '@/pages/welcomeScreen/sections/FAQSection';
import ContactSection from '@/pages/welcomeScreen/sections/ContactSection';

const WelcomeScreen = () => {
    return (
        <div className="dm-root">
            <Header />
            <HeroSection />
            <FeaturesMenu />
            <HowItWorksSection />
            <DemoSection />
            <PricingSection />
            <FAQSection />
            <ContactSection />
            <Footer />
        </div>
    );
};

export default WelcomeScreen;
