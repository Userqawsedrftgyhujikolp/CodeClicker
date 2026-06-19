const Item_text = {//表示物兼Tier数定義
    //name->ボタンやステータスバーに表示されるテキスト・text->ホバー時に表示されるテキスト
    //ここに要素を追加することでT20まで増やせます（必ずT〇の名前で順番に増やすこと）
    //注意：T16 ~ T20はステータスが設定されていますが、数字が大きすぎるため不具合が生じる可能性があります
    //それ以上を追加する場合は上のItem_configのRankとPowerに要素を追加してください
    //名称:{name:``, text:``},
    Click: { name: `コーディング学習`, text: `効率の良いコーディング法を学びクリックによる生産量を増やす\n『プログラミング究極ガイド(税別30,000円)』` },
    T1: { name: `AIコーディング`, text: `コーディングをAIで自動化する\n『無課金でトークンを使い果たせ！』` },
    T2: { name: `プログラミング教室`, text: `プログラミング教室を開催し生徒にコードを書かせます\n『実務的な学習をあなたに！\n　*学習時のコードの権利は本校に帰属します*』` },
    T3: { name: `委託開発`, text: `他のプログラマにコーディングを依頼します\n『外注費：1日あたり玄米4合と味噌と少しの野菜』` },
    T4: { name: `チーム開発`, text: `エンジニアを雇用しチームでコーディングをします\n『労基法 みんなで犯せば 怖くない』` },
    T5: { name: `サーバ増設`, text: `サーバを購入し利用できる計算資源を増やします\n『自家製AI・玄人(くろうど)Code』` },
    T6: { name: `巨大ITベンチャー設立`, text: `数千人の技術者を雇用し巨大企業を設立します\n『絶えず美しい夜景を我々の手で』` },
    T7: { name: `量子コンピューター開発`, text: `量子の特性を活かし従来の数億倍の速さで演算をします\n『効率よくバグ取りができる、効率よくバグも発生する』` },
    T8: { name: `惑星探査`, text: `地球外を探査し他の惑星にデータセンターを設立します\n『開発において真に驚くべき方法を見つけたが、\n　それをするにはこの星は狭すぎる』` },
    T9: { name: `ダイソンスフィア`, text: `恒星を包む発電機を作り莫大な電力を演算に使用します\n『太陽の光が届かなくなったが、おかげで冷却効率は上がった』` },
    T10: { name: `人工脳`, text: `無数の人工脳細胞を培養し、夢の中でコードを書かせます\n『人工脳がコードの夢を見るのか、コードが人工脳の夢を見るのか\n　*就寝時間は労働時間に見なされません*』` },
    T11: { name: `タイムマシン`, text: `過去に戻り、見つかる前のバグを修正します\n『残業代はありません、タイムカードに記録がないですからね』` },
    T12: { name: `数学的特異点`, text: `ゼロ除算を始めとする新たな理論を構築し、数学的限界を超越します\n『コードの効率化のため、まず1=2とします』` },
    T13: { name: `多元宇宙`, text: `平行世界へ接続し宇宙全体をコンピュータにします\n『---マージコンフリクトを検出---\n　クソッ、他の自分がコードを書き替えやがった！』` },
    T14: { name: `機械仕掛けの神`, text: `コードにより神を構築し世界を書き換えます\n『神は死んだ？自分で創ればいいじゃないか』` },
    T15: { name: `JavaScript`, text: `この世界を構築するソースコードから更にコードを生み出します\n『全てはここから始まった』` },
}
const Itemkeys = Object.keys(Item_text);
//ステータス
const gameState = {
    Money: BigInt(Math.floor(parseFloat(localStorage.getItem('Money'))) || 0n),
    ClRank: parseInt(localStorage.getItem(`ClRank`) || 0),
    ClPow: parseInt(localStorage.getItem('ClPow') || 0),
};
for (let i = 1; i <= (Itemkeys.length - 1); i++) {
    gameState[`T${i}Rank`] = parseInt(localStorage.getItem(`T${i}Rank`) || 0);
    gameState[`T${i}Pow`] = parseInt(localStorage.getItem(`T${i}Pow`) || 0);
}
//その他データ準備
let isDev = parseInt(localStorage.getItem("debugFlg") || 0);
let lastTime = performance.now();
let Aps = 0n;
let nextTier = parseInt(localStorage.getItem(`nextTier`) || 1);

