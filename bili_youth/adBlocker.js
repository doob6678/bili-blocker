function exec() {

    chrome.storage.sync.get(['adBlockingEnabled','liveBlockingEnabled'],function(result){
        if(result.adBlockingEnabled){
    //去掉广告
    let allAdEl = document.querySelectorAll('svg[class=bili-video-card__info--ad]');
        let adArray = Array.from(allAdEl); 
        
            adArray.forEach((ad) => {
                let adCard = ad.closest('div.bili-video-card');
                if (adCard) {
                    adCard.style.display = 'none';
                }
             });    

        }
        if(result.liveBlockingEnabled){
    // 去掉直播卡片和普通直播
    let imgs = document.querySelectorAll('img[data-v-1ae530d2]');
   
        imgs.forEach(img => {
            let liveCard = img.closest('div.floor-single-card');
            if(liveCard){
                liveCard.style.display = 'none';
            }
        });
    
        
     let livingTextElements = document.querySelectorAll('span.bili-live-card__info--living__text');
    
        livingTextElements.forEach(ad => {
            let adCarde = ad.closest('div.bili-live-card');
            if (adCarde) {
            adCarde.style.display = 'none'; 
        }
        });
    
        }
    })
    

    
}

//滚动时调用
exec(); 
document.addEventListener('scroll', exec);




