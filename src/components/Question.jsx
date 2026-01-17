function Question({ data, selected, onSelect }) {
  return (
    <div className="question-box">
      <h2>{data.question}</h2>

      {data.options.map((opt, i) => (
        <label key={i} className="option">
          <input
            type="radio"
            name="option"
            checked={selected === i}
            onChange={() => onSelect(i)}
          />
          <span>{opt}</span>
        </label>
      ))}
    </div>
  );
}

export default Question;