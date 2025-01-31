// const nodemailer = require("nodemailer");

// const sendEmail = async (email, subject, text) => {
//     try {
//         const transporter = nodemailer.createTransport({
//             host: process.env.HOST,
//             port: 587,
//             service: process.env.SERVICE,
//             // secure: Boolean(process.env.SECURE),
//             auth: {
//                 user: process.env.SMTP_USER,
//                 pass: process.env.SMTP_PASS,
//             },
//         });

//         await transporter.sendMail({
//             from: process.env.USER,
//             to: email,
//             subject: subject,
//             text: text
//         });

//         console.log(`Email sent to ${email}`);
//     }
//     catch (error) {
//         console.error(error);
//         console.error(`Error sending mail to ${email}`);
//         throw error;

//     }
// }

// module.exports =  sendEmail ;

const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: 587,
            service: process.env.SERVICE,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const htmlTemplate = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta http-equiv="x-ua-compatible" content="ie=edge">
            <title>Email Verification</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style type="text/css">
            @media screen {
                @font-face {
                    font-family: 'Source Sans Pro';
                    font-style: normal;
                    font-weight: 400;
                    src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
                }
                
                @font-face {
                    font-family: 'Source Sans Pro';
                    font-style: normal;
                    font-weight: 700;
                    src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
                }
            }
            
            body,
            table,
            td,
            a {
                -ms-text-size-adjust: 100%;
                -webkit-text-size-adjust: 100%;
            }
            
            table,
            td {
                mso-table-rspace: 0pt;
                mso-table-lspace: 0pt;
            }
            
            img {
                -ms-interpolation-mode: bicubic;
            }
            
            a[x-apple-data-detectors] {
                font-family: inherit !important;
                font-size: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
                color: inherit !important;
                text-decoration: none !important;
            }
            
            div[style*="margin: 16px 0;"] {
                margin: 0 !important;
            }
            
            body {
                width: 100% !important;
                height: 100% !important;
                padding: 0 !important;
                margin: 0 !important;
                font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
            }
            
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f7f7f7;
            }
            
            .content {
                background: white;
                padding: 30px;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            
            .header {
                text-align: center;
                padding-bottom: 20px;
                border-bottom: 1px solid #eeeeee;
            }
            
            .logo {
                color: #2b3137;
                font-size: 24px;
                font-weight: bold;
                text-decoration: none;
            }
            
            .main-content {
                padding: 30px 0;
                text-align: center;
            }
            
            .button {
                background-color: #1877f2;
                color: white !important;
                padding: 12px 25px;
                border-radius: 5px;
                text-decoration: none;
                display: inline-block;
                font-weight: bold;
                margin: 20px 0;
            }
            
            .footer {
                text-align: center;
                padding-top: 20px;
                color: #6a737d;
                font-size: 12px;
            }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="content">
                    <div class="header">
                        <a href="#" class="logo">Ally Chat</a>
                    </div>
                    
                    <div class="main-content">
                        <h2 style="color: #2b3137; margin-top: 0;">Verify Your Email Address</h2>
                        <p style="color: #6a737d; line-height: 1.6;">Thanks for signing up! Please confirm that ${email} is your email address by clicking the button below:</p>
                        
                        <a href="${text}" class="button">Verify Email Address</a>
                        
                        <p style="color: #6a737d; font-size: 14px;">If you didn't create this account, you can safely ignore this email.</p>
                    </div>
                    
                    <div class="footer">
                        <p>This email was sent to ${email}</p>
                        <p>© ${new Date().getFullYear()} Ally Chat. All rights reserved.</p>
                        <p style="margin-top: 10px;">
                            <a href="#" style="color: #1877f2; text-decoration: none;">Help Center</a> | 
                            <a href="#" style="color: #1877f2; text-decoration: none;">Privacy Policy</a>
                        </p>
                    </div>
                </div>
            </div>
        </body>
        </html>
        `;

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text,  // Fallback text version
            html: htmlTemplate
        });

        console.log(`Email sent to ${email}`);
    }
    catch (error) {
        if(error.code=11000){
            console.log("email already exists");
            
        }
        console.error(error);
        console.error(`Error sending mail to ${email}`);
        throw error;
    }
}

module.exports = sendEmail;