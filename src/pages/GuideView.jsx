import { useParams, Link } from 'react-router-dom';
import { getGuideById } from '../utils/contentLoader';
import LevelBadge from '../components/LevelBadge';
import StepList from '../components/StepList';
import WarningBox from '../components/WarningBox';

export default function GuideView() {
  const { osId = 'windows', guideId } = useParams();
  const guide = getGuideById(guideId, osId);

  if (!guide) {
    return (
      <div className="container guide-not-found">
        <div className="guide-not-found-content">
          <h1>😕 Guide Not Found</h1>
          <p>We couldn't find the guide you're looking for. It may have been moved or removed.</p>
          <Link to={`/guides/${osId}`} className="btn btn-primary">← Back to Guides</Link>
        </div>
      </div>
    );
  }

  const hasAdminSteps = guide.steps.some(s => s.adminRequired);
  const hasBackupSteps = guide.steps.some(s => s.backupAdvised);

  return (
    <article className="guide-view container" aria-labelledby="guide-title">
      {/* Breadcrumb */}
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li><Link to="/">Home</Link></li>
          <li><Link to={`/guides/${osId}`}>Guides</Link></li>
          <li><Link to={`/guides/${osId}?category=${guide.category}`}>{guide.categoryName}</Link></li>
          <li aria-current="page">{guide.title}</li>
        </ol>
      </nav>

      {/* Header */}
      <header className="guide-header">
        <div className="guide-header-meta">
          <span className="guide-category-badge">{guide.categoryIcon} {guide.categoryName}</span>
          <LevelBadge level={guide.level} />
        </div>
        <h1 id="guide-title">{guide.title}</h1>
        <p className="guide-description">{guide.description}</p>
      </header>

      {/* Symptom Box */}
      <section className="guide-symptom-box" aria-labelledby="symptom-heading">
        <h2 id="symptom-heading">🩺 Symptom</h2>
        <p className="guide-symptom-text">{guide.symptom}</p>
      </section>

      {/* Important Warnings */}
      {hasAdminSteps && (
        <WarningBox type="info" title="Administrator Access Required">
          Some steps in this guide require administrator (admin) privileges. Right-click and select "Run as administrator" when prompted, or make sure you're logged in with an admin account.
        </WarningBox>
      )}
      {hasBackupSteps && (
        <WarningBox type="warning" title="Backup Your Data First">
          Some steps in this guide make changes that could affect your data. We strongly recommend creating a backup or System Restore point before proceeding. To create a restore point: search for "Create a restore point" in the Start menu.
        </WarningBox>
      )}

      {/* Possible Causes */}
      <section className="guide-causes" aria-labelledby="causes-heading">
        <h2 id="causes-heading">🔎 Possible Causes</h2>
        <ul className="causes-list">
          {guide.causes.map((cause, i) => (
            <li key={i}>{cause}</li>
          ))}
        </ul>
      </section>

      {/* Fix Steps */}
      <section className="guide-steps-section" aria-labelledby="steps-heading">
        <h2 id="steps-heading">🔧 Step-by-Step Fix</h2>
        <p className="steps-intro">Follow these steps in order, from safest to most advanced. Stop once your problem is fixed.</p>
        <StepList steps={guide.steps} />
      </section>

      {/* Why This Works */}
      <section className="guide-explanation" aria-labelledby="why-heading">
        <h2 id="why-heading">💡 Why This Works</h2>
        <div className="explanation-box">
          <p>{guide.whyItWorks}</p>
        </div>
      </section>

      {/* Navigation */}
      <footer className="guide-footer">
        <Link to={`/guides/${osId}`} className="btn btn-outline">← Back to All Guides</Link>
        <Link to="/symptoms" className="btn btn-outline">🔍 Search Another Problem</Link>
      </footer>
    </article>
  );
}
