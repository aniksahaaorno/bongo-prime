
function isValidName(name: string) {
  if (!name) return false;
  const clean = name.trim();


  if (clean.length < 4 || clean.length > 50) return false;
  if (/[^a-zA-Z\s]/.test(clean)) return false;

  if (/(.)\1{2,}/.test(clean)) return false; 


  const lower = clean.toLowerCase();
  for (let i = 0; i < lower.length - 2; i++) {
    if (
      lower.charCodeAt(i + 1) === lower.charCodeAt(i) + 1 &&
      lower.charCodeAt(i + 2) === lower.charCodeAt(i) + 2
    )
      return false;
  }

  const parts = clean.split(/\s+/);
  if (parts.length > 5) return false;

  const vowels = clean.match(/[aeiou]/gi) || [];

  if (/[bcdfghjklmnpqrstvwxyz]{4,}/i.test(clean)) return false;
  if (vowels.length === 0) return false;

  if (clean.length > 5 && vowels.length < 2) return false;

  if (/^(asdf|qwer|zxcv|test|user|null|admin|undefined)/i.test(clean))
    return false;

  return true;
}

function isValidBDPhone(phone: string) {
  if (!phone) return false;
  
  const clean = phone.replace(/\s|-/g, "");

  // block repeated like 00000000000
  if (/^(\d)\1{7,}$/.test(clean)) return false;

  const regex = /^(?:\+?88)?01(7|3|9|4|8|6|5)\d{8}$/;
  const ok = regex.test(clean);


  return regex.test(clean);
}

function isValidEmail(email: string) {
  
  const tempDomains = [
    "mailinator.com",
    "tempmail.com",
    "10minutemail.com",
    "example.com",
    "test.com",
    "fakeemail.com",
    "disposablemail.com",
    "trashmail.com",
    "yopmail.com",
    "maildrop.cc",
  ];

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return false;

  const domain = email.split("@")[1];
  if (tempDomains.includes(domain)) return false;


  return true;
}

function isValidAddress(address: string) {

  if (address.length < 8) return false;
  if (!/[a-zA-Z]/.test(address)) return false;
  if (/(.)\1{4,}/.test(address)) return false;
  console.log("return true");
  return true;
}

export const fraudRoles = {
  isValidName,
  isValidBDPhone,
  isValidEmail,
  isValidAddress,
};  