const Item_config = {//強化項目の数値
    //T20以上を追加する場合はRankとPowの両方を追加してください
    //注意：数字が大きすぎるためT16以降の挙動は不具合が発生する場合があります
    //BaceCost->基本価格・multipul->価格の上昇倍率・Pow->1購入あたりの秒間生産量
    ClRank: { BaceCost: 70000n, multipul: 26n, },
    //前のTierの13倍の価格・15倍のパワー
    T1Rank: { BaceCost: 2000000n, multipul: 13n, Pow: 1n },
    T2Rank: { BaceCost: 26000000n, multipul: 13n, Pow: 15n },
    T3Rank: { BaceCost: 338000000n, multipul: 13n, Pow: 225n },
    T4Rank: { BaceCost: 4394000000n, multipul: 13n, Pow: 3375n },
    T5Rank: { BaceCost: 57122000000n, multipul: 13n, Pow: 50625n },
    T6Rank: { BaceCost: 742586000000n, multipul: 13n, Pow: 759375n },
    T7Rank: { BaceCost: 9653618000000n, multipul: 13n, Pow: 11390625n },
    T8Rank: { BaceCost: 125497034000000n, multipul: 13n, Pow: 170859375n },
    T9Rank: { BaceCost: 1631461442000000n, multipul: 13n, Pow: 2562890625n },
    T10Rank: { BaceCost: 21208998746000000n, multipul: 13n, Pow: 38443359375n },
    T11Rank: { BaceCost: 275716983698000000n, multipul: 13n, Pow: 576650390625n },
    T12Rank: { BaceCost: 3584320788074000000n, multipul: 13n, Pow: 8649755859375n },
    T13Rank: { BaceCost: 46596170244962000000n, multipul: 13n, Pow: 129746337890625n },
    T14Rank: { BaceCost: 605750213184506000000n, multipul: 13n, Pow: 1946195068359375n },
    T15Rank: { BaceCost: 7874752771398578000000n, multipul: 13n, Pow: 29192926025390625n },
    //ここから未使用です
    T16Rank: { BaceCost: 102371786028181514000000n, multipul: 13n, Pow: 437893890380859375n },
    T17Rank: { BaceCost: 1330833218366359682000000n, multipul: 13n, Pow: 6568408355712890625n },
    T18Rank: { BaceCost: 17300831838762675866000000n, multipul: 13n, Pow: 98526125335693359375n },
    T19Rank: { BaceCost: 224910813903914786258000000n, multipul: 13n, Pow: 1477891880035400390625n },
    T20Rank: { BaceCost: 2923840580750892221354000000n, multipul: 13n, Pow: 22168378200531005859375n },
    //基本価格（各TierのRankのBaceCost）の5.5倍
    T1Pow: { BaceCost: 11000000n, multipul: 29n },
    T2Pow: { BaceCost: 143000000n, multipul: 29n },
    T3Pow: { BaceCost: 1859000000n, multipul: 29n },
    T4Pow: { BaceCost: 24167000000n, multipul: 29n },
    T5Pow: { BaceCost: 314171000000n, multipul: 29n },
    T6Pow: { BaceCost: 4084223000000n, multipul: 29n },
    T7Pow: { BaceCost: 53094899000000n, multipul: 29n },
    T8Pow: { BaceCost: 690233687000000n, multipul: 29n },
    T9Pow: { BaceCost: 8973037931000000n, multipul: 29n },
    T10Pow: { BaceCost: 116649493103000000n, multipul: 29n },
    T11Pow: { BaceCost: 1516443410339000000n, multipul: 29n},
    T12Pow: { BaceCost: 19713764334407000000n, multipul: 29n },
    T13Pow: { BaceCost: 256278936347291000000n, multipul: 29n },
    T14Pow: { BaceCost: 3331626172514783000000n, multipul: 29n },
    T15Pow: { BaceCost: 43311140242692179000000n, multipul: 29n },
    //ここからは未使用です
    T16Pow: { BaceCost: 563044823154998327000000n, multipul: 29n },
    T17Pow: { BaceCost: 7319582701014978251000000n, multipul: 29n },
    T18Pow: { BaceCost: 95154575113194717263000000n, multipul: 29n },
    T19Pow: { BaceCost: 1237009476471531324419000000n, multipul: 29n },
    T20Pow: { BaceCost: 16081123194129907217447000000n, multipul: 29n },
}

