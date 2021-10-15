//第一步 创建画布
  var snowCanvas = document.createElement('canvas');
  //设置一个id
  snowCanvas.id = 'snow';
  //设置一个画布的宽度与高度
  snowCanvas.width = window.innerWidth;
  snowCanvas.height = window.innerHeight;
  //将创建的画布添加到body中去
  document.getElementsByTagName('body')[0].appendChild(snowCanvas);

  //成员变量记录一下
  this.canvas = snowCanvas;
  var that = this;
  //窗口改变时修改画布大小
  window.onresize = function() {
    that.canvas.width = window.innerWidth;
    that.canvas.height = window.innerHeight;
  };

  //第二步 创建雪花
  //使用对象来保存雪花的信息
  function snowInfo() {
    var innerWidth = window.innerWidth;
    var innerHeight = window.innerHeight;
    //雪花的基本位置信息
    //随机  0.0  ~ 当前窗口的宽度
    this.x = Math.floor(Math.random() * innerWidth);
    this.y = Math.floor(Math.random() * innerHeight);
    //半径 5 ~ 15
    this.radius = Math.random() * 3 + 5;
    //下落的速度  1.5 ~ 2.5
    this.speed = Math.random() + 1.5;
  }

  //创建雪花的数组
  var list = [];

  for (var i = 0; i < 1000; i++) {
    list.push(new snowInfo());
  }


  //第三步 绘制
  this.ctx = this.snowCanvas.getContext('2d');

  function drawSnow() {
    var ctx = this.ctx;
    var canvas = this.snowCanvas;
    //清空一下画布
    ctx.clearRect(0, 0, this.snowCanvas.width, this.snowCanvas.height);

    //循环绘制所的有的雪花
    for (var i = 0; i < list.length; i++) {
      //当前的雪花
      var item = list[i];

      //当前的位置  y 坐标递增 就出现了向下移动的效果
      item.y += item.speed;

      //控制下边界
      if (item.y >= canvas.height) {
        item.y = 0;
      }

      //创建雪花的渐变
      var snowGradient = ctx.createRadialGradient(item.x, item.y, 0, item.x, item.y, item.radius);
      //设置渐变的颜色组 中间白色 边缘透明
      snowGradient.addColorStop(0.0, 'rgba(255,255,255,0.9)');//红 绿 蓝 透明度
      snowGradient.addColorStop(0.5, 'rgba(255,255,255,0.5)');//红 绿 蓝 透明度
      snowGradient.addColorStop(1.0, 'rgba(255,255,255,0.0)');//红 绿 蓝 透明度

      ctx.save();
      //设置填充样式
      ctx.fillStyle = snowGradient;

      ctx.beginPath();
      //绘制当前的圆 使用画弧 Math.PI*2 一周
      ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  //第四步 定时循环
  //100毫秒绘制一次
  setInterval('drawSnow()', 10);