console.log('HelloWorld');
const Item_text = {//表示物兼Tier数定義
    //name->ボタンやステータスバーに表示されるテキスト・text->ホバー時に表示されるテキスト
    //ここに要素を追加することでT20まで増やせます（必ずT〇の名前で順番に増やすこと）
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
    T10: { name: `人工脳`, text: `無数の人工脳細胞を培養し、夢の中でコードを書かせます\n『人工脳がコードの夢を見るのか、コードが人工脳の夢を見るのか\n　**就寝時間は労働時間に見なされません**』` },
    T11: { name: `タイムマシン`, text: `過去に戻り、見つかる前のバグを修正します\n『残業代はありません、タイムカードに記録がないですからね』` },
    T12: { name: `数学的特異点`, text: `ゼロ除算を始めとする新たな理論を構築し、数学的限界を超越します\n『コードの効率化のため、まず1=2とします』` },
    T13: { name: `多元宇宙`, text: `平行世界へ接続し宇宙全体をコンピュータにします\n『---マージコンフリクトを検出---\n　クソッ、他の自分がコードを書き替えやがった！』` },
    T14: { name: `機械仕掛けの神`, text: `コードにより神を構築し世界を書き換えます\n『神は死んだ？自分で創ればいいじゃないか』` },
    T15: { name: `JavaScript`, text: `この世界を構築するソースコードから更にコードを生み出します\n『全てはここから始まった』` },
}
const Itemkeys = Object.keys(Item_text);
//ステータス
const gameState = {
    Money: parseFloat(localStorage.getItem('Money')) || 0,
    ClRank: parseInt(localStorage.getItem(`ClRank`)) || 0,
    ClPow: parseInt(localStorage.getItem('ClPow')) || 0,
};
for (let i = 1; i <= (Itemkeys.length - 1); i++) {
    gameState[`T${i}Rank`] = parseInt(localStorage.getItem(`T${i}Rank`)) || 0;
    gameState[`T${i}Pow`] = parseInt(localStorage.getItem(`T${i}Pow`)) || 0;
}
let isDev = parseInt(localStorage.getItem("debugFlg")) || 0;
let lastTime = performance.now();
let Aps = parseFloat(0);
let nextTier = parseInt(localStorage.getItem(`nextTier`)) || 1;

