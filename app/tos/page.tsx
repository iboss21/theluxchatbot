import type { Metadata } from "next"
import { PageLayout } from "@/components/layouts/page-layout"

export const metadata: Metadata = {
  title: "Terms of Service | TheLUX Chat",
  description: "TheLUX Chat's Terms of Service - The rules and guidelines for using our platform and services.",
  openGraph: {
    title: "Terms of Service | TheLUX Chat",
    description: "TheLUX Chat's Terms of Service - The rules and guidelines for using our platform and services.",
    url: "https://theluxchat.com/tos",
    type: "website",
  },
}

export default function TermsOfServicePage() {
  return (
    <PageLayout title="Terms of Service" description="Last updated: March 15, 2025" showCTA={false}>
      <div className="prose prose-gray max-w-none dark:prose-invert">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using TheLUX Chat's website, platform, or services (collectively, the "Services"), you agree
          to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use
          the Services.
        </p>
        <p>
          These Terms constitute a legally binding agreement between you and TheLUX Chat, Inc. ("TheLUX Chat," "we,"
          "our," or "us"). You represent that you have the authority to enter into these Terms personally or on behalf
          of the entity you represent.
        </p>

        <h2>2. Changes to Terms</h2>
        <p>
          We may modify these Terms at any time. We will provide notice of any material changes by posting the updated
          Terms on our website and updating the "Last updated" date. Your continued use of the Services after any such
          changes constitutes your acceptance of the new Terms.
        </p>

        <h2>3. Account Registration</h2>
        <p>
          To access certain features of the Services, you may need to register for an account. You agree to provide
          accurate, current, and complete information during the registration process and to update such information to
          keep it accurate, current, and complete.
        </p>
        <p>
          You are responsible for safeguarding your account credentials and for all activities that occur under your
          account. You agree to notify us immediately of any unauthorized use of your account or any other breach of
          security.
        </p>

        <h2>4. Subscription and Payments</h2>
        <p>
          Some of our Services require payment of fees. All fees are stated in U.S. dollars unless otherwise specified.
        </p>
        <p>
          You agree to pay all fees in accordance with the billing terms in effect at the time a fee is due. If you
          provide credit card information, you authorize us to charge your credit card for all fees incurred.
        </p>
        <p>
          Subscription fees are billed in advance on a monthly or annual basis, depending on your subscription plan.
          Your subscription will automatically renew at the end of each billing period unless you cancel it prior to the
          renewal date.
        </p>

        <h2>5. Acceptable Use</h2>
        <p>You agree not to use the Services to:</p>
        <ul>
          <li>Violate any applicable law, regulation, or third-party rights</li>
          <li>
            Upload, transmit, or distribute any content that is illegal, harmful, threatening, abusive, harassing,
            defamatory, obscene, or otherwise objectionable
          </li>
          <li>
            Impersonate any person or entity or falsely state or misrepresent your affiliation with a person or entity
          </li>
          <li>Interfere with or disrupt the Services or servers or networks connected to the Services</li>
          <li>
            Attempt to gain unauthorized access to any portion of the Services or any other systems or networks
            connected to the Services
          </li>
          <li>Use the Services for any purpose that is fraudulent or unlawful</li>
          <li>Collect or store personal data about other users without their consent</li>
          <li>Use the Services to generate, distribute, or facilitate unsolicited commercial email or "spam"</li>
        </ul>

        <h2>6. Intellectual Property Rights</h2>
        <p>
          The Services and all content, features, and functionality thereof, including but not limited to all
          information, software, text, displays, images, video, and audio, and the design, selection, and arrangement
          thereof, are owned by TheLUX Chat, its licensors, or other providers of such material and are protected by
          copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
        </p>
        <p>
          These Terms do not grant you any right, title, or interest in the Services or any content, features, or
          functionality thereof. You may not reproduce, distribute, modify, create derivative works of, publicly
          display, publicly perform, republish, download, store, or transmit any of the material on our Services, except
          as follows:
        </p>
        <ul>
          <li>
            Your computer may temporarily store copies of such materials in RAM incidental to your accessing and viewing
            those materials
          </li>
          <li>
            You may store files that are automatically cached by your web browser for display enhancement purposes
          </li>
          <li>
            You may print or download one copy of a reasonable number of pages of the website for your own personal,
            non-commercial use and not for further reproduction, publication, or distribution
          </li>
        </ul>

        <h2>7. User Content</h2>
        <p>
          You retain all rights in, and are solely responsible for, the content you post, upload, or otherwise make
          available through the Services ("User Content").
        </p>
        <p>
          By posting User Content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce,
          modify, adapt, publish, translate, distribute, and display such User Content in connection with providing and
          promoting the Services.
        </p>
        <p>You represent and warrant that:</p>
        <ul>
          <li>You own or have the necessary rights to use and authorize us to use your User Content</li>
          <li>
            Your User Content does not violate the privacy rights, publicity rights, copyright rights, or other rights
            of any person
          </li>
        </ul>

        <h2>8. Disclaimer of Warranties</h2>
        <p>
          THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
          IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
          PURPOSE, AND NON-INFRINGEMENT.
        </p>
        <p>
          WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR
          THAT THE SERVICES OR THE SERVERS THAT MAKE THEM AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
        </p>

        <h2>9. Limitation of Liability</h2>
        <p>
          IN NO EVENT WILL THELUX CHAT, ITS AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS,
          OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN
          CONNECTION WITH YOUR USE, OR INABILITY TO USE, THE SERVICES, INCLUDING ANY DIRECT, INDIRECT, SPECIAL,
          INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.
        </p>

        <h2>10. Indemnification</h2>
        <p>
          You agree to defend, indemnify, and hold harmless TheLUX Chat, its affiliates, licensors, and service
          providers, and its and their respective officers, directors, employees, contractors, agents, licensors,
          suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards,
          losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your
          violation of these Terms or your use of the Services.
        </p>

        <h2>11. Termination</h2>
        <p>
          We may terminate or suspend your access to all or part of the Services, without notice, for any conduct that
          we, in our sole discretion, believe is in violation of these Terms or is harmful to other users of the
          Services, us, or third parties, or for any other reason.
        </p>
        <p>
          Upon termination, your right to use the Services will immediately cease. All provisions of these Terms which
          by their nature should survive termination shall survive termination, including, without limitation, ownership
          provisions, warranty disclaimers, indemnity, and limitations of liability.
        </p>

        <h2>12. Governing Law and Jurisdiction</h2>
        <p>
          These Terms and any dispute or claim arising out of or in connection with them or their subject matter or
          formation shall be governed by and construed in accordance with the laws of the State of California, without
          giving effect to any choice or conflict of law provision or rule.
        </p>
        <p>
          Any legal suit, action, or proceeding arising out of, or related to, these Terms or the Services shall be
          instituted exclusively in the federal courts of the United States or the courts of the State of California, in
          each case located in the City of San Francisco, although we retain the right to bring any suit, action, or
          proceeding against you for breach of these Terms in your country of residence or any other relevant country.
        </p>

        <h2>13. Miscellaneous</h2>
        <p>
          These Terms constitute the entire agreement between you and TheLUX Chat regarding the Services and supersede
          all prior and contemporaneous written or oral agreements between you and TheLUX Chat.
        </p>
        <p>
          Our failure to exercise or enforce any right or provision of these Terms shall not operate as a waiver of such
          right or provision.
        </p>
        <p>
          If any provision of these Terms is held to be invalid or unenforceable, such provision shall be struck and the
          remaining provisions shall be enforced.
        </p>
        <p>
          You may not assign your rights under these Terms without our prior written consent, and any attempted
          assignment will be null and void. We may assign our rights under these Terms without your consent.
        </p>

        <h2>14. Contact Information</h2>
        <p>If you have any questions about these Terms, please contact us at:</p>
        <p>
          Email: legal@theluxchat.com
          <br />
          Address: 123 AI Boulevard, Suite 456, San Francisco, CA 94105, USA
          <br />
          Phone: +1 (555) 123-4567
        </p>
      </div>
    </PageLayout>
  )
}

