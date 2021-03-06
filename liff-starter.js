
window.onload = function (e) {
    liff.init(function () {
        initializeApp();
    });
    $('button').hover(function(){
    $('.glitch-wrapper').toggleClass('paused');
    $('body').toggleClass('paused');
    });
};

function initializeApp(){
    var type = getParameterByName('type')
    if (type=== "text") {
        liff.sendMessages([{type: 'text',text: getParameterByName('text')}]).then(function () {liff.closeWindow()});
    }else if(type=="sticker"){
        var stk = getParameterByName('tstk');
        var sid = getParameterByName('stkid');
        var pkg = getParameterByName('stkpkgid');
        var send = getParameterByName('send');
        var uriz="line://shop/sticker/detail/"+pkg;
        var tp="";
        var ep = '';
        if (stk === 'animasi') {
            ep = "https://stickershop.line-scdn.net/stickershop/v1/sticker/"+sid+"/IOS/sticker_animation@2x.png";
            tp="a";
        } else {
            ep = "https://stickershop.line-scdn.net/stickershop/v1/sticker/"+sid+"/IOS/sticker@2x.png";
            tp="n";
        }
        if (send===null){
        }else{
            if(send===true || send==="true")
                if(tp==="a"){
                    uriz="line://app/1656952450-WzGl2y3G/?type=sticker&tstk=animasi&stkid="+sid+"&stkpkgid="+pkg+"&send=true";
                }else{
                    uriz="line://app/1656952450-WzGl2y3G/?type=sticker&tstk=anime&stkid="+sid+"&stkpkgid="+pkg+"&send=true";
                }
        }
        liff.sendMessages([{
            type: "template",
            altText: "Sticker",
            template: {
                type: "image_carousel",
                columns: [
                    {
                        imageUrl: ep,
                        action: {
                            type: "uri",
                            uri: uriz
                        }
                    }
                ]
            }
        }]).then(function () {
            liff.closeWindow();
        });
    }else if (type === 'audio') {
        liff.sendMessages([{
            type: 'audio',
            originalContentUrl: getParameterByName('link'),
            duration: 60000
        }]).then(function () {
            liff.closeWindow();
        });
    }else if (type === 'image') {
        liff.sendMessages([{
            type: 'image',
            originalContentUrl: getParameterByName('img'),
            previewImageUrl: getParameterByName('img')
        }]).then(function () {
            liff.closeWindow();
        });
    }else if (type === 'video') {
        liff.sendMessages([{
            type: 'video',
            originalContentUrl: getParameterByName('ocu'),
            previewImageUrl: getParameterByName('piu')
        }]).then(function () {
            liff.closeWindow();
        });
    }
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
