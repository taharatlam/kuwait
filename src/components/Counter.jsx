import minus from "@/images/minus.svg";
import plus from "@/images/plus.svg";
import Image from "next/image";

const Counter = ({ value, onChange, min, max }) => {
  return (
    <div className="qty-counter">
      <button
        className="qty-counter-btn"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
      >
        <Image src={minus} alt="minus" />
      </button>
      <input
        type="text"
        className="qty-counter-input"
        value={value}
        onChange={(e) => {
          if (e.target.value === "") {
            onChange(min);
          } else if (parseInt(e.target.value) > max) {
            onChange(max);
          } else {
            onChange(parseInt(e.target.value));
          }
        }}
        min={min}
        max={max}
      />
      <button
        className="qty-counter-btn"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
      >
        <Image src={plus} alt="plus" />
      </button>
    </div>
  );
};

export default Counter;
