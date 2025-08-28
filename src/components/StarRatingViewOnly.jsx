import React from "react";
import star from "@/images/star-fill.svg";
import starEmpty from "@/images/star-empty.svg";
import starHalf from "@/images/star-half-fill.svg";
import Image from "next/image";

const StarRatingViewOnly = ({ rating = 5, reviews = 832 }) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(
          <li key={i}>
            <Image src={star} alt="star" width={16} height={16} />
          </li>
        );
      } else if (rating >= i - 0.5) {
        stars.push(
          <li key={i}>
            <Image src={starHalf} alt="half star" width={16} height={16} />
          </li>
        );
      } else {
        stars.push(
          <li key={i}>
            <Image src={starEmpty} alt="empty star" width={16} height={16} />
          </li>
        );
      }
    }
    return stars;
  };

  return (
    <div className="star-rating-view-only">
      <div className="star-rating-view-only-inner">
        <ul className="star-rating-view-only-inner-list">
          {renderStars(rating)}
        </ul>
        {reviews && (
          <span>
            ({reviews} {reviews > 1 ? "reviews" : "review"})
          </span>
        )}
      </div>
    </div>
  );
};

export default StarRatingViewOnly;
