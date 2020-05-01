!function () {
    var view = document.querySelector("#topNavBar")
    var controller = {
        view: null,
        init: function(){
            this.view = view
            this.bindEvents() // this.bindEvents.call(this)
        },
        bindEvents: function(){
            window.addEventListener('scroll', ()=>{  // 箭头函数没有this
                if (window.scrollY > 0) {
                    this.active()
                } else {
                    this.deactive()
                }
            })
        },
        active: function(){
            this.view.classList.add("sticky")
        },
        deactive: function(){
            this.view.classList.remove("sticky")
        }
    }
    controller.init()  // controller.init.call(controller, view)
}.call()
