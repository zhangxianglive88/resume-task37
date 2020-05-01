// 点击topbar的a标签，会跳到相应的锚点,并且是平滑的滑动过去

!function () {
    var view = document.querySelector('nav.menu')
    var controller = {
        view: null,
        aTags: null,
        init: function(view){
            this.view = view
            this.initAnimation()
            this.bindEvents()
        },
        initAnimation: function () {  // 动画初始化
            function animate(time) {
                requestAnimationFrame(animate)
                TWEEN.update(time)
            }
            requestAnimationFrame(animate)
        },
        scrollToElement: function (element) {
            let top = element.offsetTop  //获取元素距离页面最顶端的高度，注意这里不是相对于视口的高度！！！
            let TargetTop = top - 70//目标高度
            let currentTop = window.scrollY //当前高度
            let s = TargetTop - currentTop //路程
            const coords = { y: currentTop }; //起始位置
            let t = Math.abs(s / 100) * 200  //时间
            if(t > 500){t = 500}
            const tween = new TWEEN.Tween(coords)  //起始位置
                .to({ y: TargetTop }, t)  //结束位置和时间
                .easing(TWEEN.Easing.Quadratic.InOut)  //缓动类型 
                .onUpdate(() => {
                    //coords.y已经变了
                    window.scroll(0, coords.y)  //如何更新界面
                })
                .start(); //开始缓动
        },
        bindEvents: function () {
            let liTags = this.view.querySelectorAll("nav.menu > ul li")
            for (let i = 0; i < liTags.length; i++) {
                liTags[i].onmouseenter = function (x) {
                    // console.log("mouseenter")
                    // tagert是操作对象，currentTarget是监听对象，绝大多数情况下是一致的
                    // 但是假设a标签里有个span元素，即<span>作品</span>，那么使用onmouseenter得到的
                    // target和currentTarget是一致的，但是如果换成点击事件，得到的值去不一样，因此需要注意！！！
                    // console.log(x.target)  
                    // console.log(x.currentTarget)
                    x.currentTarget.classList.add('active')
                }
                liTags[i].onmouseleave = function (x) {
                    x.currentTarget.classList.remove('active')
                }
            }

            let aTags = this.view.querySelectorAll("nav.menu > ul > li > a")
            for (let i = 0; i < aTags.length; i++) {
                aTags[i].onclick = (x)=>{
                    x.preventDefault() //阻止标签a的默认跳转动作
                    let a = x.currentTarget 
                    // a.href是经浏览器处理过的，是带http协议的，而a.getAttribute("href")就是自己写的东西
                    let href = a.getAttribute("href")  // "#siteAbout"
                    let element = document.querySelector(href)
                    console.log(element)
                    this.scrollToElement(element)
                }
            }
        }
    }
    controller.init(view)
}.call()
