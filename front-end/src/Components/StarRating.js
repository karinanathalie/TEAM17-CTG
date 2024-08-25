import React, { useState } from "react";
import { FaStar } from "react-icons/fa";


export default function StarRatingBar() {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div className="flex mb-[10px]">
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <label className="flex flex-row">
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
              className="hidden peer"
            />
            <FaStar
              className="w-[20px] h-[20px] text-[#FFD700]"
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              size={100}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
}