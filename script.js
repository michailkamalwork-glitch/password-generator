const passwordInput = document.getElementById('password-input');
const lengthSlider = document.getElementById('length-slider');
const lengthVal = document.getElementById('length-val');
const htmlTag = document.getElementById('main-html');

const translations = {
    ar: {
        title: "إنشاء كلمة مرور آمنة وعشوائية فوراً",
        subtitle: "تخصيص كلمة المرور",
        length: "طول كلمة المرور",
        say: "سهلة النطق",
        read: "سهلة القراءة",
        all: "جميع الرموز",
        upper: "حروف كبيرة",
        lower: "حروف صغيرة",
        nums: "أرقام",
        syms: "رموز",
        copy: "نسخ كلمة المرور",
        toggle: "Switch to English",
        dir: "rtl"
    },
    en: {
        title: "Instantly generate a secure, random password",
        subtitle: "Customize your password",
        length: "Password Length",
        say: "Easy to say",
        read: "Easy to read",
        all: "All characters",
        upper: "Uppercase",
        lower: "Lowercase",
        nums: "Numbers",
        syms: "Symbols",
        copy: "Copy Password",
        toggle: "التحويل للعربية",
        dir: "ltr"
    }
};

function toggleLanguage() {
    const currentLang = htmlTag.getAttribute('lang') === 'ar' ? 'en' : 'ar';
    const t = translations[currentLang];
    
    htmlTag.setAttribute('lang', currentLang);
    htmlTag.setAttribute('dir', t.dir);
    
    document.getElementById('title').innerText = t.title;
    document.getElementById('subtitle').innerText = t.subtitle;
    document.getElementById('label-length').innerText = t.length;
    document.getElementById('opt-say').innerText = t.say;
    document.getElementById('opt-read').innerText = t.read;
    document.getElementById('opt-all').innerText = t.all;
    document.getElementById('opt-upper').innerText = t.upper;
    document.getElementById('opt-lower').innerText = t.lower;
    document.getElementById('opt-nums').innerText = t.nums;
    document.getElementById('opt-syms').innerText = t.syms;
    document.getElementById('main-copy-btn').innerText = t.copy;
    document.getElementById('lang-toggle').innerText = t.toggle;
}

function generatePassword() {
    const length = lengthSlider.value;
    const charset = {
        upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        lower: "abcdefghijklmnopqrstuvwxyz",
        nums: "0123456789",
        syms: "!@#$%^&*()_+"
    };
    
    let availableChars = "";
    if (document.getElementById('uppercase').checked) availableChars += charset.upper;
    if (document.getElementById('lowercase').checked) availableChars += charset.lower;
    if (document.getElementById('numbers').checked) availableChars += charset.nums;
    if (document.getElementById('symbols').checked) availableChars += charset.syms;

    if (availableChars === "") availableChars = charset.upper; // Default

    let password = "";
    for (let i = 0; i < length; i++) {
        password += availableChars.charAt(Math.floor(Math.random() * availableChars.length));
    }
    passwordInput.value = password;
    updateStrength(length);
}

function updateStrength(len) {
    const fill = document.getElementById('strength-fill');
    let width = (len / 20) * 100;
    fill.style.width = width > 100 ? "100%" : width + "%";
    fill.style.backgroundColor = len < 8 ? "#d32f2f" : len < 12 ? "#fbc02d" : "#388e3c";
}

function copyPassword() {
    passwordInput.select();
    document.execCommand('copy');
    alert("Copied!");
}

// مزامنة الـ Slider مع الرقم
lengthSlider.oninput = (e) => { lengthVal.value = e.target.value; generatePassword(); };
lengthVal.oninput = (e) => { lengthSlider.value = e.target.value; generatePassword(); };

// توليد كلمة مرور عند البدء
generatePassword();