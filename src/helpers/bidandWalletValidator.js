
export function bidandWalletValidator(wallet,bidamount) {
    // let d = /^\d{10}$/;
    if (parseInt(wallet) < parseInt(bidamount)) return "Insufficient Fund Please add Wallet amount."
    // if (!mobile.match(d)) return 'Invalid mobile number'
    // if (mobile.length < 11 ) return 'Enter the correct mobile number'
    
    return ''
  }