// Will hold all our client secret keys (Facebook, Twitter, etc.)

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '543379219182714', // your App ID
        'clientSecret'  : 'd6afdcb9270e3a5e5904bdd205d9c1c9', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'XECXRhU0BQMEhwMwpDEqfghyT',
        'consumerSecret'    : 'AifKazNwfyyrkgtiO7i4YEuWCAPc1rAQnRWFn68SCOnVOv6Ad6',
        'callbackURL'       : 'http://127.0.0.1:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '815561495509-kiop2rp4ia5g1rpukomfoavrq3or025f.apps.googleusercontent.com',
        'clientSecret'  : 'SUE65VaVdxgkcvRe_mdKeFlC',
        'callbackURL'   : 'http://127.0.0.1:8080/auth/google/callback'
    }

};
