import './Banner.css'

export default function Banner() {
    return (
        <div className="homeBanner">
            <div className="homeBannerTitles">
                <span className="homeBannerTitleSm">React & Node app</span>
                <h2 className="homeBannerTitleLg">Blog</h2>
            </div>
            <div className="homeBannerImg">
                <img src="images/banner.jpg" alt="" className="homeBannerImages" />
            </div>
        </div>
    )
}
