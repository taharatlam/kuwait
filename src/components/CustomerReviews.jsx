import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import StarRatingViewOnly from "./StarRatingViewOnly";
import quote from "@/images/quote.svg";
import Image from "next/image";

// Helper to format date in a deterministic, SSR-safe way (e.g., "May 10, 2024")
function formatDate(dateString) {
  const date = new Date(dateString);
  // Use UTC to avoid timezone differences between server and client
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();
  // Month names in English, static
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${monthNames[month]} ${day}, ${year}`;
}

const reviews = [
  {
    name: "Jane Doe",
    rating: 5,
    text: "Absolutely love this product! It exceeded my expectations and the quality is top-notch.",
    date: "2024-05-10",
  },
  {
    name: "John Smith",
    rating: 4,
    text: "Very good, but there is room for improvement. Would recommend to friends.",
    date: "2024-04-22",
  },
  {
    name: "Emily Johnson",
    rating: 5,
    text: "Fantastic! Will definitely purchase again. Customer service was also great.",
    date: "2024-03-15",
  },
  {
    name: "Michael Brown",
    rating: 3.5,
    text: "Product is decent for the price. Delivery was quick.",
    date: "2024-02-28",
  },
];

const CustomerReviews = () => {
  return (
    <div className="customer-reviews-slider">
      <Swiper
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 1 },
        }}
        pagination={{ clickable: true }}
        modules={[Pagination]}
      >
        {reviews.map((review, idx) => (
          <SwiperSlide key={idx}>
            <div
              className="review-card p-4"
              style={{
                background: "#fff",
                borderRadius: 16,
              }}
            >
              <p className="body2 mt-0 mb-0" style={{ color: "#595C5D" }}>
                {review.text}
              </p>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div>
                  <span
                    className="fw-bold "
                    style={{ marginBottom: "18px !important" }}
                  >
                    {review.name}
                  </span>
                  <StarRatingViewOnly rating={review.rating} reviews={null} />
                </div>
                <Image src={quote} alt="quote" width={62} height={62} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CustomerReviews;
