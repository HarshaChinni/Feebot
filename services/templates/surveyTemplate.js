const keys = require("../../config/keys");

module.exports = survey => {
  return `
  <html>
    <body>
        <div style="text-align: center;">
            <h3> We Would like to hear from you </h3>
            <p>Please answer the following question: </p>
            <div>${survey.body}</div>
            <div>
                <a 
                href="${keys.redirectDomain}/api/survey/${survey.id}/yes"
                >
                Yes
                </a>
            </div>
            <div>
                <a 
                href="${keys.redirectDomain}/api/survey/${survey.id}/no"
                >
                No
                </a>
            </div>
        </div>
    </body>
  </html>
  
  `;
};
