type BetControlsProps = {
  onHit: () => void;
  onStand: () => void;
  disabled?: boolean;
};

export function BetControls({
  onHit,
  onStand,
  disabled = false
}: BetControlsProps) {
  return (
    <div style={{ marginTop: 16 }}>
      <button onClick={onHit} disabled={disabled}>
        Hit
      </button>

      <button onClick={onStand} disabled={disabled} style={{ marginLeft: 8 }}>
        Stand
      </button>
    </div>
  );
}