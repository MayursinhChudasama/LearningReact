export default function ResultModal({ ref, result, targetTime }) {
  return (
    <dialog ref={ref} className='result-modal'>
      <h2>You {result}</h2>
      <p>
        The target time was <strong>{targetTime}</strong> second
        {targetTime > 1 ? "s" : ""}
      </p>
      <p>
        You stopped the timer with <strong>X second left</strong>
      </p>
      <form action='dialog'>
        <button>Close</button>
      </form>
    </dialog>
  );
}
