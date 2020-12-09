//the html used in export hours sheet
export const topHTML = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Build a table</title>
      <style>
       th {
       border: 1px solid black;
    }
      table {
        margin-top:40px;
        
        margin-left:100px;
        width:80%;
        
       
      }
      th {
        height: 40px;
        text-align: center;
      }
      td {
        border-spacing:0px;
        height: 30px;
        text-align: center;
        vertical-align: center;
        border-bottom: 1px solid #111;
      }
      h1{
        text-align:center;
        font-size: 60px;
      }
      p {
        font-size:10px;
        margin-right: 140px;
        margin-left: 140px;
      }
      
  </style>
  </head>
  <body>
  <h1>Drivers Education Hours</h1>
  <p>Motor vehichle crashes are the leading cause of teen death.
   Within the Illinois Drivers Education program, Students are required by law to have 
   <strong>50 hours of behind the wheel practice, 10 of which are nighttime driving </strong>. This will give novice drivers the practical experience neccessary to make our roads safer.</p>
  <p>These 50 hours must be spent in addition to time with a driving instructor. Students may only complete these hours with a licenced adult 21 years or older, who has held their license for at least a year.</p>
  <p>Within this chart, hours your teen has been driving have been logged for convienience but <strong>require ititials and a signature</strong> before submission.
  Print out this page and take it to the DMV when complete on your trip to get a license</p>
  <table>
  <!-- here goes our data! -->
  </table>
  <p>__________________________________________________________</p>
  <p>Signature of Parent, Guardian, or Other Responsible Adult </p>
  </body>
  <script >let hours = `;

export const bottomHTML = `;
          
  function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
      if(key!='key'){
      let th = document.createElement("th");
      let text = document.createTextNode(key);
      th.appendChild(text);
      row.appendChild(th);}
    }
  }
  
  function generateTable(table, data) {
    for (let element of data) {
      let row = table.insertRow();
      for (key in element) {if(key!="key"){
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      }}
    }
  }
  
  let table = document.querySelector("table");
  let data = Object.keys(hours[0]);
  generateTableHead(table, data);
  generateTable(table, hours);</script>
  </html>`;
