export function otpValidator(mobile) {
    let d = /^\d{10}$/;
    if (!mobile) return "Otp Number can't be empty."
    // if (!mobile.match(d)) return 'Invalid mobile number'
    // if (mobile.length < 11 ) return 'Enter the correct mobile number'
    
    return ''
  }