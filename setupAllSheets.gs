/**
 * Google Apps Script สำหรับสร้างโครงสร้าง Sheets อัตโนมัติ
 * วิธีใช้:
 * 1. เปิด Google Sheets ใหม่
 * 2. ไปที่ Extensions → Apps Script
 * 3. วางโค้ดนี้แทนโค้ดเดิม
 * 4. กด Run → setupAllSheets
 * 5. อนุญาตสิทธิ์
 */

function setupAllSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // ลบ Sheet เดิมทั้งหมด (ยกเว้น Sheet1)
  const sheets = ss.getSheets();
  if (sheets.length > 1) {
    for (let i = 1; i < sheets.length; i++) {
      ss.deleteSheet(sheets[i]);
    }
  }
  
  // สร้าง Sheets ใหม่ทั้งหมด
  createCategoriesSheet(ss);
  createMenusSheet(ss);
  createOptionGroupsSheet(ss);
  createOptionsSheet(ss);
  createOrdersSheet(ss);
  createOrderItemsSheet(ss);
  createOrderItemOptionsSheet(ss);
  createDeliverySheet(ss);
  createPaymentsSheet(ss);
  createSystemConfigSheet(ss);
  
  // ลบ Sheet1
  const sheet1 = ss.getSheetByName('Sheet1');
  if (sheet1) ss.deleteSheet(sheet1);
  
  SpreadsheetApp.getUi().alert('สร้าง Sheets สำเร็จ! ✅');
}

// ========================================
// 1. Categories Sheet
// ========================================
function createCategoriesSheet(ss) {
  const sheet = ss.insertSheet('Categories');
  
  // Headers
  const headers = [['CategoryID', 'CategoryName', 'Sort', 'Active']];
  sheet.getRange('A1:D1').setValues(headers)
    .setFontWeight('bold')
    .setBackground('#4CAF50')
    .setFontColor('white');
  
  // Sample Data
  const data = [
    ['C1', 'น้ำปั่น', 1, true],
    ['C2', 'ยำ', 2, true],
    ['C3', 'ขนมปังปิ้ง', 3, true]
  ];
  
  sheet.getRange(2, 1, data.length, 4).setValues(data);
  
  // Formatting
  sheet.setColumnWidth(1, 100); // CategoryID
  sheet.setColumnWidth(2, 150); // CategoryName
  sheet.setColumnWidth(3, 80);  // Sort
  sheet.setColumnWidth(4, 80);  // Active
  
  // Data Validation for Active column
  const activeRange = sheet.getRange('D2:D100');
  const rule = SpreadsheetApp.newDataValidation()
    .requireCheckbox()
    .build();
  activeRange.setDataValidation(rule);
  
  sheet.setFrozenRows(1);
}

// ========================================
// 2. Menus Sheet
// ========================================
function createMenusSheet(ss) {
  const sheet = ss.insertSheet('Menus');
  
  // Headers
  const headers = [['MenuID', 'CategoryID', 'MenuName', 'BasePrice', 'Available', 'TodayFlag', 'PrepTime']];
  sheet.getRange('A1:G1').setValues(headers)
    .setFontWeight('bold')
    .setBackground('#2196F3')
    .setFontColor('white');
  
  // Sample Data
  const data = [
    ['M1', 'C1', 'น้ำปั่นสตรอเบอร์รี่', 45, true, true, 5],
    ['M2', 'C1', 'น้ำปั่นมะม่วง', 50, true, true, 5],
    ['M3', 'C1', 'น้ำปั่นกล้วย', 40, true, false, 5],
    ['M4', 'C2', 'ยำวุ้นเส้น', 60, true, true, 10],
    ['M5', 'C2', 'ยำไข่ดาว', 55, true, true, 10],
    ['M6', 'C2', 'ยำถั่วพู', 50, true, false, 10],
    ['M7', 'C3', 'ขนมปังนมสด', 35, true, true, 7],
    ['M8', 'C3', 'ขนมปังช็อกโกแลต', 40, true, true, 7],
    ['M9', 'C3', 'ขนมปังเนย-น้ำตาล', 30, true, false, 7]
  ];
  
  sheet.getRange(2, 1, data.length, 7).setValues(data);
  
  // Formatting
  sheet.setColumnWidth(1, 80);  // MenuID
  sheet.setColumnWidth(2, 100); // CategoryID
  sheet.setColumnWidth(3, 200); // MenuName
  sheet.setColumnWidth(4, 100); // BasePrice
  sheet.setColumnWidth(5, 100); // Available
  sheet.setColumnWidth(6, 100); // TodayFlag
  sheet.setColumnWidth(7, 100); // PrepTime
  
  // Data Validation for checkboxes
  const checkboxRange1 = sheet.getRange('E2:E100');
  const checkboxRange2 = sheet.getRange('F2:F100');
  const rule = SpreadsheetApp.newDataValidation().requireCheckbox().build();
  checkboxRange1.setDataValidation(rule);
  checkboxRange2.setDataValidation(rule);
  
  sheet.setFrozenRows(1);
}

