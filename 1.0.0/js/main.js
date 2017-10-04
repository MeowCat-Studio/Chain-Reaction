/**
*	Chain Reaction
*	@projectName: Chain-Reaction
*	@author: MlgmXyysd
*	@version: 1.0.0
*	@license: GNU General Public License v3.0
*	@date: 2017/10/04 8:50
*	@fileName: main.js
*	Copyright &copy; 2013-2018 MeowCat Studio Powered by MlgmXyysd All Rights Reserved.
*/
"use strict";
var life_A;
var life_B;
/**
*	$
*	Get element.
*	@param [String]id Element's unique id.
*	@return document
*/
var $=function(id) {
	return document.getElementById(id);
}
/**
*	getRandomNum
*	Generate a random number.
*	@param [Number]range Random max range.
*	@param [Boolean]zero=true Can random get zero.
*	@param [Number]max=32767 Max range before mod.
*	@return number
*/
var getRandomNum=function(range,zero=true,max=32767) {
	if (zero) {
		range++;
	}
	let result=Math.floor(Math.random()*max%range);
	if (!zero) {
		result++;
	}
	return result;
}
/**
*	generateRandomCat
*	Generate 9 random cat.
*	@return void
*/
var generateRandomCat=function() {
	for (let i=1;i<=9;i++) {
		let position=getRandomNum(3);
		updateCatPosition(i,position);
	}
}
/**
*	updateCatPosition
*	Change cat's position.
*	@param [Number]id Cat's id.
*	@param [Number]position The position that want to change.
*	@return void
*/
var updateCatPosition=function(id,position) {
	let pos=$("cat_"+String(id));
	$("cats_"+String(id)).value=position;
	pos.setAttribute("class","cat_"+String(position));
}
/**
*	beat
*	Game core.
*	@param [Number]location Cat's location.
*	@param [String]position The position that want to turn.
*	@param [Number]time Runned time.
*	@return void
*/
var beat=function(location,position,time) {
	if (!time) {
		time=1;
	}
	if (time>50) {
		return;
	}
	let pos=Number($("cats_"+String(location)).value);
	let loc=location;
	switch (position) {
		case "left":
			pos--;
			if (pos<0) {
				pos=3;
			}
			break;
		case "right":
			pos++;
			if (pos>3) {
				pos=0;
			}
			break;
	}
	updateCatPosition(loc,pos);
	if (loc==1&&loc==4&&loc==7&&pos==3) {
		return;
	} else if (loc==3&&loc==6&&loc==9&&pos==1) {
		return;
	} else if (loc==1&&loc==3&&pos==0) {
		return;
	} else if (loc==7&&loc==9&&pos==2) {
		return;
	} else if (loc==2&&pos==0) {
		life_A--;
		checkLife();
		return;
	} else if (loc==8&&pos==2) {
		life_B--;
		checkLife();
		return;
	}
	switch (pos) {
		case 0:
			loc-=3;
			break;
		case 1:
			loc++;
			break;
		case 2:
			loc+=3;
			break;
		case 3:
			loc--;
			break;
	}
	time++;
	if (loc>9||loc<1) {
		return;
	} else {
		setTimeout(function() {
			beat(loc,position,time);
		},500);
	}
}
/**
*	checkLife
*	Check player's life.
*	@return void
*/
var checkLife=function() {
	if (life_A<=0) {
		alert("B win!");
		window.location.reload(true);
	} else if (life_B<=0) {
		alert("A win!");
		window.location.reload(true);
	}
	$("life_A").innerHTML=life_A;
	$("life_B").innerHTML=life_B;
}
/**
*	newGame
*	Restart game.
*	@return void
*/
var newGame=function() {
	life_A=3;
	life_B=3;
	let rent_A=getRandomNum(6,false);
	let rent_B=getRandomNum(6,false);
	if (rent_A==rent_B) {
		newGame();
		return;
	}
	generateRandomCat();
	if (rent_A>rent_B) {
		$("panel_A").style.display="block";
		$("panel_B").style.display="none";
	} else if (rent_B>rent_A) {
		$("panel_B").style.display="block";
		$("panel_A").style.display="none";
	}
	checkLife();
}
window.onload=function() {
	newGame();
	$("left_A").onclick=function() {
		$("panel_A").style.display="none";
		beat(2,"left",1);
		checkLife();
		$("panel_B").style.display="block";
	}
	$("right_A").onclick=function() {
		$("panel_A").style.display="none";
		beat(2,"right",1);
		checkLife();
		$("panel_B").style.display="block";
	}
	$("straight_A").onclick=function() {
		$("panel_A").style.display="none";
		beat(2,"straight",1);
		checkLife();
		$("panel_B").style.display="block";
	}
	$("left_B").onclick=function() {
		$("panel_B").style.display="none";
		beat(8,"left",1);
		checkLife();
		$("panel_A").style.display="block";
	}
	$("right_B").onclick=function() {
		$("panel_B").style.display="none";
		beat(8,"right",1);
		checkLife();
		$("panel_A").style.display="block";
	}
	$("straight_B").onclick=function() {
		$("panel_B").style.display="none";
		beat(8,"straight",1);
		checkLife();
		$("panel_A").style.display="block";
	}
}