const Item_config = {//強化項目の数値
    //BaceCost->基本価格・multipul->価格の上昇倍率・Pow->1購入あたりの秒間生産量
    ClRank: { BaceCost: 20, multipul: 3.4, },
    //前のTierの13倍の価格・15倍のパワー
    T1Rank: { BaceCost: 200, multipul: 1.3, Pow: 1 },
    T2Rank: { BaceCost: 2600, multipul: 1.3, Pow: 15 },
    T3Rank: { BaceCost: 33800, multipul: 1.3, Pow: 225 },
    T4Rank: { BaceCost: 439400, multipul: 1.3, Pow: 3375 },
    T5Rank: { BaceCost: 5712200, multipul: 1.3, Pow: 50625 },
    T6Rank: { BaceCost: 74258600, multipul: 1.3, Pow: 759375 },
    T7Rank: { BaceCost: 965361800, multipul: 1.3, Pow: 11390625 },
    T8Rank: { BaceCost: 12549703400, multipul: 1.3, Pow: 170859375 },
    T9Rank: { BaceCost: 163146144200, multipul: 1.3, Pow: 2562890625 },
    T10Rank: { BaceCost: 2120899874600, multipul: 1.3, Pow: 38443359375 },
    T11Rank: { BaceCost: 27571698369800, multipul: 1.3, Pow: 576650390625 },
    T12Rank: { BaceCost: 358432078807400, multipul: 1.3, Pow: 8649755859375 },
    T13Rank: { BaceCost: 4659617024496200, multipul: 1.3, Pow: 129746337890625 },
    T14Rank: { BaceCost: 60575021318450600, multipul: 1.3, Pow: 1946195068359375 },
    T15Rank: { BaceCost: 787475277139857800, multipul: 1.3, Pow: 29192926025390625 },
    //ここから未使用です
    T16Rank: { BaceCost: 10237178602818151400, multipul: 1.3, Pow: 437893890380859375 },
    T17Rank: { BaceCost: 133083321836635968200, multipul: 1.3, Pow: 6568408355712890625 },
    T18Rank: { BaceCost: 1730083183876267586600, multipul: 1.3, Pow: 98526125335693359375 },
    T19Rank: { BaceCost: 22491081390391478625800, multipul: 1.3, Pow: 1477891880035400390625 },
    T20Rank: { BaceCost: 292384058075089222135400, multipul: 1.3, Pow: 22168378200531005859375 },
    //基本価格（各TierのRankのBaceCost）の5.5倍
    T1Pow: { BaceCost: 1100, multipul: 2.9 },
    T2Pow: { BaceCost: 14300, multipul: 2.9 },
    T3Pow: { BaceCost: 185900, multipul: 2.9 },
    T4Pow: { BaceCost: 2416700, multipul: 2.9 },
    T5Pow: { BaceCost: 31417100, multipul: 2.9 },
    T6Pow: { BaceCost: 408422300, multipul: 2.9 },
    T7Pow: { BaceCost: 5309489900, multipul: 2.9 },
    T8Pow: { BaceCost: 69023368700, multipul: 2.9 },
    T9Pow: { BaceCost: 897303793100, multipul: 2.9 },
    T10Pow: { BaceCost: 11664949310300, multipul: 2.9 },
    T11Pow: { BaceCost: 151644341033900, multipul: 2.9 },
    T12Pow: { BaceCost: 1971376433440700, multipul: 2.9 },
    T13Pow: { BaceCost: 25627893634729100, multipul: 2.9 },
    T14Pow: { BaceCost: 333162617251478300, multipul: 2.9 },
    T15Pow: { BaceCost: 4331114024269217900, multipul: 2.9 },
    //ここからは未使用です
    T16Pow: { BaceCost: 56304482315499832700, multipul: 2.9 },
    T17Pow: { BaceCost: 731958270101497825100, multipul: 2.9 },
    T18Pow: { BaceCost: 9515457511319471726300, multipul: 2.9 },
    T19Pow: { BaceCost: 123700947647153132441900, multipul: 2.9 },
    T20Pow: { BaceCost: 1608112319412990721744700, multipul: 2.9 },
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
                if (value >= targetConfig.BaceCost * 0.3) {
                    unlockTierDOM(nextTier);
                    nextTier++;
                } else {
                    break;
                }
            }
        }
        if (prop === 'ClRank') {
            document.querySelector('.ClPow').textContent = `${Item_text['Click']['name']}: ${Math.floor(value + 1)}`;
            let Cost = CalCost('ClRank', value);
            document.querySelector('.UpgradeClk').value = `${Item_text['Click']['name']} (＄: ${formatNum(Cost)})`;
        }
        if (/^T\d+Rank$/.test(prop)) {
            const tier = prop.replace('Rank', "");
            document.querySelector(`.${tier}`).textContent = `${Item_text[tier]['name']}: ${Math.floor(value)}`;
            let Cost = CalCost(prop, value);
            document.querySelector(`.Auto${tier}`).value = `${Item_text[tier]['name']} (＄: ${formatNum(Cost)})`;
            Aps = CalAps();
        }
        if (/^T\d+Pow$/.test(prop)) {
            const tier = prop.replace('Pow', "");
            const disTier = prop.replace('ow', "");
            document.querySelector(`.${disTier}`).textContent = `${tier}強化: ${Math.floor(value + 1)}`;
            let Cost = CalCost(prop, value);
            document.querySelector(`.${prop}`).value = `${tier}強化 (＄: ${formatNum(Cost)})`;
            Aps = CalAps();
        }
        return true;
    }
});

//処理
function Cordingclk() {//クリック時処理
    game.Money += 1 * (Math.pow(2, game.ClRank));
}
function gameLoop(currentTime) {//自動化
    //前回のフレームから何秒経過したかを計算（ミリ秒を秒に直すため / 1000）
    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    //自動増加（Aps）がある場合、経過時間分だけお金を増やす
    if (Aps > 0) {
        //例:1秒に10増える(Aps=10)状態で、0.016秒(1フレーム)経過したら、0.16増える
        game.Money += Aps * deltaTime;
    }
    //ブラウザの次の描画タイミングで、再びこのgameLoopを実行する（無限ループ）
    requestAnimationFrame(gameLoop);
}
function CalAps() {//Aps計算

    let num = 0;
    for (let i = 1; i <= (Itemkeys.length - 1); i++) {
        num += Item_config[`T${i}Rank`].Pow * (game[`T${i}Rank`] * Math.pow(2, game[`T${i}Pow`]));
    }
    if(1 == zeroApsFlg){
        num = 0;
    }
    document.querySelector('.aps').textContent = formatNum(num);
    return num;
}
function CalCost(Key, Rank) {//強化コスト計算
    const item = Item_config[Key];
    if (!item) { return false };
    let Cost = item.BaceCost * Math.pow(item.multipul, Rank);
    Cost *= Math.pow(1.2, Math.floor(Rank / 5));
    console.log('コスト: ', Key, ' = ', Cost);
    return Cost;
}//CalCost('T1Rank',game.T1Rank);
function formatNum(num) {//数値の整形
    // 1万未満の場合はそのまま返す
    if (num < 10000) {
        return Math.floor(num).toString();
    }
    //桁数と表示する文字を定義
    const units = [
        { value: 1e24, symbol: '𥝱' },
        { value: 1e20, symbol: '垓' },
        { value: 1e16, symbol: '京' },
        { value: 1e12, symbol: '兆' },
        { value: 1e8, symbol: '億' },
        { value: 1e4, symbol: '万' },
    ];
    //上記オブジェクトの上から順に数値を比較し適切な桁を調べる
    for (let i = 0; i < units.length; i++) {
        if (num >= units[i].value) {
            return (num / units[i].value).toFixed(2) + units[i].symbol;
        }
    }
    return Math.floor(num).toString();
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
}

