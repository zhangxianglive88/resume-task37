// AV初始化
AV.init({
    appId: "dTpCvioD0aV2Y3vBgu94KrDo-MdYXbMMI",
    appKey: "WRIa8eNee1F5hql96ayTSs2b",
})

// 从数据库中取数据，展示在页面
let ul = document.querySelector('#liuyan')
const query = new AV.Query('Message');
query.find().then((messages) => {
    messages.map((item)=>{
        let content = item.attributes.content
        let name = item.attributes.name
        let li = document.createElement('li')
        li.innerText = `${name}:${content}`
        ul.appendChild(li)
    }) 
});

// 向数据库中添加留言，添加成功后刷新当前页面
let myForm = document.querySelector('#postMessageForm')
myForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let content = myForm.querySelector('input[name=content]').value
    let name = myForm.querySelector('input[name=name]').value
    const Message = AV.Object.extend('Message');
    const message = new Message();
    message.set('content', content);
    message.set('name', name);
    message.save().then((message) => {
        // window.location.reload()
        let li = document.createElement('li')
        li.innerText = `${name}:${content}`
        ul.appendChild(li)
        myForm.querySelector('input[name=content]').value = ''
        myForm.querySelector('input[name=name]').value = ''
    })
})









/*
// 创建TestObject表
const TestObject = AV.Object.extend('TestObject');
const testObject = new TestObject();
// 设置键值对
testObject.set('words', 'Hello world!');
testObject.save().then((testObject) => {
    console.log('保存成功。')
})

*/