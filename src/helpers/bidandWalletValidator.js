
export function bidandWalletValidator(wallet,bidamount) {
    // let d = /^\d{10}$/;
    if(wallet==null) return 'Please Add wallet amount'
    if (parseInt(wallet)-500 < parseInt(bidamount)) return "Insufficient Fund Please add Wallet amount."
    // if (!mobile.match(d)) return 'Invalid mobile number'
    // if (mobile.length < 11 ) return 'Enter the correct mobile number'
    
    return ''
  }