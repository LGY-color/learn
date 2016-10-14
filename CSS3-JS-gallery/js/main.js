//通用函数
//获取类还是ID
function g(selector) {
	var method = selector.substr(0, 1) == '.' ? 'getElementsByClassName' : 'getElementById';
	return document[method](selector.substr(1));
}
//随机生成一个数.取值范围为random([min,max])
function random(range){
	var max = Math.max(range[0],range[1]);
	var min = Math.min(range[0],range[1]);
	var diff = max - min;
	var number = Math.floor(Math.random() * diff + min);
	return number;
}
//1.点击出现翻页
function turn(elem) {
	var cls = elem.className;
	var n = elem.id.replace(/[^0-9]/ig, ""); 
	if (!/photo-center/.test(cls)) {
		return resort(n);
	}
	if (/rotate-front/.test(cls)) {
		cls = cls.replace(/rotate-front/, 'rotate-back');
		g("#nav" + n).className = g("#nav" + n).className.replace('i','i curr-back'); 
	} else {
		cls = cls.replace(/rotate-back/, 'rotate-front');
		g("#nav" + n).className = g("#nav" + n).className.replace(/\s*curr-back\s*/, " "); 
	}
	return elem.className = cls;
}
//2.输出所有海报
var data = data;
function addPhotos() {
	var template = g('#wrap').innerHTML;

	var html = [];
	var nav = [];
	for (var s = 0; s < data.length; s++) {
		var _html = template.replace('{{index}}', s).replace('{{img}}', data[s].img).replace('{{caption}}', data[s].caption).replace('{{desc}}', data[s].desc);
		html.push(_html);

		nav.push('<span id="nav' + s + '"onclick = "turn( g(\'#photo' + s + '\') )" class="i"></span>');
	}

	html.push('<div class="nav">' + nav.join("") + '</div>');
	g("#wrap").innerHTML = html.join("");

	var num = random([0, data.length]);
	resort(num);
}

addPhotos();
//3.海报排序
function resort(n){
	var _photo = g(".photo");
	var photos = [];
	for(var s = 0;s < _photo.length; s++){
		_photo[s].className = _photo[s].className.replace(/\s*photo-center\s*/,"");
		_photo[s].className = _photo[s].className.replace(/\s*rotate-front\s*/,"");
		_photo[s].className = _photo[s].className.replace(/\s*rotate-back\s*/,"");

		_photo[s].style.left = "";
		_photo[s].style.top = "";
		_photo[s].style["transform"] = "scale(1)";
		_photo[s].className +=" rotate-front";
		photos.push(_photo[s]);
	}
	var photoCenter = g('#photo'+n);
	photoCenter.className += " photo-center";
	photoCenter = photos.splice(n,1)[0];

	//把海报分成左右两部分
	var photoLeft = photos.splice(0,Math.ceil(photos.length/2));
	var photoRight = photos;

	var ranges = rangeSet();
	for (s in photoLeft){
		var photo = photoLeft[s];
		photo.style['transform'] = "rotate("+random([-60,60])+"deg) scale(.8) translate(600px)";
	}
	for (s in photoRight){
		var photo = photoRight[s];
		photo.style['transform'] = "rotate("+random([-60,60])+"deg) scale(.8) translate(-600px)";
	}
	//按钮控制
	var navs = g(".i");
	for (var s=0;s<navs.length;s++){
		navs[s].className = navs[s].className.replace(/\s*current\s*/, "");
		navs[s].className = navs[s].className.replace(/\s*curr-back\s*/, "");
	}
	g("#nav" + n).className += " current";
}
//4.计算左右分区
function rangeSet() {
	var range = {
		left : {
			x : [],
			y : []
		},
		right : {
			x : [],
			y : []
		}
	}
	var wrap = {
		w : g("#wrap").clientWidth,
		h : g("#wrap").clientHeight
	};
	var photo = {
		w : g(".photo")[0].clientWidth,
		h : g(".photo")[0].clientHeight
	};

	range.wrap = wrap;
	range.photo = photo;

	range.left.x = [0 - photo.w, wrap.w / 2 - photo.w / 2];
	range.left.y = [0 - photo.h, wrap.h];

	range.right.x = [wrap.w / 2 + photo.w / 2, wrap.w + photo.w];
	range.right.y = [0 - photo.h, wrap.h];

	return range;
}
