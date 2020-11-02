import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';

import { Company } from '@csh/ui/api/types/company';
import { CreateInterview } from '@csh/ui/api/types/interview';
import { JobType } from '@csh/ui/api/types/position';
import { PositionSelector } from '@csh/ui/components/PositionSelector';
import React from 'react';
import { useCreateInterview } from '@csh/ui/api/interview';
import { useReactOidc } from '@axa-fr/react-oidc-context';

interface CreateInterviewModalProps {
  isOpen: boolean;
  toggle: () => void;
  company: Company;
}

export const CreateInterviewModal: React.FunctionComponent<CreateInterviewModalProps> = ({
  isOpen,
  toggle,
  company
}) => {
  const [newInterview, setNewInterview] = React.useState<CreateInterview>();
  const [onSite, setOnSite] = React.useState<boolean>();
  const [codingChallenge, setCodingChallenge] = React.useState<boolean>();
  const [body, setBody] = React.useState<string>();

  const [positionId, setPositionId] = React.useState<number>();
  const [positionTitle, setPositionTitle] = React.useState<string>(
    'Software Engineer Intern'
  );
  const [positionType, setPositionType] = React.useState<JobType>(
    JobType.CO_OP
  );

  const { oidcUser } = useReactOidc();
  useCreateInterview(newInterview);

  if (!oidcUser) return null;

  const {
    profile: { preferred_username }
  } = oidcUser;

  const createNewInterview = () => {
    if (preferred_username !== undefined) {
      const offerPosition = positionId
        ? { connect: { id: positionId } }
        : {
            create: {
              company: { connect: { id: company.id } },
              title: positionTitle,
              job_type: positionType
            }
          };
      setNewInterview({
        member: preferred_username,
        company: { connect: { id: company.id } },
        onsite: onSite,
        codingchallenge: codingChallenge,
        position: offerPosition,
        body: body
      });
      toggle();
    }
  };

  const onPositionSelect = ({ value }: { value: number }) => {
    setPositionId(value);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create Interview</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="interviewPosition">Interview Position</Label>
            <PositionSelector
              name={'interviewPosition'}
              company={company}
              onChange={onPositionSelect}
              newPositionTitle={positionTitle}
              setNewPositionTitle={setPositionTitle}
              newPositionType={positionType}
              setNewPositionType={setPositionType}
            />
          </FormGroup>
          <FormGroup style={{ display: 'flex', justifyContent: 'center' }}>
            <FormGroup check inline>
              <Label check>
                <Input
                  type="checkbox"
                  checked={!!onSite}
                  onChange={() => setOnSite(!onSite)}
                />{' '}
                OnSite
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input
                  type="checkbox"
                  checked={!!codingChallenge}
                  onChange={() => setCodingChallenge(!codingChallenge)}
                />{' '}
                Coding Challenge
              </Label>
            </FormGroup>
          </FormGroup>
          <FormGroup>
            <Label for="interviewBody">Details</Label>
            <Input
              type="textarea"
              name="interviewBody"
              id="interviewBody"
              value={body}
              onChange={event => setBody(event.target.value)}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={createNewInterview}>
          Create
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};
