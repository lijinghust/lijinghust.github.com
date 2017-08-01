## css3动画一网打尽
## 一小时进阶css3动画小王子

李静：奇舞团--导航组

---
##导航首页的发展史

---
###2010年（cms）

![2010](img/daohang-tech/2010.png)

---
###2011年（马甲系统）

![2011](img/daohang-tech/2011.png)

---
###2012年（Athena项目，内容化、个性化）

![2012](img/daohang-tech/2012.png)

---
###2013年~今（动态化，https）

![2013](img/daohang-tech/2013.png)

---
##导航首页的项目结构

---
###项目结构

![项目结构](img/daohang-tech/xitong.png)

---

## 一. 打造强大的浏览器端存储

---
## localStorage与cookie的共同点

@fragment

* 存储在浏览器
* 有同源的限制（但级别不同）

---
## localStorage与cookie的差异点

<style type="text/css">
.reveal .localstorage td{
    border:solid 1px white;
    padding:0;
    text-align: center;
    height:50px;
    line-height: 50px;
}
</style>

<table class="localstorage">
    <tr><td></td><td>localStorage</td><td>cookie</td></tr>
    <tr><td>大小</td><td>5MB</td><td>4KB</td></tr>
    <tr><td>失效时间</td><td>永久保存</td><td>有过期时间</td></tr>
    <tr><td>http协议</td><td>仅仅保存在浏览器中</td><td>会带在http等协议头中</td></tr>
    <tr><td>操作端</td><td>仅浏览器端可以操作</td><td>服务端和浏览器端都可以操作</td></tr>
    <tr><td>浏览器</td><td>IE8+,chrome,firefox等高级浏览器</td><td>所有浏览器</td></tr>
    <tr><td>限制</td><td>严格的同源策略限制</td><td>子域名可共享上一级域名</td></tr>
</table>

---

## localStorage的高端玩法！

@fragment

* 加过期时间
* 加签名

