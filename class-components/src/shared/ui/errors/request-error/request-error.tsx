export function RequestError({ error }: { error: string | null }) {
  return (
    <div className="error">
      <span className="error__icon">✖</span>
      <div>
        <div className="error__title">REQUEST FAILED</div>
        <div className="error__msg">{error}</div>
      </div>
    </div>
  );
}
