export default function ResultModal({ ref, targetTime, remainingTime, onReset }) {
  const userLost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  return (
    <dialog
      ref={ref}
      className='result-modal'>
      {userLost &&<h2>You Lost</h2>}
      <p>
        The target time was <strong>{targetTime}</strong> second
        {targetTime > 1 ? "s" : ""}
      </p>
      <p>
        You stopped the timer with{" "}
        <strong>{formattedRemainingTime} second left</strong>
      </p>
      <form action='dialog'>
        <button onSubmit={onReset}>Close</button>
      </form>
    </dialog>
  );
}
