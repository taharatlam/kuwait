import Image from "next/image";
import BannerSlider from "@/components/BannerSlider";
import SolutionSlider from "@/components/SolutionSlider";
import WhyChooseSec from "@/components/WhyChooseSec";
import LivePreviewSec from "@/components/LivePreviewSec";
import TestSlider from "@/components/TestSlider";
import CtaSec from "@/components/CtaSec";
import LogoSlider from "@/components/LogoSlider";
import CatSlider from "@/components/CatSlider";
import FeaturedProductSec from "@/components/FeaturedProductSec";
import AboutSec from "@/components/aboutSec";

export default function Home() {
  return (
    <>
      <BannerSlider />
      <SolutionSlider />
      <FeaturedProductSec />

      <section className="logo-slider-sec pale-bg">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12 text-center text-uppercase">
              <h3 className="h5">Our Brands</h3>
            </div>
            <div className="col-lg-12 mt-4 col-12">
              <LogoSlider />
            </div>
          </div>
        </div>
      </section>

      <AboutSec />

      <CtaSec />
    </>
  );
}
