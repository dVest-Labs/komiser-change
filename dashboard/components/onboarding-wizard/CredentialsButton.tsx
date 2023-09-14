import { useRouter } from 'next/router';

import Button from '../button/Button';

interface CredentialsButtonProps {
  nextLabel?: string;
  sectionName: string;
  handleNext?: (e?: any) => void;
}

function CredentialsButton({
  handleNext,
  nextLabel = 'Add a cloud account',
  sectionName
}: CredentialsButtonProps) {
  const router = useRouter();

  return (
    <div className="flex justify-between">
      <Button
        onClick={() => router.back()}
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
        disabled={!sectionName && true}
      >
        {nextLabel}
      </Button>
    </div>
  );
}

export default CredentialsButton;
