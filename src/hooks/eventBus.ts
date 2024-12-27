import {EventEmitter} from "events";
import {useInit} from "@/hooks/useInit";
import {pagesMap} from "@/utils/urlMap";
const eventBus= new EventEmitter()

// //接收事件,一个页面可以注册多个事件监听器
// EventBus().on('event2',(e)=>{
//     console.log(e);
// })
// //发送事件
// EventBus().emit('index','event1',{message:'我往首页发了一个测试消息'})
// EventBus().emit('index','event2',{message:'我往首页发了一个测试消息'})
/**
 * 事件总线
 */
const EventBus =()=> {
    const {pagePath} = useInit();
    const target = pagesMap.find((i) => i.path === pagePath);
    const currentPageName  = target.name
    /**
     * 发送事件到指定页面
     *
     * 该函数通过事件名称查找对应的页面，并通过eventBus发送事件和数据到该页面
     * 如果找不到对应的页面，则输出错误信息
     *
     * @param targetPageName - 目标页面的名称 pages.json 里页面的name字段
     * @param eventName - 事件名称 一个页面允许注册多个事件
     * @param data - 要发送到目标页面的数据
     */
    const emit= (targetPageName: string,eventName: string, data: any) => {
        const targetPage = pagesMap.find((i) => i.name === targetPageName);
        if (!targetPage){
            return console.error(`${targetPageName}页面未找到`)
        }
        if(eventBus.listenerCount(`${targetPageName}:${eventName}`) === 0){
            return console.error(`${targetPage.path}页面未激活监听器 '${targetPageName}:${eventName}'`)
        }
        eventBus.emit(`${targetPageName}:${eventName}`, {pagePath,targetPage:targetPage.path, queryData:data})
    }

    /**
     * 监听事件
     *
     * 该函数通过事件名称注册一个监听器，当有该事件被触发时，监听器会接收到对应的数据
     * @param eventName - 事件名称 一个页面允许注册多个事件
     * @param callback - 回调函数
     */
    const on = (eventName: string,callback: Function) => {
        if(eventBus.listenerCount(`${currentPageName}:${eventName}`)>0){
            eventBus.removeAllListeners(`${currentPageName}:${eventName}`)
        }
        eventBus.on(`${currentPageName}:${eventName}`, e=>{
            console.log(`------on--------:`)
            console.log(`from pagePath:\t${e.pagePath}`)
            console.log(`target pagePath:\t${e.targetPage}`)
            console.log(`eventName:\t${currentPageName}:${eventName}`)
            console.log(`queryData:\t${JSON.stringify(e.queryData)}`)
            console.log(`------on end--------:`)
            callback(e.queryData)
        })
    }

    /**
     * 监听一次事件
     *
     * 该函数通过事件名称注册一个监听器，当有该事件被触发时，监听器会接收到对应的数据，并且只触发一次
     * @param eventName - 事件名称 一个页面允许注册多个事件
     * @param callback - 回调函数
     */
    const once = (eventName: string, callback: Function) => {
        eventBus.once(`${currentPageName}:${eventName}`, e=>{
            console.log(`------on--------:`)
            console.log(`from pagePath:\t${e.pagePath}`)
            console.log(`target pagePath:\t${e.targetPage}`)
            console.log(`eventName:\t${currentPageName}:${eventName}`)
            console.log(`queryData:\t${JSON.stringify(e.queryData)}`)
            console.log(`------on end--------:`)
            callback(e.queryData)
        })
    }

    /**
     * 取消监听事件
     *
     * 该函数通过事件名称取消注册一个监听器，当有该事件被触发时，监听器将不会接收到对应的数据
     * 只能取消自身页面册的监听器，不能取消其他页面注册的监听器
     * @param eventName - 事件名称 一个页面允许注册多个事件
     * @param callback - 回调函数
     */
    const off= (eventName: string, callback: Function) => {
        if(eventBus.listenerCount(`${currentPageName}:${eventName}`) === 0){
            console.log(`------off--------:`)
            return console.error(`当前页面${pagePath}未激活监听器 '${currentPageName}:${eventName}'`)
        }
        console.log(`${pagePath} 页面中的监听事件 '${currentPageName}:${eventName}' 被停用`)
        eventBus.off(`${currentPageName}:${eventName}`, ()=>{
            callback('off')
        })
    }

    return {emit, on,once, off}
}
export default EventBus
