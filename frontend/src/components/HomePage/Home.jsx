import "../../css/HomePage/home.css";
import videoBg from "../../assets/videos/home-bg.mp4";

function Home() {
    return(
        <>
            <div className="home">
                <div className="overlay"></div>
                <video className='home-bg' src={videoBg} autoPlay loop muted />
                <div className="home-hero">
                    <p className='home-hero-heading'>Sri Lanka</p>
                    <p className="home-hero-heading2">BEST HARVEST</p>            
                    <p className="home-hero-heading3">IN THE WORLD</p>   
                    <button className='log-in gap'>Discover More</button>  
                </div>
            </div>
        </>
    );
}

export default Home;
