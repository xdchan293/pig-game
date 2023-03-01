'use strict';
// 获取1-6随机数的方法 Math.trunc(Math.random() * 6) + 1

const $ = function(element) {
    return document.querySelector(element);
}
const $id = function(id) {
    return document.getElementById(id);
}

const switchPlayer = function() {
    //将现在的用户点数清零

    $id(`current--${activePlayer}`).textContent = 0;
    currentSum = 0;
    //重新选择
    activePlayer = activePlayer === 0 ? 1 : 0;
    //样式转换
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');

}

const init = function() {
    //初始化所有有关数据
    console.log(activePlayer)
    $(`.player--0`).classList.add('player--active');
    $(`.player--${activePlayer}`).classList.remove('player--winner');

    activePlayer = 0;
    currentSum = 0;
    scores = [0, 0];
    playing = true;

    score0.textContent = 0;
    score1.textContent = 0;
    current0.textContent = 0;
    current1.textContent = 0;

    dice.classList.add('hidden');
}

//获取所有要操作的元素 xx-0 -> 代表玩家1 以此类推
//一号玩家
let player0 = $('.player--0');
let score0 = $id('score--0');
let current0 = $id('current--0');

//二号玩家
let player1 = $('.player--1');
let score1 = $id('score--1');
let current1 = $id('current--1');

//色子
let dice = $('.dice');
//各种按钮
let btnNew = $('.btn--new');
let btnRoll = $('.btn--roll');
let btnHold = $('.btn--hold');

//当前玩家 当前累计点数 两个玩家已有点数 是否在游戏中
let activePlayer = 0;
let currentSum = 0;
let scores = [0, 0];
let playing = true;


init();
btnRoll.addEventListener('click', function() {
    if (playing) {
        let tempdice = Math.trunc(Math.random() * 6) + 1;

        //展示摇骰结果
        dice.classList.remove('hidden');
        dice.src = `dice-${tempdice}.png`;

        if (tempdice !== 1) {
            currentSum += tempdice;
            //修改current下边的值
            $id(`current--${activePlayer}`).textContent = currentSum;

        } else {
            //切换玩家
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function() {
    if (playing) {
        scores[activePlayer] += currentSum;
        $id(`score--${activePlayer}`).textContent = scores[activePlayer];
        //超过赢的上限时
        if (scores[activePlayer] >= 20) {
            playing = false;
            dice.classList.add('hidden');
            $(`.player--${activePlayer}`).classList.remove('player--active');
            $(`.player--${activePlayer}`).classList.add('player--winner');
        } else {
            //跳转
            switchPlayer();
        }
    }

});

btnNew.addEventListener('click', init);