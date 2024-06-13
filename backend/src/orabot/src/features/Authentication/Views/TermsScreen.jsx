import React, { useState } from "react";
import "../Styles/Terms.css";
import { Header } from "../../GlobalComponents/Header";
import { useNavigate } from "react-router-dom";
import { Button, MyButton } from "../../GlobalComponents/Button";

export const TermsScreen = () => {
  
  const navigate = useNavigate();

  return (
    <>
      <Header back={false} />
      <div className="base-container">
        <div className="terms-container">
          <div className="contract">
            <h1>Terms and Conditions</h1>
            <h3>Last updated: May 22, 2024</h3>
            <h4>Please read these terms and conditions carefully before using Our Service.</h4>

            <div className="section">
              <h3>Interpretation and Definitions</h3><br/>
              <h3>Interpretation</h3><br/>
              <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p><br/>
              <h3>Definitions</h3><br/>
              <p>For the purposes of these Terms and Conditions:</p>
              <ul>
                <li>Application means the software program provided by the Company downloaded by You on any electronic device, named OraBot</li>
                <li>Application Store means the digital distribution service operated and developed by Apple Inc. (Apple App Store) or Google Inc. (Google Play Store) in which the Application has been downloaded.</li>
                <li>Affiliate means an entity that controls, is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</li>
                <li>Country refers to: Mexico</li>
                <li>Company (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Talent-Pentagon, Av. Gral Ramón Corona No 2514, Colonia Nuevo México, 45201 Zapopan, Jal..</li>
                <li>Device means any device that can access the Service such as a computer, a cellphone or a digital tablet.</li>
                <li>Service refers to the Application.</li>
                <li>Terms and Conditions (also referred as "Terms") mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service. This Terms and Conditions agreement has been created with the help of the Terms and Conditions Generator.</li>
                <li>Third-party Social Media Service means any services or content (including data, information, products or services) provided by a third-party that may be displayed, included or made available by the Service.</li>
                <li>You means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</li>
              </ul>
            </div>

            <div className="section">
              <h3>Acknowledgment</h3><br/>
              <p>These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.</p><br/>
              <p>Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.</p><br/>
              <p>By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.</p><br/>
              <p>You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.</p><br/>
              <p>Your access to and use of the Service is also conditioned on Your acceptance of and compliance with the Privacy Policy of the Company. Our Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your personal information when You use the Application or the Website and tells You about Your privacy rights and how the law protects You. Please read Our Privacy Policy carefully before using Our Service.</p>
            </div>
                        
            <div class="section">
                <h3>User-Generated Content (UGC)</h3><br/>
                <h3>1. Introduction</h3><br/>
                <p>Our app allows users to create and submit their own content ("User-Generated Content" or "UGC"). This section outlines the terms that apply to any UGC you contribute.</p><br/>
                <h3>2. Content Ownership</h3><br/>
                <p>You retain ownership of any content you submit. However, by submitting UGC, you grant us a worldwide, non-exclusive, royalty-free, transferable, sub-licensable license to use, reproduce, distribute, prepare derivative works of, display, and perform your UGC in connection with the service provided by the app and across various media.</p><br/>
                <h3>3. Rights Granted by Users</h3><br/>
                <p>By submitting UGC, you affirm that you own the content or have the necessary rights to grant us the above license. You also agree that this license includes the right for us to make your UGC available to other users of the app.</p><br/>
                <h3>4. Content Standards</h3><br/>
                <p>You agree not to submit UGC that:</p><br/>
                <p>Is illegal, offensive, defamatory, or infringing on others' rights.</p><br/>
                <p>Contains personal information of others without their consent.</p><br/>
                <p>Contains malware, viruses, or other harmful code.</p><br/>
                <p>Violates any laws or regulations.</p><br/>
                <p>We reserve the right to remove or modify any UGC that we believe violates these standards.</p><br/>
                <h3>5. Moderation and Enforcement</h3><br/>
                <p>We do not pre-screen UGC, but we may review, edit, or delete UGC at our sole discretion. We also may suspend or terminate accounts that repeatedly violate these terms.</p><br/>
                <h3>6. Liability and Indemnity</h3><br/>
                <p>We are not responsible for UGC posted by users and do not endorse any opinion contained in UGC. You agree to indemnify and hold us harmless from any claim or demand arising out of your UGC or your violation of these terms.</p><br/>
                <h3>7. Reporting Infringements</h3><br/>
                <p>If you believe that any UGC infringes your intellectual property rights or otherwise violates these terms, please contact us at itdepartmentoraclebot@hotmail.com. We will investigate and take appropriate action, including removing the infringing content if necessary.</p><br/>
            </div>

            <div class="section">
                <h3>Links to Other Websites</h3><br/>
                <p>Our Service may contain links to third-party web sites or services that are not owned or controlled by the Company.</p><br/>
                <p>The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such web sites or services.</p><br/>
                <p>We strongly advise You to read the terms and conditions and privacy policies of any third-party web sites or services that You visit.</p><br/>
            </div>

            <div class="section">
                <h3>Termination</h3><br/>
                <p>We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.</p><br/>
                <p>Upon termination, Your right to use the Service will cease immediately.</p><br/>
            </div>

            <div class="section">
                <h3>Limitation of Liability</h3><br/>
                <p>Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of this Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD if You haven't purchased anything through the Service.</p><br/>
                <p>To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service, third-party software and/or third-party hardware used with the Service, or otherwise in connection with any provision of this Terms), even if the Company or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.</p><br/>
                <p>Some states do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, which means that some of the above limitations may not apply. In these states, each party's liability will be limited to the greatest extent permitted by law.</p><br/>
            </div>

            <div class="section">
                <h3>"AS IS" and "AS AVAILABLE" Disclaimer</h3><br/>
                <p>The Service is provided to You "AS IS" and "AS AVAILABLE" and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service, including all implied warranties of merchantability, fitness for a particular purpose, title and non-infringement, and warranties that may arise out of course of dealing, course of performance, usage or trade practice. Without limitation to the foregoing, the Company provides no warranty or undertaking, and makes no representation of any kind that the Service will meet Your requirements, achieve any intended results, be compatible or work with any other software, applications, systems or services, operate without interruption, meet any performance or reliability standards or be error free or that any errors or defects can or will be corrected.</p><br/>
                <p>Without limiting the foregoing, neither the Company nor any of the company's provider makes any representation or warranty of any kind, express or implied: (i) as to the operation or availability of the Service, or the information, content, and materials or products included thereon; (ii) that the Service will be uninterrupted or error-free; (iii) as to the accuracy, reliability, or currency of any information or content provided through the Service; or (iv) that the Service, its servers, the content, or e-mails sent from or on behalf of the Company are free of viruses, scripts, trojan horses, worms, malware, timebombs or other harmful components.</p><br/>
                <p>Some jurisdictions do not allow the exclusion of certain types of warranties or limitations on applicable statutory rights of a consumer, so some or all of the above exclusions and limitations may not apply to You. But in such a case the exclusions and limitations set forth in this section shall be applied to the greatest extent enforceable under applicable law.</p><br/>
            </div>

            <div class="section">
                <h3>Governing Law</h3><br/>
                <p>The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.</p><br/>
            </div>

            <div class="section">
                <h3>Disputes Resolution</h3><br/>
                <p>If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.</p><br/>
            </div>

            <div class="section">
                <h3>For European Union (EU) Users</h3><br/>
                <p>If You are a European Union consumer, you will benefit from any mandatory provisions of the law of the country in which You are resident.</p><br/>
            </div>

            <div class="section">
                <h3>United States Legal Compliance</h3><br/>
                <p>You represent and warrant that (i) You are not located in a country that is subject to the United States government embargo, or that has been designated by the United States government as a "terrorist supporting" country, and (ii) You are not listed on any United States government list of prohibited or restricted parties.</p><br/>
            </div>

            <div class="section">
                <h3>Severability and Waiver</h3><br/>
                <h3>Severability</h3><br/>
                <p>If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.</p><br/>
                <h3>Waiver</h3><br/>
                <p>Except as provided herein, the failure to exercise a right or to require performance of an obligation under these Terms shall not affect a party's ability to exercise such right or require such performance at any time thereafter nor shall the waiver of a breach constitute a waiver of any subsequent breach.</p>
              </div>
            </div>
                      

          <div className="button-container">
            <MyButton text="Volver" onClick={() => navigate("/")}/>
          </div>


        </div>

      </div>

    </>
  );
};
