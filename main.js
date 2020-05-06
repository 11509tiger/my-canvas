var paintPad = document.getElementById('xxx')
var context = paintPad.getContext('2d')
var lineWidth = 5

autoSetCanvasSize(paintPad)

listenToUser(paintPad)

var eraserEnabled = false
pen.onclick = function () {
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}
eraser.onclick = function () {
    eraserEnabled = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}
red.onclick = function () {
    context.fillStyle = 'red'
    context.strokeStyle = 'red'
    red.classList.add('active')
    orange.classList.remove('active')
    blue.classList.remove('active')
    green.classList.remove('active')
    purple.classList.remove('active')
    black.classList.remove('active')
}
orange.onclick = function () {
    context.fillStyle = 'orange'
    context.strokeStyle = 'orange'
    red.classList.remove('active')
    orange.classList.add('active')
    blue.classList.remove('active')
    green.classList.remove('active')
    purple.classList.remove('active')
    black.classList.remove('active')
}
blue.onclick = function () {
    context.fillStyle = 'blue'
    context.strokeStyle = 'blue'
    red.classList.remove('active')
    orange.classList.remove('active')
    blue.classList.add('active')
    green.classList.remove('active')
    purple.classList.remove('active')
    black.classList.remove('active')
}
green.onclick = function () {
    context.fillStyle = 'green'
    context.strokeStyle = 'green'
    red.classList.remove('active')
    orange.classList.remove('active')
    blue.classList.remove('active')
    green.classList.add('active')
    purple.classList.remove('active')
    black.classList.remove('active')
}
purple.onclick = function () {
    context.fillStyle = 'purple'
    context.strokeStyle = 'purple'
    red.classList.remove('active')
    orange.classList.remove('active')
    blue.classList.remove('active')
    green.classList.remove('active')
    purple.classList.add('active')
    black.classList.remove('active')
}
black.onclick = function () {
    context.fillStyle = 'black'
    context.strokeStyle = 'black'
    red.classList.remove('active')
    orange.classList.remove('active')
    blue.classList.remove('active')
    green.classList.remove('active')
    purple.classList.remove('active')
    black.classList.add('active')
}

thin.onclick = function () {
    lineWidth = 5
}
thick.onclick = function () {
    lineWidth = 10
}

clear.onclick = function () {
    context.clearRect(0, 0, paintPad.width, paintPad.height)
}

download.onclick = function () {
    var url = paintPad.toDataURL("image/png")
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = '我的画儿'
    a.target = '_blank'
    a.click()
}
//函数
function autoSetCanvasSize(canvas) {
    SetCanvasSize()

    window.onresize = function () {
        SetCanvasSize()
    }

    function SetCanvasSize() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight

        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}

function drawCircle(x, y, radius) {
    context.beginPath()
    context.arc(x, y, radius, 0, Math.pi * 2)
    context.closePath()
    context.fill()
}

function drawLine(x1, x2, y1, y2) {
    context.beginPath()
    context.lineWidth = lineWidth
    context.moveTo(x1, x2)
    context.lineTo(y1, y2)
    context.closePath()
    context.stroke()
}
function clearDraw(x, y, width = 20, height = 20) {
    context.clearRect(x-width/2, y-height/2, width, height)
}
//监听用户
function listenToUser(canvas) {
    var using = false
    var lastPoint = { x: undefined, y: undefined }
    //特性检测
    if (document.body.ontouchstart !== undefined) { // === null
        //  触屏设备
        canvas.ontouchstart = function (e) {
            var x = e.touches[0].clientX
            var y = e.touches[0].clientY
            using = true
            if (eraserEnabled) {
                clearDraw(x, y)
            } else {
                lastPoint = { 'x': x, 'y': y }
            }
        }
        canvas.ontouchmove = function (e) {
            var x = e.touches[0].clientX
            var y = e.touches[0].clientY

            if (!using) { return }

            if (eraserEnabled) {
                clearDraw(x, y)
            } else {
                var newPoint = { 'x': x, 'y': y }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        canvas.ontouchend = function () {
            using = false
        }
    } else {
        // 非触屏设备
        canvas.onmousedown = function (e) {
            var x = e.clientX
            var y = e.clientY
            using = true
            if (eraserEnabled) {
                clearDraw(x, y)
            } else {
                lastPoint = { 'x': x, 'y': y }
            }
        }

        canvas.onmousemove = function (e) {
            var x = e.clientX
            var y = e.clientY

            if (!using) { return }

            if (eraserEnabled) {
                clearDraw(x, y)
            } else {
                var newPoint = { 'x': x, 'y': y }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }

        canvas.onmouseup = function () {
            using = false
        }
    }

}


