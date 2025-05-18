export default function ResultModal({
  ref,
  targetTime,
  remainingTime,
  onReset,
}) {
  const userLost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);
  return (
    <dialog
      ref={ref}
      className='result-modal'>
      {userLost && <h2>You Lost</h2>}
      {!userLost && <h2>Your Score: {score}</h2>}
      <p>
        The target time was <strong>{targetTime}</strong> second
        {targetTime > 1 ? "s" : ""}
      </p>
      <p>
        You stopped the timer with{" "}
        <strong>{formattedRemainingTime} second left</strong>
      </p>
      <form action='dialog'>
        <button onClose={onReset}>Close</button>
      </form>
    </dialog>
  );
}
