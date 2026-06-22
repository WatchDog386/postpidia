import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="min-h-screen bg-[#111111]">
      <div className="max-w-[800px] mx-auto px-4 lg:px-8 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-white mb-2">Terms and Conditions</h1>
        <p className="text-gray-400 text-sm mb-12">Last updated: June 22, 2026</p>

        <div className="space-y-8 text-gray-300 text-[15px] leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Scope of Work and Agreement</h2>
            <p>
              The specific editing services to be provided will be outlined in a separate Project Proposal or Statement of Work (SOW), which, upon acceptance, forms part of this agreement.
            </p>
            <p className="mt-3">
              Any services not explicitly mentioned in the SOW are excluded.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Client Responsibilities</h2>
            <p>
              The client is responsible for providing all necessary footage, audio, graphics, and other assets in the agreed-upon format and by the agreed-upon deadline. Delays in providing assets may impact the project timeline.
            </p>
            <p className="mt-3">
              The client warrants they have the necessary rights and permissions for all provided materials.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Revisions</h2>
            <p>
              The SOW will specify a set number of revision rounds (e.g., two major rounds and one minor round) included in the initial price.
            </p>
            <p className="mt-3">
              Any revisions requested beyond the specified limit or any significant changes to the scope of work after project commencement will be considered "Change Orders" and may incur additional fees, subject to a revised SOW.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Payment and Fees</h2>
            <h3 className="text-base font-medium text-white mt-4 mb-2">Pricing</h3>
            <p>
              All project fees and costs (e.g., stock footage licenses, voiceovers) will be detailed in the SOW.
            </p>
            <p className="mt-2">
              Prices are quoted exclusive of any applicable taxes, which will be added to the final invoice.
            </p>

            <h3 className="text-base font-medium text-white mt-4 mb-2">Payment Schedule</h3>
            <p>
              A non-refundable 50% deposit on big projects is required upfront to commence work.
            </p>
            <p className="mt-2">
              The remaining balance is due upon final client approval of the video and before the final, high-resolution files are delivered.
            </p>
            <p className="mt-2">
              Please note that this does not apply on subscription packages.
            </p>

            <h3 className="text-base font-medium text-white mt-4 mb-2">Cancellation Policy</h3>
            <p>
              If the client cancels the project after the deposit has been paid, the deposit will be retained by Postpidia to cover time and costs incurred. If the project is substantially complete, the client may be liable for a percentage of the remaining balance corresponding to the work completed up to the date of cancellation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Delivery and Ownership</h2>
            <h3 className="text-base font-medium text-white mt-4 mb-2">Delivery</h3>
            <p>
              The final video will be delivered in the format(s) specified in the SOW (e.g., MP4, MOV).
            </p>

            <h3 className="text-base font-medium text-white mt-4 mb-2">Client Ownership (License)</h3>
            <p>
              Upon full and final payment of all invoices, the client is granted a full, perpetual, non-exclusive license to use the final delivered video for the purposes outlined in the SOW.
            </p>

            <h3 className="text-base font-medium text-white mt-4 mb-2">Source Files</h3>
            <p>
              Postpidia retains ownership of all project source files. If the client requires the source files, this must be explicitly requested and agreed upon in the SOW and will incur an additional fee.
            </p>

            <h3 className="text-base font-medium text-white mt-4 mb-2">Company Portfolio Rights</h3>
            <p>
              Postpidia reserves the right to use the completed video for promotional purposes, including displaying it on the company's website, social media, and in portfolio materials, unless a prior written Non-Disclosure Agreement (NDA) is in place.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Standard of Work</h2>
            <p>
              Postpidia warrants that the editing services will be performed in a professional manner and in accordance with industry standards.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Limitation and Indemnity</h2>
            <h3 className="text-base font-medium text-white mt-4 mb-2">Limitation of Liability</h3>
            <p>
              Postpidia's liability for any and all claims arising out of this agreement shall not exceed the total fees paid by the client for the specific project in question. Postpidia is not liable for indirect, incidental, or consequential damages.
            </p>

            <h3 className="text-base font-medium text-white mt-4 mb-2">Indemnification</h3>
            <p>
              The client agrees to defend, indemnify, and hold harmless Postpidia from any and all claims, damages, liabilities, costs, and expenses (including reasonable attorney's fees) arising from the client's use of the delivered video, or any breach of the warranties regarding the assets they provided (e.g., copyright infringement).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Governing Law</h2>
            <p>
              This agreement shall be governed by and construed in accordance with applicable laws.
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-[#222]">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
