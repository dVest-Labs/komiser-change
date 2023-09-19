import { ReactNode, useState , useRef} from 'react';
import Button from '../../button/Button';
import PlusIcon from '../../icons/PlusIcon';
import Modal from '../../modal/Modal';
import ProviderCls, {
  allProviders,
  Provider
} from '../../../utils/providerHelper';

import SelectInput from '../../../components/onboarding-wizard/SelectInput';
import CloseIcon from '../../icons/CloseIcon';
import { useRouter } from 'next/navigation';

import KeyIcon from '../../../components/icons/KeyIcon';
import Folder2Icon from '../../../components/icons/Folder2Icon';
import VariableIcon from '../../../components/icons/VariableIcon';
import DocumentTextIcon from '../../../components/icons/DocumentTextIcon';
import ShieldSecurityIcon from '../../../components/icons/ShieldSecurityIcon';

import LabelledInput from '../../../components/onboarding-wizard/LabelledInput';
import InputFileSelect from '../../../components/onboarding-wizard/InputFileSelect';
import CredentialsButton from '../../../components/onboarding-wizard/CredentialsButton';


interface SelectOptions {
  icon: ReactNode;
  label: string;
  value: string;
}

const options: SelectOptions[] = [
  {
    icon: <DocumentTextIcon />,
    label: 'Credentials File',
    value: 'credentials-file'
  },
  {
    icon: <KeyIcon />,
    label: 'Credentials keys',
    value: 'credentials-keys'
  },
  {
    icon: <VariableIcon />,
    label: 'Environment Variables',
    value: 'environment-variables'
  },
  {
    icon: <ShieldSecurityIcon />,
    label: 'IAM Instance Role',
    value: 'iam-instance-role'
  }
];


type CloudAccountsHeaderProps = {
  isNotCustomView: boolean;
};

enum STEPS{
  CLOUD_ACCOUNT=0,
  CONFIG=1
}

