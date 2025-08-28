import React from "react";
import Image from "next/image";
import facebook from "@/images/facebook-outline.svg";
import twitter from "@/images/twitter-outline.svg";
import linkedin from "@/images/linkedin-outline.svg";
import mail from "@/images/mail-outline.svg";
import Link from "next/link";

const ShareSocial = () => {
  const icons = [
    {
      icon: facebook,
      url: "https://www.facebook.com/sharer/sharer.php?u=https://www.google.com",
    },
    {
      icon: linkedin,
      url: "https://www.linkedin.com/shareArticle?mini=true&url=https://www.google.com",
    },
    {
      icon: mail,
      url: "mailto:?subject=Check out this product&body=I found this product on the website and I thought you might be interested in it.",
    },
    {
      icon: twitter,
      url: "https://twitter.com/intent/tweet?url=https://www.google.com",
    },
  ];
  return (
    <div className="share-social-wrapper d-flex align-items-center gap-2 mt-4">
      <p className="body-2 mb-0">Share:</p>
      <ul
        className="share-social d-flex align-items-center gap-2 pl-0 mb-0"
        style={{ paddingLeft: 0 }}
      >
        {icons.map((icon, index) => (
          <li key={index}>
            <Link href={icon.url} target="_blank" rel="noopener noreferrer">
              <Image src={icon.icon} width={30} height={30} alt={icon.name} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShareSocial;
