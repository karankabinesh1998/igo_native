export function walletValidator(amount) {
    // let d = /^\d{10}$/;
    if (!amount) return "Amount cannot be empty.";
    if(amount<500) return "Minimum Recharge Amount 500" 
    // if (!mobile.match(d)) return 'Invalid mobile number'
    // if (mobile.length < 11 ) return 'Enter the correct mobile number'
    return '';
  }