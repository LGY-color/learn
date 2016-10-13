# shadow
1.曲线阴影</br>
    其实很简单的,利用border-radius:100px/10px;表示水平方向为100px,垂直方向为10px;大概会得到一个矩形然后边偏圆.
    然后利用:after和:before,生成上述所说的矩形边偏圆的阴影叠加,就有曲线阴影效果啦.其实用单一:after和:before也行,只是没有那么好看

2.翘边阴影</br>
    翘边阴影主要利用到css3的transform:skew(12deg) rotate(4deg).
    css3的skew(x,y)(斜切)有点像把矩形变成平行四边形,还是利用:after和:before前后各生成一个左右对称的平行四边形,然后ratate()产生阴影就可以啦
