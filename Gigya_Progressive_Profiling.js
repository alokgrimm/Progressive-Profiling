{
    customEventMap: {
        eventMap: [{
            events: '*',
            args: [function(e) {
                return e;
            }],
            method: function(e) {
                if (e.fullEventName === 'accounts.login') {
                    //alert("login Success");
                    var userGlobalLogins;
					//alert(e.data.progressive_logins);
                    if (typeof(e.data.progressive_logins) !== 'undefined') {
                        userGlobalLogins = e.data.progressive_logins +1;
                        gigya.accounts.setAccountInfo({
                            data: {
                                "progressive_logins": userGlobalLogins
                            }
                        });
                        var tester = function() {
                            var a = userGlobalLogins/5; // set N
                            if (a.toString().indexOf('.') === -1) { // If the result of userGlobalLogins divided by N is not a float, the screen fires. In this case, the screen will fire every 5th login.
                                gigya.accounts.showScreenSet({
                                    screenSet: 'New-ProfileUpdate',
                                    startScreen: 'progressive-profiling-custom-screen'
                                });
                            }
                        };
                        tester();
                    } else {
                        userGlobalLogins = 1;
                        gigya.accounts.setAccountInfo({
                            data: {
                                "progressive_logins": 1
                            }
                        });
                    }
                } if (e.fullEventName === 'accounts.login') {
					//alert("time_login");
                gigya.accounts.getAccountInfo({callback: function(e) {
                    window['cAccountInfo'] = e;
                    cregTime = cAccountInfo.registeredTimestamp;
                    cAccountInfo.currentTime = Date.now();
                    cAccountInfo.diff = cAccountInfo.currentTime - cregTime;
					gigya.accounts.setAccountInfo({
                        data: {
                            numLogin: (e.data.numLogin || 0) + 1
                        }
                    });
					//alert("numLogins "+e.data.numLogin);
                    if ((cAccountInfo.diff < 300000) && (e.data.numLogin === 3)) {
                        alert(cAccountInfo.diff);
                        gigya.accounts.showScreenSet({
                                screenSet: 'New-ProfileUpdate',
                                startScreen: 'progressive-profiling'
                            });
                    }
                }});
                }
            }
        }]
    }
}