//数値更新時処理等
const game = new Proxy(gameState, {
    set(target, prop, value) {
        target[prop] = value;
        if (prop === 'Money') {
            document.querySelector('.Money').textContent = formatNum(value);
            while (Item_config[`T${nextTier}Rank`]) {//所持金に応じたTierの解放
                const targetConfig = Item_config[`T${nextTier}Rank`];
                // そのTierの基本価格の30%のお金が溜まったら強化の表示解放
                if (value >= ((targetConfig.BaceCost * 3n) / 10n)) {
                    unlockTierDOM(nextTier);
                    nextTier++;
                } else {
                    break;
                }
            }
        }
        if (prop === 'ClRank') {
            document.querySelector('.ClPow').textContent = `${Item_text['Click']['name']}: ${Math.floor(value + 1)}`;
            let Cost = calCost('ClRank', value);
            document.querySelector('.UpgradeClk').value = `${Item_text['Click']['name']} (＄: ${formatNum(Cost)})`;
        }
        if (/^T\d+Rank$/.test(prop)) {
            const tier = prop.replace('Rank', "");
            document.querySelector(`.${tier}`).textContent = `${Item_text[tier]['name']}: ${Math.floor(value)}`;
            let Cost = calCost(prop, value);
            document.querySelector(`.Auto${tier}`).value = `${Item_text[tier]['name']} (＄: ${formatNum(Cost)})`;
            Aps = calAps();
        }
        if (/^T\d+Pow$/.test(prop)) {
            const tier = prop.replace('Pow', "");
            const disTier = prop.replace('ow', "");
            document.querySelector(`.${disTier}`).textContent = `${tier}強化: ${Math.floor(value + 1)}`;
            let Cost = calCost(prop, value);
            document.querySelector(`.${prop}`).value = `${tier}強化 (＄: ${formatNum(Cost)})`;
            Aps = calAps();
        }
        return true;
    }
});

//処理
function cordingClk() {//クリック時処理
    game.Money += 1000n * (2n ** BigInt(game.ClRank));
}
function gameLoop(currentTime) {//自動化
    //前回のフレームから何秒経過したかを計算
    const deltaTime = Math.floor(currentTime - lastTime);
    lastTime = currentTime;
    //自動増加（Aps）がある場合、経過時間分だけお金を増やす
    if (Aps > 0) {
        game.Money += Aps * BigInt(deltaTime);
    }
    //ブラウザの次の描画タイミングで、再びこのgameLoopを実行する（無限ループ）
    requestAnimationFrame(gameLoop);
}
function calAps() {//Aps計算
    let num = 0n;
    for (let i = 1; i <= (Itemkeys.length - 1); i++) {
        num += Item_config[`T${i}Rank`].Pow * BigInt(game[`T${i}Rank`]) * (2n ** BigInt(game[`T${i}Pow`]));
    }
    if (zeroApsFlg) {
        num = 0n;
    }
    document.querySelector('.aps').textContent = formatNum(num*1000n);
    if(isDev){
        console.log('Aps: ',num)
    }
    return num;
}
function calCost(Key, Rank) {//強化コスト計算
    const item = Item_config[Key];
    const Brank = BigInt(Rank);
    if (!item) { return -1n };
    let Cost = (item.BaceCost * (item.multipul ** Brank));
    Cost *= 11n ** (Brank / 5n);
    const div = 10n * (10n ** Brank) * (10n ** (Brank/5n));
    Cost /= div;
    if (isDev) {
        console.log('コスト: ', Key, ' = ', Cost,':(',formatNum(Cost),')');
    }
    return Cost;
}//calCost('T1Rank',game.T1Rank);
function formatNum(num) {//数値の整形
    // 1万未満の場合はそのまま返す
    num = num / 1000n;
    if (num < 10000n) {
        return num.toString();
    }
    //桁数と表示する文字を定義
    const units = [
        { value: 10n ** 32n, symbol: '溝' },
        { value: 10n ** 28n, symbol: '穣' },
        { value: 10n ** 24n, symbol: '𥝱' },
        { value: 10n ** 20n, symbol: '垓' },
        { value: 10n ** 16n, symbol: '京' },
        { value: 10n ** 12n, symbol: '兆' },
        { value: 10n ** 8n, symbol: '億' },
        { value: 10n ** 4n, symbol: '万' },
    ];
    //上記オブジェクトの上から順に数値を比較し適切な桁を調べる
    for (let i = 0; i < units.length; i++) {
        if (num >= units[i].value) {
            let numstr = (num / (units[i].value / 100n))+``;
            return numstr.slice(0, -2)+'.'+numstr.slice(-2)+ units[i].symbol;
            
        }
    }
    return num.toString();
}
function unlockTierDOM(tier) {//非表示の解除
    const autoBtn = document.querySelector(`.AutoT${tier}`);
    const powBtn = document.querySelector(`.T${tier}Pow`);
    const autoSta = document.querySelector(`.T${tier}`);
    const powSta = document.querySelector(`.T${tier}P`);
    if (autoBtn) autoBtn.classList.remove('hidden');
    if (powBtn) powBtn.classList.remove('hidden');
    if (autoSta) autoSta.classList.remove('hidden');
    if (powSta) powSta.classList.remove('hidden');
    if (isDev) {
        console.log(`Tier${tier}の情報を表示しました`)
    }
}

