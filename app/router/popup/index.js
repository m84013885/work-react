'use strict'
import './css.css'
import { closeView } from '../../utils/goto'
const { prize, closeTime, count } = window.serverData
const PIG_TEXT = ['', '恭喜获得钻石*{{count}}个', '恭喜获得荧光棒*{{count}}个', '恭喜获得加油鼓气*{{count}}个', '恭喜获得超级喝彩*{{count}}个', '恭喜获得全速冲刺*{{count}}个']
const PIG_CLASS_NAME = ['', 'prize__diamond', 'prize__free', 'prize__special1', 'prize__special2', 'prize__special3']

let timerAutoCloser = null
const $main = document.getElementById('main')
const $prize = document.querySelector('.prize')
const $prizePig = document.querySelector('.prize__pig')
const $prizeName = document.querySelector('.prize__name')
const $prizeBtn = document.querySelector('.prize__btn')

function scaleToFix () {
  const windowW = document.documentElement.clientWidth || document.body.clientWidth
  const scale = windowW / 375
  $main.style.webkitTransform = `scale(${scale})`
  $main.style.transform = `scale(${scale})`
}

function startAutoCloseTimer (ts) {
  const timer = setTimeout(function () {
    closeView()
  }, ts)
  return timer
}

function bindCloseView () {
  $prizeBtn.addEventListener('click', function (e) {
    clearTimeout(timerAutoCloser)
    closeView()
  }, false)
}

function initView () {
  if (prize === 0) {
    $prize.classList.add('prize--no')
    $prizePig.style.display = 'none'
    $prizeName.textContent = '手慢了，抢完了'
  }
  else {
    $prize.classList.add('prize--fill')
    $prizePig.classList.add(PIG_CLASS_NAME[prize])
    $prizeName.innerHTML = PIG_TEXT[prize].replace(/{{count}}/, count)
  }
}

scaleToFix()
bindCloseView()
initView()
timerAutoCloser = startAutoCloseTimer(closeTime)
