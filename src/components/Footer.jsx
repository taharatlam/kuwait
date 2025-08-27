import React from "react";
import Image from "next/image";
import logo from "@/images/logo.png";
import Link from "next/link";
import PhoneIcon from "@/images/phoneIcon.svg";
import EmailIcon from "@/images/emailIcon.svg";
import LocationIcon from "@/images/locIcon.svg";
import facebook from "@/images/facebook.svg";
import instagram from "@/images/instagram.svg";
import linkedin from "@/images/linkedin.svg";
import twitter from "@/images/twitter.svg";

const Footer = () => {
  const collectionsLinks = [
    { title: "Kitchen Tools", link: "/" },
    { title: "Dining", link: "/" },
    { title: "Home Decor", link: "/" },
    { title: "Home Cleaning & Laundry", link: "/" },
    { title: "Household Tools", link: "/" },
  ];

  const customerCareLinks = [
    { title: "Contact Us", link: "/" },
    { title: "Shipping Info", link: "/" },
    { title: "Returns & Exchanges", link: "/" },
    { title: "FAQs", link: "/" },
    { title: "Track Order", link: "/" },
  ];

  const contactLinks = [
    {
      title: "Phone",
      link: "/phone",
      icon: PhoneIcon,
      label: "+123 456 7890",
    },
    {
      title: "Email",
      link: "/email",
      icon: EmailIcon,
      label: "info@example.com",
    },
    {
      title: "Address",
      link: null,
      icon: LocationIcon,
      label: "123 Main St, Anytown, USA",
    },
  ];

  return (
    <footer className="main-footer">
      <div className="container">
        <div className="row row-gap-25">
          <div className="col-lg-5 col-12">
            <Link className="ft-logo" href="/">
              <Image src={logo} alt="Logo" />
            </Link>
            <p className="para">
              Discover quality essentials, stylish accents, and smart solutions
              to make every space feel just right.
            </p>
            <ul className="ft-social-list d-flex gap-2 pl-0 m-0">
              <li>
                <Link href="/">
                  <Image src={facebook} alt="Facebook" />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <Image src={instagram} alt="Instagram" />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <Image src={linkedin} alt="Youtube" />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <Image src={twitter} alt="Twitter" />
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 offset-lg-1 col-12">
            <h3 className="h6 color-white text-uppercase">Collections</h3>
            <ul className="ft-list">
              {collectionsLinks.map((item, index) => (
                <li key={index}>
                  <Link href={item.link}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-lg-3 col-12">
            <h3 className="h6 color-white text-uppercase">Customer Care</h3>
            <ul className="ft-list">
              {customerCareLinks.map((item, index) => (
                <li key={index}>
                  <Link href={item.link}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          {/* <div className="col-lg-3 col-12">
            <h3 className="ft-title">Contact</h3>
            <ul className="ft-list">
              {contactLinks.map((item, index) => (
                <li key={index}>
                  {item.link ? (
                    <Link className="ft-contact-item" href={item.link}>
                      <Image src={item.icon} alt="Icon" />
                      <span>{item.label}</span>
                    </Link>
                  ) : (
                    <div className="ft-contact-item">
                      <Image src={item.icon} alt="Icon" />
                      <span>{item.label}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div> */}
        </div>
        <div className="row">
          <div className="col-12">
            <div className="ft-btm">
              <p className="para">&copy; 2025 Asco Kuwait</p>
              <ul className="ft-btm-list d-flex gap-2 pl-0 m-0">
                <li>
                  <Link href="/">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/">Terms of Service</Link>
                </li>
                <li>
                  <Link href="/">Cookie Policy</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
