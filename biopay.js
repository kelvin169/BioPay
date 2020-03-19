function doGet(e) { 
  Logger.log( JSON.stringify(e) ); 

  var result = 'Ok';

  if (e.parameter== undefined) {
    result = 'No Parameters';
  }
  else {
    var id ='1eBW9hArVNj1SgvnBlu5jUWnH30nXFpr0ryZpzXmtE7Q'; // Spreadsheet ID
    var sheet = SpreadsheetApp.openById(id).getActiveSheet();
    var newRow = sheet.getLastRow() + 1;
    var rfidData = [];
    rfidData[0] = new Date();
    for (var param in e.parameter) {
      Logger.log('In for loop, param='+param);
      var value = stripQuotes(e.parameter[param]);
      switch (param) {
        case 'allowed_members': //Parameter
          rfidData[1] = value; //Value in column B
          break;
        case 'Member_ID':
          rfidData[2] = value;
          break;
        default:
          result = "Wrong parameter";
      }
    }
    Logger.log(JSON.stringify(rfidData));

    // Write new row below
    var newRange = sheet.getRange(newRow, 1, 1, rfidData.length);
    newRange.setValues([rfidData]);
  }

  // Return result of operation
  return ContentService.createTextOutput(result);
}

/**
* Remove leading and trailing single or double quotes
*/
function stripQuotes( value ) {
  return value.replace(/^["']|['"]$/g, "");
}