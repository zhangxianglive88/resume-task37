!function () {
    let view = document.querySelector('.message')
    var model = {
        // AV初始化
        init: function () {
            let APP_ID = "dTpCvioD0aV2Y3vBgu94KrDo-MdYXbMMI"
            let appKey = "WRIa8eNee1F5hql96ayTSs2b"
            AV.init({
                appId: APP_ID,
                appKey: appKey,
            })
        },
        // 获取数据
        fetch: function () {
            const query = new AV.Query('Message');
            return query.find() // promise对象
        },
        // 创建数据
        save: function (name, content) {
            const Message = AV.Object.extend('Message');
            const message = new Message();
            message.set('content', content);
            message.set('name', name);
            return message.save() // promise对象
        }
    }
    let controller = {
        view: null,
        messageList: null,
        model: null,
        init: function () {
            this.view = view
            this.model = model
            this.messageList = document.querySelector('#messageList')
            this.form = view.querySelector('#postMessageForm')
            this.model.init()
            this.loadMessage()
            this.bindEvents()
        },
        loadMessage: function () {
            // 从数据库中取数据，展示在页面
            this.model.fetch().then((messages) => {
                messages.map((item) => {
                    let content = item.attributes.content
                    let name = item.attributes.name
                    let li = document.createElement('li')
                    li.innerText = `${name}:${content}`
                    this.messageList.appendChild(li)
                })
            })
        },
        bindEvents: function () {
            // 向数据库中添加留言，添加成功后刷新当前页面
            let myForm = this.form
            myForm.addEventListener('submit', (e) => {
                e.preventDefault()
                let content = myForm.querySelector('input[name=content]').value
                let name = myForm.querySelector('input[name=name]').value
                this.model.save(name, content).then((message) => {
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