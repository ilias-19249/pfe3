// import './Navbar.css'
// import './Hero.css'
import NavBar from './Navbar.js';
import HeroSection from './Hero.js';
import './layout.css'
export default function CommonLayout() {
  return (
    <div className="common-layout">
      <NavBar />      
      <HeroSection />
    </div>
  );
}
