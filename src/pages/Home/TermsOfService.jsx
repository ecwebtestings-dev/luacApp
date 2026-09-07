export default function TermsOfService() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-[800px] mx-auto px-4 md:px-8">
        <span className="text-xs font-semibold tracking-widest text-karki">LEGAL</span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-dark mt-3 mb-2 leading-tight">
          Terms of Service
        </h1>
        <p className="text-sm text-muted mb-12">Last updated: 10/07/2026</p>

        <div className="space-y-10 text-muted leading-relaxed">
          <p>
            Welcome to LUAC (Lira University Association of Computing and Information Science).
            These Terms of Service ("Terms") govern your access to and use of the LUAC platform,
            including our website, dashboard, and related services (collectively, the "Service").
            By creating an account or using the Service, you agree to these Terms.
          </p>
          <p>If you do not agree to these Terms, please do not use the Service.</p>

          <section>
            <h2 className="text-xl font-bold text-dark mb-3">1. Eligibility</h2>
            <p className="mb-3">
              The Service is intended for students, faculty, and members of the Lira University
              community, particularly those affiliated with the Faculty of Computing and
              Information Science. By registering, you confirm that:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                You are at least 16 years of age (or the minimum age required by applicable law
                in your jurisdiction), or you have the consent of a parent or guardian.
              </li>
              <li>The information you provide during registration is accurate and complete.</li>
              <li>You will keep your account information up to date.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-dark mb-3">2. Accounts</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                You are responsible for maintaining the confidentiality of your password and
                account credentials.
              </li>
              <li>You are responsible for all activity that occurs under your account.</li>
              <li>
                You must notify us immediately at{' '}
                <span className="font-medium text-dark">[support email]</span> if you suspect
                unauthorized access to your account.
              </li>
              <li>
                We reserve the right to suspend or terminate accounts that violate these Terms,
                provide false information, or are used for abusive or harmful purposes.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-dark mb-3">3. Roles and Permissions</h2>
            <p className="mb-3">The Service operates with role-based access:</p>
            <ul className="list-disc pl-5 space-y-2 mb-3">
              <li>
                <span className="font-medium text-dark">Students</span> may register, view
                events, post and view projects, comment on and like projects, and manage their
                own profile.
              </li>
              <li>
                <span className="font-medium text-dark">Admins</span> have additional privileges,
                including creating and managing events, projects, and moderating user accounts.
              </li>
            </ul>
            <p>
              Users may only update their own profile information. Attempting to access, modify,
              or impersonate another user's account without authorization is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-dark mb-3">4. User-Generated Content</h2>
            <p className="mb-3">
              The Service allows you to submit content, including but not limited to project
              descriptions, images, links, comments, and profile information ("User Content").
            </p>
            <p className="mb-3">By submitting User Content, you:</p>
            <ul className="list-disc pl-5 space-y-2 mb-3">
              <li>Confirm that you own the content or have the right to share it.</li>
              <li>
                Grant LUAC a non-exclusive, royalty-free license to display, store, and distribute
                your User Content within the Service for the purpose of operating the platform.
              </li>
              <li>
                Agree not to submit content that is unlawful, defamatory, infringing, harassing,
                hateful, sexually explicit, or otherwise objectionable.
              </li>
            </ul>
            <p>
              We reserve the right, but are not obligated, to review, remove, or restrict access
              to any User Content that violates these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-dark mb-3">5. Acceptable Use</h2>
            <p className="mb-3">You agree not to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Use the Service for any unlawful purpose or in violation of any applicable law or
                university policy.
              </li>
              <li>Upload malware, viruses, or any code designed to disrupt or damage the Service.</li>
              <li>
                Attempt to gain unauthorized access to other accounts, systems, or networks
                connected to the Service.
              </li>
              <li>Scrape, harvest, or collect data from the Service without authorization.</li>
              <li>
                Impersonate any person or entity, or misrepresent your affiliation with any
                person or entity.
              </li>
              <li>
                Use automated means (bots, scripts) to interact with the Service without our
                prior written consent.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-dark mb-3">6. Events and Projects</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Events are created and managed by Admins and are provided for informational
                purposes. LUAC is not responsible for the outcome, safety, or conduct of any
                in-person or virtual event listed on the platform.
              </li>
              <li>
                Projects submitted by users remain the intellectual property of their respective
                creators unless otherwise agreed. Submitting a project to the platform does not
                transfer ownership to LUAC.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-dark mb-3">7. Termination</h2>
            <p className="mb-3">
              We may suspend or terminate your access to the Service at any time, with or without
              notice, for conduct that we believe violates these Terms or is harmful to other
              users, LUAC, or third parties.
            </p>
            <p>
              You may stop using the Service and delete your account at any time through your
              account settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-dark mb-3">8. Disclaimers</h2>
            <p>
              The Service is provided "as is" and "as available" without warranties of any kind,
              either express or implied. LUAC does not warrant that the Service will be
              uninterrupted, secure, or error-free.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-dark mb-3">9. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by applicable law, LUAC and its organizers,
              administrators, and contributors shall not be liable for any indirect, incidental,
              special, or consequential damages arising out of or related to your use of the
              Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-dark mb-3">10. Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. If we make material changes, we will
              notify users through the platform or by other reasonable means. Continued use of
              the Service after changes take effect constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-dark mb-3">11. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the
              Republic of Uganda, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-dark mb-3">12. Contact Us</h2>
            <p className="mb-3">
              If you have questions about these Terms, please contact us at:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Email: brainKalule@gmail.com</li>
              <li>Location: Lira, Uganda</li>
            </ul>
          </section>

         
        </div>
      </div>
    </section>
  )
}