!function () {
    // 添加offset类
    let specialTags = document.querySelectorAll('[data-x]')
    for (let i = 0; i < specialTags.length; i++) {
        specialTags[i].classList.add("offset")
    }

    findClosestAndRemoveOffset()

    window.addEventListener('scroll', function (x) {
        findClosestAndRemoveOffset()
    })

    // 找出距离窗口顶部最近的元素，并移除它的offset类
    function findClosestAndRemoveOffset() {
        let specialTags = document.querySelectorAll('[data-x]')
        let y = window.scrollY
        //minDistanceIndex:离窗口顶部最近的元素
        let minDistanceIndex = 0
        for (let i = 1; i < specialTags.length; i++) {
            if (Math.abs(y - specialTags[i].offsetTop) < Math.abs(y - specialTags[minDistanceIndex].offsetTop)) {
                minDistanceIndex = i
            }
        }
        specialTags[minDistanceIndex].classList.remove("offset")
        for (let i = 0; i < specialTags.length; i++) {
            specialTags[i].classList.remove("active")
        }
        specialTags[minDistanceIndex].classList.add("active")
        let id = specialTags[minDistanceIndex].id
        let a = document.querySelector('a[href="#' + id + '"]')
        let li = a.parentNode
        let brotherAndMe = li.parentNode.children
        for (let i = 0; i < brotherAndMe.length; i++) {
            brotherAndMe[i].classList.remove("highlight")
        }
        li.classList.add("highlight")
    }
}.call()