//強化系
function BuyUpgrade(rank) {//自動化購入
    let Cost = CalCost(rank, game[rank]);
    if (game.Money >= Cost) {
        game.Money -= Cost;
        game[rank]++;
        console.log(`${rank}購入/${rank}.`);
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
    console.log(`進行を保存しました`);
    return true;
}
setInterval(() => {//オートセーブ
    console.log("オートセーブ実行...");
    saveGame();
}, 300000);

//デバッグメニュー
function debugFlg() {
    let Flg = document.querySelector('#debugFlg');
    if (Flg.checked) {
        localStorage.setItem(`debugFlg`, 1);
        saveGame();
        console.log(`デバッグメニューを常に有効にします`);
    } else {
        localStorage.setItem(`debugFlg`, 0);
        saveGame();
        console.log(`次回起動時デバッグメニューを非表示にします`);
    }
}
function Mreset() {//リセット処理
    game.Money = 0;
    console.log(`所持金を初期化しました/Money has been reset.`);
}
function Creset() {//クリックリセット
    game.ClRank = 0;
    console.log(`クリックを初期化しました/TierUpgrade has been reset.`);
}
function Areset() {//完全リセット処理
    if (confirm("本当にリセットしますか？\n*セーブデータも削除され元に戻すことができません*")) {
        localStorage.clear();
        game.Money = 0;
        game.ClRank = 0;
        game.ClPow = 0;
        for (let i = 1; i <= (Itemkeys.length - 1); i++) {
            game[`T${i}Rank`] = 0;
            game[`T${i}Pow`] = 0;
        }
        Aps = CalAps();
        nextTier = 1;
        saveGame();
        console.log(`進行を初期化しました/GameData has been reset.`);
        location.reload();
    }
}
function Treset() {//施設数リセット
    for (let i = 1; i <= (Itemkeys.length - 1); i++) {
        game[`T${i}Rank`] = 0;
    }
    console.log(`施設数を初期化しました/TierUpgrade has been reset.`);
}
function Preset() {//施設強化リセット
    for (let i = 1; i <= (Itemkeys.length - 1); i++) {
        game[`T${i}Pow`] = 0;
    }
    console.log(`施設強化を初期化しました/TierPow has been reset.`);
}
function addMoney(i) {//所持金増額
    game.Money += 1 * Math.pow(10, i);
    console.log(`所持金を増やしました/.`);
}
let zeroApsFlg = 0;
function ZeroAps(){//Apsを0にする
        if (document.querySelector('.debugAps1').checked) {
        zeroApsFlg = 1;
        Aps = CalAps();
        console.log(`Apsを0にします`);
    } else {
        zeroApsFlg = 0;
        Aps = CalAps();
        console.log(`通常のApsにします`);
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
Aps = CalAps();
//起動時の非表示解除
for (let i = 1; i < nextTier; i++) {
    unlockTierDOM(i);
}
if (1 == isDev) {
    document.querySelector('.debug').removeAttribute('hidden');
    const debFlgBox = document.querySelector('#debugFlg');
    debFlgBox.checked = true;
}
//イベント定義
requestAnimationFrame(gameLoop);
document.querySelector('.cording').addEventListener(`click`, Cordingclk);
//アップグレード
document.querySelector('.UpgradeClk').addEventListener(`click`, () => BuyUpgrade('ClRank'));
//自動化強化
for (let i = 1; i <= (Itemkeys.length - 1); i++) {
    document.querySelector(`.AutoT${i}`).addEventListener(`click`, () => BuyUpgrade(`T${i}Rank`));//自動化個数
    document.querySelector(`.T${i}Pow`).addEventListener(`click`, () => BuyUpgrade(`T${i}Pow`));//自動化強化
}
//その他
document.querySelector('.save').addEventListener(`click`, saveGame);
document.querySelector('#debugFlg').addEventListener(`change`, debugFlg);
document.querySelector('.reset1').addEventListener(`click`, Mreset);
document.querySelector('.reset2').addEventListener(`click`, Creset);
document.querySelector('.reset3').addEventListener(`click`, Treset);
document.querySelector('.reset4').addEventListener(`click`, Preset);
document.querySelector('.resetAll').addEventListener(`click`, Areset);
document.querySelector('.debugM1').addEventListener(`click`, () => addMoney(4));
document.querySelector('.debugM2').addEventListener(`click`, () => addMoney(8));
document.querySelector('.debugM3').addEventListener(`click`, () => addMoney(12));
document.querySelector('.debugM4').addEventListener(`click`, () => addMoney(16));
document.querySelector('.debugM5').addEventListener(`click`, () => addMoney(20));
document.querySelector('.debugAps1').addEventListener(`change`, ZeroAps);
if(0 == isDev) {
    alert('コードクリッカーへようこそ！\n\n「コードを書く」をクリックしてお金を稼ぎ\n稼いだお金で更にコーディングを加速させよう！');
}