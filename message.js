!function () {
    let view = document.querySelector('.message')
    let controller = {
        view: null,
        messageList: null,
        init: function () {
            this.view = view
            this.messageList = document.querySelector('#messageList')
            this.form = view.querySelector('#postMessageForm')
            this.initAV()
            this.loadMessage()
            this.bindEvents()
        },
        initAV: function () {
            let APP_ID = "dTpCvioD0aV2Y3vBgu94KrDo-MdYXbMMI"
            let appKey = "WRIa8eNee1F5hql96ayTSs2b"
            // AV初始化
            AV.init({
                appId: APP_ID,
                appKey: appKey,
            })
        },
        loadMessage: function () {
            // 从数据库中取数据，展示在页面
            const query = new AV.Query('Message');
            query.find().then((messages) => {
                messages.map((item) => {
                    let content = item.attributes.content
                    let name = item.attributes.name
                    let li = document.createElement('li')
                    li.innerText = `${name}:${content}`
                    this.messageList.appendChild(li)
                })
            });
        },
        bindEvents: function () {
            // 向数据库中添加留言，添加成功后刷新当前页面
            let myForm = this.form
            myForm.addEventListener('submit', (e) => {
                e.preventDefault()
                let content = myForm.querySelector('input[name=content]').value
                let name = myForm.querySelector('input[name=name]').value
                const Message = AV.Object.extend('Message');
                const message = new Message();
                message.set('content', content);
                message.set('name', name);
                message.save().then((message) => {
                    let li = document.createElement('li')
                    li.innerText = `${name}:${content}`
                    this.messageList.appendChild(li)
                    myForm.querySelector('input[name=content]').value = ''
                    myForm.querySelector('input[name=name]').value = ''
                })
            })
        }
    }
    controller.init()
}.call()