// ========================================
// 3. OptionGroups Sheet
// ========================================
function createOptionGroupsSheet(ss) {
  const sheet = ss.insertSheet('OptionGroups');
  
  // Headers
  const headers = [['GroupID', 'GroupName', 'Required', 'MultiSelect']];
  sheet.getRange('A1:D1').setValues(headers)
    .setFontWeight('bold')
    .setBackground('#FF9800')
    .setFontColor('white');
  
  // Sample Data
  const data = [
    ['G1', 'ความหวาน', true, false],
    ['G2', 'ท็อปปิ้งเพิ่ม', false, true],
    ['G3', 'ระดับเผ็ด', true, false],
    ['G4', 'น้ำแข็ง', false, false]
  ];
  
  sheet.getRange(2, 1, data.length, 4).setValues(data);
  
  // Formatting
  sheet.setColumnWidth(1, 100); // GroupID
  sheet.setColumnWidth(2, 200); // GroupName
  sheet.setColumnWidth(3, 100); // Required
  sheet.setColumnWidth(4, 120); // MultiSelect
  
  // Data Validation
  const checkboxRange1 = sheet.getRange('C2:C100');
  const checkboxRange2 = sheet.getRange('D2:D100');
  const rule = SpreadsheetApp.newDataValidation().requireCheckbox().build();
  checkboxRange1.setDataValidation(rule);
  checkboxRange2.setDataValidation(rule);
  
  sheet.setFrozenRows(1);
}

