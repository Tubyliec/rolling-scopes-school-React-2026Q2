import { type JSX, useEffect, useState } from 'react';

import Modal from '@/features/forms/components/modal/modal.tsx';
import RhfForm from '@/features/forms/components/rhf-form/rhf-form.tsx';
import SubmissionCard from '@/features/forms/components/submission-card/submission-card.tsx';
import UncontrolledForm from '@/features/forms/components/uncontrolled-form/uncontrolled-form.tsx';
import { useFormsStore } from '@/features/forms/store/forms-store.ts';
import { useTheme } from '@core/theme/use-theme.tsx';
import { FormOpenButton } from '@shared/ui/buttons/form-open-button/form-open-button.tsx';
import Header from '@widgets/header/header.tsx';
import { Layout } from '@widgets/layout/layout.tsx';

import type { ModalType } from '@pages/forms/model/types/modal.type.ts';

import './forms-page.scss';

function FormsPage(): JSX.Element {
  const { theme } = useTheme();
  const submissions = useFormsStore((state) => state.submissions);
  const markAllAsOld = useFormsStore((state) => state.markAllAsOld);

  const [openModal, setOpenModal] = useState<ModalType>(null);

  const handleClose = (): void => {
    setOpenModal(null);
  };

  const handleSuccess = (): void => {
    setOpenModal(null);
    setTimeout(markAllAsOld, 3000);
  };

  useEffect(() => {
    if (openModal === null && submissions.some((s) => s.isNew)) {
      const timer = setTimeout(markAllAsOld, 3000);
      return (): void => clearTimeout(timer);
    }
  }, [openModal, submissions, markAllAsOld]);

  return (
    <Layout data-theme={theme}>
      <Header />
      <main className="forms-page">
        <div className="forms-page__actions">
          <h1 className="forms-page__title">Form Submissions</h1>
          <div className="forms-page__buttons">
            <FormOpenButton
              label="Uncontrolled Form"
              modalType="uncontrolled"
              onClick={setOpenModal}
            />
            <FormOpenButton
              label="React Hook Form"
              modalType="rhf"
              variant="rhf"
              onClick={setOpenModal}
            />
          </div>
        </div>

        {submissions.length === 0 ? (
          <p className="forms-page__empty">
            No submissions yet. Fill out a form to get started.
          </p>
        ) : (
          <div className="forms-page__grid">
            {submissions.map((submission) => (
              <SubmissionCard key={submission.id} submission={submission} />
            ))}
          </div>
        )}

        <Modal
          isOpen={openModal === 'uncontrolled'}
          title="Uncontrolled Form"
          onClose={handleClose}
        >
          <UncontrolledForm onSuccess={handleSuccess} />
        </Modal>

        <Modal
          isOpen={openModal === 'rhf'}
          title="React Hook Form"
          onClose={handleClose}
        >
          <RhfForm onSuccess={handleSuccess} />
        </Modal>
      </main>
    </Layout>
  );
}

export default FormsPage;
