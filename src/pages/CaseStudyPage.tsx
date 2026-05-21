import { Link, useParams } from "react-router-dom";
import CaseStudyView from "../components/CaseStudyView";
import { getCaseStudyById } from "../data/caseStudies";

const CaseStudyPage = () => {
  const { id } = useParams<{ id: string }>();
  const study = id ? getCaseStudyById(id) : undefined;

  if (!study) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#282C33] px-4 font-FiraCode text-white">
        <p className="text-[#ABB2BF]">Case study not found.</p>
        <Link to="/" className="mt-4 text-[#C778DD] hover:underline">
          ← home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#282C33] font-FiraCode">
      <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
        <CaseStudyView study={study} />
      </div>
    </div>
  );
};

export default CaseStudyPage;