function CloudAccountsHeader({ isNotCustomView }: CloudAccountsHeaderProps) {

  const [showModal, setShowModal] = useState(false)
  const [step, setStep] = useState(STEPS.CLOUD_ACCOUNT)
  const [provider, setProvider] = useState<Provider>(allProviders.AWS);
  const [credentialType, setCredentialType] = useState<string>(
    options[0].value
  );
  

  const onBack = () =>{
    setStep((value) => value -1)
  }

   const onNext = () =>{
    setStep((value) => value + 1)
  }

  const handleNext = () => {
    // TODO: (onboarding-wizard) complete form inputs, validation, submission and navigation
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    // TODO: (onboarding-wizard) handle file change and naming. Set Input field to file.name and use temporary file path for the upload value
  };

 


  const onSubmit = () =>{
    if (step !== STEPS.CONFIG) {
       return onNext()
    }
  }

  const router = useRouter();
  const handleSelectChange = (newValue: string) =>
    setProvider(newValue as Provider);

  
    const handleSuggest = () =>
      router.replace(
        'https://docs.komiser.io/docs/faqs#how-can-i-request-a-new-feature'
      );
      

      let bodyContent = (
         <div className='min-w-[500px] flex flex-col justify-between gap-4'>
          <div className="flex justify-between">
              <div className="text-lg font-medium text-black-900">
                Add  cloud account
              </div>
              
            <div className='min-w-[20px]'><CloseIcon/></div> 
          </div>

          <div className='leading-6 text-gray-900/60'>
            Komiser is a cloud agnostic, one platform across all major public cloud providers
          </div>

          
      
            <div className="py-1">
            <SelectInput
              label="Cloud provider"
              value={provider}
              values={Object.values(allProviders)}
              handleChange={handleSelectChange}
              displayValues={Object.values(allProviders).map(value => ({
                label: ProviderCls.providerLabel(value)
              }))}
            />
          </div>
          <div className="flex justify-between">
            <Button
              onClick={handleSuggest}
              size="lg"
              style="text"
              type="button"
            >
              Suggest a cloud provider
            </Button>
            <Button
              onClick={onNext}
              size="lg"
              style="primary"
              type="button"
            >
              Next
            </Button>
          </div>
        </div>
      )


      if (step === STEPS.CONFIG) {
         bodyContent = ( 
          <div className='max-w-[650px]  flex flex-col justify-between gap-2'>


           {
            provider === allProviders.AWS &&  (
              <>
                  <div className="text-lg font-medium text-black-900">
            Configure your AWS account
            </div>
           
            <div className='leading-6 text-gray-900/60 max-w-[650px]'>
            AWS is a cloud computing platform that provides infrastructure services, application services, and developer tools provided by Amazon. Read our guide on{' '}
              <a
                target="_blank"
                href="https://docs.komiser.io/docs/cloud-providers/aws"
                className="text-komiser-600"
                rel="noreferrer"
              >
                adding an AWS account to Komiser.
              </a>
          </div>

          <div className="flex flex-col space-y-5 p-2 overflow-y-scroll h-[350px] ">
            <LabelledInput
              type="text"
              id="account-name"
              label="Account name"
              placeholder="my-aws-account"
            />
            <div className="flex flex-col rounded-md bg-komiser-100 p-5 ">
              <div>
                <SelectInput
                  icon="Change"
                  label={'Source'}
                  displayValues={options}
                  value={credentialType}
                  handleChange={handleSelectChange}
                  values={options.map(option => option.value)}
                />
                {[options[2].value, options[3].value].includes(
                  credentialType
                ) && (
                  <div className="mt-10 text-sm text-black-400">
                    {credentialType === options[3].value
                      ? 'Komiser will fetch the credentials from AWS'
                      : 'Komiser will load credentials from AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY.'}
                  </div>
                )}
              </div>

              {credentialType === options[0].value && (
                <div>
                  <InputFileSelect
                    type="text"
                    label="File path"
                    id="file-path-input"
                    icon={<Folder2Icon />}
                    subLabel="Enter the path or browse the file"
                    placeholder="C:\Documents\Komiser\credentials"
                    fileInputRef={fileInputRef}
                    iconClick={handleButtonClick}
                    handleFileChange={handleFileChange}
                  />

                  <LabelledInput
                    type="text"
                    id="profile"
                    label="Profile"
                    placeholder="default"
                    subLabel="Name of the section in the credentials file"
                  />
                </div>
              )}

              {credentialType === options[1].value && (
                <div>
                  <LabelledInput
                    type="text"
                    id="access-key-id"
                    label="Access key ID"
                    placeholder="AKIABCDEFGHIJKLMN12"
                    subLabel="Unique identifier used to access AWS services"
                  />

                  <LabelledInput
                    type="text"
                    id="secret-access-key"
                    label="Secret access key"
                    placeholder="AbCdEfGhIjKlMnOpQrStUvWxYz0123456789AbCd"
                    subLabel="The secret access key is generated by AWS when an access key is created"
                  />
                </div>
              )}
            </div>
          </div>
          <CredentialsButton handleNext={handleNext} onBack={onBack}/>
              </>
            )
           }

           {
            provider === allProviders.AZURE && (
              <>
        
               <div className="leading-6 text-gray-900/60">
            <div className="font-normal">
              Microsoft Azure is Microsoft&apos;s public cloud computing
              platform. It provides a broad range of cloud services, including
              compute, analytics, storage and networking. Users can pick and
              choose from these services to develop and scale new applications
              or run existing applications in the public cloud.
            </div>
            <div>
              Read our guide on{' '}
              <a
                target="_blank"
                href="https://docs.komiser.io/docs/cloud-providers/azure"
                className="text-komiser-600"
                rel="noreferrer"
              >
                adding an Azure account to Komiser.
              </a>
            </div>
          </div>

          <div className="flex flex-col space-y-4 py-5 ">
            <LabelledInput
              type="text"
              id="account-name"
              label="Account name"
              placeholder="my-azure-account"
            />

            <div className="flex flex-col space-y-[0.2] overflow-y-scroll h-[150px] rounded-md bg-komiser-100 p-5">
              <LabelledInput
                type="text"
                id="source"
                label="Source"
                value="Credentials Keys"
                disabled={true}
                icon={
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                  >
                    <path
                      d="M19.79 15.5621C17.73 17.6121 14.78 18.2421 12.19 17.4321L7.48002 22.1321C7.14002 22.4821 6.47002 22.6921 5.99002 22.6221L3.81002 22.3221C3.09002 22.2221 2.42002 21.5421 2.31002 20.8221L2.01002 18.6421C1.94002 18.1621 2.17002 17.4921 2.50002 17.1521L7.20002 12.4521C6.40002 9.85215 7.02002 6.90215 9.08002 4.85215C12.03 1.90215 16.82 1.90215 19.78 4.85215C22.74 7.80215 22.74 12.6121 19.79 15.5621Z"
                      stroke="#0C1717"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6.89001 18.1221L9.19001 20.4221"
                      stroke="#0C1717"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M14.5 11.6318C15.3284 11.6318 16 10.9603 16 10.1318C16 9.30341 15.3284 8.63184 14.5 8.63184C13.6716 8.63184 13 9.30341 13 10.1318C13 10.9603 13.6716 11.6318 14.5 11.6318Z"
                      stroke="#0C1717"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                }
              />
              <LabelledInput
                type="text"
                id="tenant-id"
                label="Tenant ID"
                subLabel="The ID of the AAD directory in which you created the application"
                placeholder="00000-00000-00000-00000"
              />
              <LabelledInput
                type="text"
                id="client-id"
                label="Client ID"
                subLabel="The secret access key is generated by AWS when an access key is created"
                placeholder="aSbG%hF7kL9p#2jN5mH8qR3tV6wZ"
              />
              <LabelledInput
                type="text"
                id="client-secret"
                label="Client secret"
                subLabel="You can find it as the authentication key string"
                placeholder="9e5b97c6-16a1-4f5d-a3a7-62c4b3b0d8c7"
              />
              <LabelledInput
                type="text"
                id="subscription-id"
                label="Subscription ID"
                subLabel="The subscription ID is a GUID that uniquely identifies your subscription to use Azure services"
                placeholder="abcdef12-3456-7890-1234-567890abcdef"
              />
            </div>
          </div>
       
          <CredentialsButton handleNext={handleNext} />
              </>
            )
           }
        </div>
        
         )
      }
  return (
    <div className="flex min-h-[40px] items-center justify-between gap-8">
      {isNotCustomView && (
        <>
          <p className="flex items-center gap-2 text-lg font-medium text-black-900">
            Your Cloud Accounts
          </p>
          <Button type="button" style="secondary" onClick={() => setShowModal(true)}>
            <PlusIcon className="-ml-2 mr-1 h-6 w-6" />
            Add Cloud Accounts
          </Button>
        </>
      )}
      <Modal
      isOpen={showModal}
      closeModal={() => setShowModal(false)}
      >
       {bodyContent}
      </Modal>
    </div>
  );
}

export default CloudAccountsHeader;