---
[具体实现，求戳](https://github.com/lijinghust/localstorage)
```javascript
set: function(key, data, expires){
    this.lastUpdate = (new Date()).getTime();
    var storage = {
        value: data,
        signature: this.signature,
        lastUpdate : this.lastUpdate
    }
    if(expires){
        storage.expires = expires;
    }
    this.storage.set(key, storage);         
},
get: function(key, ignoreExpires){
    var data = this.storage.get(key);
         
    // 签名一致 && (忽略过期时间 || 没有过期时间 || 时间未过期)
    if(data && data.signature === this.signature && (ignoreExpires || !data.expires || (new Date()).getTime() < data.expires)){ 
        data = data.value;

        if(this.dataFormatter && this.dataFormatter.getter){
            data = this.dataFormatter.getter(data);
        }
        return data;
    }
}
```
---

## 二. 数据“飞速”渲染到页面，让用户无感知等待

---
###数据缓存+静默更新
![数据静默更新](img/daohang-tech/jingmogengxin.png)

---
## 三. 导航的自定义网址存储在客户端，为什么从来不会丢失呢？

---
![浏览器清除数据设置](img/daohang-tech/clear.png)

---
###localStorage存储在浏览器，用户清除本地数据的时候localstorage就会被清空。

@fragment

那么用户端有更加稳定的存储方式吗？

---

## FlashCookie

---

### Flash提供了一个本地共享对象(Local SharedObject)，这个对象将用户的Flash cookie存储在用户的本地硬盘中。

@fragment

* size()     返回以字节为单位的共享对象大小
* getLocal()    返回一个共享对象
* flush()       把一个值写入到本地硬盘，返回True，False，'pending'
* clear()       删除由flush方法创建的数据
* data          调用flush时，将置于data属性内的对象保存到共享对象中。总是同flsh一起使用。

[[code]](https://github.com/lijinghust/FlashCookie)

---

## 四. “棒棒”是神马东东？哇，“能长能短”！

---
![数据静默更新](img/daohang-tech/bangbang.png)

---

* 目的：边缘自动对齐
* 关键点：绝对定位，设置层级，清除浮动(保证内容把容器撑开)
* [Demo, Click me!](https://jsfiddle.net/0480hyoo/2/)

---
# 五. “信鸽”是用来传递消息的

---
###人在江湖，身不由己！
###麻烦事情多多少少会遇到一些：

@fragment

* 网站要换域名
* 为了安全要换成https协议
* 需要嵌入iframe页面。我去，高度还要动态变化。。。
* 。。。
 
--- 

### 那么这些跟“信鸽”有什么关系呢？

@fragment

* 迁移数据
* 消息传递

---

实现原理：postMessage + window.name做兼容性处理 [拓展,戳我](http://qiwoo.org/qiwoo/web/detail.html?name=XPC)


```javascript
// a.html
<html>
<head>
    <title>a.html</title>
</head>
<body>
<iframe src="b.html" name="ifr"></iframe>
<script type="text/javascript">
window.ifr.postMessage('hello world!', '*');

// window.ifr.name = 'hello world!';
</script>
</body>
</html>

// b.html
<html>
<head>
    <title>b.html</title>
</head>
<body>
<script type="text/javascript">
window.addEventListener('message', function(e){
    console.log(e, '@ b.html');
}, false);

// setInterval(function(){
//     console.log(window.name);
//     window.name = '';
// },10);
</script>
</body>
</html>

```

---

## 六. 我靠，js坏掉了都可以正常使用

---

### 哪些情况下会导致js无法使用呢？

@fragment

* js被禁用
* js外链被劫持
* https证书无法使用导致js资源未被加载
* 。。。

---
![hao123](img/daohang-tech/hao123.png)

---
![2345](img/daohang-tech/2345.png)

---
![sogou](img/daohang-tech/sogou.png)

---
![qq](img/daohang-tech/qq.png)

---
![duba](img/daohang-tech/duba.png)

---
![hao360](img/daohang-tech/hao360.png)

---

```javascript
<script type="text/javascript">
hao360.docWrite('<!--');  
// hao360.docWrite是在head区域中的一个外链js中，重写了一下document.write
</script>
我是一个特殊的存在，只有js无法正常使用的时候，我才会被展现出来。
<!-- DO NOT DELETE -->
```
---

## 七. hey，这个图片地址发我一下？什么？不是图片！！！

---
### 不是图片？那么这个不规则的图案是怎么展现出来呢？

@fragment

有一个听起来很高端的词汇--webfont

---

```javascript
<style type="text/css">
@font-face {font-family: "webfont-hao360";
    src: url("http://s4.qhimg.com/static/ccce9bb000159502/iconfont.eot"); /* IE9*/
    src: url("http://s4.qhimg.com/static/ccce9bb000159502/iconfont.eot?#iefix") format("embedded-opentype"), /* IE6-IE8 */
    url("http://s4.qhimg.com/static/bd0b9abacf756865/iconfont.woff") format("woff"), /* chrome、firefox */
    url("http://s0.qhimg.com/static/5fed3652faa1f7bd/iconfont.ttf") format("truetype"), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
    url("http://s4.qhimg.com/static/743f016184ef647f/iconfont.svg#iconfont") format("svg"); /* iOS 4.1- */
}
.close{
    font-family:webfont-hao360;
}
</style>
<span class="close">&#xe62c;</span>

```

[栗子](http://lijing1-iri.hao.360.cn/)

---
###学习使用资源

* [字蛛](http://font-spider.org/)
* [Qiwoo Fonts](http://font.qiwoo.org/)
* [iconfont](http://www.iconfont.cn/)

---

## 八. 啊啊啊~页面里绝对定位的元素这么多，没法管理啊，头都大了

---
###别人家的层级管理是怎么做的？

@fragment

![ios7](img/daohang-tech/ios7.png)

---
![ios7原来是这么做的](img/daohang-tech/ios7-jiegou.png)

---
![首页](img/daohang-tech/shouye.png)

---
![首页的分层](img/daohang-tech/shouye-jiegou.png)

---
[更详细的都在这里，求戳](https://github.com/lijinghust/lijinghust.github.com/issues/2)
```javascript
<style type="text/css">
.module{position:relative;}/* 或者position:absolute; */
/* 基本框架 */
.content{position:relative;z-index:100;}

.front-view,
.behind-view{position:absolute;top:0;left:0;width:100%;height:0;}
.front-view {z-index:1000;}
.behind-view{z-index:10;}
</style>

<div class="module">
    <div class="content"></div>
    <div class="front-view"></div>
    <div class="behind-view"></div>
</div>
```

---

## 九. 前端资源懒加载，速度快省流量

---
### 原理：很简单，就是在用户还没有看到这块内容的时候，不进行渲染或者加载资源，当用户看到或者将要看到的时候再做渲染或者加载资源的事情。

---
###1. DOM lazyload

```javascript
<textarea style="display:none">
<div class="item-logo">
    <a id="imgLogo" class="default-logo" href="/" target="_self" >
        <img src="https://p1.ssl.qhimg.com/t0151320b1d0fc50be8.png">
    </a>
    <a id="themeLogo" class="theme-logo" href="/" target="_self" ></a>
</div>
</textarea>

实现方法：获取textarea中html内容，插入页面中该textarea的位置
```

---
###2. Image lazyload

```javascript
<img src="" data-src="https://p1.ssl.qhimg.com/t0151320b1d0fc50be8.png" />
实现方法：获取img标签data-src属性的值，设置该img标签的src的值为data-src的值
```

---
##十. 时光机--穿越时间的机器

---
##导航广告运营特点

@fragment

* 广告一般以夜里12点整作为时间起点和结束点
* 广告安排密集，时间无缝衔接
* 几乎每天都有很多，节假日广告更多，且每日素材不同
* 广告形态、位置多样，需保证广告以及页面内容之间互不干扰

---
##因此，需要一个工具或规则来保证：在预定的时间段内广告上线和下线准确无误，内容运营正确且没有干扰。

---
###时光机js简单实现（同样实现php等需要版本）

```javascript
var TimeMachine = (function(){
    var previewTime = location.href.queryUrl('previewTime');
    function time(){
        return previewTime;
    }
    function isBefore(time){
        if(previewTime < time){
            return true;
        }
        return false;
    }
    function isAfter(time){
        if(previewTime > time){
            return true;
        }
        return false;    
    }
    function isTimeBetweenAB(beginTime, endTime){
        if(isAfter(beforeTime) && isBefore(endTime)){
            return true;
        }
        return false;
    }

    return {
        time: time,
        isBefore: isBefore,
        isAfter: isAfter,
        isTimeBetweenAB: isTimeBetweenAB
    }

})();


TimeMachine.isTimeBetweenAB(){
    // TODO
}

```
---



## Thanks！

<style type="text/css">
.reveal h1, .reveal h2, .reveal h3{
    line-height: 1.2em;
}
</style>