// ========================================
// 4. Options Sheet
// ========================================
function createOptionsSheet(ss) {
  const sheet = ss.insertSheet('Options');
  
  // Headers
  const headers = [['OptionID', 'GroupID', 'MenuID', 'Label', 'Price', 'Available']];
  sheet.getRange('A1:F1').setValues(headers)
    .setFontWeight('bold')
    .setBackground('#9C27B0')
    .setFontColor('white');
  
  // Sample Data
  const data = [
    // ความหวาน (G1) - ใช้ได้กับทุกเมนู
    ['O1', 'G1', 'ALL', 'หวานน้อย', 0, true],
    ['O2', 'G1', 'ALL', 'หวานปานกลาง', 0, true],
    ['O3', 'G1', 'ALL', 'หวานมาก', 0, true],
    
    // ท็อปปิ้งเพิ่ม (G2) - ใช้ได้กับทุกเมนู
    ['O4', 'G2', 'ALL', 'วิปครีม', 10, true],
    ['O5', 'G2', 'ALL', 'ไข่มุก', 15, true],
    ['O6', 'G2', 'ALL', 'วุ้นกาแฟ', 10, true],
    ['O7', 'G2', 'ALL', 'เฉาก๊วย', 10, true],
    
    // ระดับเผ็ด (G3) - สำหรับยำเท่านั้น
    ['O8', 'G3', 'M4', 'ไม่เผ็ด', 0, true],
    ['O9', 'G3', 'M4', 'เผ็ดน้อย', 0, true],
    ['O10', 'G3', 'M4', 'เผ็ดปานกลาง', 0, true],
    ['O11', 'G3', 'M4', 'เผ็ดมาก', 0, true],
    ['O12', 'G3', 'M5', 'ไม่เผ็ด', 0, true],
    ['O13', 'G3', 'M5', 'เผ็ดน้อย', 0, true],
    ['O14', 'G3', 'M5', 'เผ็ดปานกลาง', 0, true],
    ['O15', 'G3', 'M5', 'เผ็ดมาก', 0, true],
    
    // น้ำแข็ง (G4) - สำหรับน้ำปั่น
    ['O16', 'G4', 'ALL', 'น้ำแข็งปกติ', 0, true],
    ['O17', 'G4', 'ALL', 'น้ำแข็งน้อย', 0, true],
    ['O18', 'G4', 'ALL', 'ไม่ใส่น้ำแข็ง', 0, true]
  ];
  
  sheet.getRange(2, 1, data.length, 6).setValues(data);
  
  // Formatting
  sheet.setColumnWidth(1, 100); // OptionID
  sheet.setColumnWidth(2, 100); // GroupID
  sheet.setColumnWidth(3, 100); // MenuID
  sheet.setColumnWidth(4, 200); // Label
  sheet.setColumnWidth(5, 80);  // Price
  sheet.setColumnWidth(6, 100); // Available
  
  // Data Validation
  const checkboxRange = sheet.getRange('F2:F100');
  const rule = SpreadsheetApp.newDataValidation().requireCheckbox().build();
  checkboxRange.setDataValidation(rule);
  
  sheet.setFrozenRows(1);
}

// ========================================
// 5. Orders Sheet
// ========================================
function createOrdersSheet(ss) {
  const sheet = ss.insertSheet('Orders');
  
  // Headers
  const headers = [['OrderID', 'UserID', 'OrderTime', 'Status', 'DeliveryType', 'PaymentType', 'TotalPrice']];
  sheet.getRange('A1:G1').setValues(headers)
    .setFontWeight('bold')
    .setBackground('#F44336')
    .setFontColor('white');
  
  // Formatting
  sheet.setColumnWidth(1, 150); // OrderID
  sheet.setColumnWidth(2, 200); // UserID
  sheet.setColumnWidth(3, 150); // OrderTime
  sheet.setColumnWidth(4, 100); // Status
  sheet.setColumnWidth(5, 120); // DeliveryType
  sheet.setColumnWidth(6, 120); // PaymentType
  sheet.setColumnWidth(7, 100); // TotalPrice
  
  sheet.setFrozenRows(1);
  
  // Add note
  sheet.getRange('A2').setNote('ข้อมูลจะถูกเติมอัตโนมัติจากระบบ\n\nStatus: NEW, COOKING, READY, DONE, CANCEL\nDeliveryType: pickup, delivery\nPaymentType: cash, qr, credit');
}

// ========================================
// 6. OrderItems Sheet
// ========================================
function createOrderItemsSheet(ss) {
  const sheet = ss.insertSheet('OrderItems');
  
  // Headers
  const headers = [['OrderID', 'MenuID', 'MenuName', 'BasePrice', 'Qty']];
  sheet.getRange('A1:E1').setValues(headers)
    .setFontWeight('bold')
    .setBackground('#00BCD4')
    .setFontColor('white');
  
  // Formatting
  sheet.setColumnWidth(1, 150); // OrderID
  sheet.setColumnWidth(2, 100); // MenuID
  sheet.setColumnWidth(3, 200); // MenuName
  sheet.setColumnWidth(4, 100); // BasePrice
  sheet.setColumnWidth(5, 80);  // Qty
  
  sheet.setFrozenRows(1);
}

