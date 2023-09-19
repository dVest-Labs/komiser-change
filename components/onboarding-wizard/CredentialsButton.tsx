import { useRouter } from 'next/router';

import Button from '../button/Button';

interface CredentialsButtonProps {
  nextLabel?: string;
  handleNext?: (e?: any) => void;
  onBack?: (e?: any) => void;
}

function CredentialsButton({
  handleNext,
  nextLabel = 'Add a cloud account',
  onBack
}: CredentialsButtonProps) {
  const router = useRouter();

  return (
    <div className="flex justify-between">
      <Button
        onClick={onBack}
        size="lg"
        style="text"
        type="button"
      >
        Back
      </Button>
      <Button
        onClick={handleNext}
        size="lg"
        style="primary"
        type="button"
        disabled={false}
      >
        {nextLabel}
      </Button>
    </div>
  );
}

export default CredentialsButton;