//強化系
function buyUpgrade(rank) {//自動化購入
    let Cost = calCost(rank, game[rank]);
    if (Cost <= 0n) {return false;}
    if (game.Money >= Cost) {
        game.Money -= Cost;
        game[rank]++;
        if (isDev) {
            console.log(`${rank}購入/${rank}.`);
        }
        return true;
    }
}
//保存
function saveGame() {//保存処理
    localStorage.setItem('Money', game.Money);
    localStorage.setItem('ClRank', game.ClRank);
    localStorage.setItem('ClPow', game.ClPow);
    for (let i = 1; i <= (Itemkeys.length - 1); i++) {
        localStorage.setItem(`T${i}Rank`, game[`T${i}Rank`]);
        localStorage.setItem(`T${i}Pow`, game[`T${i}Pow`]);
    }
    localStorage.setItem('nextTier', nextTier);
    if (isDev) {
        console.log(`進行を保存しました`);
    }
    return true;
}
setInterval(() => {//オートセーブ
    if (isDev) {
        console.log("オートセーブ実行...");
    }
    saveGame();
}, 300000);

//デバッグメニュー
function debugFlg() {
    let Flg = document.querySelector('#debugFlg');
    if (Flg.checked) {
        isDev = 1;
        localStorage.setItem(`debugFlg`, 1);
        console.log(`デバッグメニューを有効にしました`);
        saveGame();
    } else {
        isDev = 0;
        localStorage.setItem(`debugFlg`, 0);
        console.log(`デバッグメニューを無効にしました`);
        saveGame();
    }
}
function mReset() {//リセット処理
    if (isDev) {
        game.Money = 0n;
        console.log(`所持金を初期化しました/Money has been reset.`);
    }
}
function cReset() {//クリックリセット
    if (isDev) {
        game.ClRank = 0;
        console.log(`クリックを初期化しました/TierUpgrade has been reset.`);
    }
}
function aReset() {//完全リセット処理
    if (isDev) {
        if (confirm("本当にリセットしますか？\n*セーブデータも削除され元に戻すことができません*")) {
            localStorage.clear();
            game.Money = 0n;
            game.ClRank = 0;
            game.ClPow = 0;
            for (let i = 1; i <= (Itemkeys.length - 1); i++) {
                game[`T${i}Rank`] = 0;
                game[`T${i}Pow`] = 0;
            }
            Aps = calAps();
            nextTier = 1;
            saveGame();
            console.log(`進行を初期化しました/GameData has been reset.`);
            location.reload();
        }
    }
}
function tReset() {//施設数リセット
    if (isDev) {
        for (let i = 1; i <= (Itemkeys.length - 1); i++) {
            game[`T${i}Rank`] = 0;
        }
        console.log(`施設数を初期化しました/TierUpgrade has been reset.`);
    }
}
function pReset() {//施設強化リセット
    if (isDev) {
        for (let i = 1; i <= (Itemkeys.length - 1); i++) {
            game[`T${i}Pow`] = 0;
        }
        console.log(`施設強化を初期化しました/TierPow has been reset.`);
    }
}
function addMoney(i) {//所持金増額
    if (isDev) {
        const add = 1000n * (10n ** BigInt(i));
        game.Money += add;
        console.log(`所持金を${add}(${formatNum(add)})増やしました/.`);
    }
}
let zeroApsFlg = 0;
function zeroAps() {//Apsを0にする
    if (isDev) {
        if (document.querySelector('.debugAps1').checked) {
            zeroApsFlg = 1;
            Aps = calAps();
            console.log(`Apsを0にします`);
        } else {
            zeroApsFlg = 0;
            Aps = calAps();
            console.log(`通常のApsにします`);
        }
    }
}