// ========================================
// 7. OrderItemOptions Sheet
// ========================================
function createOrderItemOptionsSheet(ss) {
  const sheet = ss.insertSheet('OrderItemOptions');
  
  // Headers
  const headers = [['OrderID', 'MenuID', 'OptionLabel', 'OptionPrice']];
  sheet.getRange('A1:D1').setValues(headers)
    .setFontWeight('bold')
    .setBackground('#3F51B5')
    .setFontColor('white');
  
  // Formatting
  sheet.setColumnWidth(1, 150); // OrderID
  sheet.setColumnWidth(2, 100); // MenuID
  sheet.setColumnWidth(3, 200); // OptionLabel
  sheet.setColumnWidth(4, 100); // OptionPrice
  
  sheet.setFrozenRows(1);
}

// ========================================
// 8. Delivery Sheet
// ========================================
function createDeliverySheet(ss) {
  const sheet = ss.insertSheet('Delivery');
  
  // Headers
  const headers = [['OrderID', 'Address', 'Lat', 'Lng']];
  sheet.getRange('A1:D1').setValues(headers)
    .setFontWeight('bold')
    .setBackground('#8BC34A')
    .setFontColor('white');
  
  // Formatting
  sheet.setColumnWidth(1, 150); // OrderID
  sheet.setColumnWidth(2, 300); // Address
  sheet.setColumnWidth(3, 120); // Lat
  sheet.setColumnWidth(4, 120); // Lng
  
  sheet.setFrozenRows(1);
}

// ========================================
// 9. Payments Sheet
// ========================================
function createPaymentsSheet(ss) {
  const sheet = ss.insertSheet('Payments');
  
  // Headers
  const headers = [['OrderID', 'PaymentType', 'PaymentStatus', 'SlipURL']];
  sheet.getRange('A1:D1').setValues(headers)
    .setFontWeight('bold')
    .setBackground('#FFC107')
    .setFontColor('white');
  
  // Formatting
  sheet.setColumnWidth(1, 150); // OrderID
  sheet.setColumnWidth(2, 120); // PaymentType
  sheet.setColumnWidth(3, 120); // PaymentStatus
  sheet.setColumnWidth(4, 300); // SlipURL
  
  sheet.setFrozenRows(1);
  
  // Add note
  sheet.getRange('A2').setNote('PaymentType: cash, qr, credit\nPaymentStatus: PENDING, PAID, FAILED');
}

// ========================================
// 10. SystemConfig Sheet
// ========================================
function createSystemConfigSheet(ss) {
  const sheet = ss.insertSheet('SystemConfig');
  
  // Headers
  const headers = [['Key', 'Value']];
  sheet.getRange('A1:B1').setValues(headers)
    .setFontWeight('bold')
    .setBackground('#607D8B')
    .setFontColor('white');
  
  // Sample Data
  const data = [
    ['MAX_QUEUE', '20'],
    ['SHOP_LAT', '8.4304'],
    ['SHOP_LNG', '99.9631'],
    ['PROMPTPAY_ID', '0812345678'],
    ['DELIVERY_FEE', '50'],
    ['FREE_DELIVERY_MIN', '500'],
    ['SHOP_NAME', 'น้ำปั่น ยำ ขนมปังปิ้ง'],
    ['SHOP_PHONE', '081-234-5678'],
    ['SHOP_ADDRESS', 'นครศรีธรรมราช']
  ];
  
  sheet.getRange(2, 1, data.length, 2).setValues(data);
  
  // Formatting
  sheet.setColumnWidth(1, 200); // Key
  sheet.setColumnWidth(2, 200); // Value
  
  sheet.setFrozenRows(1);
  
  // Add note
  sheet.getRange('A2').setNote('ตั้งค่าระบบ\n\nMAX_QUEUE: จำนวนคิวสูงสุดที่รับได้\nSHOP_LAT/LNG: พิกัดร้านค้า\nPROMPTPAY_ID: เบอร์พร้อมเพย์\nDELIVERY_FEE: ค่าส่ง\nFREE_DELIVERY_MIN: ยอดขั้นต่ำสำหรับส่งฟรี');
}

