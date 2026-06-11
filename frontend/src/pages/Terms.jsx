import { Shield } from "lucide-react";

const Terms = () => {
  return (
    <div
      className="min-h-screen px-4 py-24"
      style={{ backgroundColor: "#0F172A", fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="max-w-3xl mx-auto flex flex-col gap-8">

        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-[#F1F5F9] font-bold text-3xl flex items-center gap-3">
            <Shield className="w-8 h-8 text-[#FF6B35]" />
            Terms & Conditions
          </h1>
          <p className="text-[#64748B] text-sm">Last updated: June 2026</p>
        </div>

        {/* Sections */}
        {[
          {
            title: "1. Acceptance of Terms",
            content: "By accessing and using NightBite, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our service."
          },
          {
            title: "2. Use of Service",
            content: "NightBite provides an online food ordering platform. You agree to use the service only for lawful purposes and in a manner that does not infringe the rights of others."
          },
          {
            title: "3. Account Responsibility",
            content: "You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account."
          },
          {
            title: "4. Orders & Payments",
            content: "All orders placed through NightBite are subject to availability. Payments are processed securely. We reserve the right to cancel orders in case of pricing errors or unavailability."
          },
          {
            title: "5. Delivery Policy",
            content: "Delivery times are estimates and may vary based on location and demand. NightBite is not liable for delays caused by factors beyond our control."
          },
          {
            title: "6. Cancellation & Refunds",
            content: "Orders can be cancelled before they are confirmed by the restaurant. Refunds for eligible cancellations will be processed within 5-7 business days."
          },
          {
            title: "7. Privacy Policy",
            content: "We collect and use your personal data as described in our Privacy Policy. By using NightBite, you consent to our data practices."
          },
          {
            title: "8. Limitation of Liability",
            content: "NightBite shall not be liable for any indirect, incidental, or consequential damages arising from the use or inability to use our service."
          },
          {
            title: "9. Changes to Terms",
            content: "We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms."
          },
          {
            title: "10. Contact",
            content: "For any questions about these Terms & Conditions, please contact us at nightbite@gmail.com or visit our Contact page."
          },
        ].map((section) => (
          <div key={section.title} className="flex flex-col gap-2">
            <h2 className="text-[#F1F5F9] font-bold text-base">{section.title}</h2>
            <p className="text-[#94A3B8] text-sm leading-relaxed">{section.content}</p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Terms;