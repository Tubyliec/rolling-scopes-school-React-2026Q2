import { type JSX, useEffect, useRef } from 'react';

import type { SubmissionCardProps } from '@/features/forms/model/types/submission-card.type.ts';

import './submission-card.scss';

function SubmissionCard({ submission }: SubmissionCardProps): JSX.Element {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      submission.isNew &&
      cardRef.current &&
      typeof cardRef.current.scrollIntoView === 'function'
    ) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [submission.isNew]);

  const cardClassName = `submission-card${submission.isNew ? ' submission-card--new' : ''}`;

  return (
    <div className={cardClassName} ref={cardRef}>
      {submission.imageBase64 && (
        <div className="submission-card__image-wrap">
          <img
            className="submission-card__image"
            src={submission.imageBase64}
            alt={`${submission.name}'s profile`}
          />
        </div>
      )}
      <div className="submission-card__content">
        <h3 className="submission-card__name">{submission.name}</h3>
        <dl className="submission-card__details">
          <div className="submission-card__row">
            <dt className="submission-card__term">Age</dt>
            <dd className="submission-card__value">{submission.age}</dd>
          </div>
          <div className="submission-card__row">
            <dt className="submission-card__term">Email</dt>
            <dd className="submission-card__value">{submission.email}</dd>
          </div>
          <div className="submission-card__row">
            <dt className="submission-card__term">Gender</dt>
            <dd className="submission-card__value">{submission.gender}</dd>
          </div>
          <div className="submission-card__row">
            <dt className="submission-card__term">Country</dt>
            <dd className="submission-card__value">{submission.country}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default SubmissionCard;