// ========================================
// Helper: สร้างเมนู Custom
// ========================================
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🍽️ ระบบสั่งอาหาร')
    .addItem('📊 สร้าง Sheets ทั้งหมด', 'setupAllSheets')
    .addItem('🧹 ล้างข้อมูล Orders', 'clearOrders')
    .addItem('📈 สร้างรายงานยอดขาย', 'generateSalesReport')
    .addToUi();
}

// ========================================
// Helper: ล้างข้อมูล Orders
// ========================================
function clearOrders() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.alert(
    'ยืนยันการล้างข้อมูล',
    'ต้องการล้างข้อมูล Orders ทั้งหมดหรือไม่?',
    ui.ButtonSet.YES_NO
  );
  
  if (response === ui.Button.YES) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Clear Orders
    const ordersSheet = ss.getSheetByName('Orders');
    if (ordersSheet && ordersSheet.getLastRow() > 1) {
      ordersSheet.getRange(2, 1, ordersSheet.getLastRow() - 1, ordersSheet.getLastColumn()).clearContent();
    }
    
    // Clear OrderItems
    const itemsSheet = ss.getSheetByName('OrderItems');
    if (itemsSheet && itemsSheet.getLastRow() > 1) {
      itemsSheet.getRange(2, 1, itemsSheet.getLastRow() - 1, itemsSheet.getLastColumn()).clearContent();
    }
    
    // Clear OrderItemOptions
    const optionsSheet = ss.getSheetByName('OrderItemOptions');
    if (optionsSheet && optionsSheet.getLastRow() > 1) {
      optionsSheet.getRange(2, 1, optionsSheet.getLastRow() - 1, optionsSheet.getLastColumn()).clearContent();
    }
    
    // Clear Delivery
    const deliverySheet = ss.getSheetByName('Delivery');
    if (deliverySheet && deliverySheet.getLastRow() > 1) {
      deliverySheet.getRange(2, 1, deliverySheet.getLastRow() - 1, deliverySheet.getLastColumn()).clearContent();
    }
    
    // Clear Payments
    const paymentsSheet = ss.getSheetByName('Payments');
    if (paymentsSheet && paymentsSheet.getLastRow() > 1) {
      paymentsSheet.getRange(2, 1, paymentsSheet.getLastRow() - 1, paymentsSheet.getLastColumn()).clearContent();
    }
    
    ui.alert('ล้างข้อมูลเรียบร้อยแล้ว! ✅');
  }
}

// ========================================
// Helper: สร้างรายงานยอดขาย
// ========================================
function generateSalesReport() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ordersSheet = ss.getSheetByName('Orders');
  
  if (!ordersSheet || ordersSheet.getLastRow() <= 1) {
    SpreadsheetApp.getUi().alert('ไม่มีข้อมูล Orders');
    return;
  }
  
  const data = ordersSheet.getDataRange().getValues();
  const today = new Date().toDateString();
  
  let totalOrders = 0;
  let totalRevenue = 0;
  let completedOrders = 0;
  
  for (let i = 1; i < data.length; i++) {
    const orderTime = new Date(data[i][2]).toDateString();
    if (orderTime === today) {
      totalOrders++;
      totalRevenue += data[i][6];
      if (data[i][3] === 'DONE') {
        completedOrders++;
      }
    }
  }
  
  const message = `📊 รายงานยอดขายวันนี้\n\n` +
                 `🛒 จำนวน Orders: ${totalOrders}\n` +
                 `✅ สำเร็จแล้ว: ${completedOrders}\n` +
                 `💰 ยอดขายรวม: ${totalRevenue} บาท`;
  
  SpreadsheetApp.getUi().alert(message);
}
