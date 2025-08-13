import { Button } from '@/shared/ui/atoms/Button';

type Props = { disabled?: boolean; onOpen: () => void };

export function ClaimButton({ disabled, onOpen }: Props) {
  return (
    <Button variant="primary" size="md" fullWidth disabled={disabled} onClick={onOpen}>
      Claim
    </Button>
  );
}