// 起動時処理
//表示物
//購入ボタン
const buyTable = document.querySelector('.BuyUpgrade');
let buyButton = `
<tr>
<td><input type="button" class="UpgradeClk" value="Click" title="Clicktext"></td>
<td></td>
</tr>
`;
for (let i = 1; i <= (Itemkeys.length - 1); i++) {
    buyButton += `
    <tr>
    <td><input type="button" class="AutoT${i} hidden" value="Tier${i}"></td>
    <td><input type="button" class="T${i}Pow hidden" value="T${i}強化"></td>
    </tr>
    `;
}
buyTable.innerHTML = buyButton;
//ステータスバー
const statusTable = document.querySelector('.status');
let statusdis = `
<tr>
<td><span class="ClPow">Click</span></td>
<td><span class="ClP"></span></td>
</tr>
`;
for (let i = 1; i <= (Itemkeys.length - 1); i++) {
    statusdis += `
    <tr>
    <td><span class="T${i} hidden">tier${i}</span></td>
    <td><span class="T${i}P hidden">tier${i}Pow</span></td>
    </tr>
    `;
}
statusTable.innerHTML = statusdis;
//各種数値の初期化
game.Money = game.Money;
game.ClRank = game.ClRank;
document.querySelector('.UpgradeClk').title = Item_text['Click']['text'];
for (let i = 1; i <= (Itemkeys.length - 1); i++) {
    game[`T${i}Rank`] = game[`T${i}Rank`];
    game[`T${i}Pow`] = game[`T${i}Pow`];
    document.querySelector(`.AutoT${i}`).title = Item_text[`T${i}`]['text'];
}
Aps = calAps();
//起動時の非表示解除
for (let i = 1; i < nextTier; i++) {
    unlockTierDOM(i);
}
if (isDev) {
    document.querySelector('.debug').removeAttribute('hidden');
    const debFlgBox = document.querySelector('#debugFlg');
    debFlgBox.checked = true;
}
//イベント定義
requestAnimationFrame(gameLoop);
document.querySelector('.cording').addEventListener(`click`, cordingClk);
//アップグレード
document.querySelector('.UpgradeClk').addEventListener(`click`, () => buyUpgrade('ClRank'));
//自動化強化
for (let i = 1; i <= (Itemkeys.length - 1); i++) {
    document.querySelector(`.AutoT${i}`).addEventListener(`click`, () => buyUpgrade(`T${i}Rank`));//自動化個数
    document.querySelector(`.T${i}Pow`).addEventListener(`click`, () => buyUpgrade(`T${i}Pow`));//自動化強化
}
//その他
document.querySelector('.save').addEventListener(`click`, saveGame);
document.querySelector('#debugFlg').addEventListener(`change`, debugFlg);
document.querySelector('.reset1').addEventListener(`click`, mReset);
document.querySelector('.reset2').addEventListener(`click`, cReset);
document.querySelector('.reset3').addEventListener(`click`, tReset);
document.querySelector('.reset4').addEventListener(`click`, pReset);
document.querySelector('.resetAll').addEventListener(`click`, aReset);
document.querySelector('.debugM1').addEventListener(`click`, () => addMoney(4));
document.querySelector('.debugM2').addEventListener(`click`, () => addMoney(8));
document.querySelector('.debugM3').addEventListener(`click`, () => addMoney(12));
document.querySelector('.debugM4').addEventListener(`click`, () => addMoney(16));
document.querySelector('.debugM5').addEventListener(`click`, () => addMoney(20));
document.querySelector('.debugAps1').addEventListener(`change`, zeroAps);
if (!(isDev)) {
    alert('コードクリッカーへようこそ！\n\n「コードを書く」をクリックしてお金を稼ぎ\n稼いだお金で更にコーディングを加速させよう！');
}