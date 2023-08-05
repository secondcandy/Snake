class Snake{
    // 表示蛇头的元素
    head:HTMLElement
    // 蛇的身体，包括蛇头
    bodies:HTMLCollection
    // 获取蛇的容器
    element:HTMLElement
    constructor(){
        this.element = document.getElementById('snake')!
        this.head = document.querySelector('#snake>div') as HTMLElement;
        this.bodies = this.element.getElementsByTagName('div')!
    }
    // 获取蛇头坐标
    get X(){
        return this.head.offsetLeft
    }
    get Y(){
        return this.head.offsetTop
    }

    // 设置蛇头的坐标
    set X(value:number){
        if(this.X == value){
            return
        }

        // X值的合法范围
        if(value < 0 || value > 290){
            // 进入判断说明蛇撞墙了
            throw new Error('蛇撞墙了')
        }

        if(this.bodies[1]&& (this.bodies[1] as HTMLElement).offsetLeft === value){
            // console.log('水平方向发生了掉头')
            // 如果发生了掉头，应该让蛇继续向反方向继续移动
            if(value > this.X){
                // 如果新值大于旧值X，说明蛇在向右走，此时发生掉头，应该让蛇继续向左走
                value = this.X -10
            }else{
                value = this.X + 10
            }
        }

        this.moveBody()
        this.head.style.left = value + 'px'
        this.checkHead()
    }
    set Y(value:number){
        if(this.Y == value){
            return
        }

        // Y值的合法范围
        if(value < 0 || value > 290){
            // 进入判断说明蛇撞墙了
            throw new Error('蛇撞墙了')
        }

        if(this.bodies[1]&& (this.bodies[1] as HTMLElement).offsetTop === value){
            if(value > this.Y){
                value = this.Y -10
            }else{
                value = this.Y + 10
            }
        }

        this.moveBody()
        this.head.style.top = value +'px'
        this.checkHead()
    }

    // 蛇增加身体的方法
    addBody(){
        this.element.insertAdjacentHTML("beforeend","<div></div>")
    }

    // 添加蛇身体移动的方法
    moveBody(){
        // 将后部分身体设置为前部分身体的位置
        // 遍历所有身体
        for(let i = this.bodies.length -1;i>0;i--){
            let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i-1] as HTMLElement).offsetTop;

            //将这个值设置到当前身体上
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
    }


    checkHead(){
        // 检查蛇头和身体是否相撞
        // 获取所有的身体，检查是否和蛇头发生重叠
        for(let i=1;i<this.bodies.length;i++){
            if(this.X == (this.bodies[i] as HTMLElement).offsetLeft && this.Y == (this.bodies[i] as HTMLElement).offsetTop){
                // 进入判断说明蛇头撞到身体，游戏结束
                throw new Error('撞到自己了')
            }
        }
    }
}
export default Snake