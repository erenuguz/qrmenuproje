import '@/pages/welcomeScreen/pages/welcomeScreen/styles/welcomeScreen.css';
import HeroSection from '@/pages/welcomeScreen/pages/welcomeScreen/sections/HeroSection';
import FeaturesMenu from '@/pages/welcomeScreen/pages/welcomeScreen/sections/FeaturesMenu';
import HowItWorksSection from '@/pages/welcomeScreen/pages/welcomeScreen/sections/HowItWorksSection';
import PricingSection from '@/pages/welcomeScreen/pages/welcomeScreen/sections/PricingSection';
import FAQSection from '@/pages/welcomeScreen/pages/welcomeScreen/sections/FAQSection';
import ContactSection from '@/pages/welcomeScreen/pages/welcomeScreen/sections/ContactSection';
import Footer from '@/pages/welcomeScreen/components/Footer';
import Header from '@/pages/welcomeScreen/components/Header';
import DemoSection from '@/pages/welcomeScreen/pages/welcomeScreen/sections/DemoSection';

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
