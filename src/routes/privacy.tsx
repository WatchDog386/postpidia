import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#111111]">
      <div className="max-w-[800px] mx-auto px-4 lg:px-8 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-gray-400 text-sm mb-12">Last updated: June 22, 2026</p>

        <div className="space-y-8 text-gray-300 text-[15px] leading-relaxed">
          <p>
            Postpidia is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our subscription video editing services.
          </p>
          <p>
            We operate globally, with specific focus on clients in the United States, United Kingdom, Canada, and Australia. We are committed to complying with the regulations in these jurisdictions, including the UK GDPR, PIPEDA, the Australian Privacy Act 1988, and US state-level privacy laws (such as the CCPA).
          </p>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Information We Collect</h2>
            <p>We collect information that allows us to provide professional editing services and manage your subscription.</p>

            <h3 className="text-base font-medium text-white mt-4 mb-2">A. Personal Information</h3>
            <p>We may collect personally identifiable information, such as:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong className="text-white">Identity Data:</strong> Your name, company name, and job title.</li>
              <li><strong className="text-white">Contact Data:</strong> Email address, billing address, and phone number.</li>
              <li><strong className="text-white">Account Data:</strong> Username, password, and subscription tier preferences.</li>
            </ul>

            <h3 className="text-base font-medium text-white mt-4 mb-2">B. Payment Information</h3>
            <p>
              We do not store full credit card details on our servers. All payments are processed by third-party payment processors. We retain only the information necessary to manage your subscription, such as the payment method type and the last four digits of your card.
            </p>

            <h3 className="text-base font-medium text-white mt-4 mb-2">C. Client Content (Video Footage)</h3>
            <p>
              To fulfill our service, you will upload raw video footage, audio files, scripts, and brand assets ("Content"). We treat this Content as strictly confidential. It is used solely for the purpose of editing and delivering your final project.
            </p>

            <h3 className="text-base font-medium text-white mt-4 mb-2">D. Technical Data</h3>
            <p>We automatically collect certain information when you visit our site, including:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Time zone setting</li>
              <li>Operating system and platform</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. How We Use Your Information</h2>
            <p>We use the information we collect for the following purposes:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong className="text-white">Service Delivery:</strong> To access your raw footage, perform editing services, and deliver final video files.</li>
              <li><strong className="text-white">Subscription Management:</strong> To process monthly or annual payments and manage invoices.</li>
              <li><strong className="text-white">Communication:</strong> To send you project updates, customer support responses, and administrative emails.</li>
              <li><strong className="text-white">Improvement:</strong> To analyze how users interact with our website to improve our user experience.</li>
              <li><strong className="text-white">Marketing:</strong> With your consent, we may send newsletters or promotional offers (you may opt-out at any time).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. How We Share Your Information</h2>
            <p>We do not sell, trade, or rent your personal information or Content to others. We may share data only in the following specific circumstances:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong className="text-white">Service Providers:</strong> We use trusted third-party service providers to help us operate.</li>
              <li><strong className="text-white">Legal Compliance:</strong> We may disclose information if required to do so by law or in response to valid requests.</li>
              <li><strong className="text-white">Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. International Data Transfers</h2>
            <p>
              As we serve clients in the UK, USA, Canada, and Australia, your information may be transferred to—and maintained on—computers located outside of your state, province, or country.
            </p>
            <p className="mt-3">
              If you are located in the UK or EEA, we ensure that any transfer of your personal data to countries outside the UK/EEA is protected by appropriate safeguards, such as the Standard Contractual Clauses (SCCs) approved by the European Commission or the UK Information Commissioner's Office.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Your Rights (By Region)</h2>

            <h3 className="text-base font-medium text-white mt-4 mb-2">United Kingdom (UK GDPR)</h3>
            <p>If you are a resident of the UK, you have the right to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate data.</li>
              <li>Request erasure of your data.</li>
              <li>Object to processing of your personal data.</li>
              <li>Request the transfer of your data to another party.</li>
            </ul>

            <h3 className="text-base font-medium text-white mt-4 mb-2">United States (CCPA/CPRA)</h3>
            <p>Residents of California and other states with similar laws have the right to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Know what personal data is being collected about them.</li>
              <li>Know whether their personal data is sold or disclosed and to whom.</li>
              <li>Say no to the sale of personal data (Note: We do not sell your data).</li>
              <li>Access their personal data.</li>
              <li>Request deletion of their personal information.</li>
            </ul>

            <h3 className="text-base font-medium text-white mt-4 mb-2">Canada (PIPEDA)</h3>
            <p>Canadian residents have the right to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Access their personal information held by us.</li>
              <li>Challenge the accuracy and completeness of the information and have it amended.</li>
              <li>Withdraw consent for the use of personal information at any time.</li>
            </ul>

            <h3 className="text-base font-medium text-white mt-4 mb-2">Australia (Privacy Act 1988)</h3>
            <p>Australian residents have the right to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Access personal information we hold about you.</li>
              <li>Request corrections to your personal information.</li>
              <li>Lodge a complaint if you believe we have breached the Australian Privacy Principles (APPs).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Data Retention</h2>
            <p>
              <strong className="text-white">Account Data:</strong> We retain your account and billing information for as long as your subscription is active and as required by tax and accounting laws.
            </p>
            <p className="mt-2">
              <strong className="text-white">Raw Footage & Project Files:</strong> Unless otherwise agreed, we retain your raw footage and project files for a given period of time depending on your subscription, after the final video is delivered to facilitate revisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Security</h2>
            <p>
              We implement commercially reasonable security measures to protect your personal information and Content from unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Cookies</h2>
            <p>
              We use cookies to enhance your experience on our website. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service (such as the client login portal).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or wish to exercise your data rights, please contact us at:
            </p>
            <p className="mt-2">
              Website: <a href="https://www.postpidia.com" className="text-[#f0514e] hover:underline">www.postpidia.com</a>
            </p>
            <p>
              Email: <a href="mailto:support@postpidia.com" className="text-[#f0514e] hover:underline">support@postpidia.com</a>
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
