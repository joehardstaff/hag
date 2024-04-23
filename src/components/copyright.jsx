import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Typography } from '@mui/material';

const Copyright = () => {
    const [openTermsDialog, setOpenTermsDialog] = useState(false);

    const handleTermsDialogOpen = () => {
        setOpenTermsDialog(true);
      };

      const handleTermsDialogClose = () => {
        setOpenTermsDialog(false);
      };

  return (
    <div>
        <Dialog open={openTermsDialog} onClose={handleTermsDialogClose}>
        <DialogContent>
          {/* Place your terms & conditions and privacy policy content here */}
          <Typography variant="h6">Terms & Conditions</Typography>
          <Typography paragraph>
          Terms and Conditions

These terms and conditions ("Terms") govern your use of our services and website.

By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of the Terms, you may not access the services.

1. Use of Services

You agree to use our services only for lawful purposes and in accordance with these Terms. You may not use our services for any illegal or unauthorized purpose.

2. Intellectual Property

All content included on our website, such as text, graphics, logos, images, and software, is the property of our company and is protected by copyright laws.

3. Privacy

Your privacy is important to us. Please refer to our Privacy Policy to understand how we collect, use, and disclose your personal information.

4. Limitation of Liability

In no event shall our company be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with the use of our services.

5. Governing Law

These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.

6. Changes to Terms

We reserve the right to modify these Terms at any time. You are advised to review these Terms periodically for any changes.

7. Contact Us

If you have any questions about these Terms, please contact us...
          </Typography>
          <Typography variant="h6">Privacy Policy</Typography>
          <Typography paragraph>
          Privacy Policy

This Privacy Policy outlines how we collect, use, and protect your personal information when you use our services or visit our website.

1. Information We Collect

We may collect various types of information, including:

Personal Information: We may collect personal information such as your name, email address, and contact details when you register for an account or communicate with us.
Usage Information: We may collect information about how you interact with our services, including your IP address, browser type, and device information.
Cookies: We may use cookies and similar technologies to collect information about your browsing activities and preferences.
2. How We Use Your Information

We may use the information we collect for various purposes, including:

Providing and maintaining our services
Personalizing your experience
Communicating with you
Analyzing usage trends and improving our services
Protecting our rights and interests
3. Sharing Your Information

We may share your information with third parties in the following circumstances:

With service providers: We may share your information with third-party service providers who assist us in providing our services.
With affiliates: We may share your information with our affiliates for business purposes.
With legal authorities: We may disclose your information in response to legal requests or to comply with legal obligations.
4. Data Security

We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.

5. Your Choices

You may choose not to provide certain information, but this may limit your ability to access certain features of our services.

6. Children's Privacy

Our services are not directed to individuals under the age of 18, and we do not knowingly collect personal information from children.

7. Changes to This Privacy Policy

We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.

8. Contact Us

If you have any questions about this Privacy Policy, please contact us.
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Copyright