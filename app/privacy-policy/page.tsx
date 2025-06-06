import type { Metadata } from "next"
import { PageLayout } from "@/components/layouts/page-layout"

export const metadata: Metadata = {
  title: "Privacy Policy | TheLUX Chat",
  description: "TheLUX Chat's Privacy Policy - Learn how we collect, use, and protect your personal information.",
  openGraph: {
    title: "Privacy Policy | TheLUX Chat",
    description: "TheLUX Chat's Privacy Policy - Learn how we collect, use, and protect your personal information.",
    url: "https://theluxchat.com/privacy-policy",
    type: "website",
  },
}

export default function PrivacyPolicyPage() {
  return (
    <PageLayout title="Privacy Policy" description="Last updated: March 15, 2025" showCTA={false}>
      <div className="prose prose-gray max-w-none dark:prose-invert">
        <h2>Introduction</h2>
        <p>
          TheLUX Chat ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how
          we collect, use, disclose, and safeguard your information when you use our website and services.
        </p>
        <p>
          Please read this Privacy Policy carefully. By accessing or using our services, you acknowledge that you have
          read, understood, and agree to be bound by all the terms of this Privacy Policy.
        </p>

        <h2>Information We Collect</h2>
        <h3>Personal Information</h3>
        <p>We may collect personal information that you voluntarily provide to us when you:</p>
        <ul>
          <li>Register for an account</li>
          <li>Sign up for our newsletter</li>
          <li>Contact our support team</li>
          <li>Participate in surveys or promotions</li>
          <li>Use our services</li>
        </ul>
        <p>This information may include:</p>
        <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Company name</li>
          <li>Billing information</li>
          <li>IP address</li>
          <li>Device information</li>
        </ul>

        <h3>Usage Information</h3>
        <p>We automatically collect certain information when you use our services, including:</p>
        <ul>
          <li>Log data (IP address, browser type, pages visited, time spent)</li>
          <li>Device information (hardware model, operating system)</li>
          <li>Location information</li>
          <li>Cookies and similar technologies</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>We may use the information we collect for various purposes, including to:</p>
        <ul>
          <li>Provide, maintain, and improve our services</li>
          <li>Process transactions and send related information</li>
          <li>Send administrative information, such as updates and security alerts</li>
          <li>Respond to your comments, questions, and requests</li>
          <li>Personalize your experience and deliver content relevant to your interests</li>
          <li>Monitor and analyze trends, usage, and activities</li>
          <li>Detect, prevent, and address technical issues</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2>Disclosure of Your Information</h2>
        <p>We may share your information in the following situations:</p>
        <ul>
          <li>
            <strong>With Service Providers:</strong> We may share your information with third-party vendors, service
            providers, and other business partners who perform services on our behalf.
          </li>
          <li>
            <strong>For Business Transfers:</strong> We may share or transfer your information in connection with, or
            during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of
            our business.
          </li>
          <li>
            <strong>With Your Consent:</strong> We may disclose your information for any other purpose with your
            consent.
          </li>
          <li>
            <strong>Legal Requirements:</strong> We may disclose your information where required to do so by law or in
            response to valid requests by public authorities.
          </li>
        </ul>

        <h2>Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect the security of your personal
          information. However, please be aware that no method of transmission over the Internet or method of electronic
          storage is 100% secure.
        </p>

        <h2>Your Privacy Rights</h2>
        <p>Depending on your location, you may have certain rights regarding your personal information, such as:</p>
        <ul>
          <li>The right to access your personal information</li>
          <li>The right to rectify inaccurate personal information</li>
          <li>The right to request deletion of your personal information</li>
          <li>The right to restrict processing of your personal information</li>
          <li>The right to data portability</li>
          <li>The right to object to processing of your personal information</li>
        </ul>
        <p>
          To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
        </p>

        <h2>Children's Privacy</h2>
        <p>
          Our services are not intended for individuals under the age of 16. We do not knowingly collect personal
          information from children under 16. If we learn we have collected or received personal information from a
          child under 16, we will delete that information.
        </p>

        <h2>Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
          Privacy Policy on this page and updating the "Last updated" date at the top of this page.
        </p>

        <h2>Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at:</p>
        <p>
          Email: privacy@theluxchat.com
          <br />
          Address: 123 AI Boulevard, Suite 456, San Francisco, CA 94105, USA
          <br />
          Phone: +1 (555) 123-4567
        </p>
      </div>
    </PageLayout>
  )
}

