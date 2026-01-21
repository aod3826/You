# # คู่มือติดตั้งระบบสั่งอาหารออนไลน์

## 📋 สารบัญ
1. [ตั้งค่า Google Sheets Database](#1-ตั้งค่า-google-sheets-database)
2. [Deploy Google Apps Script](#2-deploy-google-apps-script)
3. [ตั้งค่า LINE Developers](#3-ตั้งค่า-line-developers)
4. [ตั้งค่า LINE LIFF](#4-ตั้งค่า-line-liff)
5. [เชื่อมต่อระบบทั้งหมด](#5-เชื่อมต่อระบบทั้งหมด)

---

## 1. ตั้งค่า Google Sheets Database

### 1.1 สร้าง Google Sheets ใหม่
1. ไปที่ [Google Sheets](https://sheets.google.com)
2. สร้าง Spreadsheet ใหม่ชื่อ "ระบบสั่งอาหาร"
3. สร้าง 10 แผ่นงานตามโครงสร้างด้านล่าง

### 1.2 โครงสร้างแต่ละ Sheet

#### Sheet 1: Categories
| CategoryID | CategoryName | Sort | Active |
|------------|--------------|------|--------|
| C1 | น้ำปั่น | 1 | TRUE |
| C2 | ยำ | 2 | TRUE |
| C3 | ขนมปังปิ้ง | 3 | TRUE |

#### Sheet 2: Menus
| MenuID | CategoryID | MenuName | BasePrice | Available | TodayFlag | PrepTime |
|--------|------------|----------|-----------|-----------|-----------|----------|
| M1 | C1 | น้ำปั่นสตรอเบอร์รี่ | 45 | TRUE | TRUE | 5 |
| M2 | C1 | น้ำปั่นมะม่วง | 50 | TRUE | TRUE | 5 |
| M3 | C2 | ยำวุ้นเส้น | 60 | TRUE | TRUE | 10 |
| M4 | C2 | ยำไข่ดาว | 55 | TRUE | TRUE | 10 |
| M5 | C3 | ขนมปังนมสด | 35 | TRUE | TRUE | 7 |
| M6 | C3 | ขนมปังช็อกโกแลต | 40 | TRUE | TRUE | 7 |

#### Sheet 3: OptionGroups
| GroupID | GroupName | Required | MultiSelect |
|---------|-----------|----------|-------------|
| G1 | ความหวาน | TRUE | FALSE |
| G2 | ท็อปปิ้งเพิ่ม | FALSE | TRUE |
| G3 | ระดับเผ็ด | TRUE | FALSE |

#### Sheet 4: Options
| OptionID | GroupID | MenuID | Label | Price | Available |
|----------|---------|--------|-------|-------|-----------|
| O1 | G1 | ALL | หวานน้อย | 0 | TRUE |
| O2 | G1 | ALL | หวานปานกลาง | 0 | TRUE |
| O3 | G1 | ALL | หวานมาก | 0 | TRUE |
| O4 | G2 | ALL | วิปครีม | 10 | TRUE |
| O5 | G2 | ALL | ไข่มุก | 15 | TRUE |
| O6 | G2 | ALL | วุ้นกาแฟ | 10 | TRUE |
| O7 | G3 | M3 | ไม่เผ็ด | 0 | TRUE |
| O8 | G3 | M3 | เผ็ดน้อย | 0 | TRUE |
| O9 | G3 | M3 | เผ็ดมาก | 0 | TRUE |

**หมายเหตุ:** MenuID = "ALL" หมายถึงใช้ได้กับทุกเมนู

#### Sheet 5: Orders
| OrderID | UserID | OrderTime | Status | DeliveryType | PaymentType | TotalPrice |
|---------|--------|-----------|--------|--------------|-------------|------------|
| *(ว่างไว้ - ระบบจะเติมอัตโนมัติ)* |

**Status values:** NEW, COOKING, READY, DONE, CANCEL

#### Sheet 6: OrderItems
| OrderID | MenuID | MenuName | BasePrice | Qty |
|---------|--------|----------|-----------|-----|
| *(ว่างไว้ - ระบบจะเติมอัตโนมัติ)* |

#### Sheet 7: OrderItemOptions
| OrderID | MenuID | OptionLabel | OptionPrice |
|---------|--------|-------------|-------------|
| *(ว่างไว้ - ระบบจะเติมอัตโนมัติ)* |

#### Sheet 8: Delivery
| OrderID | Address | Lat | Lng |
|---------|---------|-----|-----|
| *(ว่างไว้ - ระบบจะเติมอัตโนมัติ)* |

#### Sheet 9: Payments
| OrderID | PaymentType | PaymentStatus | SlipURL |
|---------|-------------|---------------|---------|
| *(ว่างไว้ - ระบบจะเติมอัตโนมัติ)* |

**PaymentStatus values:** PENDING, PAID, FAILED

#### Sheet 10: SystemConfig
| Key | Value |
|-----|-------|
| MAX_QUEUE | 20 |
| SHOP_LAT | 8.4304 |
| SHOP_LNG | 99.9631 |
| PROMPTPAY_ID | 0812345678 |
| DELIVERY_FEE | 50 |
| FREE_DELIVERY_MIN | 500 |

---

## 2. Deploy Google Apps Script

### 2.1 เปิด Apps Script Editor
1. ใน Google Sheets คลิก **Extensions → Apps Script**
2. ลบโค้ดเดิมทั้งหมด
3. วางโค้ดจาก `Code.gs` ที่ให้ไว้

### 2.2 ตั้งค่า Configuration
แก้ไขค่าในส่วนต้นของไฟล์:
```javascript
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID'; // คัดลอกจาก URL ของ Sheets
const LINE_CHANNEL_TOKEN = 'YOUR_LINE_CHANNEL_ACCESS_TOKEN';
const LINE_SHOP_GROUP_ID = 'YOUR_SHOP_GROUP_ID';
```

**วิธีหา SPREADSHEET_ID:**
- URL: `https://docs.google.com/spreadsheets/d/1ABC...XYZ/edit`
- SPREADSHEET_ID คือส่วน `1ABC...XYZ`

### 2.3 Deploy Web App
1. คลิก **Deploy → New deployment**
2. เลือก type: **Web app**
3. ตั้งค่า:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. คลิก **Deploy**
5. คัดลอก **Web app URL** ไว้ใช้งาน

---

## 3. ตั้งค่า LINE Developers

### 3.1 สร้าง LINE Provider
1. ไปที่ [LINE Developers Console](https://developers.line.biz/)
2. คลิก **Create a new provider**
3. ตั้งชื่อ Provider (เช่น "FoodOrderSystem")

### 3.2 สร้าง Messaging API Channel
1. คลิก **Create a Messaging API channel**
2. กรอกข้อมูล:
   - Channel name: "ร้านอาหาร"
   - Channel description: "ระบบสั่งอาหารออนไลน์"
   - Category: Food & Restaurant
3. คลิก **Create**

### 3.3 ตั้งค่า Channel
1. ในแท็บ **Messaging API**:
   - เปิด **Use webhooks**
   - ตั้ง Webhook URL เป็น: `YOUR_WEB_APP_URL?action=lineWebhook`
   - คัดลอก **Channel access token** ไปใส่ใน Apps Script

2. ในแท็บ **Basic settings**:
   - คัดลอก **Channel ID** และ **Channel secret**

### 3.4 เพิ่ม Bot เข้า Group Shop
1. สร้าง LINE Group สำหรับแม่ค้า
2. เชิญ Bot เข้า Group
3. คัดลอก Group ID ไปใส่ใน Apps Script

**วิธีหา Group ID:**
```javascript
// ใน Apps Script ให้สร้างฟังก์ชันทดสอบ
function getGroupId() {
  // ส่งข้อความไปที่ Group แล้วดู log
}
```

---

## 4. ตั้งค่า LINE LIFF

### 4.1 สร้าง LIFF App
1. ใน LINE Developers Console
2. เลือก Channel ที่สร้างไว้
3. ไปที่แท็บ **LIFF**
4. คลิก **Add**

### 4.2 ตั้งค่า LIFF
- **LIFF app name:** ระบบสั่งอาหาร
- **Size:** Full
- **Endpoint URL:** URL ของ Frontend (ดูด้านล่าง)
- **Scope:** 
  - ✅ profile
  - ✅ openid
- **Bot link feature:** On (Aggressive)

### 4.3 Deploy Frontend
**ตัวเลือก 1: ใช้ GitHub Pages**
1. สร้าง Repository ใหม่
2. อัพโหลดไฟล์ `index.html`
3. เปิด GitHub Pages
4. นำ URL ไปใส่ในการตั้งค่า LIFF

**ตัวเลือก 2: ใช้ Netlify/Vercel**
1. สร้างโปรเจค React ใหม่
2. วางโค้ด Component
3. Deploy ขึ้น Platform
4. นำ URL ไปใส่ในการตั้งค่า LIFF

### 4.4 แก้ไข Frontend Config
ในไฟล์ HTML/React เพิ่ม:
```javascript
const LIFF_ID = 'YOUR_LIFF_ID';
const GAS_WEB_APP_URL = 'YOUR_WEB_APP_URL';

// Initialize LIFF
liff.init({ liffId: LIFF_ID });
```

---

## 5. เชื่อมต่อระบบทั้งหมด

### 5.1 Flow การทำงาน
```
[ลูกค้า] 
   ↓ เปิด LIFF
[Frontend React]
   ↓ ดึงข้อมูลเมนู (GET)
[Google Apps Script]
   ↓ อ่านจาก
[Google Sheets]
   
[ลูกค้า]
   ↓ สั่งอาหาร
[Frontend]
   ↓ ส่งออเดอร์ (POST)
[Apps Script]
   ↓ บันทึก + ส่งแจ้งเตือน
[Sheets] + [LINE Messaging API]
   ↓
[ลูกค้า] + [กลุ่มแม่ค้า]
```

### 5.2 ทดสอบระบบ

#### Test 1: ดึงข้อมูลเมนู
```javascript
fetch('YOUR_WEB_APP_URL?action=getMenu')
  .then(res => res.json())
  .then(data => console.log(data));
```

#### Test 2: สร้างออเดอร์
```javascript
fetch('YOUR_WEB_APP_URL', {
  method: 'POST',
  body: JSON.stringify({
    action: 'createOrder',
    userId: 'U1234567890abcdef',
    items: [{
      MenuID: 'M1',
      MenuName: 'น้ำปั่นสตรอเบอร์รี่',
      BasePrice: 45,
      qty: 1,
      PrepTime: 5,
      options: [{ Label: 'หวานน้อย', Price: 0 }]
    }],
    deliveryType: 'pickup',
    paymentType: 'cash',
    total: 45
  })
});
```

#### Test 3: อัพเดทสถานะ
```javascript
fetch('YOUR_WEB_APP_URL', {
  method: 'POST',
  body: JSON.stringify({
    action: 'updateStatus',
    orderId: 'ORD1234567890',
    status: 'COOKING'
  })
});
```

### 5.3 ปัญหาที่พบบ่อย

**Q: LIFF ไม่สามารถเปิดได้**
- ตรวจสอบ LIFF ID ถูกต้องหรือไม่
- ตรวจสอบ Endpoint URL ถูกต้องหรือไม่

**Q: ไม่ได้รับ LINE Notification**
- ตรวจสอบ Channel Access Token
- ตรวจสอบ User ID / Group ID ถูกต้องหรือไม่
- ตรวจสอบ Webhook URL ถูกต้องหรือไม่

**Q: Data ไม่บันทึกลง Sheets**
- ตรวจสอบสิทธิ์ในการเข้าถึง Sheets
- ตรวจสอบชื่อ Sheet ตรงกับที่กำหนดหรือไม่
- ดู Execution log ใน Apps Script

**Q: คิวซ้ำกัน**
- ตรวจสอบ LockService ทำงานหรือไม่
- เพิ่ม delay ระหว่างการสร้างออเดอร์

---

## 6. การปรับแต่งเพิ่มเติม

### 6.1 เพิ่มระบบแจ้งเตือนสำหรับแม่ค้า
- ตั้งค่า LINE Notify
- ส่งข้อความเมื่อมีออเดอร์ใหม่

### 6.2 Dashboard สำหรับแม่ค้า
- สร้าง Google Data Studio Dashboard
- แสดงสถิติยอดขาย, เมนูยอดนิยม

### 6.3 ระบบจัดการสต็อก
- เพิ่ม Sheet สำหรับจัดการวัตถุดิบ
- แจ้งเตือนเมื่อสต็อกใกล้หมด

### 6.4 Rich Menu
- สร้าง Rich Menu ใน LINE
- ใส่ลิงก์ไปยัง LIFF App

---

## 7. Security Best Practices

### 7.1 ข้อมูลส่วนตัว
- อย่าเก็บข้อมูลบัตรเครดิต
- เข้ารหัสข้อมูลสำคัญ

### 7.2 API Security
- ใช้ HTTPS เท่านั้น
- เก็บ Token ในที่ปลอดภัย
- ตรวจสอบ Input จากผู้ใช้

### 7.3 Rate Limiting
- จำกัดจำนวนคำขอต่อนาที
- ป้องกัน DoS Attack

---

## 8. การดูแลรักษาระบบ

### 8.1 Backup ข้อมูล
- สำรองข้อมูล Google Sheets ทุกวัน
- Export ข้อมูลเป็น CSV เป็นประจำ

### 8.2 Monitor
- ตรวจสอบ Execution log ใน Apps Script
- ตรวจสอบ Error log ของ LINE Messaging API

### 8.3 Update
- อัพเดท Apps Script เมื่อมีฟีเจอร์ใหม่
- ทดสอบก่อนปล่อยใช้งานจริง

---

## 📞 ติดต่อสอบถาม
หากมีปัญหาในการติดตั้ง สามารถดู Documentation เพิ่มเติมได้ที่:
- [LINE Developers](https://developers.line.biz/en/docs/)
- [Google Apps Script](https://developers.google.com/apps-script)
- [LIFF Documentation](https://developers.line.biz/en/docs/liff/)

---

**สำเร็จ! 🎉** ระบบสั่งอาหารออนไลน์พร้อมใช้งานแล้ว
