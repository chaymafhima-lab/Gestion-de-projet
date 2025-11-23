import './Home1.css';
import SprintCraftBanner from './SprintCraftBanner';
import { Link } from 'react-router-dom';

export default function Home1() {
  return (
    <div className="home1">
      <header className="home1-header">
        <div className="logo">SprintCraft</div>
      </header>

      <section className="home1-hero">
       <SprintCraftBanner />
        <div>
          <h1>Welcome to SprintCraft</h1>
          <Link to="/signup" className="get-started-btn">Get Started</Link>
        </div>
      </section>
    </div>
  );
}
