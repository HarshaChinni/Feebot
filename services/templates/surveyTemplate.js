module.exports = survey => {
  return `
  <html>
    <body>
        <div style="text-align: center;">
            <h3> We Would like to hear from you </h3>
            <p>Please answer the following question: </p>
            <div>${survey.body}</div>
            <div>
                <a href="http://localhost:3000/">Yes</a>
            </div>
            <div>
                <a href="http://localhost:3000">No</a>
            </div>
        </div>
    </body>
  </html>
  
  `;
};
